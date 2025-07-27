import { PubSub } from "../../logic/pub-sub";
import { createMainContent } from "./main-content-dom";
import { createMainContentEmpty } from "./main-content-empty-dom";

export function MainContentComponent({ projectArg, containerArg }) {
    const container = containerArg;
    let project = projectArg;
    let mainContent = null;

    const render = (todoList = null) => {
        const oldMainContent = container.querySelector("[data-main-content]");

        if (todoList) {
            mainContent = todoList.length !== 0
                ? createMainContent(todoList)
                : createMainContentEmpty({ emptyType: "todo", projectName: project.getTitle() });
            bindEvents();
        } else {
            mainContent = createMainContentEmpty({ emptyType: "project" });
        }

        if (container.contains(oldMainContent)) {
            container.replaceChild(mainContent, oldMainContent);
            return;
        }

        container.append(mainContent);
        return;
    }

    const bindEvents = () => {
        mainContent.addEventListener("click", e => {
            if (e.target.closest("[data-todo-shown-container]") && e.target.nodeName.toLowerCase() !== "input") {
                expandTodoItem(e);
                return;
            }

            if (e.target.closest("[data-todo-actions]") && e.target.closest("button")) {
                if (e.target.closest("button").hasAttribute("data-edit-todo-btn")) {
                    const currentTodoIndex = e.target.closest("[data-todo-index]").getAttribute("data-todo-index");
                    const currentTodo = project.getTodoViaIndex(currentTodoIndex);

                    PubSub.publish({ eventName: "editTodoBtnClicked", data: { todo: currentTodo, project } });
                    return;
                }

                if (e.target.closest("button").hasAttribute("data-delete-todo-btn")) {
                    const currentTodoIndex = e.target.closest("[data-todo-index]").getAttribute("data-todo-index");
                    const currentTodo = project.getTodoViaIndex(currentTodoIndex);

                    PubSub.publish({ eventName: "deleteTodoBtnClicked", data: { todo: currentTodo, project } });

                    return;
                }
            }

            if (e.target.hasAttribute("data-todo-checked")) {
                const currentTodoIndex = e.target.closest("[data-todo-index]").getAttribute("data-todo-index");
                const currentTodo = project.getTodoViaIndex(currentTodoIndex);
                const todoChecked = e.target.hasAttribute("checked") ? "false" : "true";

                setTodoCheckAppearance(e);
                PubSub.publish({ eventName: "todoCheckedUpdated", data: { currentTodo, todoChecked } });

                return;
            }
        });

        mainContent.addEventListener("change", e => {
            if (e.target.hasAttribute("data-todo-notes")) {
                const currentTodoIndex = e.target.closest("[data-todo-index]").getAttribute("data-todo-index");
                const currentTodo = project.getTodoViaIndex(currentTodoIndex);
                const newNotes = e.target.value;

                PubSub.publish({ eventName: "todoNotesUpdated", data: { currentTodo, todoNotes: newNotes } });

                return;
            }
        });
    }

    const updateTodoList = (projectArg) => {
        project = projectArg;
        render(project ? project.getTodoList() : null);
        return;
    }

    const subscribeEvents = () => {
        PubSub.subscribe({ eventName: "projectTrackerUpdated", callbackFn: updateTodoList });
        PubSub.subscribe({ eventName: "todoListUpdated", callbackFn: render });
    }

    render(project ? project.getTodoList() : null);
    subscribeEvents();

    return {
        render,
    }
}

// Event-related functions

function expandTodoItem(event) {
    const todo = event.target.closest(".todo-item");

    if (todo) {
        const todoHiddenContainer = todo.closest(".todo-container").querySelector(".todo-hidden-container");
        const ariaExpanded = setAriaExpanded(todo);

        showTodoExpanded(ariaExpanded, todoHiddenContainer);

        return;
    }
}

function showTodoExpanded(ariaExpanded, todoHiddenContainer) {
    if (ariaExpanded) {
        todoHiddenContainer.classList.add("show");
        return;
    }

    todoHiddenContainer.classList.remove("show");
    return;
}

function setAriaExpanded(todo) {
    let ariaExpanded = todo.getAttribute("aria-expanded");

    // Convert string to bool
    ariaExpanded = ariaExpanded === "true";
    ariaExpanded = !ariaExpanded;

    todo.setAttribute("aria-expanded", ariaExpanded);

    return ariaExpanded;
}

function setTodoCheckAppearance(event) {
    const todoElement = event.target.closest("[data-todo-index]");
    const selectedTodo = {
        domElement: todoElement,
        shownContainer: todoElement.querySelector("[data-todo-shown-container]"),
        hiddenContainer: todoElement.querySelector("[data-todo-hidden-container]"),
        checkbox: event.target,
    }

    if (event.target.hasAttribute("checked")) {
        removeCheckedAppearance(selectedTodo);
        return;
    }

    addCheckedAppearance(selectedTodo);
}

function removeCheckedAppearance(selectedTodo) {
    selectedTodo.shownContainer.classList.remove("checked", "crossed-out");
    selectedTodo.hiddenContainer.classList.remove("checked");
    selectedTodo.checkbox.removeAttribute("checked");
}

function addCheckedAppearance(selectedTodo) {
    selectedTodo.shownContainer.classList.add("checked", "crossed-out");
    selectedTodo.hiddenContainer.classList.add("checked");
    selectedTodo.checkbox.setAttribute("checked", "");
}