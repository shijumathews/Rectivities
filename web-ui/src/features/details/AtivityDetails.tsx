import React from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";

export default function ActivityDetais() {
  const { activityStore } = useStore();
  const {
    OpenEdit,
    CancelededActivity,
    selectActivity: activity,
  } = activityStore;

  if (!activity) {
    return <LoadingComponent />;
  }

  return (
    <Card>
      <Card.Header>
        <Card.Img
          variant="top"
          src={`/assets/categoryImages/${activity.category}.jpg`}
        />
      </Card.Header>
      <Card.Body>
        <Card.Title as="a">
          {activity.title} on {activity.date}
        </Card.Title>
        <Card.Text>
          {activity.description}
          {activity.city},{activity.venue}
        </Card.Text>

        <ButtonGroup aria-label="Basic example" className="float-end">
          <Button
            variant="primary"
            color="blue"
            onClick={() => OpenEdit(activity.id)}
          >
            Edit
          </Button>{" "}
          &nbsp;
          <Button variant="secondary" onClick={() => CancelededActivity()}>
            Cancel
          </Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
}
