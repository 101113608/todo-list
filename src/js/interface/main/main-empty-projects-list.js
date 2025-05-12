import emptyIllustration from "../../../images/illustrations/empty-illustration.svg";

const ILLUST_SIZE = 200;

function createMainEmptyProjectsList() {
    const div = document.createElement("div");

    div.classList.add("main-content", "empty-projects-list");
    div.append(
        createMainEmptyImg(),
        createMainEmptyHeading(),
    );

    return div;
}

function createMainEmptyHeading() {
    const h2 = document.createElement("h2");

    h2.textContent = "Your projects list is empty...";

    return h2;
}

function createMainEmptyImg() {
    const img = document.createElement("img");

    img.src = emptyIllustration;
    img.alt = "Empty Projects Illustration";
    img.width = ILLUST_SIZE;
    img.height = ILLUST_SIZE;

    return img;
}

export { createMainEmptyProjectsList };