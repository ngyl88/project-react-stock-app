import React, { Component } from "react";
import { Line as LineChart } from "react-chartjs-2";
import { chartOptions, chartDataStyling } from "./chart-settings";
import { alphavantage } from "../Keys/key";
import logo from "../logo.svg";
import "../App.css";
import { symbols } from '../SeedData/symbols';

class ChartClosingPrice extends Component {
  constructor() {
    super();
    this.state = {
      symbols: symbols,
      chartLoaded: false,
      chartData: {
        labels: [],
        datasets: []
      }
    };
  }

  async componentDidMount() {
    const stocksInfo = [];

    for (var i = 0; i < this.state.symbols.length; i++) {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${
          this.state.symbols[i]
        }&apikey=${alphavantage}`
      );
      stocksInfo.push(await response.json());
    }

    this.setState({
      chartData: this.formatData(stocksInfo),
      chartLoaded: true
    });

    console.log(this.refs.chart.chartInstance);
  }

  render() {
    if (this.state.chartLoaded) {
      return (
        <LineChart
          ref="chart"
          data={this.state.chartData}
          options={chartOptions}
        />
      );
    } else
      return (
        <div ref="chart" className="loading-container">
          <img src={logo} className="React-logo" alt="logo" />
          <h1 className="loading-message">Downloading data</h1>
        </div>
      );
  }

  formatData = rawJSONDataArray => {
    const chartDataWrapper = {
      labels: [],
      datasets: []
    };

    rawJSONDataArray.map((rawJSONData, index) => {
      const converted = this.getDailyData(rawJSONData);
      const returnObject = {
        ...chartDataStyling[index]
      };

      if (index === 0) {
        chartDataWrapper.labels = converted.dates;
      }
      returnObject.label = converted.label;
      returnObject.data = converted.closingPrices;
      chartDataWrapper.datasets.push(returnObject);
      return returnObject;
    });
    console.log("Chart Data", chartDataWrapper);
    return {
      ...chartDataWrapper
    };
  };

  getDailyData = json => {
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

export default ChartClosingPrice;
