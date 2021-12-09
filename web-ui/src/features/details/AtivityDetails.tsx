import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";

export default observer(function ActivityDetais() {
  const { activityStore } = useStore();
  const { EmptyActivity, LoadActivity } = activityStore;
  const { id } = useParams<{ id: string }>();

  const [activity, setActivity] = useState(() => EmptyActivity);

  useEffect(() => {
    if (id) {
      LoadActivity(id).then((activity) => setActivity(activity!));
    }
  }, [id, LoadActivity]);

  if (!activity.id) {
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
            href={`/manage/${activity.id}`}
          >
            Edit
          </Button>{" "}
          &nbsp;
          <Button variant="secondary" href={`/activities/`}>
            Cancel
          </Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
});
