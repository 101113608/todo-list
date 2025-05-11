import deleteProjectIcon from "../../../images/icons/delete.svg";
import editProjectIcon from "../../../images/icons/edit-square.svg";
import addTodoIcon from "../../../images/icons/add-task.svg";
import removeCheckedIcon from "../../../images/icons/remove-done.svg";

const ICON_SIZE = 24;

function createMainHeading(projectTitle) {
    const div = document.createElement("div");
    const h1 = document.createElement("h1");

    h1.classList.add("main-project-title");
    h1.setAttribute("data-main-project-title", "");
    h1.textContent = projectTitle;

    div.classList.add("main-heading");
    div.append(
        h1,
        createProjectActions(),
        createTodoListActions(),
    );

    return div;
}

function createProjectActions() {
    const div = document.createElement("div");
    const editProjectButton = createEditProjectButton();
    const deleteProjectButton = createDeleteProjectButton();

    div.classList.add("project-actions");
    div.setAttribute("data-project-actions", "");
    div.append(
        editProjectButton,
        deleteProjectButton,
    );

    return div;
}

function createEditProjectButton() {
    const button = document.createElement("button");
    const img = document.createElement("img");

    img.src = editProjectIcon;
    img.alt = "Edit Project Icon";

    img.width = ICON_SIZE;
    img.height = ICON_SIZE;

    button.setAttribute("data-edit-project-btn", "");
    button.append(img);

    return button;
}

function createDeleteProjectButton() {
    const button = document.createElement("button");
    const img = document.createElement("img");

    img.src = deleteProjectIcon;
    img.alt = "Delete Project Icon";

    img.width = ICON_SIZE;
    img.height = ICON_SIZE;

    button.setAttribute("data-delete-project-btn", "");
    button.append(img);

    return button;
}

function createTodoListActions() {
    const div = document.createElement("div");

    div.classList.add("todo-list-actions");
    div.append(
        createAddTodoButton(),
        createClearCheckedButton(),
    );

    return div;
}

function createAddTodoButton() {
    const button = document.createElement("button");
    const img = document.createElement("img");

    img.src = addTodoIcon;
    img.alt = "Add Todo Icon";

    button.classList.add("add-todo");
    button.setAttribute("data-add-todo-button", "");

    button.append(
        img,
        "New Todo",
    );

    return button;
}

function createClearCheckedButton() {
    const button = document.createElement("button");
    const img = document.createElement("img");

    img.src = removeCheckedIcon;
    img.alt = "Remove Checked Icon";

    button.classList.add("clear-checked");
    button.setAttribute("data-clear-checked-button", "");
    button.append(
        img,
        "Clear Checked",
    );

    return button;
}

export { createMainHeading };