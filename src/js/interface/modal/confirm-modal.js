function createConfirmModal(objectType, objectName) {
    const modal = document.createElement("dialog");
    const div = document.createElement("div");

    div.classList.add("confirm-modal-content");
    div.append(createConfirmForm(objectType, objectName));

    modal.classList.add("confirm-modal");
    modal.append(div);

    return modal;
}

function createHiddenInput(objectType, objectName) {
    const input = document.createElement("input");

    input.type = "hidden";
    input.name = `delete${objectType}Title`;
    input.value = objectName;

    return input;
}

function createConfirmForm(objectType, objectName) {
    const form = document.createElement("form");
    form.action = "/";
    form.setAttribute("onsubmit", "event.preventDefault()");

    form.append(
        createConfirmHeading(objectName),
        createConfirmText(objectType, objectName),
        createDivActionButtons(),
        createHiddenInput(objectType, objectName)
    );

    return form;
}

function createConfirmHeading(objectName) {
    const h2 = document.createElement("h2");
    h2.textContent = `Delete '${objectName}'`;

    return h2;
}

function createConfirmText(objectType, objectName) {
    const p = document.createElement("p");
    p.textContent = `Are you sure you want to delete ${objectType} '${objectName}'?`;

    return p;
}

function createDivActionButtons() {
    const div = document.createElement("div");
    const cancelBtn = document.createElement("button");
    const submitBtn = document.createElement("button");

    cancelBtn.textContent = "Cancel";
    cancelBtn.setAttribute("type", "reset");

    submitBtn.setAttribute("type", "submit");
    submitBtn.textContent = "Confirm";

    div.classList.add("action-buttons");
    div.append(cancelBtn, submitBtn);

    return div;
}

export { createConfirmModal };