import { chartDataStyling } from "../Utils/chart-settings";

export const baseURL = "https://api.jumpstart.site/www.alphavantage.co/";
export const apiKey = "";

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
