import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";



export default class ActivityStore {

    //  title = "Hello from Mobx!";




    activityRegistry = new Map<string, Activity>();

    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;



    constructor() {
        makeAutoObservable(this);

    }

    get activitiesByDate() {

        return Array.from(this.activityRegistry.values())
            .sort((a, b) =>
                Date.parse(a.date) - Date.parse(b.date));
    }


    loadActivities = async () => {

        this.loadingInitial = true;

        try {


            const activities = await agent.Activities.list();


            activities.forEach(activity => {
                this.setActivity(activity);
            })


            this.setLoadingInitial(false);







        }

        catch (error) {

            console.log(error);
            this.setLoadingInitial(false);

        }


    }

    setLoadingInitial = (state: boolean) => {

        this.loadingInitial = state;
    }


    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {

            this.selectedActivity = activity;
            return activity;
        }

        else {
            this.loadingInitial = true;

            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);

                runInAction(() => {
                    this.selectedActivity = activity;


                });
                this.setLoadingInitial(false);

                return activity;

            }
            catch (error) {

                console.log(error);
                this.setLoadingInitial(false);

            }
        }
    }

    private setActivity = (activity: Activity) => {

        console.log("Activity  : " + activity)
        console.log("activity date: " + activity.date);
        activity.date = activity.date.split('T')[0];

        this.activityRegistry.set(activity.id, activity);
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    //  Get Selected Activity


    // CRUD Operations

    createActivity = async (activity: Activity) => {

        this.loading = true;



        try {
            await agent.Activities.create(activity);

            runInAction(() => {
                this.activityRegistry.set(activity.id, activity)

                this.selectedActivity = activity;

                this.editMode = false;


                this.loading = false;

            })

        }
        catch (error) {

            runInAction(() => {
                this.loading = false;

            })
            console.log(error);
        }
    }



    updateActivity = async (activity: Activity) => {

        this.loading = true;



        try {
            await agent.Activities.update(activity);

            runInAction(() => {

                this.activityRegistry.set(activity.id, activity);

                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;

            })

        }
        catch (error) {

            runInAction(() => {
                this.loading = false;

            })
            console.log(error);
        }



    }



    deleteActivity = async (id: string) => {

        this.loading = true;



        try {
            await agent.Activities.delete(id);

            runInAction(() => {

                this.activityRegistry.delete(id);




                this.loading = false;

            })

        }
        catch (error) {

            runInAction(() => {
                this.loading = false;

            })
            console.log(error);
        }
    }



















}

