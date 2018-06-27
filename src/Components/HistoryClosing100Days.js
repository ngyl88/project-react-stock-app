import React from "react";
import SearchForm from "./SearchForm";
import ChartClosingPriceDiv from "./ChartClosingPriceDiv";

const HistoryClosing100Days = props => (
  <div>
    <SearchForm
      controlId="formSearchForStock"
      inputLabel="Stock symbol:"
      placeholder="Enter your stock symbol"
      helpMessage="
              Stock symbols does not contain spaces, eg. MSFT, VOD.L, D05.SI."
      handleSubmitValue={props.handleSubmitValue}
      validateInput={props.validateInput}
    />
    <ChartClosingPriceDiv
      symbols={props.symbols}
      dataNotEmpty={props.chartDataNotEmpty}
    />
  </div>
);

export default HistoryClosing100Days;
