import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import { Activity } from "../../app/models/activity";
import ActivityForm from "../Activities/form/ActivityForm";
import ActivityDetais from "../details/AtivityDetails";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelActivity: () => void;
}

export default function ActiviDashBoard({
  activities,
  selectedActivity,
  selectActivity,
  cancelActivity,
}: Props) {
  return (
    <Container>
      <Row>
        <Col md={8}>
          <ActivityList
            activities={activities}
            selectActivity={selectActivity}
          ></ActivityList>
        </Col>
        <Col md={4}>
          {selectedActivity && (
            <ActivityDetais
              activity={selectedActivity}
              cancelActivity={cancelActivity}
            ></ActivityDetais>
          )}
          <>
            <ActivityForm></ActivityForm>
          </>
        </Col>
      </Row>
    </Container>
  );
}
