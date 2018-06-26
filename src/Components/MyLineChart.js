import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { chartOptions } from "./chart-settings";
import Loading from "./Loading";

class MyLineChart extends Component {
  constructor() {
    super();
    this.state = {
      chartOptions: chartOptions,
      data: [],
      emptyDiv: true,
      isLoading: true
    };
  }

  render() {
    if (this.state.emptyDiv) return <div />;
    if (this.state.isLoading) {
      return <Loading message="Downloading data" />;
    } else {
      return (
        <div>
          <Line
            ref="chart"
            options={this.state.chartOptions}
            data={this.state.data}
          />
        </div>
      );
    }
  }

  getChartInstance() {
    return this.refs.chart === undefined
      ? undefined
      : this.refs.chart.chartInstance;
  }

  updateState(chartData, isLoading, isEmpty) {
    this.setState({
      data: chartData,
      isLoading: isLoading,
      emptyDiv: isEmpty
    });
  }
}

export default MyLineChart;
