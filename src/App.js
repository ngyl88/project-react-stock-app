import React, { Component } from "react";
import HistoryClosing100Days from "./Components/HistoryClosing100Days";
import { symbols } from "./SeedData/symbols";

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
        <HistoryClosing100Days 
          handleSubmitValue={this.handleSubmitOnSearchForm}
          validateInput={this.validationFormInput}
          symbols={this.state.symbols}
          chartDataNotEmpty={this.state.symbols.length > 0}
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
