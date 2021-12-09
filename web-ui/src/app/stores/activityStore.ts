import { makeAutoObservable, runInAction } from "mobx";
import agent from "../Agent/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid";
import Moment from "moment";

export default class ActivityStore {
  ActivityRegistry = new Map<string, Activity>();
  // selectActivity: Activity | undefined = undefined;
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

  get EmptyActivity() {
    return {
      id: "",
      title: "",
      date: "",
      description: "",
      category: "",
      city: "",
      venue: "",
    };
  }

  loadActivities = async () => {
    try {
      const activities = await agent.Acivities.list();
      activities.forEach((activity) => {
        this.SetActivity(activity);
      });
      this.setInitialLoading(false);
    } catch (error) {
      console.log(error);
      this.setInitialLoading(false);
    }
  };

  LoadActivity = async (id: string) => {
    this.setInitialLoading(true);
    let activity: Activity | undefined = undefined;

    activity = await this.GetActivity(id);

    if (activity) {
      try {
        this.SetActivity(activity);
        this.setInitialLoading(false);
        this.SetActivity(activity);
        return activity;
      } catch (error) {
        console.log(error);
        this.setInitialLoading(false);
      }
    } else {
      activity = await agent.Acivities.details(id);
      this.SetActivity(activity);
      this.setInitialLoading(false);
      this.SetActivity(activity);
      return activity;
    }
  };

  private SetActivity = async (activity: Activity) => {
    activity.date = Moment(activity.date).format("YYYY-MM-DD");
    this.ActivityRegistry.set(activity.id, activity);
  };

  GetActivity = async (id: string) => {
    return this.ActivityRegistry.get(id);
  };

  setInitialLoading = async (state: boolean) => {
    this.initialLoading = state;
  };

  CreateActivity = async (activity: Activity) => {
    this.loading = true;
    activity.id = uuid();

    try {
      await agent.Acivities.create(activity);

      runInAction(() => {
        this.ActivityRegistry.set(activity.id, activity);
        this.SetActivity(activity);
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

        this.SetActivity(activity);
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

          this.loading = false;
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
