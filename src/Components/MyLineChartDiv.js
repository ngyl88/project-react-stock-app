import React from "react";
import { Line } from "react-chartjs-2";
import { chartDefaultOptions } from "../Utils/chart-settings";
import Loading from "./Loading";

const MyLineChartDiv = props => {
  const chartOption = {
    ...chartDefaultOptions,
    title: {
      display: props.chartTitle !== undefined,
      text: props.chartTitle
    }
  };

  if (props.emptyDiv) return <div />;
  if (props.isLoading) return <Loading message="Downloading data" />;
  return (
    <div className="chart-div">
      <Line options={chartOption} data={props.data} />
    </div>
  );
};

export default MyLineChartDiv;
