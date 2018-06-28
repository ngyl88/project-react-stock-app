import React from "react";
import { Col } from "react-bootstrap";
import NavMenu from "./NavMenu";

const MyNavbar = props => (
  <Col sm={4} md={3} className="no-padding main-nav float-left" xsHidden={true}>
    <NavMenu
      navId="nav"
      activeNavKey={props.activeNavKey}
      handleSelectOnNav={props.handleSelectOnNav}
    />
  </Col>
);

export default MyNavbar;
