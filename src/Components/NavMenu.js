import React from "react";
import { Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { navMenu, stocksListingKey, historical100daysClosingKey } from "../Utils/nav-menu";

const NavMenu = props => {
  return (
    <Nav
      id={props.navId}
      activeKey={props.activeNavKey}
      onSelect={props.handleSelectOnNav}
    >
      <NavItem eventKey={stocksListingKey}>
        {navMenu[stocksListingKey]}
      </NavItem>
      <NavDropdown title="Historical Data" id={props.navId + "-dropdown"}>
        <MenuItem eventKey={historical100daysClosingKey}>
          {navMenu[historical100daysClosingKey]}
        </MenuItem>
      </NavDropdown>
    </Nav>
  );
};

export default NavMenu;
