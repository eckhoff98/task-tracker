import React, { useEffect, useState } from "react"
import TaskForm from "./TaskForm"

const Task = ({ task, editTasks }) => {
    const [moreInfo, setMoreInfo] = useState(false)
    const [editTaskToggel, setEditTaskToggel] = useState(false)
    const [editTaskText, setEditTaskText] = useState("Edit")

    const form = (taskData) => {
        console.log("CLICKED SAVE")
        editTasks(taskData, { action: "change" })
        setEditTaskToggel(!editTaskToggel)
    }

    useEffect(() => {
        if (editTaskToggel) {
            setEditTaskText("Cancel")
        } else {
            setEditTaskText("Edit")
        }

    }, [editTaskToggel])

    const deleteTask = () => {
        editTasks(task, { action: "delete" })
        setEditTaskToggel(!editTaskToggel)
        setMoreInfo(false)
    }

    const TaskInfo = () => {
        if (!moreInfo) {
            return (<>
                <div >task: {task.name}</div>
            </>)
        }

        return (
            <div>
                <div>task: {task.name}</div>
                <div>discription: {task.discription}</div>
                <div>time: {task.time}</div>
                <div>Reminder: {String(Boolean(task.reminder))}</div>
                <div>id: {task.id}</div>
                <button className="btn btn-primary" onClick={() => { setEditTaskToggel(!editTaskToggel) }}>{editTaskText}</button>
            </div>
        )
    }


    const EditTaskForm = () => {
        if (editTaskToggel) {
            return (
                <>
                    <TaskForm task={task} form={form} />
                    <button className="btn btn-danger" onClick={() => { deleteTask() }}>Delete task</button>
                </>
            )
        } else {
            return (<TaskInfo />)
        }
    }

    return (
        <div onClick={() => !editTaskToggel && setMoreInfo(!moreInfo)} className="task" >
            <EditTaskForm />
        </div>
    )
}

export default Task