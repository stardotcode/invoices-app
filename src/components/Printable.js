import React, { Fragment } from 'react';

const { Big } = require('../../node_modules/big.js/big.mjs');

const Printable = (props) => {
  const {
    amountPaid, billToAddrLine1, billToAddrLine2, billToCompanyName, billToName,
    currencySymbol, discount, dueDate, fromAddrLine1, fromAddrLine2, fromCompanyName,
    fromEmailAddr, fromName, fromPhoneNumber, invoiceDate, invoiceNumber, invoiceTitle,
    lineItems, fees, subtotal, taxPercent, total,
  } = props;

  const dateFmtOpts = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  };

  return (
    <main className="printable">
      <div className="flex-row">
        <section className="hz-75">
          {fromName && <h3 className="mb-zero">{fromName}</h3>}
          {fromCompanyName && <h4 className="mb-zero">{fromCompanyName}</h4>}
          {fromAddrLine1 && <p className="mb-zero">{fromAddrLine1}</p>}
          {fromAddrLine2 && <p className="mb-zero">{fromAddrLine2}</p>}
          {fromPhoneNumber && <p className="mb-zero">{fromPhoneNumber}</p>}
          {fromEmailAddr && <p className="mb-zero">{fromEmailAddr}</p>}
        </section>

        <section className="hz-25">
          <h1 className="ta-rt tt-upper">Invoice</h1>
          {invoiceTitle && <p className="ta-rt">{invoiceTitle}</p>}
        </section>
      </div>

      <div className="flex-row mt-lg">
        <div className="hz-60">
          <h2 className="tt-upper">Bill To</h2>
          <section className="lt-pad">
            {billToName && <h3 className="mb-zero">{billToName}</h3>}
            {billToCompanyName && <h4 className="mb-zero">{billToCompanyName}</h4>}
            {billToAddrLine1 && <p className="mb-zero">{billToAddrLine1}</p>}
            {billToAddrLine2 && <p className="mb-zero">{billToAddrLine2}</p>}
          </section>
        </div>

        <div className="hz-40 fs-med">
          {invoiceNumber && (
            <div className="flex-row">
              <strong className="hz-60 ta-rt tt-upper">Invoice #: </strong>
              <span className="hz-40 ta-rt">
                {invoiceNumber}
              </span>
            </div>
          )}

          {invoiceDate && (
            <div className="flex-row">
              <strong className="hz-60 ta-rt tt-upper">Date: </strong>
              <span className="hz-40 ta-rt">
                {invoiceDate.toLocaleDateString(navigator.language, dateFmtOpts)}
              </span>
            </div>
          )}

          {dueDate && (
            <div className="flex-row">
              <strong className="hz-60 ta-rt tt-upper">Due Date: </strong>
              <span className="hz-40 ta-rt">
                {dueDate.toLocaleDateString(navigator.language, dateFmtOpts)}
              </span>
            </div>
          )}
        </div>
      </div>

      <hr />

      <div className="flex-row tt-upper">
        {lineItems && (
          <Fragment>
            <strong className="hz-55">Description</strong>
            <strong className="hz-15">Quantity</strong>
            <strong className="hz-15 ta-rt">Rate</strong>
            <strong className="hz-15 ta-rt">Amount</strong>
          </Fragment>
        )}
      </div>
      {lineItems && (
        lineItems.map(item => (
          <div className="flex-row" key={item.id}>
            <span className="hz-55">
              {item.description}
            </span>
            <span className="hz-15">
              {item.quantity}
            </span>
            <span className="hz-15 ta-rt">
              {currencySymbol}
              {item.unitPrice}
            </span>
            <span className="hz-15 ta-rt">
              {currencySymbol}
              {item.amount}
            </span>
          </div>
        ))
      )}

      <hr />

      <section className="ta-rt tt-upper">
        <div className="flex-row">
          <strong className="hz-85">Subtotal: </strong>
          <span className="hz-15">
            {currencySymbol}
            {Big(subtotal).toFixed(2)}
          </span>
        </div>
        <div className="flex-row">
          <strong className="hz-85">Tax: </strong>
          <span className="hz-15">
            {taxPercent}
            %
          </span>
        </div>
        <div className="flex-row">
          <strong className="hz-85">Fees: </strong>
          <span className="hz-15">
            {currencySymbol}
            {Big(fees).toFixed(2)}
          </span>
        </div>
        <div className="flex-row">
          <strong className="hz-85">Discount: </strong>
          <span className="hz-15">
            {currencySymbol}
            (
            {Big(discount).toFixed(2)}
            )
          </span>
        </div>
        <div className="flex-row">
          <strong className="hz-85">Paid: </strong>
          <span className="hz-15">
            {currencySymbol}
            (
            {Big(amountPaid).toFixed(2)}
            )
          </span>
        </div>
        <div className="flex-row">
          <strong className="hz-85 fs-med">Total Balance Due: </strong>
          <strong className="hz-15 fs-med">
            {currencySymbol}
            {Big(total).toFixed(2)}
          </strong>
        </div>
      </section>
    </main>
  );
};

export default Printable;
