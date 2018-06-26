import React, { Component } from "react";
import SearchForm from "./Components/SearchForm";
import ChartClosingPrice from "./Components/ChartClosingPrice";
import { symbols } from "./SeedData/symbols";

class App extends Component {
  constructor() {
    super();
    this.state = {
      symbols: symbols
    };
  }
  
  componentDidMount() {
    this.refs.chart.parseDataToChart([...this.state.symbols]);
  }

  render() {
    return (
      <div>
        <SearchForm
          controlId="formSearchForStock"
          inputLabel="Stock symbol:"
          placeholder="Enter your stock symbol"
          helpMessage="
              Stock symbols does not contain spaces, eg. MSFT, VOD.L, D05.SI."
          handleSubmitValue={this.handleSubmitOnSearchForm}
          validateInput={this.validationFormInput}
        />
        <ChartClosingPrice ref="chart" symbols={this.state.symbols} />
      </div>
    );
  }

  validationFormInput = inputVal => {
    if (inputVal.length === 0) return null;
    if (inputVal.indexOf(" ") !== -1 || inputVal.indexOf(",") !== -1)
      return "error";
    return "success";
  };

  handleSubmitOnSearchForm = submittedValue => {
    this.refs.chart.parseDataToChart([...this.state.symbols, submittedValue]);
    this.setState({
      symbols: [...this.state.symbols, submittedValue]
    });
  };
}

export default App;
