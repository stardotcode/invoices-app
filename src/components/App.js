import React, { Component, Fragment } from 'react';
import '../../node_modules/milligram/dist/milligram.css';
import '../styles/styles.css';

import Header from './Header';
import Footer from './Footer';
import InvoiceHeader from './InvoiceHeader';
import InvoiceFooter from './InvoiceFooter';
import LineItems from './LineItems';
import LineItemsHeader from './LineItemsHeader';
import Printable from './Printable';
import {
  getLineItemTotal, getSubtotal, getTotal, getCurrencySymbol, uuidv4,
} from '../helpers';

const { Big } = require('../../node_modules/big.js/big.mjs');

const MONEYINPUTS = ['moneyAmountPaid', 'moneyDiscount', 'moneyFees', 'taxPercent'];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
    this.handleLineItemAdd = this.handleLineItemAdd.bind(this);
    this.handleLineItemRemove = this.handleLineItemRemove.bind(this);
    this.handleLineItemUpdate = this.handleLineItemUpdate.bind(this);
    this.handleUpdateTotal = this.handleUpdateTotal.bind(this);
    this.togglePrintable = this.togglePrintable.bind(this);

    this.state = {
      billToName: '',
      billToCompanyName: '',
      billToAddrLine1: '',
      billToAddrLine2: '',
      dueDate: new Date(),
      fromName: '',
      fromCompanyName: '',
      fromAddrLine1: '',
      fromAddrLine2: '',
      fromEmailAddr: '',
      fromPhoneNumber: '',
      invoiceDate: new Date(),
      invoiceNumber: 1,
      invoiceTitle: '',
      moneyAmountPaid: '0',
      moneyDiscount: '0',
      moneyFees: '0',
      moneySubtotal: '0',
      moneyTotal: '0',
      taxPercent: 0,
      lineItems: [],
      currencySymbol: getCurrencySymbol(),
      showPrintable: false,
    };

    Big.DP = 2;
    Big.RM = 1;
  }

  handleFieldUpdate(name, event) {
    const { value } = event.target;

    if (MONEYINPUTS.includes(name) && /^[\D.]*$/.test(value)) {
      event.preventDefault();
    } else {
      this.setState(() => ({
        [name]: value,
      }));
    }

    if (MONEYINPUTS.includes(name)) {
      this.handleUpdateTotal();
    }
  }

  handleLineItemUpdate(id, name, event) {
    const { lineItems } = this.state;
    const { value } = event.target;
    const lineItemsCopy = [...lineItems];
    const changedItem = lineItemsCopy[lineItemsCopy.findIndex(i => i.id === id)];

    if (value && value.trim().length) {
      if (name === 'unitPrice') {
        changedItem[name] = Big(value).toFixed(2);
      } else if (name === 'quantity') {
        changedItem[name] = parseInt(value, 10);
      } else {
        changedItem[name] = value;
      }
    } else {
      changedItem[name] = '';
    }

    changedItem.amount = getLineItemTotal(changedItem);

    this.setState(() => ({
      lineItems: lineItemsCopy,
      moneySubtotal: getSubtotal(lineItemsCopy),
    }));

    this.handleUpdateTotal();
  }

  handleLineItemAdd() {
    this.setState(state => ({
      lineItems: [...state.lineItems, {
        id: uuidv4(), description: '', quantity: 0, unitPrice: 0, amount: 0,
      }],
    }));
  }

  handleLineItemRemove(id) {
    const { lineItems } = this.state;
    const newLineItems = lineItems.filter(item => item.id !== id);

    this.setState(() => ({
      lineItems: newLineItems,
      moneySubtotal: getSubtotal(newLineItems),
    }));

    this.handleUpdateTotal();
  }

  handleUpdateTotal() {
    this.setState(state => ({
      moneyTotal: getTotal({
        subtotal: state.moneySubtotal,
        discount: state.moneyDiscount,
        fees: state.moneyFees,
        amountPaid: state.moneyAmountPaid,
        taxPercent: state.taxPercent,
      }),
    }));
  }

  togglePrintable() {
    this.setState(state => ({ showPrintable: !state.showPrintable }));
  }

  render() {
    const {
      billToName, billToCompanyName, billToAddrLine1, billToAddrLine2, currencySymbol, dueDate,
      fromName, fromCompanyName, fromAddrLine1, fromAddrLine2, fromEmailAddr, fromPhoneNumber,
      invoiceDate, invoiceNumber, invoiceTitle, lineItems,
      moneyAmountPaid, moneyDiscount, moneyFees,
      moneySubtotal, moneyTotal, showPrintable, taxPercent,
    } = this.state;

    return (
      <div className="wrapper container">
        <Header
          title="Invoice Generator"
          onTogglePrintable={this.togglePrintable}
          showPrintable={showPrintable}
        />

        <div className={showPrintable ? 'page hide' : 'page'}>
          <InvoiceHeader
            billToName={billToName}
            billToCompanyName={billToCompanyName}
            billToAddrLine1={billToAddrLine1}
            billToAddrLine2={billToAddrLine2}
            dueDate={dueDate}
            fromName={fromName}
            fromAddrLine1={fromAddrLine1}
            fromAddrLine2={fromAddrLine2}
            fromCompanyName={fromCompanyName}
            fromEmailAddr={fromEmailAddr}
            fromPhoneNumber={fromPhoneNumber}
            invoiceDate={invoiceDate}
            invoiceNumber={invoiceNumber}
            invoiceTitle={invoiceTitle}
            onFieldUpdate={this.handleFieldUpdate}
          />

          {lineItems.length > 0 && <LineItemsHeader />}

          <LineItems
            currencySymbol={currencySymbol}
            items={lineItems}
            onLineItemAdd={this.handleLineItemAdd}
            onLineItemRemove={this.handleLineItemRemove}
            onLineItemUpdate={this.handleLineItemUpdate}
          />

          <InvoiceFooter
            amountPaid={moneyAmountPaid}
            currencySymbol={currencySymbol}
            discount={moneyDiscount}
            onFieldUpdate={this.handleFieldUpdate}
            fees={moneyFees}
            subtotal={moneySubtotal}
            taxPercent={taxPercent}
            total={moneyTotal}
          />
        </div>

        <Fragment>
          {showPrintable && (
            <Printable
              amountPaid={moneyAmountPaid}
              billToAddrLine1={billToAddrLine1}
              billToAddrLine2={billToAddrLine2}
              billToCompanyName={billToCompanyName}
              billToName={billToName}
              currencySymbol={currencySymbol}
              discount={moneyDiscount}
              dueDate={dueDate}
              fromAddrLine1={fromAddrLine1}
              fromAddrLine2={fromAddrLine2}
              fromCompanyName={fromCompanyName}
              fromEmailAddr={fromEmailAddr}
              fromName={fromName}
              fromPhoneNumber={fromPhoneNumber}
              invoiceDate={invoiceDate}
              invoiceNumber={invoiceNumber}
              invoiceTitle={invoiceTitle}
              lineItems={lineItems}
              fees={moneyFees}
              subtotal={moneySubtotal}
              taxPercent={taxPercent}
              total={moneyTotal}
            />
          )}
        </Fragment>

        <Footer />
      </div>
    );
  }
}
