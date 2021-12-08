import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import ActivityList from "./ActivityList";

export default observer(function ActiviDashBoard() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.initialLoading)
    return <LoadingComponent content="Loading the app" inverted={false} />;

  return (
    <Container>
      <Row>
        <Col md={8}>
          <ActivityList></ActivityList>
        </Col>
        <Col md={4}>
          <h2> Activity Filters...</h2>
        </Col>
      </Row>
    </Container>
  );
});
