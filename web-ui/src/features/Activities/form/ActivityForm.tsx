import React, { ChangeEvent, useState } from "react";

import { Button, Card, Form } from "react-bootstrap";
import { Activity } from "../../../app/models/activity";

interface Props {
  activity: Activity | undefined;
  CloseEdit: () => void;
  SaveActivity: (activity: Activity) => void;
  submitting: boolean;
}

export default function ActivityForm({
  activity: selectedActivity,
  CloseEdit,
  SaveActivity,
  submitting,
}: Props) {
  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    date: "",
    description: "",
    category: "",
    city: "",
    venue: "",
  };

  const [activity, setActivity] = useState(initialState);

  function HandleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    //console.log(activity);
    SaveActivity(activity);
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
          <Button variant="primary" type="submit">
            Submit
          </Button>
          &nbsp;
          <Button variant="secondary" type="button" onClick={CloseEdit}>
            Cancel
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
