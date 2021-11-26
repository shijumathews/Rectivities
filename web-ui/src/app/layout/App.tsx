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
  const [EditMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [selectedActivity, setSelectActivity] = useState<Activity | undefined>(
    undefined
  );

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
    setEditMode(false);
  }

  function handleCancelededActivity() {
    setSelectActivity(undefined);
    setEditMode(false);

    console.log(selectedActivity);
  }

  function handleOpenEdit(id: string | undefined) {
    id ? handleSetSelectActivity(id) : handleCancelededActivity();
    setEditMode(true);
  }

  function handleCloseEdit() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    console.log("begin...");
    setSubmitting(true);
    console.log(submitting);
    if (activity.id) {
      agent.Acivities.update(activity).then(() => {
        setactivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]);
      });
      setSelectActivity(activity);
      setSubmitting(false);
      setEditMode(false);
    } else {
      activity.id = uuid();
      agent.Acivities.create(activity).then(() => {
        setactivities([...activities, activity]);
      });
      setSelectActivity(activity);
      setSubmitting(false);
      //setEditMode(false);
    }
    console.log("end...");
  }

  function handleDeleteActivity(activity: Activity) {
    setactivities([...activities.filter((x) => x.id !== activity.id)]);
    setEditMode(false);
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
          submitting={submitting}
        ></ActiviDashBoard>
      </Container>
    </>
  );
}

export default App;
