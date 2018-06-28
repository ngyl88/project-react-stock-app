import React, { Component } from "react";
import SearchForm from "./SearchForm";
import SearchStockHelperLink from "./StocksUtils";
import MyLineChartDiv from "./MyLineChartDiv";
import { callAPIGateway, formatStockData } from "../Utils/closingPriceAPI";
import { navMenu, historical100daysClosingKey } from "../Utils/nav-menu";

class ClosingPrice extends Component {
  constructor(props) {
    super();
    this.state = {
      isLoading: props.dataNotEmpty,
      formattedData: {
        labels: [],
        datasets: []
      },
      invalidStockSymbols: [],
      existingSymbolsWithDataset: [],
      existingClosingPriceChartDataset: [],
      additionalSymbolsForChart: []
    };
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
        <MyLineChartDiv
          data={this.state.formattedData}
          isLoading={this.state.isLoading}
          emptyDiv={!this.props.chartDataNotEmpty}
          chartTitle={title}
        />
      </div>
    );
  }

  componentDidMount() {
    this.formatChartData([
      ...this.props.symbols,
      ...this.state.additionalSymbolsForChart
    ]);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.symbols !== prevProps.symbols ||
      this.state.additionalSymbolsForChart !==
        prevState.additionalSymbolsForChart
    ) {
      this.formatChartData([
        ...this.props.symbols,
        ...this.state.additionalSymbolsForChart
      ]);
    }
  }

  async formatChartData(stockSymbols) {
    this.setState({
      isLoading: true
    });

    const apiGatewayResponse = await callAPIGateway(
      stockSymbols,
      this.state.existingSymbolsWithDataset
    );

    const stocksInfo = apiGatewayResponse.stocksInfo;
    const stocksSymbolsRequestQueue =
      apiGatewayResponse.stocksSymbolsRequestQueue;

    const chartData = formatStockData(
      stocksInfo,
      stocksSymbolsRequestQueue,
      this.state.existingSymbolsWithDataset.length
    );
    const newSymbols = [];
    const newClosingPriceChartDataset = [];
    chartData.datasets.forEach(dataset => {
      newSymbols.push(dataset.label);
      newClosingPriceChartDataset.push(dataset.data);
    });

    const combinedFormattedData = {
      labels:
        this.state.formattedData.labels.length > 0
          ? this.state.formattedData.labels
          : chartData.labels,
      datasets: [...this.state.formattedData.datasets, ...chartData.datasets]
    };

    this.setState({
      isLoading: false,
      formattedData: combinedFormattedData,
      invalidStockSymbols:
        chartData.errors.length === 0 ? [] : chartData.errors,
      existingSymbolsWithDataset: [
        ...this.state.existingSymbolsWithDataset,
        ...newSymbols
      ],
      existingClosingPriceChartDataset: [
        ...this.state.existingClosingPriceChartDataset,
        ...newClosingPriceChartDataset
      ]
    });
  }

  handleSubmitOnChartSearchForm = submittedValue => {
    this.setState({
      additionalSymbolsForChart: [
        ...this.state.additionalSymbolsForChart,
        submittedValue
      ]
    });
  };
}

export default ClosingPrice;
