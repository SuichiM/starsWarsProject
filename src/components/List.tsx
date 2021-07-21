import React, {useContext, useState, ReactNode} from 'react';
import {
  List,
  Avatar,
  Tooltip,
  Button,
  Popconfirm,
  message,
  Modal,
  Image,
} from 'antd';
import {MainContext} from '@pages/App';
import {TYPE_OPTIONS} from '@config/index';

const {Item} = List;
const {Meta} = Item;

const ICONS = TYPE_OPTIONS.reduce(
  (prev, {value, icon}) => ({...prev, [value]: icon}),
  {},
);

const DESCRIPTIONS_HANDLERS = {
  planets: ({population}) => `population: ${population}`,
  people: ({height, mass}) => `height:${height} mass: ${mass}`,
  films: ({episode_id, director, release_date}) =>
    `Ep. N: ${episode_id} director:${director} release date: ${release_date}`,
  species: ({classification, average_height, language}) =>
    `classification: ${classification} height av.: ${average_height} language:${language}`,
  vehicles: ({model, manufacturer, passengers}) =>
    `model: ${model} manufacturer:${manufacturer} passengers:${passengers}`,
  starships: ({model, manufacturer, passengers}) =>
    `model: ${model} manufacturer:${manufacturer} passengers:${passengers}`,
};

const DART_VADER = 'Darth Vader';
const PATIENCE_NUMBER = 1;

const getDescription = (item): string => {
  const {type} = item;

  const handlerFunction = DESCRIPTIONS_HANDLERS[type];
  return handlerFunction(item) || 'here goes the description';
};

const renderAvatar = (item): ReactNode => {
  return item.name === DART_VADER ? (
    <Tooltip title="The evil itself">
      <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYBzwqLYdv7Z1rg3qc8PTGI21Y3QqfJbuSQlBwz98nrRrflnM4jQq074VCN4zBSWFGLhEE9GRvjkM&usqp=CAc"></Avatar>
    </Tooltip>
  ) : (
    <Tooltip title={item.type}>
      <Avatar size={48}>
        <span>{ICONS[item.type]}</span>
      </Avatar>
    </Tooltip>
  );
};

const renderActions = (item, removeAction): ReactNode[] => [
  <Popconfirm
    key={`delete_popup_${item.id}`}
    title="Are you sure you want to remove this awesome element？"
    okText="Yes"
    cancelText="Not Really"
    onConfirm={() => removeAction(item)}>
    <Button type="link" danger>
      {item.name === DART_VADER ? `you can't` : 'remove'}
    </Button>
  </Popconfirm>,
];

const renderItem = (item, removeAction) => (
  <Item actions={renderActions(item, removeAction)}>
    <Meta
      avatar={renderAvatar(item)}
      title={
        <a target="_blank" rel="noreferrer" href={item.url}>
          {item.name || item.title}
        </a>
      }
      description={getDescription(item)}
    />
  </Item>
);

const advertThem = (times, setTimes) => {
  message.warn('try it again!!! I give you one more chance!');
  setTimes(times + 1);
};
const teachThem = () =>
  Modal.error({
    title: `I find your obstinacy... disturbing`,
    width: 700,
    content: (
      <div className="container text-center">
        <Image
          width={400}
          src="https://66.media.tumblr.com/81b20d0dc155e45e32d6aad6fda2e134/tumblr_nxmktjrb9s1rey868o1_500.gif"
        />
        <div className="h1 mt-2">Promise to stop!</div>
      </div>
    ),
    okText: 'I Promise!',
  });

const ProductList = (/* {items}: ListProps */) => {
  const {selectedOptions, setSelectedOptions} = useContext(MainContext);

  // eslint-disable-next-line
  const [removeDartVaderCount, setRemoveDartVaderCount] = useState(0);

  const removeItem = ({id, name}) => {
    if (name !== DART_VADER)
      return setSelectedOptions(selectedOptions.filter((el) => el.id !== id));

    if (removeDartVaderCount < PATIENCE_NUMBER) {
      advertThem(removeDartVaderCount, setRemoveDartVaderCount);
    } else {
      teachThem();
    }
  };

  return (
    <div className="container w-75">
      <List
        itemLayout="horizontal"
        dataSource={selectedOptions}
        renderItem={(item) => renderItem(item, removeItem)}
      />
    </div>
  );
};

export default ProductList;
