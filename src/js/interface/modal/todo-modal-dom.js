function createTodoModal({ actionType, currentTodo = null }) {
    const modal = document.createElement("dialog");
    const div = document.createElement("div");
    let todo = currentTodo ? currentTodo : {};

    if (!actionType) {
        throw new Error("Unable to create todo modal: missing action type.");
    }

    div.classList.add("todo-modal-content");
    div.append(
        createTodoForm({ actionType, currentTodo: todo })
    );

    modal.classList.add("todo-modal");
    modal.append(div);

    return modal;
}

function createTodoForm({ actionType, currentTodo }) {
    const form = document.createElement("form");

    form.action = "/";
    form.setAttribute("onsubmit", "event.preventDefault()");
    form.append(
        createAddProjectHeading(actionType),
        createTodoTitleInput(currentTodo.title),
        createTodoDueDateInput(currentTodo.dueDate),
        createTodoPriorityInput(currentTodo.priority),
        createTodoDescriptionInput(currentTodo.description),
        createDivActionButtons(actionType),
        createHiddenInput(currentTodo.title),
    );

    return form;
}

function createHiddenInput(currentTodoTitle = null) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.id = "currentTodoTitle";
    input.name = "currentTodoTitle";

    if (currentTodoTitle) {
        input.value = currentTodoTitle;
    }

    return input;
}

function createAddProjectHeading(actionType) {
    const h2 = document.createElement("h2");
    let headingTextContent;

    switch (actionType) {
        case "add":
            headingTextContent = "Add a"
            break;
        case "edit":
            headingTextContent = "Edit";
            break;
        default:
            console.error("The provided action for the modal was not valid.");
            headingTextContent = "Error";
    }

    h2.textContent = headingTextContent + " Todo";

    return h2;
}

function createFormInputDiv() {
    const div = document.createElement("div");
    div.classList.add("form-input");

    return div;
}

function createTodoTitleInput(currentTodoTitle = null) {
    const div = createFormInputDiv();
    const label = document.createElement("label");
    const input = document.createElement("input");

    label.setAttribute("for", "todoTitle");
    label.textContent = "Title";

    input.type = "text";
    input.id = "todoTitle";
    input.name = "todoTitle";
    input.setAttribute("required", "");

    if (currentTodoTitle) {
        input.value = currentTodoTitle;
    }

    div.classList.add("form-todo-title");
    div.append(label, input);

    return div;
}

function createTodoDueDateInput(currentTodoDate = null) {
    const div = createFormInputDiv();
    const label = document.createElement("label");
    const input = document.createElement("input");

    label.setAttribute("for", "todoDueDate");
    label.textContent = "Due Date";

    input.type = "date";
    input.id = "todoDueDate";
    input.name = "todoDueDate";
    input.setAttribute("required", "");

    if (currentTodoDate) {
        input.value = currentTodoDate;
    }

    div.classList.add("form-todo-due-date");
    div.append(label, input);

    return div;
}

function createOptionValue({ value, label }) {
    const option = document.createElement("option");

    option.value = value;
    option.textContent = label;

    return option;
}

function createTodoPriorityInput(currentTodoPriority = null) {
    const div = createFormInputDiv();
    const select = document.createElement("select");
    const label = document.createElement("label");
    const selectOption = createOptionValue({ value: "", label: "-- Select a priority --" });
    const lowOption = createOptionValue({ value: "low", label: "Low" });
    const mediumOption = createOptionValue({ value: "medium", label: "Medium" });
    const highOption = createOptionValue({ value: "high", label: "High" });

    label.setAttribute("for", "todoPriority");
    label.textContent = "Priority";

    selectOption.setAttribute("selected", "");
    selectOption.setAttribute("disabled", "");

    select.name = "todoPriority";
    select.id = "todoPriority";
    select.append(selectOption, lowOption, mediumOption, highOption);
    select.setAttribute("required", "");

    if (currentTodoPriority) {
        select.value = currentTodoPriority;
    }

    div.classList.add("form-todo-priority");
    div.append(label, select);

    return div;
}

function createTodoDescriptionInput(currentTodoDesc = null) {
    const div = createFormInputDiv();
    const label = document.createElement("label");
    const textarea = document.createElement("textarea");

    label.setAttribute("for", "todoDescription");
    label.textContent = "Description";

    textarea.id = "todoDescription";
    textarea.name = "todoDescription";
    textarea.setAttribute("required", "");

    if (currentTodoDesc) {
        textarea.value = currentTodoDesc;
    }

    div.classList.add("form-todo-description");
    div.append(label, textarea);

    return div;
}

function createDivActionButtons(actionType) {
    const div = document.createElement("div");
    const cancelBtn = document.createElement("button");
    const submitBtn = document.createElement("button");
    let submitBtnTextContent;

    cancelBtn.textContent = "Cancel";
    cancelBtn.setAttribute("type", "reset");

    switch (actionType) {
        case "add":
            submitBtnTextContent = "Add";
            break;
        case "edit":
            submitBtnTextContent = "Save";
            break;
        default:
            console.error("The provided action for the modal was not valid.");
            submitBtnTextContent = "Error";
    }

    submitBtn.textContent = submitBtnTextContent;
    submitBtn.setAttribute("type", "submit");

    div.classList.add("action-buttons");
    div.append(cancelBtn, submitBtn);

    return div;
}

export { createTodoModal };