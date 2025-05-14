import { ToJSONFriendlyString, FromParse } from "./convert.js";

class ProjectsStorage {
    static load() {
        const projectsAsJSON = localStorage.getItem("projects");
        if (projectsAsJSON) {
            console.log("Projects found. Loading from storage.")
            const projectsAsParse = JSON.parse(projectsAsJSON);
            return FromParse.convertToProjectsList(projectsAsParse);
        }
        console.log("No projects were found.")
        return null;
    }

    static save(projectsList) {
        if (Array.isArray(projectsList)) {
            const projectsAsString = ToJSONFriendlyString.convertFromProjectsList(projectsList);
            const projectsAsJSON = JSON.stringify(projectsAsString);
            localStorage.setItem("projects", projectsAsJSON);
            console.log("Projects saved locally.");
        } else {
            console.error(`Projects was not saved: Value passed was not an array.`);
        }

    }
}

export { ProjectsStorage };