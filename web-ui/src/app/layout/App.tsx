import React, { Fragment, useEffect, useState } from "react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import { Container } from "semantic-ui-react";
import ActiviDashBoard from "../../features/activity/ActivityDashBoard";
import { v4 as uuid } from "uuid";
import agent from "../Agent/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [activities, setactivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectActivity] = useState<Activity | undefined>(
    undefined
  );
  const [EditMode, SetEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Acivities.list().then((response) => {
      let activities: Activity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        activities.push(activity);
      });
      setactivities(activities);
      setLoading(false);
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

  function handleCreateOrEditActivity(activity: Activity) {
    activity.id
      ? setactivities([
          ...activities.filter((x) => x.id === activity.id),
          activity,
        ])
      : setactivities([...activities, { ...activity, id: uuid() }]);
    SetEditMode(false);
    setSelectActivity(activity);
  }

  function handleDeleteActivity(activity: Activity) {
    setactivities([...activities.filter((x) => x.id != activity.id)]);
    SetEditMode(false);
    setSelectActivity(undefined);
  }

  if (loading)
    return <LoadingComponent content="Loading the app" inverted={false} />;

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
          SaveActivity={handleCreateOrEditActivity}
          DeleteActivity={handleDeleteActivity}
        ></ActiviDashBoard>
      </Container>
    </>
  );
}

export default App;
