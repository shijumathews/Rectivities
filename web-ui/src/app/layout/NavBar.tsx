import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src="/assets/logo.png"
            height="28"
            alt="Reactivities"
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Reactivities</Nav.Link>
          <Nav.Link href="#pricing">Create Activity</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
