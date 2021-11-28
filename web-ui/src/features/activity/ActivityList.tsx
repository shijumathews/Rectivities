import React from "react";
import { Button, Card, Col, ListGroup, Row, Spinner } from "react-bootstrap";
import { Activity } from "../../app/models/activity";
import { useStore } from "../../app/stores/store";

interface Props {
  activities: Activity[];
  DeleteActivity: (activity: Activity) => void;
  deleting: boolean;
  deletingId: string | undefined;
}

export default function ActiviDashBoard({
  activities,
  DeleteActivity,
  deletingId,
  deleting,
}: Props) {
  const { activityStore } = useStore();
  const { SetSelectActivity } = activityStore;

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
                        {deleting && deletingId === activity.id && (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        )}
                        &nbsp; Delete
                      </Button>
                      &nbsp;
                      <Button
                        variant="primary"
                        onClick={() => SetSelectActivity(activity.id)}
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
