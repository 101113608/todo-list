import { capitaliseString } from "../../logic/utility";

function createConfirmModal({ itemType, itemName }) {
    const modal = document.createElement("dialog");
    const div = document.createElement("div");

    if (!(itemType && itemName)) {
        throw new Error("Unable to create confirm modal: missing arguments.");
    }

    div.classList.add("confirm-modal-content");
    div.append(createConfirmForm({ itemType, itemName }));

    modal.classList.add("confirm-modal");
    modal.append(div);

    return modal;
}

function createHiddenInput({ itemType, itemName }) {
    const input = document.createElement("input");
    const capitalisedItemType = capitaliseString(itemType);

    input.type = "hidden";
    input.name = `delete${capitalisedItemType}Title`;
    input.value = itemName;

    return input;
}

function createConfirmForm({ itemType, itemName }) {
    const form = document.createElement("form");
    form.action = "/";
    form.setAttribute("onsubmit", "event.preventDefault()");

    form.append(
        createConfirmHeading(itemName),
        createConfirmText({ itemType, itemName }),
        createDivActionButtons(),
        createHiddenInput({ itemType, itemName })
    );

    return form;
}

function createConfirmHeading(itemName) {
    const h2 = document.createElement("h2");
    h2.textContent = `Delete '${itemName}'`;

    return h2;
}

function createConfirmText({ itemType, itemName }) {
    const p = document.createElement("p");
    const capitalisedItemType = capitaliseString(itemType);

    p.textContent = `Are you sure you want to delete ${capitalisedItemType} '${itemName}'?`;

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