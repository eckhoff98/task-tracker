import React, { useState } from "react"

const Task = ({ task, editTasks }) => {
    const [editTask, setEditTask] = useState(false)

    const EditTaskForm = () => {
        if (editTask) {
            return (
                <form>
                    <input type="text" placeholder="name" value={task.name} />
                    <br />
                    <input type="text" placeholder="time" value={task.time} />
                    <br />
                    <input type="text" placeholder="discription" value={task.discription} />
                </form>
            )
        } else {
            return (
                <>
                    <div>{task.id}</div>
                    <div>{task.name}</div>
                    <div>{task.time}</div>
                    <div>{task.discription}</div>
                    <div>{task.reminder}</div>
                </>
            )
        }
    }

    return (
        <div>
            <EditTaskForm />
            <button onClick={() => setEditTask(!editTask)}>Edit Task</button>
            <br />
            <button onClick={() => editTasks(task, { action: "delete" })}>Delete task</button>
            <div>---------------------------------------------------------------------</div>
            <br />
        </div>
    )
}

export default Task