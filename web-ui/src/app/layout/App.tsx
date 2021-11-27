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
  const [submitting, setSubmitting] = useState(false);
  const [selectedActivity, setSelectActivity] = useState<Activity | undefined>(
    undefined
  );
  const [deleting, setDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState<string|undefined>(undefined);

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
    console.log(submitting);
  }

  function handleCancelededActivity() {
    setSelectActivity(undefined);
    setEditMode(false);
  }

  function handleOpenEdit(id: string | undefined) {
    id ? handleSetSelectActivity(id) : handleCancelededActivity();
    setEditMode(true);
  }

  function handleCloseEdit() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    if (activity.id) {
      setSubmitting(true);
      agent.Acivities.update(activity)
        .then(() => {
          setactivities([
            ...activities.filter((x) => x.id !== activity.id),
            activity,
          ]);
        })
        .then(() => {
          setSelectActivity(activity);
          setSubmitting(false);
          setEditMode(false);
        });
    } else {
      setSubmitting(true);
      activity.id = uuid();
      agent.Acivities.create(activity)
        .then(() => {
          setactivities([...activities, activity]);
        })
        .then(() => {
          setSelectActivity(activity);
          setSubmitting(false);
          setEditMode(false);
        });
    }
  }

  function handleDeleteActivity(activity: Activity) {
    setDeleting(true);
    if (activity.id) {
      setDeletingId(activity.id);
      agent.Acivities.delete(activity.id).then(() => {
        setactivities([...activities.filter((x) => x.id !== activity.id)]);
        setEditMode(false);
        setSelectActivity(undefined);
        setDeleting(false);
        setDeletingId(undefined);
      });
    }
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
          deleting={deleting}
          deletingId ={deletingId}
        ></ActiviDashBoard>
      </Container>
    </>
  );
}

export default App;
