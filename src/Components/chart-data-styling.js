const dataStyle = {
  fill: false,
  lineTension: 0.1,
  borderCapStyle: "butt",
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: "miter",
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10
};

export const chartDataStyling = [
  {
    ...dataStyle,
    backgroundColor: "rgba(255,0,0,.05)",
    borderColor: "rgba(255,0,0,1)",
    pointBorderColor: "rgba(255,0,0,1)",
    pointBackgroundColor: "rgba(255,0,0,1)",
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor: "rgba(255,0,0,1)"
  },
  {
    ...dataStyle,
    backgroundColor: "rgba(0,0,255,.05)",
    borderColor: "rgba(0,0,255,1)",
    pointBorderColor: "rgba(0,0,255,1)",
    pointBackgroundColor: "rgba(0,0,255,1)",
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor: "rgba(0,0,255,1)"
  },
  {
    ...dataStyle,
    backgroundColor: "rgba(75,192,192,0.4)",
    borderColor: "rgba(75,192,192,1)",
    pointBorderColor: "rgba(75,192,192,1)",
    pointBackgroundColor: "#fff",
    pointHoverBackgroundColor: "rgba(75,192,192,1)",
    pointHoverBorderColor: "rgba(220,220,220,1)"
  }
];
