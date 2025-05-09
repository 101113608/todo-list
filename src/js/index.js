import "../styles.css";
import { Projects, createProject, createTodo } from "./logic/projects";
import { createSidebarProjectsList } from "./interface/sidebar/sidebar-projects-list";

(function() {
    // DOM elements
    const body = document.querySelector("body");
    const main = document.querySelector("main");
    const sidebar = document.querySelector("aside");
    const sidebarProjectsList = document.querySelector("[data-projects-list]");

    // Data/Objects
    const projects = new Projects();
    const projectTracker = {
        index: 0,
        getProject: () => {
            return projects.getProjectViaIndex(projectTracker.index)
        },
    }

    function renderSidebarMain(projectsList) {
        if (projectsList) {
            const projectsListElement = createSidebarProjectsList(projectsList);

            sidebarProjectsList.textContent = "";
            sidebarProjectsList.append(projectsListElement);
        }
    }

    function highlightProjectElement(sidebarElement, projectIndex) {
        const ul = Array
            .from(sidebarElement.firstElementChild.childNodes)
            .filter(element => element.nodeName.toLowerCase() === "li");

        const selectedProject = sidebarElement.querySelector(`[data-project-index="${projectIndex}"]`);

        for (let li of ul) {
            const button = li.querySelector("[data-project-index]");
            button.classList.remove("selected-project");
        }

        if (selectedProject) {
            selectedProject.classList.add("selected-project");
        } else {
            console.error(`Unable to retrieve selected project of index ${projectIndex}.`)
        }
    }

    sidebar.addEventListener("click", e => {
        if (e.target.hasAttribute("data-add-project-btn")) {
            openModal("Add Project", createProjectModal("Add"));
            return;
        }

        if (e.target.closest("[data-project-index]")) {
            projectTracker.index = e.target.closest("[data-project-index]").getAttribute("data-project-index");
            highlightProjectElement(sidebarProjectsList, projectTracker.index);

            return;
        }
    });

    projects.addProject(createProject("Hello World"));

    renderSidebarMain(projects.getProjectsList());
    highlightProjectElement(sidebarProjectsList, projectTracker.index);

})();