import React, { Component } from "react";
import MyLineChartDiv from "./MyLineChartDiv";
import { baseURL, apiKey, formatStockData } from "../Utils/closingPriceAPI";

class ClosingPrice extends Component {
  constructor(props) {
    super();
    this.state = {
      isLoading: props.dataNotEmpty,
      formattedData: {
        labels: [],
        datasets: [],
      },
      invalidStockSymbols: [],
      existingSymbolsWithDataset: [],
      existingClosingPriceChartDataset: []
    };
  }

  render() {
    const emptyDiv = !this.props.dataNotEmpty;
    return (
      <MyLineChartDiv
        data={this.state.formattedData}
        isLoading={this.state.isLoading}
        emptyDiv={emptyDiv}
        chartTitle={this.props.chartTitle}
      />
    );
  }

  componentDidMount() {
    this.formatChartData(this.props.symbols);
  }

  componentDidUpdate(prevProps) {
    if (this.props.symbols !== prevProps.symbols) {
      this.formatChartData(this.props.symbols);
    }
  }

  async formatChartData(stockSymbols) {
    this.setState({
      isLoading: true
    });

    const stocksInfo = [];
    const stocksSymbolsRequestQueue = [];
    const apiKeyInQuery = apiKey.length === 0 ? "" : "&apikey=" + apiKey;
    for (var i = 0; i < stockSymbols.length; i++) {
      if(this.state.existingSymbolsWithDataset.indexOf(stockSymbols[i]) === -1) {
        const response = await fetch(
          baseURL +
            `query?function=TIME_SERIES_DAILY&symbol=${stockSymbols[i]}` +
            apiKeyInQuery
        );
        stocksSymbolsRequestQueue.push(stockSymbols[i]);
        stocksInfo.push(await response.json());
      }
    }

    const chartData = formatStockData(stocksInfo, stocksSymbolsRequestQueue, this.state.existingSymbolsWithDataset.length);
    const newSymbols = [];
    const newClosingPriceChartDataset = [];
    chartData.datasets.forEach((dataset) => {
      newSymbols.push(dataset.label);
      newClosingPriceChartDataset.push(dataset.data);
    });
    const combinedFormattedData = {
      labels: this.state.formattedData.labels.length > 0 ? this.state.formattedData.labels : chartData.labels,
      datasets: [...this.state.formattedData.datasets, ...chartData.datasets]
    }
    this.setState({
      isLoading: false,
      formattedData: combinedFormattedData,
      invalidStockSymbols: chartData.errors.length === 0 ? [] : chartData.errors,
      existingSymbolsWithDataset: [...this.state.existingSymbolsWithDataset, ...newSymbols],
      existingClosingPriceChartDataset: [...this.state.existingClosingPriceChartDataset, ...newClosingPriceChartDataset],
    });
  }
}

export default ClosingPrice;
