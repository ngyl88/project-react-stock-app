import { chartDataStyling } from "../Utils/chart-settings";

const backendOrigin = process.env.REACT_APP_BACKEND;

export const callAPIGateway = async (stockSymbols, existingSymbolsWithDataset) => {
  const stocksInfo = [];
  const stocksSymbolsRequestQueue = [];
  for (var i = 0; i < stockSymbols.length; i++) {
    const isNewSymbol = existingSymbolsWithDataset.indexOf(stockSymbols[i]) === -1;
    if (isNewSymbol) {
      const response = await fetch(`${backendOrigin}/wrapper?symbol=${stockSymbols[i]}`, {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': backendOrigin
        },
      });

      // eslint-disable-next-line
      const { message, result } = await response.json();
      // console.log(message);
      // console.log(result);

      stocksSymbolsRequestQueue.push(stockSymbols[i]);
      stocksInfo.push(result);
    }
  }

  return {
    stocksInfo: stocksInfo,
    stocksSymbolsRequestQueue: stocksSymbolsRequestQueue
  };
};

const getDailyClosingPrice = json => {
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

const processErrorResponse = (symbols, index, response, errorArray) => {
  const invalidStockSymbol = symbols[index];
  console.log(`symbol: ${invalidStockSymbol}  information: ${response}`);
  errorArray.push(invalidStockSymbol);
};

export const formatStockData = (
  rawJSONDataArray,
  symbols,
  totalExistingDataSets
) => {
  const chartDataWrapper = {
    labels: [],
    datasets: [],
    errors: []
  };

  rawJSONDataArray.forEach((rawJSONData, index) => {
    if (rawJSONData["Error Message"] !== undefined) {
      processErrorResponse(
        symbols,
        index,
        JSON.stringify(rawJSONData),
        chartDataWrapper.errors
      );
      return;
    }

    try {
      const converted = getDailyClosingPrice(rawJSONData);
      const indexInChart =
        index - chartDataWrapper.errors.length + totalExistingDataSets;
      const returnObject = {
        ...chartDataStyling[indexInChart]
      };

      if (chartDataWrapper.labels.length === 0) {
        chartDataWrapper.labels = converted.dates;
      }
      // converted: label (stock symbol) & closing price
      returnObject.label = converted.label;
      returnObject.data = converted.closingPrices;
      chartDataWrapper.datasets.push(returnObject);
    } catch (error) {
      processErrorResponse(symbols, index, error, chartDataWrapper.errors);
    }
  });
  return {
    ...chartDataWrapper
  };
};
