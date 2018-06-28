import React from "react";
import { Col, Navbar } from "react-bootstrap";
import NavMenu from "./NavMenu";

const MyNavBarXS = props => (
  <Col
    xs={12}
    className="no-padding main-nav"
    smHidden={true}
    mdHidden={true}
    lgHidden={true}
  >
    <Navbar className="no-margin" inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a>{props.appName}</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <NavMenu
          navId="nav-xs"
          activeNavKey={props.activeNavKey}
          handleSelectOnNav={props.handleSelectOnNav}
        />
      </Navbar.Collapse>
    </Navbar>
  </Col>
);

export default MyNavBarXS;
