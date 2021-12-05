import { Container, Nav, Navbar, NavLink } from "react-bootstrap";
import { useStore } from "../stores/store";

export default function NavBar() {
  const { activityStore } = useStore();
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="/home" as={NavLink} to="/" exact header>
          <img
            src="/assets/logo.png"
            height="28"
            alt="Reactivities"
            style={{ marginRight: "10px" }}
          />
          Activities
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/activities" as={NavLink} to="/activities">
            Reactivities
          </Nav.Link>
          <Nav.Link href="/createActivity" as={NavLink} to="/createActivity">
            Create Activity
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
