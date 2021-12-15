import { Container } from "react-bootstrap";

export default function HomePage() {
  return (
    <Container style={{ marginTop: "5em" }}>
      <h1>Home page</h1>
      <h3>
        <a href={"/activities"}>Activities</a>
      </h3>
    </Container>
  );
}
