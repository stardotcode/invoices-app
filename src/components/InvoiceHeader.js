import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

export default class InvoiceHeader extends Component {
  constructor(props) {
    super(props);

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleFieldUpdate = props.onFieldUpdate;
  }

  handleDateChange(date, modifiers, datePicker) {
    const { name } = datePicker.props.inputProps;
    this.handleFieldUpdate(name, { target: { value: date } });
  }

  render() {
    const {
      billToAddrLine1,
      billToAddrLine2,
      billToCompanyName,
      billToName,
      dueDate,
      fromAddrLine1,
      fromAddrLine2,
      fromCompanyName,
      fromEmailAddr,
      fromName,
      fromPhoneNumber,
      invoiceDate,
      invoiceNumber,
      invoiceTitle,
    } = this.props;

    return (
      <section className="container secondary invoice-info">
        <form>
          <div className="row">
            <label htmlFor="invoiceTitle" className="column column-75">
            Title
              <input
                type="text"
                value={invoiceTitle}
                onChange={this.handleFieldUpdate.bind(this, 'invoiceTitle')}
                name="invoiceTitle"
                id="invoiceTitle"
              />
            </label>

            <label htmlFor="invoiceNumber" className="column">
            Invoice #
              <input
                type="text"
                value={invoiceNumber}
                onChange={this.handleFieldUpdate.bind(this, 'invoiceNumber')}
                name="invoiceNumber"
                id="invoiceNumber"
              />
            </label>
          </div>

          <div className="row">
            <div className="column column-50">
              <span className="label">Date</span>
              <DayPickerInput
                onDayChange={this.handleDateChange}
                inputProps={{ name: 'invoiceDate', type: 'text' }}
                value={invoiceDate}
              />
            </div>

            <div className="column column-50">
              <span className="label">Due Date</span>
              <DayPickerInput
                onDayChange={this.handleDueDateChange}
                inputProps={{ name: 'dueDate', type: 'text' }}
                value={dueDate}
              />
            </div>
          </div>

          <section className="row">
            <div className="column column-50">
              <span className="label tt-upper">From</span>
              <>
                <div className="row">
                  <div className="column column-50">
                    <label htmlFor="fromName">
                  Name
                      <input
                        type="text"
                        value={fromName}
                        onChange={this.handleFieldUpdate.bind(this, 'fromName')}
                        name="fromName"
                      />
                    </label>
                  </div>
                  <div className="column column-50">
                    <label htmlFor="fromCompanyName">
                    Company Name
                      <input
                        type="text"
                        value={fromCompanyName}
                        onChange={this.handleFieldUpdate.bind(this, 'fromCompanyName')}
                        name="fromCompanyName"
                      />
                    </label>
                  </div>
                </div>

                <label htmlFor="fromAddrLine1">
                Address Line 1
                  <input
                    type="text"
                    value={fromAddrLine1}
                    onChange={this.handleFieldUpdate.bind(this, 'fromAddrLine1')}
                    name="fromAddrLine1"
                  />
                </label>

                <label htmlFor="fromAddrLine2">
                Address Line 2
                  <input
                    type="text"
                    value={fromAddrLine2}
                    onChange={this.handleFieldUpdate.bind(this, 'fromAddrLine2')}
                    name="fromAddrLine2"
                  />
                </label>

                <div className="row">
                  <div className="column column-50">
                    <label htmlFor="fromPhoneNumber">
                    Phone Number
                      <input
                        type="text"
                        value={fromPhoneNumber}
                        onChange={this.handleFieldUpdate.bind(this, 'fromPhoneNumber')}
                        name="fromPhoneNumber"
                      />
                    </label>
                  </div>
                  <div className="column column-50">
                    <label htmlFor="fromEmailAddr">
                    Email Address
                      <input
                        type="email"
                        value={fromEmailAddr}
                        onChange={this.handleFieldUpdate.bind(this, 'fromEmailAddr')}
                        name="fromEmailAddr"
                      />
                    </label>
                  </div>
                </div>
              </>
            </div>

            <div className="column column-50">
              <span className="label tt-upper">Bill To</span>
              <>
                <div className="row">
                  <div className="column column-50">
                    <label htmlFor="billToName">
                    Name
                      <input
                        type="text"
                        value={billToName}
                        onChange={this.handleFieldUpdate.bind(this, 'billToName')}
                        name="billToName"
                      />
                    </label>
                  </div>
                  <div className="column column-50">
                    <label htmlFor="billToCompanyName">
                    Company Name
                      <input
                        type="text"
                        value={billToCompanyName}
                        onChange={this.handleFieldUpdate.bind(this, 'billToCompanyName')}
                        name="billToCompanyName"
                      />
                    </label>
                  </div>
                </div>

                <label htmlFor="billToAddrLine1">
                Address Line 1
                  <input
                    type="text"
                    value={billToAddrLine1}
                    onChange={this.handleFieldUpdate.bind(this, 'billToAddrLine1')}
                    name="billToAddrLine1"
                  />
                </label>

                <label htmlFor="billToAddrLine2">
                Address Line 2
                  <input
                    type="text"
                    value={billToAddrLine2}
                    onChange={this.handleFieldUpdate.bind(this, 'billToAddrLine2')}
                    name="billToAddrLine2"
                  />
                </label>
              </>
            </div>
          </section>


        </form>
      </section>
    );
  }
}
