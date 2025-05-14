import { Valid } from "./utility.js";
import { ProjectsStorage } from "./localstorage.js";

function createTodo(title, description, dueDate, priority, notes = "", checked = "false") {
    let state = {
        title,
        description,
        dueDate: new Date(dueDate),
        priority,
        notes,
        checked
    }

    const titleGetter = (stateArg) => ({ getTitle: () => stateArg.title });
    const titleSetter = (stateArg) => ({
        setTitle: (newTitle) => {
            if (Valid.setterValue("Title", stateArg.title, newTitle)) {
                const oldTitle = stateArg.title;
                stateArg.title = newTitle;
                console.log(`Todo '${oldTitle}' has been renamed to '${newTitle}'`);
            } else {
                console.error(`Unable to rename todo '${newTitle}'`);
            }
        }
    });

    const descriptionGetter = (stateArg) => ({ getDescription: () => stateArg.description });
    const descriptionSetter = (stateArg) => ({
        setDescription: (newDescription) => {
            if (Valid.setterValue("Description", stateArg.description, newDescription)) {
                stateArg.description = newDescription;
                console.log(`Todo '${titleGetter(stateArg).getTitle()}'s description has been set.`);
            } else {
                console.error(`Unable to set the description of '${titleGetter(stateArg).getTitle()}'`);
            }
        }
    });

    const dueDateGetter = (stateArg) => ({ getDueDate: () => stateArg.dueDate });
    const dueDateSetter = (stateArg) => ({
        setDueDate: (newDueDate) => {
            if (Valid.setterValue("Due Date", stateArg.dueDate, newDueDate)) {
                stateArg.dueDate = new Date(newDueDate);
                console.log(`Todo '${titleGetter(stateArg).getTitle()}'s due date has been set.`);
            } else {
                console.error(`Unable to set the due date of '${titleGetter(stateArg).getTitle()}'`);
            }
        }
    });

    const priorityGetter = (stateArg) => ({ getPriority: () => stateArg.priority });
    const prioritySetter = (stateArg) => ({
        setPriority: (newPriority) => {
            if (Valid.setterValue("Priority", stateArg.priority, newPriority)) {
                stateArg.priority = newPriority;
                console.log(`Todo '${titleGetter(stateArg).getTitle()}'s priority has been set.`);
            } else {
                console.error(`Unable to set the priority of '${titleGetter(stateArg).getTitle()}'`);
            }
        }
    });

    const notesGetter = (stateArg) => ({ getNotes: () => stateArg.notes });
    const notesSetter = (stateArg) => ({
        setNotes: (newNotes) => {
            if (stateArg.notes !== newNotes) {
                stateArg.notes = newNotes;
                console.log(`Todo '${titleGetter(stateArg).getTitle()}'s notes has been set.`);
            } else {
                console.error(`Unable to set the notes of '${titleGetter(stateArg).getTitle()}'`);
            }
        }
    });

    const checkedGetter = (stateArg) => ({ getChecked: () => stateArg.checked });
    const checkedSetter = (stateArg) => ({
        setChecked: (newChecked) => {
            if (newChecked === "true" || newChecked === "false") {
                stateArg.checked = newChecked;
                console.log(`Todo '${titleGetter(stateArg).getTitle()}'s checked has been set.`);
            } else {
                console.error(`Unable to set the checked of ${titleGetter(stateArg).getTitle()}`);
            }
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

    const titleGetter = (stateArg) => ({ getTitle: () => stateArg.title });

    const titleSetter = (stateArg) => ({
        setTitle: (newTitle) => {
            if (Valid.setterValue("Title", stateArg.title, newTitle)) {
                const oldTitle = stateArg.title;
                stateArg.title = newTitle;
                console.log(`Todo '${oldTitle}' has been renamed to '${newTitle}'`);
            }
            else {
                console.error(`Unable to rename todo '${newTitle}'`);
            }
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

            if (Valid.objectValue(todo)) {
                console.log(`Todo '${todoTitleToGet}' was retrieved.`);
                return todo;
            }

            console.error(`Todo was not retrieved: '${todoTitleToGet}' was not found.`);
            return null;
        }
    });

    const todoGetterViaIndex = (stateArg) => ({
        getTodoViaIndex: (indexOfTodo) => {
            const todo = stateArg.todoList[indexOfTodo];

            if (Valid.objectValue(todo)) {
                console.log(`Todo '${todo.getTitle()}' was retrieved.`);
                return todo;
            }
            console.error(`Todo was not retrieved: index '${indexOfTodo}' was not found.`);
            return null;
        }
    });

    const indexGetterOfTodo = (stateArg) => ({
        getIndexOfTodo: (todoTitle) => {
            const index = todoListGetter(stateArg).getTodoList().findIndex(todo => {
                return todo.getTitle() === todoTitle;
            });

            if (Valid.indexValue(index)) {
                console.log(`Index for Todo '${todoTitle}' was retrieved.`);
                return index;
            }

            console.error(`Todo list index was not retrieved: '${todoTitle}' was not found.`);
            return null;
        }
    });

    const todoAdder = (stateArg) => ({
        addTodo: (newTodo) => {
            if (newTodo.getTitle) {
                const newTodoTitle = newTodo.getTitle();
                const todoExists = todoListGetter(stateArg).getTodoList().some(todo => {
                    return todo.getTitle() === newTodoTitle;
                });

                if (todoExists) {
                    console.error(`Todo was not added: Todo '${newTodoTitle}' already exists.`);
                } else {
                    stateArg.todoList.push(newTodo);
                    console.log(`Todo '${newTodoTitle}' has been added.`);
                }
            } else {
                console.error(`Todo was not added: Object passed was not a todo.`);
            }
        }
    });

    const todoRemover = (stateArg) => ({
        removeTodo: (todoTitleToRemove) => {
            const indexToRemove = indexGetterOfTodo(stateArg).getIndexOfTodo(todoTitleToRemove);
            if (Valid.indexValue(indexToRemove)) {
                stateArg.todoList.splice(indexToRemove, 1);
                console.log(`Todo '${todoTitleToRemove}' has been removed.`);
            } else {
                console.error(`Todo was not removed: Todo '${todoTitleToRemove}' was not found.`);
            }
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
            console.error("Unable to instantiate: Cannot have more than one instance of Projects.");
            return;
        }
        Projects.#instantiated = true;
        const storedProjectsList = ProjectsStorage.load();
        this.#projectsList = storedProjectsList ? storedProjectsList : [createProject("Default")];
    };

    getProjectsList() {
        return this.#projectsList.map(project => { return project });
    }

    getProject(projectTitle) {
        const project = this.getProjectsList().find(project => project.getTitle() === projectTitle);
        if (Valid.objectValue(project)) {
            console.log(`Project '${projectTitle}' was retrieved.`)
            return project;
        }
        console.error(`Project was not retrieved: '${projectTitle}' was not found.`)
        return null;
    }

    getProjectViaIndex(index) {
        const project = this.getProjectsList()[index];
        if (Valid.objectValue(project)) {
            console.log(`Project '${project.getTitle()}' was retrieved.`)
            return project;
        }
        console.error(`Project was not retrieved: index '${index}' was not found.`)
        return null;
    }

    getIndexOfProject(projectTitle) {
        const index = this.getProjectsList().findIndex(project => project.getTitle() === projectTitle);
        if (Valid.indexValue(index)) {
            console.log(`Index for project '${projectTitle}' was retrieved.`);
            return index;
        }
        console.error(`Projects index was not retrieved: '${projectTitle}' was not found.`);
        return null;
    }

    addProject(newProject) {
        if (newProject.getTitle) {
            const newProjectTitle = newProject.getTitle();
            const projectExists = this.getProjectsList().some(project => {
                return project.getTitle() === newProjectTitle;
            });

            if (projectExists) {
                console.error(`Project was not added: Project '${newProjectTitle}' already exists.`);
            } else {
                this.#projectsList.push(newProject);
                console.log(`Project '${newProjectTitle}' has been added.`);
            }
        } else {
            console.error(`Project was not added: Object passed was not a project.`);
        }
    }

    removeProject(projectTitle) {
        const indexToRemove = this.getIndexOfProject(projectTitle);
        if (Valid.indexValue(indexToRemove)) {
            this.#projectsList.splice(indexToRemove, 1);
            console.log(`Project '${projectTitle}' has been removed.`);
        } else {
            console.error(`Project '${projectTitle}' was not removed: Project was not found.`);
        }
    }
}

export { Projects, createProject, createTodo };