function createSidebarProjectsList(projectsList) {
    const ul = document.createElement("ul");

    for (let [index, project] of projectsList.entries()) {
        const li = createProjectListItem({ project, index });
        ul.append(li);
    }
    ul.setAttribute("data-sidebar-projects-list", "");

    return ul;
}

function createProjectListItem({ project, index }) {
    const li = document.createElement("li");
    const button = document.createElement("button");

    if (index === 0) {
        button.classList.add("selected-project");
    }

    button.setAttribute("data-project-index", index);
    button.classList.add("project-list-item");
    button.append(
        createProjectTitle(project.getTitle()),
        createTodoCount(project.getTodoList().length)
    );

    li.append(button);

    return li;
}

function createProjectTitle(projectTitle) {
    const span = document.createElement("span");

    span.setAttribute("data-project-title", "");
    span.classList.add("project-title");
    span.textContent = projectTitle;

    return span;
}

function createTodoCount(todoLength) {
    const span = document.createElement("span");

    span.setAttribute("data-todo-count", "");
    span.classList.add("todo-count");
    span.textContent = todoLength;

    return span;
}

export { createSidebarProjectsList };