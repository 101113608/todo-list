import { createConfirmModal } from "./confirm-modal-dom";
import { createProjectModal } from "./project-modal-dom";
import { createTodoModal } from "./todo-modal-dom";
import { PubSub } from "../../logic/pub-sub";
import { Extract } from "../../logic/utility";

export function ModalComponent(container = document.querySelector("body")) {
    let currentProject = null;
    let currentTodo = null;

    let modal = {
        type: "",
        element: null,
        set({ type, element }) {
            if (modal.element) {
                container.removeChild(modal.element);
            }
            this.type = type;
            this.element = element;
        },
        reset() {
            this.type = "";
            this.element = null;
        },
        isEmpty() {
            return (this.type === "" && this.element === null);
        }
    };

    const render = ({ modalType, project = null, todo = null }) => {
        currentProject = project;
        currentTodo = todo;

        switch (modalType) {
            case "addProject":
                modal.set(
                    {
                        type: modalType,
                        element: createProjectModal({ actionType: "add" })
                    }
                );
                break;
            case "editProject":
                modal.set(
                    {
                        type: modalType,
                        element: createProjectModal({ actionType: "edit", currentProject })
                    }
                );
                break;
            case "deleteProject":
                modal.set(
                    {
                        type: modalType,
                        element: createConfirmModal({ itemType: "project", itemName: currentProject.getTitle() })
                    }
                );
                break;
            case "addTodo":
                modal.set(
                    {
                        type: modalType,
                        element: createTodoModal({ actionType: "add" })
                    });
                break;
            case "editTodo":
                modal.set(
                    {
                        type: modalType,
                        element: createTodoModal({ actionType: "edit", currentTodo })
                    });
                break;
            case "deleteTodo":
                modal.set(
                    {
                        type: modalType,
                        element: createConfirmModal({ itemType: "todo", itemName: currentTodo.getTitle() })
                    });
                break;
        }

        bindEvents();
        container.append(modal.element);
        modal.element.showModal();
    }

    const addProject = () => {
        render({ modalType: "addProject" });
    }

    const editProject = (project) => {
        render({ modalType: "editProject", project });
    }

    const deleteProject = (project) => {
        render({ modalType: "deleteProject", project });
    }

    const addTodo = (project) => {
        render({ modalType: "addTodo", project });
    }

    const editTodo = ({ todo, project }) => {
        render({ modalType: "editTodo", todo, project })
    }

    const deleteTodo = ({ todo, project }) => {
        render({ modalType: "deleteTodo", todo, project })
    }

    const bindEvents = () => {
        ["reset", "cancel"].forEach(eventListener => {
            modal.element.addEventListener(eventListener, e => remove());
        });

        modal.element.addEventListener("keydown", e => {
            if (e.key === "Escape" && modal.element !== null) {
                remove();
                return;
            }
        });

        modal.element.addEventListener("submit", e => {
            if (!modal.isEmpty()) {
                const formData = Extract.formValues(e.target);

                switch (modal.type) {
                    case "addProject":
                        PubSub.publish({ eventName: "newProjectSubmitted", data: formData });
                        break;
                    case "addTodo":
                        PubSub.publish({ eventName: "newTodoSubmitted", data: { currentProject, formData } });
                        break;
                    case "editProject":
                        PubSub.publish({ eventName: "editedProjectSubmitted", data: { currentProject, formData } })
                        break;
                    case "editTodo":
                        PubSub.publish({ eventName: "editedTodoSubmitted", data: { currentProject, formData } });
                        break;
                    case "deleteProject":
                        PubSub.publish({ eventName: "deleteProjectSubmitted", data: formData });
                        break;
                    case "deleteTodo":
                        PubSub.publish({ eventName: "deleteTodoSubmitted", data: { currentProject, formData } });
                        break;
                    default:
                        console.error("Provided modal type does not exist");
                }

                remove(modal);
                resetCurrentItems();
                return;
            }
        });
    }

    const subscribeEvents = () => {
        PubSub.subscribe({ eventName: "newProjBtnClicked", callbackFn: addProject });
        PubSub.subscribe({ eventName: "projectFormValuesSetup", callbackFn: editProject });
        PubSub.subscribe({ eventName: "deleteProjBtnClicked", callbackFn: deleteProject });
        PubSub.subscribe({ eventName: "newTodoBtnClicked", callbackFn: addTodo });
        PubSub.subscribe({ eventName: "todoFormValuesSetup", callbackFn: editTodo });
        PubSub.subscribe({ eventName: "deleteTodoBtnClicked", callbackFn: deleteTodo });
    }

    const resetCurrentItems = () => {
        currentProject = null;
        currentTodo = null;
    }

    const remove = () => {
        resetCurrentItems();

        if (container.contains(modal.element)) {
            container.removeChild(modal.element);
            modal.reset();
        }
    }

    subscribeEvents();

    return {
        render,
        remove
    }
}