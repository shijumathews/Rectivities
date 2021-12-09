import React, { Fragment } from "react";
import NavBar from "./NavBar";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Route } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityDashBoard from "../../features/activity/ActivityDashBoard";
import ActivityForm from "../../features/Activities/form/ActivityForm";
import ActivityDetais from "../../features/details/AtivityDetails";

function App() {
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "5em" }}>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/activities" component={ActivityDashBoard} />
        <Route exact path="/activities/:id" component={ActivityDetais} />
        <Route
          exact
          path={["/manage/:id", "/createactivity"]}
          component={ActivityForm}
        />
      </Container>
    </>
  );
}

export default observer(App);
