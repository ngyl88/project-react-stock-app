import React, { Component } from "react";
import PageTitle from "./Components/PageTitle";
import PageBody from "./Components/PageBody";
import { symbols } from "./SeedData/symbols";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      symbols: symbols
    };
  }

  render() {
    return (
      <div>
        <PageTitle />
        <PageBody
          symbols={this.state.symbols}
          closingChartDataNotEmpty={this.state.symbols.length > 0}
          validationFormInput={this.validationFormInput}
          handleSubmitOnSearchForm={this.handleSubmitOnSearchForm}
        />
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
    this.setState({
      symbols: [...this.state.symbols, submittedValue]
    });
  };
}

export default App;
