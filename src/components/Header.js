import React from 'react';

const Header = ({ title, onTogglePrintable, showPrintable }) => (
  <header className="row">
    <h1 className="column column-75">{title}</h1>
    <span className="column column-25">
      <button className="print-button" onClick={onTogglePrintable} type="button">
        {showPrintable ? 'Close' : 'Print'}
      </button>
    </span>
  </header>
);

export default Header;
