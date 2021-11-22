import React, { Fragment, useEffect, useState } from "react";

import axios from "axios";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import { Container, List } from "semantic-ui-react";
import ActiviDashBoard from "../../features/activity/ActivityDashBoard";

function App() {
  const [activities, setactivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectActivity] = useState<Activity | undefined>(
    undefined
  );
  const [EditMode, SetEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/Activities")
      .then((response) => {
        setactivities(response.data);
      });
  }, []);

  function handleSetSelectActivity(id: string) {
    setSelectActivity(activities.find((x) => x.id === id));
    SetEditMode(false);
  }

  function handleCancelededActivity() {
    setSelectActivity(undefined);
    SetEditMode(false);

    console.log(selectedActivity);
  }

  function handleOpenEdit(id: string | undefined) {
    id ? handleSetSelectActivity(id) : handleCancelededActivity();
    SetEditMode(true);
  }

  function handleCloseEdit() {
    SetEditMode(false);
  }

  return (
    <>
      <NavBar OpenEdit={handleOpenEdit} />
      <Container style={{ marginTop: "5em" }}>
        <ActiviDashBoard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSetSelectActivity}
          cancelActivity={handleCancelededActivity}
          OpenEdit={handleOpenEdit}
          CloseEdit={handleCloseEdit}
          EditMode={EditMode}
        ></ActiviDashBoard>
      </Container>
    </>
  );
}

export default App;
