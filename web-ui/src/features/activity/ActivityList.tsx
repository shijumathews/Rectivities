import React from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Activity } from "../../app/models/activity";

interface Props {
  activities: Activity[];
  selectActivity(id: string): void;
  DeleteActivity: (activity: Activity) => void;
}

export default function ActiviDashBoard({
  activities,
  selectActivity,
  DeleteActivity,
}: Props) {
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
                  <Col>
                    <Button variant="outline-dark">{activity.category}</Button>
                  </Col>
                  <Col>
                    <div className="float-end">
                      <Button
                        variant="danger"
                        onClick={() => DeleteActivity(activity)}
                      >
                        Delete
                      </Button>
                      &nbsp;
                      <Button
                        variant="primary"
                        onClick={() => selectActivity(activity.id)}
                      >
                        View
                      </Button>
                    </div>
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
