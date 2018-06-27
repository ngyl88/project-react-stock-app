import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Navbar from "./Navbar";
import Content from "./Content";

const PageBody = (props) => (
  <div className="wrapper">
    <Grid className="no-margin no-padding full-width">
      <Row className="no-margin">
        <Col xs={12} sm={4} md={3} className="no-padding">
          <Navbar />
        </Col>
        <Col xs={12} sm={8} md={9} className="no-padding">
          <Content
            symbols={props.symbols}
            closingChartDataNotEmpty={props.closingChartDataNotEmpty}
            validationFormInput={props.validationFormInput}
            handleSubmitOnSearchForm={props.handleSubmitOnSearchForm}
          />
        </Col>
      </Row>
    </Grid>
  </div>
);

export default PageBody;
