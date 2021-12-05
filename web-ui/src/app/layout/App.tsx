import React, { Fragment, useEffect } from "react";
import NavBar from "./NavBar";
import { Container } from "semantic-ui-react";

import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityDashBoard from "../../features/activity/ActivityDashBoard";
import ActivityForm from "../../features/Activities/form/ActivityForm";
import ActivityDetais from "../../features/details/AtivityDetails";

function App() {
  const { activityStore } = useStore();

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "5em" }}>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/activities" component={ActivityDashBoard} />
        <Route exact path="/activities/:id" component={ActivityDetais} />
        <Route exact path="/createActivity" component={ActivityForm} />
      </Container>
    </>
  );
}

export default observer(App);
