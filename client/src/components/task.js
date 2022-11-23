import React, { useState } from "react"
import TaskForm from "./TaskForm"

const Task = ({ task, editTasks }) => {
    const [editTaskToggel, setEditTaskToggel] = useState(false)

    const modifyTask = (taskData) => {
        editTasks(taskData, { action: "edit" })
    }

    const EditTaskForm = () => {
        if (editTaskToggel) {
            return (
                <TaskForm task={task} editTasks={modifyTask} />
            )
        } else {
            return (
                <>
                    <div>task: {task.name}</div>
                    <div>discription: {task.discription}</div>
                    <div>time: {task.time}</div>
                    <div>Reminder: {String(task.reminder)}</div>
                    <div>id: {task.id}</div>
                </>
            )
        }
    }

    return (
        <div>
            <EditTaskForm />
            <button onClick={() => setEditTaskToggel(!editTaskToggel)}>Edit Task</button>
            <br />
            <button onClick={() => editTasks(task, { action: "delete" })}>Delete task</button>
            <div>---------------------------------------------------------------------</div>
            <br />
        </div>
    )
}

export default Task