import React from "react";
import SearchForm from "./SearchForm";
import SearchStockHelperLink from "./StocksUtils";
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
    <SearchForm
      controlId="formSearchForStock"
      inputLabel="Add stock:"
      placeholder="Enter one stock symbol"
      helperMessage="
                Stock symbols does not contain spaces, eg. MSFT, VOD.L, D05.SI."
      helperLink={<SearchStockHelperLink />}
      handleSubmitValue={props.handleSubmitOnSearchForm}
      validateInput={props.validationFormInput}
    />
  </div>
);

export default StocksListing;
