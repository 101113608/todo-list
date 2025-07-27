import { PubSub } from "../../logic/pub-sub";
import { createMainHeading } from "./main-heading-dom";

export function MainHeadingComponent({ projectArg, containerArg }) {
    const container = containerArg;
    let project = projectArg;
    let mainHeading = null;

    const render = (projectArg = null) => {
        project = projectArg;
        let oldMainHeading = container.querySelector("[data-main-heading]");

        if (project) {
            mainHeading = createMainHeading(project.getTitle());
            bindEvents();

            if (container.contains(oldMainHeading)) {
                container.replaceChild(mainHeading, oldMainHeading);
                return;
            }

            container.append(mainHeading);
            return;
        }

        if (!oldMainHeading) {
            mainHeading = createMainHeading();
            container.append(mainHeading);
            return;
        }

        oldMainHeading.textContent = "";
        return;
    }

    const bindEvents = () => {
        mainHeading.addEventListener('click', e => {
            if (e.target.closest("[data-project-actions]") && e.target.closest("button")) {
                if (e.target.closest("button").hasAttribute("data-edit-project-btn")) {
                    PubSub.publish({ eventName: "editProjBtnClicked", data: project });
                    return;
                }

                if (e.target.closest("button").hasAttribute("data-delete-project-btn")) {
                    PubSub.publish({ eventName: "deleteProjBtnClicked", data: project });
                    return;
                }
            }

            if (e.target.closest("[data-todo-list-actions]") && e.target.closest("button")) {
                if (e.target.closest("button").hasAttribute("data-add-todo-button")) {
                    PubSub.publish({ eventName: "newTodoBtnClicked", data: project });
                    return;
                }

                if (e.target.closest("button").hasAttribute("data-clear-checked-button")) {
                    PubSub.publish({ eventName: "clearCheckedBtnClicked", data: project.getTitle() });
                    return;
                }
            }
        });
    }

    const subscribeEvents = () => {
        PubSub.subscribe({ eventName: "projectTrackerUpdated", callbackFn: render });
        PubSub.subscribe({ eventName: "currentProjectUpdated", callbackFn: render });
    }

    render(project ? project : null);
    subscribeEvents();

    return {
        render
    }
}