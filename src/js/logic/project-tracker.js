import { PubSub } from "./pub-sub";

export function ProjectTracker(projectsArg) {
    const projects = projectsArg;
    let index = 0;
    const setIndex = (newIndex) => {
        if (newIndex < 0 || newIndex > projects.getProjectsList().length) {
            throw new Error("Unable to set index: value given is not valid.")
        }

        index = newIndex;
        PubSub.publish({ eventName: "projectTrackerUpdated", data: getProject() });
    }

    const getProject = () => {
        if (projects.getProjectsList().length !== 0) {
            return projects.getProjectViaIndex(index);
        }

        console.info("Project's list is currently empty.");
        return null;
    }

    const getIndex = () => {
        return index;
    }

    const reindexTracker = () => {
        index = index > 0 ? index - 1 : 0;
        PubSub.publish({ eventName: "projectTrackerUpdated", data: getProject() });
    }

    const subscribeEvents = () => {
        PubSub.subscribe({ eventName: "projectIndexUpdated", callbackFn: setIndex });
        PubSub.subscribe({ eventName: "projectDeleted", callbackFn: reindexTracker })
    }

    subscribeEvents();

    return {
        setIndex,
        getIndex,
        getProject,
    }
}