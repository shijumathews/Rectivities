import React, { Fragment, useEffect } from "react";
import NavBar from "./NavBar";
import { Container } from "semantic-ui-react";
import ActiviDashBoard from "../../features/activity/ActivityDashBoard";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStore();
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.initialLoading)
    return <LoadingComponent content="Loading the app" inverted={false} />;

  return (
    <>
      <NavBar />

      <Container style={{ marginTop: "5em" }}>
        <ActiviDashBoard></ActiviDashBoard>
      </Container>
    </>
  );
}

export default observer(App);
