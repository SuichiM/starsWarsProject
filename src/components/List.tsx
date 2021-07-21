import React, {useContext} from 'react';
import {MainContext} from '@pages/App';

import {TYPE_OPTIONS} from '@config/index';

const ICONS = TYPE_OPTIONS.reduce(
  (prev, {value, icon}) => ({...prev, [value]: icon}),
  {},
);

/* type ListProps = {
  items: TPeople[] | TPlanets[];
}; */

const mapItemsToCards = (items: TPeople[] | TPlanets[], removeItem) =>
  items.map((el, index) => (
    <div key={`item_${index}`}>
      {ICONS[el.type]} {el.type} {el.name} {el.title}
      <button onClick={() => removeItem(el.id)}>remove</button>
    </div>
  ));

const ProductList = (/* {items}: ListProps */) => {
  const {selectedOptions, setSelectedOptions} = useContext(MainContext);

  const removeItem = (id) => {
    setSelectedOptions(selectedOptions.filter((el) => el.id === id));
  };

  return <div>{mapItemsToCards(selectedOptions, removeItem)}</div>;
};

export default ProductList;
