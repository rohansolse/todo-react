import React from "react";
import CreateTask from "./CreateTask";
import TaskList from "./TaskList";

const tasks = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: tasks,
        };
    }
    createTask = (task) => {
        if (task.trim() === "") {
            alert("Task can't be empty");
            return;
        } else {
            tasks.push({ task, isCompleted: false });
            this.setState({ tasks: tasks });
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    };
    toggleTask = (taskId) => {
        const taskItem = tasks[taskId];
        taskItem.isCompleted = !taskItem.isCompleted;
        this.setState({ tasks });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };
    deleteTask = (taskId) => {
        tasks.splice(taskId, 1);
        this.setState({ tasks: tasks });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };
    editTask = (taskid, task) => {
        const taskItem = tasks[taskid];
        taskItem.task = task;
        this.setState({ tasks });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };
    render() {
        return (
            <div className="main">
                <h1 className="todo">To Do</h1>
                <div className="content">
                    <CreateTask createTask={this.createTask} />
                    <TaskList
                        tasks={this.state.tasks}
                        deleteTask={this.deleteTask}
                        editTask={this.editTask}
                        toggleTask={this.toggleTask}
                    />
                </div>
            </div>
        );
    }
}

export default Main;
