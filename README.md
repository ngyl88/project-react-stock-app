# React Stock App

This application currently allows user to view the last 100 days closing price trend of multiple stocks from worldwide markets.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to acquire a free API key from [Alpha Vantage](https://www.alphavantage.co/) and replacing the API key in the following URL.
You can view the JSON output by opening the URL in a browser.

```
https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=<YOUR_API_KEY>
```

### Installing

Run the following in terminal to install project dependencies.

```
npm install
```

Modify the API URL in the function formatChartData(stockSymbols) in file /src/Components/ClosingPrice.js

```
const response = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${
      stockSymbols[i]
    }&apikey=<YOUR_API_KEY>`
);
```

Start the server.

```
npm start
```

## Built With

- [React](https://reactjs.org) - The web framework used
- [React-Bootstrap](https://react-bootstrap.github.io/) - The UI framework used
- [react-chartjs-2](https://github.com/jerairrest/react-chartjs-2) - The React wrapper for Chart.js
- [Alpha Vantage](https://www.alphavantage.co/) - Free APIs for realtime and historical stock data
  This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## References

- For chart styling: http://www.chartjs.org/docs/latest/charts/line.html
