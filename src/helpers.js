/* eslint-disable no-bitwise */
/* eslint-disable no-mixed-operators */
const { getCurrency } = require('locale-currency');
const { Big } = require('../node_modules/big.js/big.mjs');

Big.DP = 2;
Big.RM = 1;

const getLineItemTotal = (lineItem) => {
  if (!lineItem.quantity || !lineItem.unitPrice) {
    return '0';
  }
  return Big(lineItem.unitPrice).times(lineItem.quantity).toFixed(2);
};

const getSubtotal = items => items.reduce(
  (accumulator, current) => Big(accumulator).plus(current.amount).toFixed(2), 0,
);

const getTotal = ({
  subtotal, amountPaid, discount, fees, taxPercent,
}) => {
  let result = Big(subtotal);
  const tax = (taxPercent > 0) ? result.times(taxPercent / 100) : 0;

  result = result.plus(fees);
  result = result.minus(amountPaid);
  result = result.minus(discount);
  result = result.plus(tax);

  return result.toFixed(2);
};

const getCurrencySymbol = () => {
  const code = getCurrency(navigator.language) || '';
  const options = { style: 'currency', currency: code };

  if (!code.length) {
    return code;
  }

  return Intl.NumberFormat(navigator.language, options)
    .formatToParts(1).filter(e => e.type === 'currency')[0].value;
};

const handleFocus = event => event.target.select();

const uuidv4 = () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g,
  c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));

module.exports = {
  getLineItemTotal, getSubtotal, getTotal, getCurrencySymbol, handleFocus, uuidv4,
};
