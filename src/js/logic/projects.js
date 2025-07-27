import { Valid } from "./utility.js";
import { PubSub } from "./pub-sub.js";
import { format } from "date-fns";

function createTodo(title, description, dueDate, priority, notes = "", checked = "false") {
    let state = {
        title,
        description,
        dueDate: new Date(dueDate),
        priority,
        notes,
        checked
    }

    let success = null;

    const titleGetter = (stateArg) => ({ getTitle: () => stateArg.title });
    const titleSetter = (stateArg) => ({
        setTitle: (newTitle) => {
            const titleValues = {
                variableName: "Title",
                currentValue: stateArg.title,
                newValue: newTitle
            }

            if (!Valid.setterValue(titleValues)) {
                console.info(`Unable to rename todo '${newTitle}': current and new value are the same.`);
                success = false;
                return success;
            }

            stateArg.title = newTitle;
            success = true;
            return success;
        }
    });

    const descriptionGetter = (stateArg) => ({ getDescription: () => stateArg.description });
    const descriptionSetter = (stateArg) => ({
        setDescription: (newDescription) => {
            const descriptionValues = {
                variableName: "Description",
                currentValue: stateArg.description,
                newValue: newDescription
            }

            if (!Valid.setterValue(descriptionValues)) {
                console.info(`Unable to set the description of todo '${titleGetter(stateArg).getTitle()}': current and new values are the same.`);
                success = false;
                return success;
            }

            stateArg.description = newDescription;
            success = true;
            return success;
        }
    });

    const dueDateGetter = (stateArg) => ({ getDueDate: () => stateArg.dueDate });
    const dueDateSetter = (stateArg) => ({
        setDueDate: (newDueDate) => {
            const dueDateValues = {
                variableName: "Due Date",
                currentValue: format(stateArg.dueDate.getTime(), "yyyy-MM-dd"),
                newValue: newDueDate
            }

            if (!Valid.setterValue(dueDateValues)) {
                console.info(`Unable to set the due date of todo '${titleGetter(stateArg).getTitle()}': current and new values are the same.`);
                success = false;
                return success;
            }

            stateArg.dueDate = new Date(newDueDate);
            success = true;
            return success;
        }
    });

    const priorityGetter = (stateArg) => ({ getPriority: () => stateArg.priority });
    const prioritySetter = (stateArg) => ({
        setPriority: (newPriority) => {
            const priorityValues = {
                variableName: "Priority",
                currentValue: stateArg.priority,
                newValue: newPriority
            }

            if (!Valid.setterValue(priorityValues)) {
                console.info(`Unable to set the priority of todo '${titleGetter(stateArg).getTitle()}': current and new values are the same.`);
                success = false;
                return success;
            }

            stateArg.priority = newPriority;
            success = true;
            return success;
        }
    });

    const notesGetter = (stateArg) => ({ getNotes: () => stateArg.notes });
    const notesSetter = (stateArg) => ({
        setNotes: (newNotes) => {
            if (stateArg.notes === newNotes) {
                console.info(`Unable to set the notes of  todo '${titleGetter(stateArg).getTitle()}': current and new values are the same.`);
                success = false;
                return success;
            }

            stateArg.notes = newNotes;
            success = true;
            return success;
        }
    });

    const checkedGetter = (stateArg) => ({ getChecked: () => stateArg.checked });
    const checkedSetter = (stateArg) => ({
        setChecked: (newChecked) => {
            if (!(newChecked === "true" || newChecked === "false")) {
                console.error(`Unable to set the checked state of todo '${titleGetter(stateArg).getTitle()}': provided value isn't valid.`);
                success = false;
                return success;
            }

            stateArg.checked = newChecked;
            success = true;
            return success;
        }
    });

    return Object.assign(
        {},
        titleGetter(state),
        titleSetter(state),
        descriptionGetter(state),
        descriptionSetter(state),
        dueDateGetter(state),
        dueDateSetter(state),
        priorityGetter(state),
        prioritySetter(state),
        notesGetter(state),
        notesSetter(state),
        checkedGetter(state),
        checkedSetter(state)
    )
}

function createProject(title, todoList = []) {
    let state = {
        title,
        todoList,
    }

    let success = null;

    const titleGetter = (stateArg) => ({ getTitle: () => stateArg.title });

    const titleSetter = (stateArg) => ({
        setTitle: (newTitle) => {
            const titleValues = {
                variableName: "Title",
                currentValue: stateArg.title,
                newValue: newTitle
            }

            if (!Valid.setterValue(titleValues)) {
                console.info(`Unable to rename project '${newTitle}': current and new values are the same.`);
                success = false;
                return;
            }

            stateArg.title = newTitle;
            success = true;
            return success;
        }
    });

    const todoListGetter = (stateArg) => ({
        getTodoList: () => {
            return stateArg.todoList.map(todo => {
                return todo;
            });
        }
    });

    const todoGetter = (stateArg) => ({
        getTodo: (todoTitleToGet) => {
            const todo = stateArg.todoList.find(todo => todo.getTitle() === todoTitleToGet);

            if (!Valid.objectValue(todo)) {
                console.warn(`Todo was not retrieved: '${todoTitleToGet}' was not found.`);
                return null;
            }

            return todo;
        }
    });

    const todoGetterViaIndex = (stateArg) => ({
        getTodoViaIndex: (indexOfTodo) => {
            const todo = stateArg.todoList[indexOfTodo];

            if (!Valid.objectValue(todo)) {
                console.warn(`Todo was not retrieved: index '${indexOfTodo}' was not found.`);
                return null;
            }

            return todo;
        }
    });

    const indexGetterOfTodo = (stateArg) => ({
        getIndexOfTodo: (todoTitle) => {
            const index = todoListGetter(stateArg).getTodoList().findIndex(todo => {
                return todo.getTitle() === todoTitle;
            });

            if (!Valid.indexValue(index)) {
                console.warn(`Todo list index was not retrieved: '${todoTitle}' was not found.`);
                return null;
            }

            return index;
        }
    });

    const todoAdder = (stateArg) => ({
        addTodo: (newTodo) => {
            success = false;

            if (!newTodo.getTitle) {
                console.error(`Todo was not added: Object passed was not a todo.`);
                return success;
            }

            const newTodoTitle = newTodo.getTitle();
            const todoExists = todoListGetter(stateArg).getTodoList().some(todo => {
                return todo.getTitle() === newTodoTitle;
            });

            if (todoExists) {
                console.info(`Todo was not added: Todo '${newTodoTitle}' already exists.`);
                return success;
            }

            stateArg.todoList.push(newTodo);
            success = true;
            return success;
        }
    });

    const todoRemover = (stateArg) => ({
        removeTodo: (todoTitleToRemove) => {
            const indexToRemove = indexGetterOfTodo(stateArg).getIndexOfTodo(todoTitleToRemove);

            if (!Valid.indexValue(indexToRemove)) {
                console.warn(`Todo was not removed: Todo '${todoTitleToRemove}' was not found.`);
                success = false;
                return success;
            }

            stateArg.todoList.splice(indexToRemove, 1);
            success = true;
            return success;
        }
    });

    return Object.assign(
        {},
        titleGetter(state),
        titleSetter(state),
        todoListGetter(state),
        todoGetter(state),
        todoGetterViaIndex(state),
        indexGetterOfTodo(state),
        todoAdder(state),
        todoRemover(state),
    )
}

class Projects {
    #projectsList;
    static #instantiated = false;
    constructor() {
        if (Projects.#instantiated) {
            console.warn("Unable to instantiate: Cannot have more than one instance of Projects.");
            return;
        }

        Projects.#instantiated = true;
        this.#projectsList = [createProject("Default")];
        this.#subscribeEvents();

        PubSub.publish({ eventName: "projectsInstantiated" });
    };

    getProjectsList() {
        return this.#projectsList.map(project => { return project });
    }

    getProject(projectTitle) {
        const project = this.getProjectsList().find(project => project.getTitle() === projectTitle);

        if (!Valid.objectValue(project)) {
            console.warn(`Project was not retrieved: '${projectTitle}' was not found.`);
            return null;
        }

        return project;
    }

    getProjectViaIndex(index) {
        const project = this.getProjectsList()[index];

        if (!Valid.objectValue(project)) {
            console.warn(`Project was not retrieved: index '${index}' was not found.`);
            return null;
        }

        return project;
    }

    getIndexOfProject(projectTitle) {
        const index = this.getProjectsList().findIndex(project => project.getTitle() === projectTitle);

        if (!Valid.indexValue(index)) {
            console.warn(`Projects index was not retrieved: '${projectTitle}' was not found.`);
            return null;
        }

        return index;
    }

    addProject(newProject) {
        const projectPropertyExists = newProject.getTitle;

        if (!projectPropertyExists) {
            console.error(`Project was not added: Object passed was not a project.`);
            return;
        }

        const newProjectTitle = newProject.getTitle();
        const projectExists = this.getProjectsList().some(project => {
            return project.getTitle() === newProjectTitle;
        });

        if (projectExists) {
            console.info(`Project was not added: '${newProjectTitle}' already exists.`);
            return;
        }

        let emptyProjectTracker = false;

        if (this.#projectsList.length === 0) {
            emptyProjectTracker = true;
        }

        this.#projectsList.push(newProject);
        PubSub.publish({ eventName: "projectsListUpdated", data: this.getProjectsList() });

        if (emptyProjectTracker) {
            const indexStart = 0;
            PubSub.publish({ eventName: "projectIndexUpdated", data: indexStart });
        }

        return;
    }

    removeProject(projectTitle) {
        const indexToRemove = this.getIndexOfProject(projectTitle);

        if (!Valid.indexValue(indexToRemove)) {
            console.warn(`Project '${projectTitle}' was not removed: Project was not found.`);
            return;
        }

        const removedProject = this.#projectsList.splice(indexToRemove, 1);

        PubSub.publish({ eventName: "projectDeleted", data: removedProject });
        PubSub.publish({ eventName: "projectsListUpdated", data: this.getProjectsList() });

        return;
    }

    #loadProjects(projectsList) {
        if (projectsList) {
            this.#projectsList = projectsList;
            return projectsList;
        }
    }

    #editProject(data) {
        const currentProject = this.getProject(data.currentProject.title);
        const isSet = currentProject.setTitle(data.newTitle);

        if (isSet) {
            PubSub.publish({ eventName: "currentProjectUpdated", data: currentProject });
            PubSub.publish({ eventName: "projectsListUpdated", data: this.getProjectsList() });
        }
    }

    #addTodo(data) {
        const currentProject = this.getProject(data.currentProject.getTitle());
        const isAdded = currentProject.addTodo(data.newTodo);

        if (isAdded) {
            PubSub.publish({ eventName: "todoListUpdated", data: currentProject.getTodoList() });
            PubSub.publish({ eventName: "projectsListUpdated", data: this.getProjectsList() });
        }
    }

    #removeTodo(data) {
        const currentProject = this.getProject(data.currentProject.getTitle());
        const isRemoved = currentProject.removeTodo(data.formData.deleteTodoTitle);

        if (isRemoved) {
            PubSub.publish({ eventName: "todoListUpdated", data: currentProject.getTodoList() });
            PubSub.publish({ eventName: "projectsListUpdated", data: this.getProjectsList() });
        }
    }

    #editTodo(data) {
        const currentProject = this.getProject(data.currentProject.getTitle());
        const currentTodo = currentProject.getTodo(data.formData.currentTodoTitle);

        currentTodo.setTitle(data.formData.todoTitle);
        currentTodo.setDescription(data.formData.todoDescription);
        currentTodo.setDueDate(data.formData.todoDueDate);
        currentTodo.setPriority(data.formData.todoPriority);

        PubSub.publish({ eventName: "todoListUpdated", data: currentProject.getTodoList() });
        PubSub.publish({ eventName: "projectsListUpdated", data: this.getProjectsList() });
    }

    #editTodoNotes(data) {
        const currentTodo = data.currentTodo;

        currentTodo.setNotes(data.todoNotes);
        PubSub.publish({ eventName: "projectsListUpdated", data: this.getProjectsList() });
    }

    #editTodoChecked(data) {
        const currentTodo = data.currentTodo;

        currentTodo.setChecked(data.todoChecked);
        PubSub.publish({ eventName: "projectsListUpdated", data: this.getProjectsList() });
    }

    #clearCheckedTodos(projectTitle) {
        const currentProject = this.getProject(projectTitle);
        const emptyTodoList = currentProject.getTodoList().length === 0 ? true : false;

        if (!emptyTodoList) {

            currentProject.getTodoList().forEach(todo => {
                if (todo.getChecked() === "true") {
                    const todoTitle = todo.getTitle();
                    currentProject.removeTodo(todoTitle);
                }
            });

            PubSub.publish({ eventName: "todoListUpdated", data: currentProject.getTodoList() });
            PubSub.publish({ eventName: "projectsListUpdated", data: this.getProjectsList() });
        }
    }

    #subscribeEvents() {
        PubSub.subscribe({ eventName: "projectsLoaded", callbackFn: this.#loadProjects.bind(this) })
        PubSub.subscribe({ eventName: "newProjectCreated", callbackFn: this.addProject.bind(this) });
        PubSub.subscribe({ eventName: "projectEdited", callbackFn: this.#editProject.bind(this) });
        PubSub.subscribe({ eventName: "deleteProjectRequested", callbackFn: this.removeProject.bind(this) });
        PubSub.subscribe({ eventName: "newTodoCreated", callbackFn: this.#addTodo.bind(this) });
        PubSub.subscribe({ eventName: "todoEdited", callbackFn: this.#editTodo.bind(this) });
        PubSub.subscribe({ eventName: "deleteTodoRequested", callbackFn: this.#removeTodo.bind(this) });
        PubSub.subscribe({ eventName: "todoNotesUpdated", callbackFn: this.#editTodoNotes.bind(this) });
        PubSub.subscribe({ eventName: "todoCheckedUpdated", callbackFn: this.#editTodoChecked.bind(this) });
        PubSub.subscribe({ eventName: "clearCheckedBtnClicked", callbackFn: this.#clearCheckedTodos.bind(this) });
    }
}

export { Projects, createProject, createTodo };