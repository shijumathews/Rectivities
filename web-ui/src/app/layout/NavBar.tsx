import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useStore } from "../stores/store";

export default function NavBar() {
  const { activityStore } = useStore();
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
          <Nav.Link href="#pricing" onClick={() => activityStore.OpenEdit()}>
            Create Activity
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
