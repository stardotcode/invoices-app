import React, { Component } from 'react';

export default class LineItemAdd extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleLineItemAdd = props.onLineItemAdd;
  }

  handleClick() {
    this.handleLineItemAdd();
  }

  render() {
    return (
      <section className="row">
        <div className="column column-20">
          <button type="button" id="add-line-item" title="Add Line Item" onClick={this.handleClick}>+ Line Item</button>
        </div>
      </section>
    );
  }
}
