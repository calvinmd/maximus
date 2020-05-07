import React from "react";
import { Container, Row, Col } from "reactstrap";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

const Layout = ({ children }) => (
  <Container fluid>
    <Row>
      <Col sm="2">
        <Sidebar />
      </Col>
      <Col>
        <Row>
          <Header />
        </Row>
        <Row>
          {children}
        </Row>
        <Row>
          <Footer />
        </Row>
      </Col>
    </Row>
  </Container>
);

export { Layout };
