import React from "react";
import { Button, Grid, Item, Label, List, Segment } from "semantic-ui-react";
import { isEmptyBindingElement } from "typescript";
import { Activity } from "../../app/models/activity";

interface Props {
  activities: Activity[];
}

export default function ActiviDashBoard({ activities }: Props) {
  return (
    <Segment>
      <Item.Group Divided>
        {activities.map((activity) => {
          return (
            <Item key={activity.id}>
              <Item.Content>
                <Item.Header as="a">{activity.title}</Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                  <div>{activity.description}</div>
                  <div>
                    {activity.city},{activity.venue}
                  </div>
                </Item.Description>

                <Item.Extra>
                  <Button content="View" color="blue" floated="right"></Button>
                  <Label basic content={activity.category}></Label>
                </Item.Extra>
              </Item.Content>
            </Item>
          );
        })}
      </Item.Group>
    </Segment>
  );
}
