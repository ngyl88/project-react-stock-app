import React, { Component } from "react";
import MyLineChart from "./MyLineChart";
import { chartDataStyling } from "./chart-data-styling";
import { alphavantage } from "../Keys/key";

class ChartClosingPrice extends Component {
  render() {
    return <MyLineChart ref="chart" />;
  }

  async parseDataToChart(stockSymbols) {
    var isLoading = true;
    const stocksInfo = [];

    for (var i = 0; i < stockSymbols.length; i++) {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${
          stockSymbols[i]
        }&apikey=${alphavantage}`
      );
      stocksInfo.push(await response.json());
    }

    isLoading = false;
    const formattedData = this.formatData(stocksInfo, stockSymbols);

    // MyLineChart function updateState(chartData, isLoading, isEmpty)
    this.refs.chart.updateState(
      formattedData,
      isLoading,
      formattedData.datasets.length === 0
    );
  }

  formatData = (rawJSONDataArray, symbols) => {
    const chartDataWrapper = {
      labels: [],
      datasets: [],
      errorIndexes: []
    };

    rawJSONDataArray.forEach((rawJSONData, index) => {
      if(rawJSONData['Error Message'] !== undefined) {
        chartDataWrapper.errorIndexes.push(index);
        return;
      }

      const converted = this.getDailyData(rawJSONData);
      const returnObject = {
        ...chartDataStyling[index - chartDataWrapper.errorIndexes.length]
      };

      if (index === 0) {
        chartDataWrapper.labels = converted.dates;
      }
      returnObject.label = converted.label;
      returnObject.data = converted.closingPrices;
      chartDataWrapper.datasets.push(returnObject);
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
