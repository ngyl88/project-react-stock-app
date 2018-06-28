import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import PageTitle from "./Components/PageTitle";
import PageBody from "./Components/PageBody";
import { symbols } from "./SeedData/symbols";
import { navMenu } from "./Utils/nav-menu";
import "./App.css";

const appName = "My Stocks App";

class App extends Component {
  constructor() {
    super();
    this.state = {
      symbols: symbols,
      activeNavKey: '1'
    };
  }

  render() {
    return (
      <div>
        <Grid className="no-margin no-padding full-width">
          <Row className="no-margin">
            <Col xsHidden={true}>
              <PageTitle appName={appName} />
            </Col>
          </Row>
          <PageBody
            appName={appName}
            activeNavKey={this.state.activeNavKey}
            symbols={this.state.symbols}
            closingChartDataNotEmpty={this.state.symbols.length > 0}
            validationFormInput={this.validationFormInput}
            handleSubmitOnSearchForm={this.handleSubmitOnSearchForm}
            handleSelectOnNav={this.handleSelectOnNav}
          />
        </Grid>
      </div>
    );
  }

  /*componentDidMount() {
    this.interval = setInterval(() => console.log(Date.now()), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }*/

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

  handleSelectOnNav = eventKey => {
    if (Object.keys(navMenu).indexOf(eventKey) === -1) {
      eventKey = '';
    }
    this.setState({
      activeNavKey: eventKey
    });
  };
}

export default App;
