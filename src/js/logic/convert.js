import { createProject, createTodo } from "./projects.js";

class FromParse {
    static convertToProjectsList(projectsParsed) {
        return projectsParsed.map(FromParse.convertToProject);
    }

    static convertToProject(projectParsed) {
        if (projectParsed.title && projectParsed.todoList) {
            let todoList = projectParsed.todoList.map(FromParse.convertToTodo);
            return createProject(projectParsed.title, todoList);
        } else {
            console.error("Project was not converted to its original form: Value passed was not a 'Project'");
        }
    }

    static convertToTodo(todoParsed) {
        if (todoParsed.title &&
            todoParsed.description &&
            todoParsed.dueDate &&
            todoParsed.priority
        ) {
            return createTodo(
                todoParsed.title,
                todoParsed.description,
                todoParsed.dueDate,
                todoParsed.priority,
                todoParsed.notes,
                todoParsed.checked
            );
        } else {
            console.error("Todo was not converted to its original form: Value passed was not a 'Todo'");
        }
    }
}

class ToJSONFriendlyString {
    static convertFromProjectsList(projectsList) {
        if (Array.isArray(projectsList)) {
            return projectsList.map(ToJSONFriendlyString.convertFromProject);
        } else {
            console.error("ProjectsList was not converted to a string: Value passed was not an array.");
        }
    }

    static convertFromProject(project) {
        if (project.getTitle && project.getTodoList) {
            return {
                title: project.getTitle(),
                todoList: project.getTodoList().map(ToJSONFriendlyString.convertFromTodo),
            }
        } else {
            console.error("Project was not converted to a string: Object passed was not a 'Project'");
        }
    }

    static convertFromTodo(todo) {
        if (todo.getTitle && todo.getDescription && todo.getDueDate && todo.getPriority) {
            return ({
                title: todo.getTitle(),
                description: todo.getDescription(),
                dueDate: new Date(todo.getDueDate()).toUTCString(),
                priority: todo.getPriority(),
                notes: todo.getNotes(),
                checked: todo.getChecked()
            });
        } else {
            console.error("Todo was not converted to a string: Object passed was not a 'Todo'");
        }
    }
}

export { FromParse, ToJSONFriendlyString }