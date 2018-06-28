import React from "react";
import SearchForm from "./SearchForm";
import ClosingPrice from "./ClosingPrice";
import SearchStockHelperLink from "./StocksUtils";
import { navMenu, historical100daysClosingKey } from "../Utils/nav-menu";

const HistoryClosing100Days = props => {
  const title = navMenu[historical100daysClosingKey];
  return (
    <div>
      <h4 className="header-active-page">{title}</h4>
      <SearchForm
        controlId="formSearchForStock"
        inputLabel="Stock symbol:"
        placeholder="Enter one stock symbol"
        helperMessage="
              Stock symbols does not contain spaces, eg. MSFT, VOD.L, D05.SI."
        helperLink={<SearchStockHelperLink />}
        handleSubmitValue={props.handleSubmitOnSearchForm}
        validateInput={props.validationFormInput}
      />
      <ClosingPrice
        symbols={props.symbols}
        dataNotEmpty={props.chartDataNotEmpty}
        chartTitle={title}
      />
    </div>
  );
};

export default HistoryClosing100Days;
