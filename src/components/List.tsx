import React, {useContext} from 'react';
import {List, Avatar, Tooltip} from 'antd';
import {MainContext} from '@pages/App';
import {TYPE_OPTIONS} from '@config/index';

const {Item} = List;
const {Meta} = Item;
const ICONS = TYPE_OPTIONS.reduce(
  (prev, {value, icon}) => ({...prev, [value]: icon}),
  {},
);

/* const mapItemsToCards = (items: TPeople[] | TPlanets[], removeItem) =>
  items.map((el, index) => (
    <div key={`item_${index}`}>
      {ICONS[el.type]} {el.type} {el.name} {el.title}
      <button onClick={() => removeItem(el.id)}>remove</button>
    </div>
  )); */
const HANDLERS = {
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

const getDescription = (item): string => {
  const {type} = item;

  const handlerFunction = HANDLERS[type];
  return handlerFunction(item) || 'here goes the description';
};

// eslint-disable-next-line
const renderItem = (item, removeAction) => (
  <Item
    actions={[
      <a key="list-loadmore-edit" className="text-danger">
        remove
      </a>,
    ]}>
    <Meta
      avatar={
        <Tooltip title={item.type}>
          <Avatar size={48}>
            <span>{ICONS[item.type]}</span>
          </Avatar>
        </Tooltip>
      }
      title={
        <a target="_blank" rel="noreferrer" href={item.url}>
          {item.name || item.title}
        </a>
      }
      description={getDescription(item)}
    />
  </Item>
);

const ProductList = (/* {items}: ListProps */) => {
  const {selectedOptions, setSelectedOptions} = useContext(MainContext);

  const removeItem = (id) => {
    setSelectedOptions(selectedOptions.filter((el) => el.id === id));
  };

  // return <div>{mapItemsToCards(selectedOptions, removeItem)}</div>
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
