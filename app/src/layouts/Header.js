import React from "react";
import { Navbar, Nav, Button } from "reactstrap";

const Header = () => (
  <Navbar expand="lg">
    <Nav>
      <Button color="primary" className="float-right">Connect Wallet</Button>
      </Nav>
  </Navbar>
);

export { Header };
