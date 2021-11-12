import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export default function NavBar() {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="Logo"
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Reactivities"></Menu.Item>
        <Menu.Item>
          <Button content="Create Activity" positive></Button>
        </Menu.Item>
        <Menu.Item name="Contact Us"></Menu.Item>
        <Menu.Item name="About"></Menu.Item>
        <Menu.Item name="Feed Back"></Menu.Item>
        <Menu.Item name="News"></Menu.Item>
      </Container>
    </Menu>
  );
}
