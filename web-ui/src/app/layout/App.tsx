import React, { Fragment, useEffect, useState } from "react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import { Container } from "semantic-ui-react";
import ActiviDashBoard from "../../features/activity/ActivityDashBoard";
import { v4 as uuid } from "uuid";
import agent from "../Agent/agent";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStore();

  const [activities, setactivities] = useState<Activity[]>([]);

  const [submitting, setSubmitting] = useState(false);
  const [selectedActivity, setSelectActivity] = useState<Activity | undefined>(
    undefined
  );
  const [deleting, setDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | undefined>(undefined);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

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
          activityStore.editMode = false;
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
          activityStore.editMode = false;
        });
    }
  }

  function handleDeleteActivity(activity: Activity) {
    setDeleting(true);
    if (activity.id) {
      setDeletingId(activity.id);
      agent.Acivities.delete(activity.id).then(() => {
        setactivities([...activities.filter((x) => x.id !== activity.id)]);
        activityStore.editMode = false;
        setSelectActivity(undefined);
        setDeleting(false);
        setDeletingId(undefined);
      });
    }
  }

  if (activityStore.initialLoading)
    return <LoadingComponent content="Loading the app" inverted={false} />;

  return (
    <>
      <NavBar />

      <Container style={{ marginTop: "5em" }}>
        <ActiviDashBoard
          activities={activityStore.activities}
          SaveActivity={handleCreateOrEditActivity}
          DeleteActivity={handleDeleteActivity}
          submitting={submitting}
          deleting={deleting}
          deletingId={deletingId}
        ></ActiviDashBoard>
      </Container>
    </>
  );
}

export default observer(App);
