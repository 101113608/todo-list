import { createProject, createTodo } from "./projects.js";

class FromParse {
    static convertToProjectsList(projectsParsed) {
        return projectsParsed.map(FromParse.convertToProject);
    }

    static convertToProject(projectParsed) {
        if (!(projectParsed.title && projectParsed.todoList)) {
            throw new Error("Project was not converted to its original form: value passed was not a property of the Project object.");
        }

        const todoList = projectParsed.todoList.map(FromParse.convertToTodo);
        return createProject(projectParsed.title, todoList);
    }

    static convertToTodo(todoParsed) {
        const todoParsedProperties = ['title', 'description', 'dueDate', 'priority'];
        const isTodoParsed = todoParsedProperties.every(property => property in todoParsed);

        if (!isTodoParsed) {
            throw new Error("Todo was not converted to its original form: value passed was not a property of the Todo object.");
        }

        return createTodo(
            todoParsed.title,
            todoParsed.description,
            todoParsed.dueDate,
            todoParsed.priority,
            todoParsed.notes,
            todoParsed.checked
        );
    }
}

class ToJSONFriendlyString {
    static convertFromProjectsList(projectsList) {
        if (!Array.isArray(projectsList)) {
            throw new Error("ProjectsList was not converted to JSON format: value passed was not an Array.");
        }

        return projectsList.map(ToJSONFriendlyString.convertFromProject);
    }

    static convertFromProject(project) {
        if (!(project.getTitle && project.getTodoList)) {
            throw new Error("Project was not converted to JSON format: object passed was not a Project object.");
        }

        return {
            title: project.getTitle(),
            todoList: project.getTodoList().map(ToJSONFriendlyString.convertFromTodo),
        }
    }

    static convertFromTodo(todo) {
        const todoMethods = ['getTitle', 'getDescription', 'getDueDate', 'getPriority'];
        const isTodo = todoMethods.every(property => property in todo);

        if (!isTodo) {
            throw new Error("Todo was not converted to JSON format: object passed was not a Todo object.");
        }

        return ({
            title: todo.getTitle(),
            description: todo.getDescription(),
            dueDate: new Date(todo.getDueDate()).toUTCString(),
            priority: todo.getPriority(),
            notes: todo.getNotes(),
            checked: todo.getChecked()
        });
    }
}

export { FromParse, ToJSONFriendlyString }