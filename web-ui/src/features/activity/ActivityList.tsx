import React from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { isEmptyBindingElement } from "typescript";
import { Activity } from "../../app/models/activity";

interface Props {
  activities: Activity[];
  selectActivity(id: string): void;
}

export default function ActiviDashBoard({ activities, selectActivity }: Props) {
  return (
    <ListGroup>
      {activities.map((activity) => {
        return (
          <ListGroup.Item key={activity.id}>
            <Card>
              <Card.Body>
                <Card.Title as="a">
                  {activity.title} on {activity.date}
                </Card.Title>
                <Card.Text>
                  {activity.description}
                  {activity.city},{activity.venue}
                </Card.Text>
                <Row>
                  <Col className="float-begin">
                    <Button variant="outline-dark">{activity.category}</Button>
                  </Col>
                  <Col>
                    <Button
                      variant="primary"
                      className="float-end"
                      onClick={() => selectActivity(activity.id)}
                    >
                      View
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}
