import React from "react";
import SearchForm from "./SearchForm";
import ChartClosingPriceDiv from "./ChartClosingPriceDiv";

const HistoryClosing100Days = props => (
  <div>
    <h4 className="header-active">Historical Closing Price for Past 100 Days</h4>
    <SearchForm
      controlId="formSearchForStock"
      inputLabel="Stock symbol:"
      placeholder="Enter your stock symbol"
      helpMessage="
              Stock symbols does not contain spaces, eg. MSFT, VOD.L, D05.SI."
      handleSubmitValue={props.handleSubmitOnSearchForm}
      validateInput={props.validationFormInput}
    />
    <ChartClosingPriceDiv
      symbols={props.symbols}
      dataNotEmpty={props.chartDataNotEmpty}
    />
  </div>
);

export default HistoryClosing100Days;
