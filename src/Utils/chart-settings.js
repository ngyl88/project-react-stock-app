const chartSeriesColor = [
  "red",
  "blueviolet",
  "blue",
  "green",
  "black",
  "orangered",
  "orchid",
  "lawngreen",
  "lightsalmon",
  "lightslategray",
  "lightseagreen",
  "lightskyblue",
  "navy",
  "darkolivegreen",
  "mediumspringgreen",
  "darkkhaki",
  "mediumpurple",
  "darkgoldenrod",
  "coral",
  "firebrick"
];

const dataStyle = {
  backgroundColor: "white",
  fill: false,
  lineTension: 0, //default=0.4, set to 0 for better performance
  pointHoverBackgroundColor: "white",
  pointHoverBorderWidth: 2,
  pointRadius: 2 //default=3,
};

export const chartDataStyling = chartSeriesColor.map((color, index) => {
  return {
    ...dataStyle,
    borderColor: chartSeriesColor[index],
    pointBorderColor: chartSeriesColor[index],
    pointBackgroundColor: chartSeriesColor[index],
    pointHoverBorderColor: chartSeriesColor[index]
  };
});

export const chartDefaultOptions = {
  scales: {
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: "unit price"
        }
      }
    ]
  },
  legend: {
    position: "bottom"
  }
};