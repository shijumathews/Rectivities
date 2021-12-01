import { observer } from "mobx-react-lite";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useStore } from "../../app/stores/store";
import ActivityForm from "../Activities/form/ActivityForm";
import ActivityDetais from "../details/AtivityDetails";
import ActivityList from "./ActivityList";

export default observer(function ActiviDashBoard() {
  const { activityStore } = useStore();
  const { selectActivity, editMode } = activityStore;

  return (
    <Container>
      <Row>
        <Col md={8}>
          <ActivityList></ActivityList>
        </Col>
        <Col md={4}>
          {selectActivity && !editMode && <ActivityDetais></ActivityDetais>}
          <>{editMode && <ActivityForm></ActivityForm>}</>
        </Col>
      </Row>
    </Container>
  );
});
