import "../styles.css";
import { Projects, createProject, createTodo } from "./logic/projects";
import { createSidebarProjectsList } from "./interface/sidebar/sidebar-projects-list";
import { createProjectModal } from "./interface/modal/project-modal";
import { createTodoModal } from "./interface/modal/todo-modal";
import { createConfirmModal } from "./interface/modal/confirm-modal";
import { createMainContent } from "./interface/main/main-todo-list";
import { createMainHeading } from "./interface/main/main-project";
import { createMainEmptyProjectsList } from "./interface/main/main-empty-projects-list";
import { createMainEmptyTodoList } from "./interface/main/main-empty-todo-list";
import { Extract } from "./logic/utility";

(function () {

    // DOM elements
    const body = document.querySelector("body");
    const main = document.querySelector("main");
    const sidebar = document.querySelector("aside");
    const sidebarProjectsList = document.querySelector("[data-projects-list]");

    // Data/Objects
    const projects = new Projects();
    const projectTracker = {
        index: 0,
        getProject: () => {
            return projects.getProjectViaIndex(projectTracker.index)
        },
    }
    const modal = {
        type: "",
        domElement: null,
        set(modalType, element) {
            this.type = modalType;
            this.domElement = element;
        },
        reset() {
            this.type = "";
            this.domElement = null;
        },
        isEmpty() {
            return (this.type === "" && this.domElement === null);
        }
    };

    function renderSidebarMain(projectsList) {
        if (projectsList) {
            const projectsListElement = createSidebarProjectsList(projectsList);

            sidebarProjectsList.textContent = "";
            sidebarProjectsList.append(projectsListElement);
        }
    }

    function renderMain(project = null) {
        main.textContent = "";
        if (project) {
            const heading = createMainHeading(project.getTitle());
            let mainContent;

            if (project.getTodoList().length === 0) {
                mainContent = createMainEmptyTodoList(project.getTitle());
            } else {
                mainContent = createMainContent(project.getTodoList());
            }
            main.append(heading, mainContent);
        } else {
            main.append(createMainEmptyProjectsList());
        }
    }

    function renderAll() {
        const projectsList = projects.getProjectsList();

        renderSidebarMain(projectsList);
        if (projectsList.length === 0) {
            renderMain();
            return;
        }

        renderMain(projectTracker.getProject());
        highlightProjectElement(sidebarProjectsList, projectTracker.index);
    }

    function highlightProjectElement(sidebarElement, projectIndex) {
        const ul = Array
            .from(sidebarElement.firstElementChild.childNodes)
            .filter(element => element.nodeName.toLowerCase() === "li");

        const selectedProject = sidebarElement.querySelector(`[data-project-index="${projectIndex}"]`);

        for (let li of ul) {
            const button = li.querySelector("[data-project-index]");
            button.classList.remove("selected-project");
        }

        if (selectedProject) {
            selectedProject.classList.add("selected-project");
        } else {
            console.error(`Unable to retrieve selected project of index ${projectIndex}.`)
        }
    }

    function expandTodoItem(event) {
        const todo = event.target.closest(".todo-item");

        if (todo) {
            const todoHiddenContainer = todo.closest(".todo-container").querySelector(".todo-hidden-container");
            const ariaExpanded = setAriaExpanded(todo);
            showTodoExpanded(ariaExpanded, todoHiddenContainer);
        }
    }

    function showTodoExpanded(ariaExpanded, todoHiddenContainer) {
        if (ariaExpanded) {
            todoHiddenContainer.classList.add("show");
        } else {
            todoHiddenContainer.classList.remove("show");
        }
    }

    function setAriaExpanded(todo) {
        let ariaExpanded = todo.getAttribute("aria-expanded");

        // Convert string to bool
        ariaExpanded = ariaExpanded === "true";
        ariaExpanded = !ariaExpanded;

        todo.setAttribute("aria-expanded", ariaExpanded);

        return ariaExpanded;
    }

    function setTodoNotes(event, currentProject) {
        const currentTodoTitle = event.target.closest(".todo-container").querySelector(".todo-title").textContent;

        if (currentTodoTitle) {
            const textAreaValue = event.target.value;
            const currentTodo = currentProject.getTodo(currentTodoTitle);
            currentTodo.setNotes(textAreaValue);
        } else {
            console.error(`Unable to save '${currentTodoTitle}' notes: unable to retrieve the selected todo.`)
        }
    }

    function openModal(modalType, modalElement, domElement = document.querySelector("body")) {
        modal.set(modalType, modalElement);
        domElement.append(modal.domElement);

        if (modal.type !== "Error") {
            modal.domElement.showModal();
        }
    }

    function removeModal(modal, domElement = document.querySelector("body")) {
        if (domElement.contains(modal.domElement)) {
            domElement.removeChild(modal.domElement);
            modal.reset();
        }
    }

    function submitNewProject(formData, projects) {
        const newProject = createProject(formData.projectTitle);

        projects.addProject(newProject);
    }

    function submitNewTodo(formData, currentProject) {
        const newTodo = createTodo(
            formData.todoTitle,
            formData.todoDescription,
            formData.todoDueDate,
            formData.todoPriority
        );

        currentProject.addTodo(newTodo);
    }

    function submitEditedProject(formData, currentProject) {
        currentProject.setTitle(formData.projectTitle);
    }

    function submitEditedTodo(formData, currentProject) {
        const currentTodo = currentProject.getTodo(formData.currentTodoTitle);

        currentTodo.setTitle(formData.todoTitle);
        currentTodo.setDescription(formData.todoDescription);
        currentTodo.setPriority(formData.todoPriority);
        currentTodo.setDueDate(formData.todoDueDate);
    }

    function setupProjectFormValues(project, domElement = document.querySelector("body")) {
        const form = domElement.querySelector("form");

        if (form) {
            form.querySelector("#projectTitle").value = project.getTitle();
            form.querySelector("#currentProjectTitle").value = project.getTitle();
        } else {
            console.error("Unable to get the DOM element for the Project Form.");
        }
    }

    function submitTodoDeletion(formData, currentProject) {
        currentProject.removeTodo(formData.deleteTodoTitle);
    }

    function reindexProjectTracker(index) {
        if (index !== 0) {
            projectTracker.index = index - 1;
        }
    }

    function submitProjectDeletion(projects, currentProject) {
        const currentProjectIndex = projects.getIndexOfProject(currentProject.getTitle());

        reindexProjectTracker(currentProjectIndex);
        projects.removeProject(currentProject.getTitle());
    }

    function setupTodoFormValues(todo, domElement = document.querySelector("body")) {
        const form = domElement.querySelector("form");

        if (form) {
            form.querySelector("#todoTitle").value = todo.getTitle();
            form.querySelector("#todoDueDate").value = todo.getDueDate().toISOString().split("T")[0];
            form.querySelector("#todoPriority").value = todo.getPriority();
            form.querySelector("#todoDescription").value = todo.getDescription();
            form.querySelector("#currentTodoTitle").value = todo.getTitle();
        } else {
            console.error("Unable to get the DOM element for the Todo Form.");
        }
    }

    sidebar.addEventListener("click", e => {
        if (e.target.hasAttribute("data-add-project-btn")) {
            openModal("Add Project", createProjectModal("Add"));
            return;
        }

        if (e.target.closest("[data-project-index]")) {
            projectTracker.index = e.target.closest("[data-project-index]").getAttribute("data-project-index");
            renderAll();

            return;
        }
    });

    body.addEventListener("submit", e => {
        if (!modal.isEmpty()) {
            const formData = Extract.formValues(e.target);
            switch (modal.type) {
                case "Add Project":
                    submitNewProject(formData, projects);
                    break;
                case "Add Todo":
                    submitNewTodo(formData, projectTracker.getProject());
                    break;
                case "Edit Project":
                    submitEditedProject(formData, projectTracker.getProject());
                    break;
                case "Edit Todo":
                    submitEditedTodo(formData, projectTracker.getProject());
                    break;
                case "Delete Project":
                    submitProjectDeletion(projects, projectTracker.getProject())
                    break;
                case "Delete Todo":
                    submitTodoDeletion(formData, projectTracker.getProject());
                    break;
                default:
                    console.error("Provided modal type does not exist");
            }
            removeModal(modal);
            renderAll();
            return;
        }
    });

    body.addEventListener("change", e => {
        if (e.target.hasAttribute("data-todo-notes")) {
            setTodoNotes(e, projectTracker.getProject());
            return;
        }
    });

    ["reset", "cancel"].forEach(eventListener => {
        body.addEventListener(eventListener, e => removeModal(modal));
    });

    body.addEventListener("keydown", e => {
        if (e.key === "Escape" && modal.domElement !== null) {
            removeModal(modal, body);
            return;
        }
    });

    main.addEventListener("click", e => {
        if (e.target.closest("[data-project-actions]") && e.target.closest("button")) {

            if (e.target.closest("button").hasAttribute("data-edit-project-btn")) {
                openModal("Edit Project", createProjectModal("Edit"));
                setupProjectFormValues(projectTracker.getProject());
            }

            if (e.target.closest("button").hasAttribute("data-delete-project-btn")) {
                openModal(
                    "Delete Project",
                    createConfirmModal("Project", projectTracker.getProject().getTitle())
                );
            }

            return;
        }

        if (e.target.closest("[data-add-todo-button]")) {
            openModal("Add Todo", createTodoModal("Add"));
            return;
        }

        if (e.target.closest("[data-todo-shown-container]") && e.target.nodeName.toLowerCase() !== "input") {
            expandTodoItem(e);
            return;
        }

        if (e.target.closest("[data-todo-actions]") && e.target.closest("button")) {
            if (e.target.closest("button").hasAttribute("data-edit-todo-btn")) {
                const currentTodoIndex = e.target.closest("[data-todo-index]").getAttribute("data-todo-index");
                const currentTodo = projectTracker.getProject().getTodoViaIndex(currentTodoIndex);

                openModal("Edit Todo", createTodoModal("Edit"));
                setupTodoFormValues(currentTodo);
            }

            if (e.target.closest("button").hasAttribute("data-delete-todo-btn")) {
                const todoTitle = e.target.closest("[data-todo-index]").querySelector("[data-todo-title]").textContent;
                openModal("Delete Todo", createConfirmModal("Todo", todoTitle));
            }

            return;
        }
    });

    // Temp data
    let newTodo1 = createTodo("Workout", "Leg day", "2025-07-07", "high");
    let newTodo2 = createTodo("Homework", "Programming", "2025-09-17", "medium");

    projects.getProject("Default").addTodo(newTodo1);
    projects.getProject("Default").addTodo(newTodo2);

    projects.addProject(createProject("Hello World"));

    renderAll();

})();