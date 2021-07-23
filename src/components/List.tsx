import React, {useContext, useState, ReactNode} from 'react';
import {List, Avatar, Tooltip, Button, Popconfirm, message, Modal} from 'antd';
import {MainContext} from '@pages/App';
import {TYPE_OPTIONS, paramType} from '@config/index';

const {Item} = List;
const {Meta} = Item;

const GET_ICON = (type: ResourceType) => {
  // eslint-disable-next-line
  let ResourceType = TYPE_OPTIONS.find((el: paramType) => el.value === type);
  return ResourceType.icon;
};

const DESCRIPTIONS_HANDLERS = {
  planets: ({population}: IPlanet) => `population: ${population}`,
  people: ({height, mass}: IPeople) => `height:${height} mass: ${mass}`,
  films: ({episode_id, director, release_date}: IFilm) =>
    `Ep. N: ${episode_id} director:${director} release date: ${release_date}`,
  species: ({classification, average_height, language}: ISpecie) =>
    `classification: ${classification} height av.: ${average_height} language:${language}`,
  vehicles: ({model, manufacturer, passengers}: IVehicle) =>
    `model: ${model} manufacturer:${manufacturer} passengers:${passengers}`,
  starships: ({model, manufacturer, passengers}: IStarship) =>
    `model: ${model} manufacturer:${manufacturer} passengers:${passengers}`,
};

const DART_VADER = 'Darth Vader';
const PATIENCE_NUMBER = 1;

const getDescription = (item: TResource): string => {
  const {type} = item;

  const handlerFunction = DESCRIPTIONS_HANDLERS[type];
  return handlerFunction(item) || 'here goes the description';
};

const renderAvatar = (item: TResource): ReactNode => {
  return item.name === DART_VADER ? (
    <Tooltip title="The evil itself">
      <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYBzwqLYdv7Z1rg3qc8PTGI21Y3QqfJbuSQlBwz98nrRrflnM4jQq074VCN4zBSWFGLhEE9GRvjkM&usqp=CAc" />
    </Tooltip>
  ) : (
    <Tooltip title={item.type}>
      <Avatar size={48}>
        <span>{GET_ICON(item.type)}</span>
      </Avatar>
    </Tooltip>
  );
};

const renderActions = (
  item: TResource,
  removeAction: (arg: TResource) => void,
): ReactNode[] => [
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

const renderItem = (
  item: TResource,
  removeAction: (arg: TResource) => void,
) => (
  <Item actions={renderActions(item, removeAction)}>
    <Meta
      className="d-flex flex-sm-row"
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

const advertThem = (times: number, setTimes: (arg: number) => void) => {
  message.warn('try it again!!! I give you one more chance!');
  setTimes(times + 1);
};
const teachThem = () =>
  Modal.error({
    title: `I find your obstinacy... disturbing`,
    width: '50%',
    content: (
      <div className="container text-center">
        <img
          src="https://66.media.tumblr.com/81b20d0dc155e45e32d6aad6fda2e134/tumblr_nxmktjrb9s1rey868o1_500.gif"
          className="rounded mx-auto d-block mt-2 responsive-img"
          alt="the evil don't worry about a11y"
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

  const removeItem = ({id, name}: TResource) => {
    if (name !== DART_VADER)
      return setSelectedOptions(
        selectedOptions.filter((el: TResource) => el.id !== id),
      );

    if (removeDartVaderCount < PATIENCE_NUMBER) {
      advertThem(removeDartVaderCount, setRemoveDartVaderCount);
    } else {
      teachThem();
    }
  };

  return (
    <>
      <div className="container infinite-container col-12 col-md-8 col-lg-7">
        <List
          itemLayout="horizontal"
          dataSource={selectedOptions}
          renderItem={(item: TResource) => renderItem(item, removeItem)}
        />
      </div>
      <style jsx>{`
        .responsive-img {
          width: 100%;
          max-width: 400px;
          height: auto;
        }
        .infinite-container {
          height: 65%;
          overflow: auto;
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .infinite-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default ProductList;
