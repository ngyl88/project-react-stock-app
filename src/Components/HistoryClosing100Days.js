import React from "react";
import SearchForm from "./SearchForm";
import ChartClosingPriceDiv from "./ChartClosingPriceDiv";
import SearchStockHelperLink from "./StocksUtils";

const HistoryClosing100Days = props => {
  const chartTitle = "100 days Historical Data";
  return (
    <div>
      <h4 className="header-active">
        Historical Closing Price for Past 100 Days
      </h4>
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
      <ChartClosingPriceDiv
        symbols={props.symbols}
        dataNotEmpty={props.chartDataNotEmpty}
        chartTitle={chartTitle}
      />
    </div>
  );
};

export default HistoryClosing100Days;
