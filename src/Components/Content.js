import React from "react";
import {
  navMenu,
  stocksListingKey,
  historical100daysClosingKey
} from "../Utils/nav-menu";
import StocksListing from "./StocksListing";
import ClosingPrice from "./ClosingPrice";

const Content = props => (
  <div className="main-content">
    {props.activeNavKey === stocksListingKey && (
      <StocksListing
        symbols={props.symbols}
        removeSymbolOnClick={props.removeSymbolOnClick}
        validationFormInput={props.validationFormInput}
        handleSubmitOnSearchForm={props.handleSubmitOnSearchForm}
      />
    )}
    {props.activeNavKey === historical100daysClosingKey && (
      <ClosingPrice
        symbols={props.symbols}
        chartDataNotEmpty={props.closingChartDataNotEmpty}
        validationFormInput={props.validationFormInput}
      />
    )}
    {Object.keys(navMenu).indexOf(props.activeNavKey) === -1 && (
      <div>Please select your option</div>
    )}
  </div>
);

export default Content;
