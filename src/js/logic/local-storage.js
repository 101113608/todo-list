import { ToJSONFriendlyString, FromParse } from "./parse-json.js";
import { PubSub } from "./pub-sub.js";

class ProjectsStorage {
    static {
        PubSub.subscribe({ eventName: "projectsInstantiated", callbackFn: this.load.bind(this) });
        PubSub.subscribe({ eventName: "projectsListUpdated", callbackFn: this.save.bind(this) });
    }

    static load() {
        const projectsAsJSON = localStorage.getItem("projects");
        let saveState = null;

        if (projectsAsJSON) {
            console.log("Projects found. Loading from storage.")
            const projectsAsParse = JSON.parse(projectsAsJSON);
            saveState = FromParse.convertToProjectsList(projectsAsParse);
        } else {
            console.log("No projects were found. Creating a new one.");
        }

        PubSub.publish({ eventName: "projectsLoaded", data: saveState });
        return saveState;
    }

    static save(projectsList) {
        if (!Array.isArray(projectsList)) {
            console.error(`Projects was not saved: Value passed was not an array.`);
            return;
        }

        const projectsAsString = ToJSONFriendlyString.convertFromProjectsList(projectsList);
        const projectsAsJSON = JSON.stringify(projectsAsString);

        localStorage.setItem("projects", projectsAsJSON);
    }
}

export { ProjectsStorage };