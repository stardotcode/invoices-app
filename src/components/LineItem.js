import React, { Component } from 'react';

export default class LineItem extends Component {
  constructor(props) {
    super(props);

    this.handleUpdateItem = props.onLineItemUpdate;
    this.handleRemoveItem = props.onLineItemRemove;
  }

  render() {
    const {
      id, description, quantity, unitPrice, amount, currencySymbol,
    } = this.props;

    return (
      <div className="row line-item">
        <span className="column column-50">
          <input type="text" value={description} onChange={this.handleUpdateItem.bind(this, id, 'description')} />
        </span>
        <span className="column column-10">
          <input type="number" min="0" step="1" value={quantity} onChange={this.handleUpdateItem.bind(this, id, 'quantity')} />
        </span>
        <span className="column column-10">
          <input type="number" min="0" step="any" value={unitPrice} onChange={this.handleUpdateItem.bind(this, id, 'unitPrice')} />
        </span>
        <span className="column column-10 view-only" id={`amount_${id}`}>
          {currencySymbol}
          {amount}
        </span>
        <span className="column column-10">
          <button type="button" onClick={this.handleRemoveItem.bind(this, id)} className="button-small" title="Remove Item">X</button>
        </span>
      </div>
    );
  }
}
