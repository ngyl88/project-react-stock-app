import React from "react";
import {
  navMenu,
  stocksListingKey,
  historical100daysClosingKey
} from "../Utils/nav-menu";
import StocksListing from "./StocksListing";
import HistoryClosing100Days from "./HistoryClosing100Days";

const Content = props => (
  <div className="main-content">
    {props.activeNavKey === stocksListingKey && (
      <StocksListing
        symbols={props.symbols}
        removeSymbolOnClick={props.removeSymbolOnClick}
      />
    )}
    {props.activeNavKey === historical100daysClosingKey && (
      <HistoryClosing100Days
        symbols={props.symbols}
        chartDataNotEmpty={props.closingChartDataNotEmpty}
        validationFormInput={props.validationFormInput}
        handleSubmitOnSearchForm={props.handleSubmitOnSearchForm}
      />
    )}
    {Object.keys(navMenu).indexOf(props.activeNavKey) === -1 && (
      <div>Please select your option</div>
    )}
  </div>
);

export default Content;
