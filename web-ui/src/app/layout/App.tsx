import React, { Fragment, useEffect, useState } from "react";

import axios from "axios";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import { Container, List } from "semantic-ui-react";
import ActiviDashBoard from "../../features/activity/ActivityDashBoard";

function App() {
  const [activities, setactivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/Activities")
      .then((response) => {
        setactivities(response.data);
      });
  }, []);

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "5em" }}>
        <ActiviDashBoard activities ={activities}></ActiviDashBoard>
      </Container>
    </>
  );
}

export default App;
