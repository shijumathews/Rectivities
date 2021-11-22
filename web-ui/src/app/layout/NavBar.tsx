import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

interface Props {
  OpenEdit(id: string | undefined): void;
}
export default function NavBar({ OpenEdit }: Props) {
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
          <Nav.Link href="#pricing" onClick={() => OpenEdit(undefined)}>
            Create Activity
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
