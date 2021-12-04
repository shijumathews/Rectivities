import React, { SyntheticEvent, useState } from "react";
import { Button, Card, Col, ListGroup, Row, Spinner } from "react-bootstrap";
import { useStore } from "../../app/stores/store";

export default function ActiviDashBoard() {
  const { activityStore } = useStore();
  const { GetActivityBydate, SetSelectActivity, DeleteActivity, loading } =
    activityStore;
  const [target, setTarget] = useState("");

  function handleActivityDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    DeleteActivity(id);
  }

  return (
    <ListGroup>
      {GetActivityBydate.map((activity) => {
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
                        onClick={(e) => handleActivityDelete(e, activity.id)}
                        name={activity.id}
                      >
                        {loading && target === activity.id && (
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
