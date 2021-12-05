import { makeAutoObservable, runInAction } from "mobx";
import agent from "../Agent/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
  ActivityRegistry = new Map<string, Activity>();
  selectActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  initialLoading = true;
  

  constructor() {
    makeAutoObservable(this, {});
  }

  get GetActivityBydate() {
    return Array.from(this.ActivityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(a.date)
    );
  }

  loadActivities = async () => {
    
    try {
      const activities = await agent.Acivities.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        this.ActivityRegistry.set(activity.id, activity);
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
    this.selectActivity = this.ActivityRegistry.get(id);
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
        this.ActivityRegistry.set(activity.id, activity);
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
        this.ActivityRegistry.set(activity.id, activity);

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
          this.ActivityRegistry.delete(id);

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
