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
  OpenEdit: (id: string | undefined) => void;
  CloseEdit: () => void;
  EditMode: boolean;
  SaveActivity: (activity: Activity) => void;
  DeleteActivity: (activity: Activity) => void;
}

export default function ActiviDashBoard({
  activities,
  selectedActivity,
  selectActivity,
  cancelActivity,
  EditMode,
  OpenEdit,
  CloseEdit,
  SaveActivity,
  DeleteActivity
}: Props) {
  return (
    <Container>
      <Row>
        <Col md={8}>
          <ActivityList
            activities={activities}
            selectActivity={selectActivity}
            DeleteActivity ={DeleteActivity}
          ></ActivityList>
        </Col>
        <Col md={4}>
          {selectedActivity && !EditMode && (
            <ActivityDetais
              activity={selectedActivity}
              cancelActivity={cancelActivity}
              OpenEdit={OpenEdit}
            ></ActivityDetais>
          )}
          <>
            {EditMode && (
              <ActivityForm
                activity={selectedActivity}
                CloseEdit={CloseEdit}
                SaveActivity={SaveActivity}
              ></ActivityForm>
            )}
          </>
        </Col>
      </Row>
    </Container>
  );
}
