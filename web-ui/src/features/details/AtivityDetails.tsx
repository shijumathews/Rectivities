import React from "react";
import { Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
import { Activity } from "../../app/models/activity";

interface Props {
  activity: Activity;
  cancelActivity(): void;

  OpenEdit(id: string): void;
}

export default function ActivityDetais({
  activity,
  cancelActivity,
  OpenEdit,
}: Props) {
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
          <Button variant="secondary" onClick={() => cancelActivity()}>
            Cancel
          </Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
}
