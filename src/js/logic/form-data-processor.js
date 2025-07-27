import { createProject, createTodo } from "./projects";
import { PubSub } from "./pub-sub";

export const FormDataProcessor = (() => {
    const submitNewProject = (formData) => {
        const newProject = createProject(formData.projectTitle);

        PubSub.publish({ eventName: "newProjectCreated", data: newProject });
    }

    const submitNewTodo = ({ formData, currentProject }) => {
        const newTodo = createTodo(
            formData.todoTitle,
            formData.todoDescription,
            formData.todoDueDate,
            formData.todoPriority
        );

        PubSub.publish({ eventName: "newTodoCreated", data: { newTodo, currentProject } });
    }

    const submitEditedProject = ({ formData, currentProject }) => {
        PubSub.publish({ eventName: "projectEdited", data: { currentProject, newTitle: formData.projectTitle } });
    }

    const submitEditedTodo = ({ formData, currentProject }) => {
        PubSub.publish({ eventName: "todoEdited", data: { formData, currentProject } });
    }

    const submitTodoDeletion = ({ formData, currentProject }) => {
        PubSub.publish({ eventName: "deleteTodoRequested", data: { formData, currentProject } });
    }

    const submitProjectDeletion = (formData) => {
        PubSub.publish({ eventName: "deleteProjectRequested", data: formData.deleteProjectTitle });
    }

    const setupProjectFormValues = (project) => {
        const formFriendlyProjectValues = {
            title: project.getTitle(),
        }

        PubSub.publish({ eventName: "projectFormValuesSetup", data: formFriendlyProjectValues });

        return formFriendlyProjectValues;
    }

    const setupTodoFormValues = ({ todo, project }) => {
        let formFriendlyTodoValues = {
            title: todo.getTitle(),
            dueDate: todo.getDueDate().toISOString().split("T")[0],
            priority: todo.getPriority(),
            description: todo.getDescription()
        };

        PubSub.publish({ eventName: "todoFormValuesSetup", data: { todo: formFriendlyTodoValues, project } });

        return formFriendlyTodoValues;
    }

    function subscribeEvents() {
        PubSub.subscribe({ eventName: "newProjectSubmitted", callbackFn: submitNewProject });
        PubSub.subscribe({ eventName: "editedProjectSubmitted", callbackFn: submitEditedProject });
        PubSub.subscribe({ eventName: "deleteProjectSubmitted", callbackFn: submitProjectDeletion });
        PubSub.subscribe({ eventName: "newTodoSubmitted", callbackFn: submitNewTodo });
        PubSub.subscribe({ eventName: "editedTodoSubmitted", callbackFn: submitEditedTodo });
        PubSub.subscribe({ eventName: "deleteTodoSubmitted", callbackFn: submitTodoDeletion });
        PubSub.subscribe({ eventName: "editProjBtnClicked", callbackFn: setupProjectFormValues });
        PubSub.subscribe({ eventName: "editTodoBtnClicked", callbackFn: setupTodoFormValues });
    }

    subscribeEvents();

    return {
        submitNewProject,
        submitNewTodo,
        submitEditedProject,
        submitEditedTodo,
        submitTodoDeletion,
        submitProjectDeletion
    }
})()