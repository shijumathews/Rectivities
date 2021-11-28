import { makeAutoObservable } from "mobx";
import agent from "../Agent/agent";
import { Activity } from "../models/activity";

export default class ActivityStore {
  activities: Activity[] = [];
  selectActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  initialLoading = false;

  constructor() {
    makeAutoObservable(this, {});
  }

  loadActivities = async () => {
    this.setInitialLoading(true);
    try {
      const activities = await agent.Acivities.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        this.activities.push(activity);
      });
      this.setInitialLoading(false);
    } catch (error) {
      console.log(error);
      this.setInitialLoading(false);
    }
  };

  setInitialLoading = (state: boolean) => {
    this.initialLoading = state;
  };

  SetSelectActivity = (id: string) => {
    this.selectActivity = this.activities.find((a) => a.id === id);
    this.editMode = false;
  };

  CancelededActivity = () => {
    this.selectActivity = undefined;
  };

  OpenEdit = (id?: string) => {
    id ? this.SetSelectActivity(id) : this.CancelededActivity();
    this.editMode = true;
  };

  CloseEdit = () => {
    this.editMode = false;
  };
}
