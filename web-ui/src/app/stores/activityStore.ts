import { makeAutoObservable, runInAction } from "mobx";
import agent from "../Agent/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid";

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

  setInitialLoading = async (state: boolean) => {
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

  CreateActivity = async (activity: Activity) => {
    this.loading = true;
    activity.id = uuid();

    try {
      await agent.Acivities.create(activity);

      runInAction(() => {
        this.activities.push(activity);
        this.selectActivity = activity;
        this.loading = false;
        this.editMode = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
        this.editMode = false;
      });
    }
  };

  UpdateActivity = async (activity: Activity) => {
    this.loading = true;

    try {
      await agent.Acivities.update(activity);

      runInAction(() => {
        this.activities = [
          ...this.activities.filter((a) => a.id !== activity.id),
          activity,
        ];

        this.selectActivity = activity;
        this.loading = false;
        this.editMode = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
        this.editMode = false;
      });
    }
  };

  DeleteActivity = async (id: string) => {
    this.loading = true;
    try {
      if (id) {
        await agent.Acivities.delete(id);
        runInAction(() => {
          this.activities = [...this.activities.filter((a) => a.id !== id)];

          this.selectActivity = undefined;
          this.loading = false;
          this.editMode = false;
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
        this.editMode = false;
      });
    }
  };
}
