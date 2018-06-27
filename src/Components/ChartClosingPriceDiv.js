import React, { Component } from "react";
import MyLineChartDiv from "./MyLineChartDiv";
import { chartDataStyling } from "./chart-data-styling";
import { alphavantage } from "../Keys/key";

class ChartClosingPriceDiv extends Component {
  constructor(props) {
    super();
    this.state = {
      isLoading: props.dataNotEmpty,
      formattedData: undefined
    };
  }

  render() {
    const emptyDiv = !this.props.dataNotEmpty;
    return (
      <MyLineChartDiv
        data={this.state.formattedData}
        isLoading={this.state.isLoading}
        emptyDiv={emptyDiv}
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

    for (var i = 0; i < stockSymbols.length; i++) {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${
          stockSymbols[i]
        }&apikey=${alphavantage}`
      );
      stocksInfo.push(await response.json());
    }

    const chartData = this.formatStockData(stocksInfo, stockSymbols);
    this.setState({
      isLoading: false,
      formattedData: chartData
    });
  }

  formatStockData = (rawJSONDataArray, symbols) => {
    const chartDataWrapper = {
      labels: [],
      datasets: [],
      errors: []
    };

    rawJSONDataArray.forEach((rawJSONData, index) => {
      if (rawJSONData["Error Message"] !== undefined) {
        chartDataWrapper.errors.push({
          index: index,
          json: rawJSONData
        });
        return;
      }

      try {
        const converted = this.getDailyClosingPrice(rawJSONData);
        const returnObject = {
          ...chartDataStyling[index - chartDataWrapper.errors.length]
        };

        if (index === 0) {
          chartDataWrapper.labels = converted.dates;
        }
        returnObject.label = converted.label;
        returnObject.data = converted.closingPrices;
        chartDataWrapper.datasets.push(returnObject);
      } catch (error) {
        chartDataWrapper.errors.push({
          index: index,
          json: rawJSONData
        });
      }
    });
    return {
      ...chartDataWrapper
    };
  };

  getDailyClosingPrice = json => {
    const dates = [];
    const closingPrices = [];
    Object.entries(json["Time Series (Daily)"]).forEach(
      (dailyData, index, json) => {
        dates.push(dailyData[0]);
        closingPrices.push(dailyData[1]["4. close"]);
        return {
          date: dailyData[0],
          closingPrice: dailyData[1]["4. close"]
        };
      }
    );
    return {
      label: json["Meta Data"]["2. Symbol"],
      dates: dates.reverse(),
      closingPrices: closingPrices.reverse()
    };
  };
}

export default ChartClosingPriceDiv;