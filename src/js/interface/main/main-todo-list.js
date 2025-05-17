import deleteIcon from "../../../images/icons/delete.svg";
import editIcon from "../../../images/icons/edit-square.svg";
import calendarIcon from "../../../images/icons/calendar-clock.svg";
import chevronRightArrow from "../../../images/icons/chevron-right.svg"
import { format } from "date-fns";

const ICON_SIZE = 24;
const ARROW_SIZE = 30;

// 'Todo' list container

function createMainContent(todoList) {
    const div = document.createElement("div");
    const ul = document.createElement("ul");

    todoList.forEach((todo, index) => {
        const todoElement = createTodoContainer(todo, index);
        ul.append(todoElement);
    });

    ul.classList.add("todo-list-container");
    div.classList.add("main-content");
    div.setAttribute("data-main-content", "");
    div.append(ul);

    return div;
}

function createTodoContainer(todo, index) {
    const li = document.createElement("li");
    const todoItem = createTodoItem(
        todo.getTitle(),
        todo.getDueDate(),
        todo.getPriority(),
        todo.getChecked()
    );
    const todoItemExpanded = createTodoItemExpanded(
        todo.getDescription(),
        todo.getPriority(),
        todo.getNotes(),
        todo.getChecked(),
    );

    li.classList.add("todo-container");
    li.setAttribute("data-todo-index", index);
    li.append(todoItem, todoItemExpanded);

    return li;
}

function createTodoItem(title, dueDate, priority, checked) {
    const div = document.createElement("div");
    const checkbox = createTodoCheckbox(checked);
    const todoSimpleInformation = createTodoSimpleInformation(title, dueDate, priority);
    const expandArrow = createExpandArrow();

    if (checked === "true") {
        div.classList.add("checked", "crossed-out");
    }
    div.classList.add("todo-item");
    div.setAttribute("data-todo-shown-container", "");
    div.setAttribute("role", "group");
    div.ariaExpanded = "false";
    div.append(
        checkbox,
        todoSimpleInformation,
        expandArrow
    );

    return div;
}

function createTodoSimpleInformation(title, dueDate, priority) {
    const div = document.createElement("div");
    const todoTitle = createTodoTitle(title, priority);
    const todoDueDate = createTodoDueDate(dueDate);

    div.classList.add("todo-simple-information");
    div.append(todoTitle, todoDueDate);

    return div;
}

function createTodoCheckbox(checked) {
    const div = document.createElement("div");
    const input = document.createElement("input");

    input.type = "checkbox";
    input.setAttribute("data-todo-checked", "");

    if (checked === "true") {
        input.setAttribute("checked", "");
    }

    div.classList.add("checkbox-container");
    div.append(input);

    return div;
}

function createExpandArrow() {
    const img = document.createElement("img");

    img.src = chevronRightArrow;
    img.alt = "Expand Todo Arrow";

    img.width = ARROW_SIZE;
    img.height = ARROW_SIZE;

    img.classList.add("expand-arrow");

    return img;
}

function createTodoTitle(title, priority) {
    const div = document.createElement("div");
    const priorityCircle = document.createElement("div");
    const p = document.createElement("p");

    switch (priority) {
        case "low":
            priorityCircle.classList.add("green");
            break;
        case "medium":
            priorityCircle.classList.add("amber");
            break;
        case "high":
            priorityCircle.classList.add("red");
            break;
        default:
            console.error("Unable to add priority circle: Priority passed in was not valid");
    }
    priorityCircle.classList.add("priority-circle");

    p.classList.add("title-text");
    p.textContent = title;
    p.setAttribute("data-todo-title", "");

    div.classList.add("todo-title");
    div.append(priorityCircle, p);

    return div;
}

function createTodoDueDate(dueDate) {
    const div = document.createElement("div");
    const img = document.createElement("img");
    const p = document.createElement("p");

    img.src = calendarIcon;
    img.alt = "Due Date Icon";
    img.classList.add("due-date-icon");

    p.classList.add("due-date-text");
    p.textContent = format(dueDate, "EEEE do MMMM, yyyy (dd/MM/yy)");
    p.setAttribute("data-todo-due-date", "");

    div.classList.add("todo-due-date");
    div.append(img, p);

    return div;
}


// 'Todo' Expanded Information

function createTodoItemExpanded(description, priority, notes, checked) {
    const todoHiddenContainer = document.createElement("div");
    const todoExpandedContainer = document.createElement("div");
    const todoDescription = createTodoDescription(description);
    const todoPriority = createTodoPriority(priority);
    const todoNotes = createTodoNotes(notes);
    const todoActions = createTodoActions();

    todoExpandedContainer.classList.add("todo-expanded-information");
    todoExpandedContainer.append(
        todoDescription,
        todoPriority,
        todoNotes,
        todoActions
    );

    if (checked === "true") {
        todoHiddenContainer.classList.add("checked");
    }
    todoHiddenContainer.classList.add("todo-hidden-container");
    todoHiddenContainer.setAttribute("data-todo-hidden-container", "");
    todoHiddenContainer.append(todoExpandedContainer);

    return todoHiddenContainer;
}

function createTodoDescription(description) {
    const div = document.createElement("div");
    const h4 = document.createElement("h4");
    const p = document.createElement("p");

    h4.classList.add("description-heading");
    h4.textContent = "Description";

    p.classList.add("description-text");
    p.textContent = description;
    p.setAttribute("data-todo-description", "");

    div.classList.add("todo-description");
    div.append(h4, p);

    return div;
}

function createTodoPriority(priority) {
    const div = document.createElement("div");
    const h4 = document.createElement("h4");
    const p = document.createElement("p");

    h4.textContent = "Priority";
    h4.classList.add("priority-heading");

    p.textContent = priority;
    p.classList.add("priority-text");
    p.setAttribute("data-todo-priority", "");

    switch (priority) {
        case "low":
            p.classList.add("green");
            break;
        case "medium":
            p.classList.add("amber");
            break;
        case "high":
            p.classList.add("red");
            break;
        default:
            console.error("Priority provided was not valid.");
    }

    div.classList.add("todo-priority");
    div.append(h4, p);

    return div;
}

function createTodoNotes(notes) {
    const div = document.createElement("div");
    const h4 = document.createElement("h4");
    const textarea = document.createElement("textarea");

    h4.textContent = "Notes";
    h4.classList.add("notes-heading");

    textarea.setAttribute("data-todo-notes", "");
    textarea.value = notes;

    div.classList.add("todo-notes");
    div.append(h4, textarea);

    return div;
}

function createTodoActions() {
    const editButton = createTodoEditButton();
    const deleteButton = createTodoDeleteButton();

    const div = document.createElement("div");
    div.classList.add("todo-actions");
    div.setAttribute("data-todo-actions", "");
    div.append(editButton, deleteButton);

    return div;
}

function createTodoEditButton() {
    const button = document.createElement("button");
    const img = document.createElement("img");

    img.src = editIcon;
    img.alt = "Edit Todo Icon";
    img.width = ICON_SIZE;
    img.height = ICON_SIZE;

    button.setAttribute("data-edit-todo-btn", "");
    button.append(img);

    return button;
}

function createTodoDeleteButton() {
    const button = document.createElement("button");
    const img = document.createElement("img");

    img.src = deleteIcon;
    img.alt = "Delete Todo Icon";
    img.width = ICON_SIZE;
    img.height = ICON_SIZE;

    button.setAttribute("data-delete-todo-btn", "");
    button.append(img);

    return button;
}

export { createMainContent };