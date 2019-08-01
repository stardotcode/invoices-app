import React from 'react';
import LineItem from './LineItem';
import LineItemAdd from './LineItemAdd';

const LineItems = ({
  currencySymbol, items, onLineItemAdd, onLineItemRemove, onLineItemUpdate,
}) => (
  <section className="container">
    <div className="line-items-wrap">
      { items.map(item => (
        <LineItem
          onLineItemUpdate={onLineItemUpdate}
          onLineItemRemove={onLineItemRemove}
          currencySymbol={currencySymbol}
          key={item.id}
          {...item}
        />
      ))
      }
      <LineItemAdd onLineItemAdd={onLineItemAdd} />
    </div>
  </section>
);

export default LineItems;
