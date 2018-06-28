import React from "react";
import { Row, Col } from "react-bootstrap";
import MyNavbar from "./MyNavbar";
import MyNavbarXS from "./MyNavbarXS";
import Content from "./Content";

const PageBody = props => {
  return (
  <Row className="no-margin wrapper">
    <MyNavbar
      activeNavKey={props.activeNavKey}
      handleSelectOnNav={props.handleSelectOnNav}
    />
    <MyNavbarXS
      appName={props.appName}
      activeNavKey={props.activeNavKey}
      handleSelectOnNav={props.handleSelectOnNav}
    />
    <Col xs={12} sm={8} md={9} className="no-padding">
      <Content
        activeNavKey={props.activeNavKey}
        symbols={props.symbols}
        closingChartDataNotEmpty={props.closingChartDataNotEmpty}
        validationFormInput={props.validationFormInput}
        handleSubmitOnSearchForm={props.handleSubmitOnSearchForm}
      />
    </Col>
  </Row>
)};

export default PageBody;
