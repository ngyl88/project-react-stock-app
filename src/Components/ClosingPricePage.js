import React, { Component } from "react";
import SearchForm from "./SearchForm";
import SearchStockHelperLink from "./StocksUtils";
import ClosingPrice from "./ClosingPrice";
import { navMenu, historical100daysClosingKey } from "../Utils/nav-menu";

class ClosingPricePage extends Component {
  constructor() {
    super();
    this.state = {
      additionalSymbolsForChart: []
    }
  }
  
  render() {
    const title = navMenu[historical100daysClosingKey];
    return (
      <div>
        <h4 className="header-active-page">{title}</h4>
        <SearchForm
          controlId="formAddStockToChart"
          inputLabel="Add stock to chart:"
          placeholder="Enter one stock symbol"
          helperMessage="
                Stock symbols does not contain spaces, eg. MSFT, VOD.L, D05.SI."
          helperLink={<SearchStockHelperLink />}
          handleSubmitValue={this.handleSubmitOnChartSearchForm}
          validateInput={this.props.validationFormInput}
        />
        <ClosingPrice
          symbols={[...this.props.symbols, ...this.state.additionalSymbolsForChart]}
          dataNotEmpty={this.props.chartDataNotEmpty}
          chartTitle={title}
        />
      </div>
    );
  }

  handleSubmitOnChartSearchForm = submittedValue => {
    this.setState({
      additionalSymbolsForChart: [...this.state.additionalSymbolsForChart, submittedValue]
    });
  };
};

export default ClosingPricePage;
