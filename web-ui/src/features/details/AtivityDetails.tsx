import React, { useEffect } from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";

export default observer(function ActivityDetais() {
  const { activityStore } = useStore();
  const { selectActivity: activity, LoadActivity } = activityStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      LoadActivity(id);
    }
  }, [id, LoadActivity]);

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
          <Button variant="primary" color="blue">
            Edit
          </Button>{" "}
          &nbsp;
          <Button variant="secondary">Cancel</Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
});
