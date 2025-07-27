function createProjectModal({ actionType, currentProject = null }) {
    const modal = document.createElement("dialog");
    const div = document.createElement("div");
    let project = currentProject ? currentProject : {};

    if (!actionType) {
        throw new Error("Unable to create project modal: missing action type.");
    }

    div.classList.add("project-modal-content");
    modal.classList.add("project-modal");

    div.append(createProjectForm({ actionType, currentProject: project }));
    modal.append(div);

    return modal;
}

function createProjectForm({ actionType, currentProject }) {
    const form = document.createElement("form");

    form.action = "/";
    form.setAttribute("onsubmit", "event.preventDefault()");
    form.append(
        createAddProjectHeading(actionType),
        createAddProjectInput(currentProject.title),
        createDivActionButtons(actionType),
        createHiddenInput(currentProject.title),
    );

    return form;
}

function createHiddenInput(currentProjectTitle = null) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.id = "currentProjectTitle";
    input.name = "currentProjectTitle";

    if (currentProjectTitle) {
        input.value = currentProjectTitle;
    }

    return input;
}

function createAddProjectHeading(actionType) {
    const h2 = document.createElement("h2");
    let headingTextContent;

    switch (actionType) {
        case "add":
            headingTextContent = "Add a";
            break;
        case "edit":
            headingTextContent = "Edit";
            break;
        default:
            console.error("The provided action for the modal was not valid.");
            headingTextContent = "Error";
    }

    h2.textContent = headingTextContent + " Project";

    return h2;
}

function createAddProjectInput(currentProjectTitle = null) {
    const input = document.createElement("input");

    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Name of Project");
    input.setAttribute("required", "");
    input.setAttribute("id", "projectTitle");
    input.setAttribute("name", "projectTitle");

    if (currentProjectTitle) {
        input.value = currentProjectTitle;
    }

    return input;
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

    submitBtn.setAttribute("type", "submit");
    submitBtn.textContent = submitBtnTextContent;

    div.classList.add("action-buttons");
    div.append(cancelBtn, submitBtn);

    return div;
}

export { createProjectModal };