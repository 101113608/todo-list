import emptyProjectsIllust from "../../../images/illustrations/empty-illustration.svg";
import emptyTodoListIllust from "../../../images/illustrations/no-data-illustration.svg";

const ILLUST_SIZE = 200;

function createMainContentEmpty({ emptyType, projectName = null }) {
    if (!emptyType && typeof emptyType !== "string") {
        console.error("Unable to create main-content: Provided type was invalid.");
        return;
    }

    const div = document.createElement("div");
    let divClassEmptyType = null;

    switch (emptyType) {
        case "project":
            divClassEmptyType = "empty-projects-list";
            break;
        case "todo":
            divClassEmptyType = "empty-todo-list";
            break;
        default:
            console.error("Unable to create main-content: Provided type was invalid.");
            return;
    }

    div.classList.add(
        "main-content",
        divClassEmptyType,
    );
    div.setAttribute("data-main-content", "");
    div.append(
        createMainEmptyImg(emptyType),
        createMainEmptyHeading(projectName),
    );

    return div;
}

function createMainEmptyHeading(projectName = null) {
    const h2 = document.createElement("h2");
    h2.textContent = projectName ? `Your '${projectName}' list is empty...` : "Your projects list is empty...";

    return h2;
}

function createMainEmptyImg(emptyType) {
    if (!emptyType && typeof emptyType !== "string") {
        console.error("Unable to create main-content: Provided type was invalid.");
        return;
    }

    const img = document.createElement("img");
    const imgType = emptyType === "project" ? "Projects" : "Todo List";

    img.src = emptyType === "project" ? emptyProjectsIllust : emptyTodoListIllust;
    img.alt = `Empty ${imgType} Illustration`;

    img.width = ILLUST_SIZE;
    img.height = ILLUST_SIZE;

    return img;
}

export { createMainContentEmpty };