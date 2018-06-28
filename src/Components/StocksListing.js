import React from "react";
import { navMenu, stocksListingKey } from "../Utils/nav-menu";

const StocksListing = props => (
  <div>
    <h4 className="header-active-page">{navMenu[stocksListingKey]}</h4>
    {props.symbols.map((symbol, index) => {
      return (
        <div key={index}>
          <span
            className="stocks-remove"
            onClick={() => props.removeSymbolOnClick(symbol)}
          >
            -
          </span>
          {symbol}
        </div>
      );
    })}
  </div>
);

export default StocksListing;
