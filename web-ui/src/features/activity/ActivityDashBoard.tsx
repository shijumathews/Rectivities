import { observer } from "mobx-react-lite";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import { Activity } from "../../app/models/activity";
import { useStore } from "../../app/stores/store";
import ActivityForm from "../Activities/form/ActivityForm";
import ActivityDetais from "../details/AtivityDetails";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];

  SaveActivity: (activity: Activity) => void;
  DeleteActivity: (activity: Activity) => void;
  submitting: boolean;
  deleting: boolean;
  deletingId: string | undefined;
}

export default observer(function ActiviDashBoard({
  activities,
  SaveActivity,
  DeleteActivity,
  submitting,
  deleting,
  deletingId,
}: Props) {
  const { activityStore } = useStore();
  const { selectActivity, editMode } = activityStore;

  return (
    <Container>
      <Row>
        <Col md={8}>
          <ActivityList
            activities={activities}
            DeleteActivity={DeleteActivity}
            deleting={deleting}
            deletingId={deletingId}
          ></ActivityList>
        </Col>
        <Col md={4}>
          {selectActivity && !editMode && <ActivityDetais></ActivityDetais>}
          <>
            {editMode && (
              <ActivityForm
                SaveActivity={SaveActivity}
                submitting={submitting}
              ></ActivityForm>
            )}
          </>
        </Col>
      </Row>
    </Container>
  );
});
