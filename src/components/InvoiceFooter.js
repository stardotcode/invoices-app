import React, { Component } from 'react';

const { Big } = require('../../node_modules/big.js/big.mjs');

export default class InvoiceFooter extends Component {
  constructor(props) {
    super(props);

    this.handleFieldUpdate = props.onFieldUpdate;
  }

  render() {
    const {
      amountPaid, currencySymbol, discount, fees, subtotal, taxPercent, total,
    } = this.props;

    return (
      <section className="container secondary invoice-footer">
        <div className="row">
          <span className="column column-20 column-offset-80">
            <p>
              <span className="label">
              Sub-total
                &nbsp;
                {currencySymbol}
              </span>
              <span className="view-only fn-lg">
                {Big(subtotal).toFixed(2)}
              </span>
            </p>
          </span>
        </div>

        <div className="row">
          <span className="column column-10">
            <label htmlFor="taxPercent">
            Tax %
              <input
                type="number"
                step="any"
                min="0"
                name="taxPercent"
                value={taxPercent}
                onChange={this.handleFieldUpdate.bind(this, 'taxPercent')}
              />
            </label>
          </span>

          <span className="column column-20">
            <label htmlFor="moneyFees">
            Fees
              &nbsp;
              {currencySymbol}
              <input
                type="number"
                name="moneyFees"
                min="0"
                step="any"
                value={fees}
                onChange={this.handleFieldUpdate.bind(this, 'moneyFees')}
              />
            </label>
          </span>

          <span className="column column-20">
            <label htmlFor="moneyDiscount">
            Discount
              &nbsp;
              {currencySymbol}
              <input
                name="moneyDiscount"
                type="number"
                min="0"
                step="any"
                value={discount}
                onChange={this.handleFieldUpdate.bind(this, 'moneyDiscount')}
              />
            </label>
          </span>

          <span className="column column-20">
            <label htmlFor="moneyAmountPaid">
            Amount Paid
              &nbsp;
              {currencySymbol}
              <input
                type="number"
                step="any"
                min="0"
                name="moneyAmountPaid"
                value={amountPaid}
                onChange={this.handleFieldUpdate.bind(this, 'moneyAmountPaid')}
              />
            </label>
          </span>

          <span className="column column-20 column-offset-10">
            <p>
              <span className="label">
              Total Balance Due
                &nbsp;
                {currencySymbol}
              </span>
              <span className="view-only fn-lg">
                {Big(total).toFixed(2)}
              </span>
            </p>
          </span>
        </div>
      </section>
    );
  }
}
