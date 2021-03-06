import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const history = useHistory();

  const {
    CreateActivity,
    UpdateActivity,
    LoadActivity,
    initialLoading,
    setInitialLoading,
    EmptyActivity,
    loading,
  } = activityStore;

  const [activity, setActivity] = useState(EmptyActivity);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      LoadActivity(id).then((activity) => setActivity(activity!));
    } else {
      setInitialLoading(false);
    }
  }, [id, LoadActivity, setInitialLoading]);

  if (initialLoading) {
    return <LoadingComponent />;
  }

  function HandleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    console.log(activity);
    if (activity.id) {
      UpdateActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    } else {
      console.log(initialLoading);
      let newActivity = { ...activity, id: uuid() };
      CreateActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    }
    event.preventDefault();
  }

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={onFormSubmit}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>
              <b>Title</b>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a Title"
              value={activity?.title}
              name="title"
              onChange={HandleChange}
            />
            <Form.Text className="text-muted">
              Fancy Title is not allowed.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>
              <b>Description</b>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={activity?.description}
              name="description"
              onChange={HandleChange}
            />
            <Form.Text className="text-muted">
              Detail Description expected.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>
              <b>Category</b>
            </Form.Label>
            <Form.Control
              type="text"
              value={activity?.category}
              name="category"
              onChange={HandleChange}
            />
            <Form.Text className="text-muted">
              Category Description expected.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="date">
            <Form.Label>
              <b>Date</b>
            </Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter a Date"
              value={activity?.date}
              name="date"
              onChange={HandleChange}
            />
            <Form.Text className="text-muted">
              Fancy Title is not allowed.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>
              {" "}
              <b>City</b>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a City"
              value={activity?.city}
              name="city"
              onChange={HandleChange}
            />
            <Form.Text className="text-muted">
              Fancy Title is not allowed.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="venue">
            <Form.Label>
              <b>Venue</b>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a Venue"
              value={activity?.venue}
              name="venue"
              onChange={HandleChange}
            />
            <Form.Text className="text-muted">
              Fancy Title is not allowed.
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading && "Saving"} {!loading && "Submit"}&nbsp;
            {loading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </Button>
          &nbsp;
          <Button
            variant="secondary"
            type="button"
            href={`/activities/${activity.id}`}
          >
            Cancel
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
});
