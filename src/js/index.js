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

    function renderSidebarMain(projectsList) {
        if (projectsList) {
            const projectsListElement = createSidebarProjectsList(projectsList);

            sidebarProjectsList.textContent = "";
            sidebarProjectsList.append(projectsListElement);
        }
    }

    renderSidebarMain(projects.getProjectsList());
})();