function createTodoModal(type) {
    const modal = document.createElement("dialog");
    const div = document.createElement("div");

    div.classList.add("todo-modal-content");
    div.append(createTodoForm(type));

    modal.classList.add("todo-modal");
    modal.append(div);

    return modal;
}

function createTodoForm(type) {
    const form = document.createElement("form");

    form.action = "/";
    form.setAttribute("onsubmit", "event.preventDefault()");
    form.append(
        createAddProjectHeading(type),
        createTodoTitleInput(),
        createTodoDueDateInput(),
        createTodoPriorityInput(),
        createTodoDescriptionInput(),
        createDivActionButtons(type),
        createHiddenInput(),
    );

    return form;
}

function createHiddenInput() {
    const input = document.createElement("input");
    input.type = "hidden";
    input.id = "currentTodoTitle";
    input.name = "currentTodoTitle";

    return input;
}

function createAddProjectHeading(type) {
    const h2 = document.createElement("h2");
    let headingTextContent;

    switch(type) {
        case "Add":
            headingTextContent = "Add a"
            break;
        case "Edit":
            headingTextContent = "Edit";
            break;
        default:
            console.error("Modal type provided was not valid.");
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

function createTodoTitleInput() {
    const div = createFormInputDiv();
    const label = document.createElement("label");
    const input = document.createElement("input");

    label.setAttribute("for", "todoTitle");
    label.textContent = "Title";

    input.type = "text";
    input.id = "todoTitle";
    input.name = "todoTitle";
    input.setAttribute("required", "");

    div.classList.add("form-todo-title");
    div.append(label, input);

    return div;
}

function createTodoDueDateInput() {
    const div = createFormInputDiv();
    const label = document.createElement("label");
    const input = document.createElement("input");

    label.setAttribute("for", "todoDueDate");
    label.textContent = "Due Date";

    input.type = "date";
    input.id = "todoDueDate";
    input.name = "todoDueDate";
    input.setAttribute("required", "");

    div.classList.add("form-todo-due-date");
    div.append(label, input);

    return div;
}

function createOptionValue(value, label) {
    const option = document.createElement("option");

    option.value = value;
    option.textContent = label;

    return option;
}

function createTodoPriorityInput() {
    const div = createFormInputDiv();
    const select = document.createElement("select");
    const label = document.createElement("label");
    const selectOption = createOptionValue("", "-- Select a priority --");
    const lowOption = createOptionValue("low", "Low");
    const mediumOption = createOptionValue("medium", "Medium");
    const highOption = createOptionValue("high", "High");

    label.setAttribute("for", "todoPriority");
    label.textContent = "Priority";

    selectOption.setAttribute("selected", "");
    selectOption.setAttribute("disabled", "");

    select.name = "todoPriority";
    select.id = "todoPriority";
    select.append(selectOption, lowOption, mediumOption, highOption);
    select.setAttribute("required", "");

    div.classList.add("form-todo-priority");
    div.append(label, select);

    return div;

}

function createTodoDescriptionInput() {
    const div = createFormInputDiv();
    const label = document.createElement("label");
    const textarea = document.createElement("textarea");

    label.setAttribute("for", "todoDescription");
    label.textContent = "Description";

    textarea.id = "todoDescription";
    textarea.name = "todoDescription";
    textarea.setAttribute("required", "");

    div.classList.add("form-todo-description");
    div.append(label, textarea);

    return div;
}

function createDivActionButtons(type) {
    const div = document.createElement("div");
    const cancelBtn = document.createElement("button");
    const submitBtn = document.createElement("button");
    let submitBtnTextContent;

    cancelBtn.textContent = "Cancel";
    cancelBtn.setAttribute("type", "reset");

    switch(type) {
        case "Add":
            submitBtnTextContent = "Add";
            break;
        case "Edit":
            submitBtnTextContent = "Save";
            break;
        default:
            console.error("Modal type provided was not valid.");
            submitBtnTextContent = "Error";
    }

    submitBtn.textContent = submitBtnTextContent;
    submitBtn.setAttribute("type", "submit");

    div.classList.add("action-buttons");
    div.append(cancelBtn, submitBtn);

    return div;
}

export { createTodoModal };