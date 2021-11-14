import React from "react";
import { Button, Card, Form } from "react-bootstrap";

interface Props {}

export default function ActivityForm() {
  return (
    <Card>
      <Card.Body>
        <Card.Text>
          <Form>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>
                <b>Title</b>
              </Form.Label>
              <Form.Control type="text" placeholder="Enter a Title" />
              <Form.Text className="text-muted">
                Fancy Title is not allowed.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>
                <b>Description</b>
              </Form.Label>
              <Form.Control as="textarea" rows={3} />
              <Form.Text className="text-muted">
                Detail Description expected.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="date">
              <Form.Label>
                <b>Date</b>
              </Form.Label>
              <Form.Control type="date" placeholder="Enter a Date" />
              <Form.Text className="text-muted">
                Fancy Title is not allowed.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="city">
              <Form.Label>
                {" "}
                <b>City</b>
              </Form.Label>
              <Form.Control type="text" placeholder="Enter a City" />
              <Form.Text className="text-muted">
                Fancy Title is not allowed.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="venue">
              <Form.Label>
                <b>Venue</b>
              </Form.Label>
              <Form.Control type="text" placeholder="Enter a Venue" />
              <Form.Text className="text-muted">
                Fancy Title is not allowed.
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
