import React from "react";
import { Line } from "react-chartjs-2";
import { chartOptions } from "./chart-settings";
import Loading from "./Loading";

const MyLineChartDiv = props => {
  if (props.emptyDiv) return <div />;
  if (props.isLoading) return <Loading message="Downloading data" />;
  return (
    <div className="chartDiv">
      <Line options={chartOptions} data={props.data} />
    </div>
  );
};

export default MyLineChartDiv;
