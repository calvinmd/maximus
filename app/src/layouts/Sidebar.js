import React, { useState } from "react";
import { Link, NavLink as RRNavLink } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarToggler, Nav, NavLink, Collapse } from "reactstrap";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <Navbar light expand="sm">
      <NavbarToggler onClick={handleToggle} />
      <NavbarBrand to="/" tag={Link}>MAXIMUS</NavbarBrand>
      <Collapse isOpen={isOpen} navbar>
        <Nav vertical>
          <NavLink to="/borrow" tag={RRNavLink} activeClassName="link-active">Borrow</NavLink>
          <NavLink to="/liquidity" tag={RRNavLink}>Liquidity</NavLink>
          <NavLink to="/governance" tag={RRNavLink}>Governance</NavLink>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export { Sidebar };
