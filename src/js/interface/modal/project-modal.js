function createProjectModal(type) {
    const modal = document.createElement("dialog");
    const div = document.createElement("div");

    div.classList.add("project-modal-content");
    modal.classList.add("project-modal");

    div.append(createProjectForm(type));
    modal.append(div);

    return modal;
}

function createProjectForm(type) {
    const form = document.createElement("form");

    form.action = "/";
    form.setAttribute("onsubmit", "event.preventDefault()");
    form.append(
        createAddProjectHeading(type),
        createAddProjectInput(),
        createDivActionButtons(type),
        createHiddenInput(),
    );

    return form;
}

function createHiddenInput() {
    const input = document.createElement("input");
    input.type = "hidden";
    input.id = "currentProjectTitle";
    input.name = "currentProjectTitle";

    return input;
}

function createAddProjectHeading(type) {
    const h2 = document.createElement("h2");
    let headingTextContent;

    switch(type) {
        case "Add":
            headingTextContent = "Add a";
            break;
        case "Edit":
            headingTextContent = "Edit";
            break;
        default:
            console.error("Modal type provided was not valid.");
            headingTextContent = "Error";
    }

    h2.textContent = headingTextContent + " Project";

    return h2;
}

function createAddProjectInput() {
    const input = document.createElement("input");

    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Name of Project");
    input.setAttribute("required", "");
    input.setAttribute("id", "projectTitle");
    input.setAttribute("name", "projectTitle");

    return input;
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

    submitBtn.setAttribute("type", "submit");
    submitBtn.textContent = submitBtnTextContent;

    div.classList.add("action-buttons");
    div.append(cancelBtn, submitBtn);

    return div;
}

export { createProjectModal };