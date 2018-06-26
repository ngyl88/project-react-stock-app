import React, { Component } from 'react';
import ChartClosingPrice from './Components/ChartClosingPrice';

class App extends Component {
  render() {
    return (
      <div>
        Hello React Stock App
        <ChartClosingPrice />
      </div>
    );
  }
}

export default App;
