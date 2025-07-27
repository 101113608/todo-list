import { PubSub } from "../../logic/pub-sub";
import { createSidebarProjectsList } from "./projects-list-dom";

export const ProjectsListComponent = (({ projectsListArg, projectIndexArg = 0, containerArg }) => {
    const container = containerArg;
    let projectsList = projectsListArg;
    let projectIndex = projectIndexArg;
    let sidebarProjectsList = null;

    const render = (projectsList) => {
        sidebarProjectsList = createSidebarProjectsList(projectsList);
        container.append(sidebarProjectsList);
        highlightProjectElement(sidebarProjectsList, projectIndex);
        bindEvents();
    }

    const bindEvents = () => {
        sidebarProjectsList.addEventListener('click', e => {
            if (e.target.closest("[data-project-index]")) {
                projectIndex = e.target.closest("[data-project-index]").getAttribute("data-project-index");
                highlightProjectElement(sidebarProjectsList, projectIndex);
                PubSub.publish({ eventName: "projectIndexUpdated", data: projectIndex });
            }
        });
    }

    const remove = () => {
        if (sidebarProjectsList && container.contains(container.querySelector("[data-sidebar-projects-list]"))) {
            container.removeChild(sidebarProjectsList);
        }
    }

    const update = (projectsListArg) => {
        projectsList = projectsListArg;
        remove();
        render(projectsList);
    }

    const projectDeleted = (projectsListArg) => {
        if ((projectIndex > 0)) {
            projectIndex -= 1;
        }
        update(projectsListArg);
    }

    const subscribeEvents = () => {
        PubSub.subscribe({ eventName: "projectsListUpdated", callbackFn: update });
        PubSub.subscribe({ eventName: "projectDeleted", callbackFn: projectDeleted });
    }

    render(projectsList);
    subscribeEvents();

    return {
        render
    }
});

// Event-related functions

function highlightProjectElement(sidebarElement, projectIndex) {
    const ul = Array
        .from(sidebarElement.childNodes)
        .filter(element => element.nodeName.toLowerCase() === "li");

    const selectedProject = sidebarElement.querySelector(`[data-project-index="${projectIndex}"]`);

    for (let li of ul) {
        const button = li.querySelector("[data-project-index]");
        button.classList.remove("selected-project");
    }

    if (!selectedProject) {
        console.info(`Unable to select a project with the given index.`);
        return;
    }

    selectedProject.classList.add("selected-project");
    return;
}
