import React, { useEffect, useState } from "react"
import TaskForm from "./TaskForm"

const Task = ({ task, editTasks }) => {
    const [moreInfo, setMoreInfo] = useState(false)
    const [editTaskToggel, setEditTaskToggel] = useState(false)
    const [editTaskText, setEditTaskText] = useState("Edit")
    const [taskClassName, setTaskClassName] = useState("task")



    useEffect(() => {
        editTaskToggel ? setEditTaskText("Cancel") : setEditTaskText("Edit")

        if (moreInfo) {
            setTaskClassName("task-expanded")
        } else if (editTaskToggel) {
            setTaskClassName("task-edit")
        } else {
            setTaskClassName("task")
        }

    }, [editTaskToggel, moreInfo])

    const form = (taskData) => {
        editTasks(taskData, { action: "change" })
        setEditTaskToggel(!editTaskToggel)
    }

    const deleteTask = () => {
        editTasks(task, { action: "delete" })
        setMoreInfo(false)
    }



    const TaskInfo = () => {
        if (!moreInfo) {
            return (<>
                <h2 >{task.name}</h2>
                <div className="time">{task.time}</div>
            </>)
        }

        return (
            <div>
                <h2>{task.name}</h2>
                <div>discription: {task.discription}</div>
                <div>time: {task.time}</div>
                <div>Reminder: {String(Boolean(task.reminder))}</div>
                <div>id: {task.id}</div>
                <button className="btn btn-primary" onClick={() => { setEditTaskToggel(!editTaskToggel) }}>{editTaskText}</button>
                <button className="btn btn-danger" onClick={() => { deleteTask() }}>Delete task</button>
            </div>
        )
    }


    const EditTaskForm = () => {
        if (editTaskToggel) {
            return (<TaskForm task={task} form={form} />)
        } else {
            return (<TaskInfo />)
        }
    }

    return (
        <div onClick={() => (!editTaskToggel) && setMoreInfo(!moreInfo)} className={taskClassName} >
            <EditTaskForm />
        </div>
    )
}

export default Task