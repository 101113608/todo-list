import "../styles.css";

import { Projects } from "./logic/projects";
import { ProjectsListComponent } from "./interface/sidebar/projects-list-component";
import { MainContentComponent } from "./interface/main/main-content-component";
import { MainHeadingComponent } from "./interface/main/main-heading-component";
import { PubSub } from "./logic/pub-sub";
import { ProjectTracker } from "./logic/project-tracker";
import { ModalComponent } from "./interface/modal/modal-component";

// Not explicitly read in index.js but used in other components
import { FormDataProcessor } from "./logic/form-data-processor";
import { ProjectsStorage } from "./logic/local-storage";

(function () {
    const body = document.querySelector("body");
    const main = document.querySelector("main");
    const sidebarMain = document.querySelector("[data-projects-list]");

    const projects = new Projects();
    const projectTracker = ProjectTracker(projects);
    let currentProject = projectTracker.getProject();

    const projectsListComponent = ProjectsListComponent(
        {
            projectsListArg: projects.getProjectsList(),
            containerArg: sidebarMain,
            projectIndexArg: projectTracker.getIndex(),
        }
    );

    const mainHeadingComponent = MainHeadingComponent(
        {
            projectArg: currentProject,
            containerArg: main
        }
    );

    const mainContentComponent = MainContentComponent(
        {
            projectArg: currentProject,
            containerArg: main
        }
    );

    const modalComponent = ModalComponent(body);

    body.addEventListener("click", e => {
        if (e.target.hasAttribute("data-add-project-btn")) {
            PubSub.publish({ eventName: "newProjBtnClicked" });
            return;
        }
    });
})();