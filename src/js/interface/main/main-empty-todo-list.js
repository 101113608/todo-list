import noDataIllustration from "../../../images/illustrations/no-data-illustration.svg";

const ILLUST_SIZE = 200;

function createMainEmptyTodoList(projectName) {
    const div = document.createElement("div");

    div.classList.add("main-content", "empty-todo-list");
    div.append(
        createMainEmptyImg(),
        createMainEmptyHeading(projectName),
    );

    return div;
}

function createMainEmptyHeading(projectName) {
    const h2 = document.createElement("h2");

    h2.textContent = `Your '${projectName}' list is empty...`;

    return h2;
}

function createMainEmptyImg() {
    const img = document.createElement("img");

    img.src = noDataIllustration;
    img.alt = "Empty Todo List Illustration";
    img.width = ILLUST_SIZE;
    img.height = ILLUST_SIZE;

    return img;
}

export { createMainEmptyTodoList };