import React, { useEffect, useState } from "react"
import TaskForm from "./TaskForm"

const Task = ({ task, editTasks }) => {
    const [moreInfo, setMoreInfo] = useState(false)
    const [editTaskToggel, setEditTaskToggel] = useState(false)
    const [editTaskText, setEditTaskText] = useState("Edit")
    // const [taskClassName, setTaskClassName] = useState("task")



    useEffect(() => {
        editTaskToggel ? setEditTaskText("Cancel") : setEditTaskText("Edit")

        // if (moreInfo) {
        //     setTaskClassName("task-expanded")
        // } else if (editTaskToggel) {
        //     setTaskClassName("task-edit")
        // } else {
        //     setTaskClassName("task")
        // }

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
            return (
                <div onClick={() => (!editTaskToggel) && setMoreInfo(!moreInfo)}>
                    <div className="card">
                        <div className="card-header">
                            <h2 >{task.name}</h2>
                        </div>
                    </div>
                    {/* <div className="time">{task.time}</div> */}
                </div>
            )
        }

        return (
            <div onClick={() => (!editTaskToggel) && setMoreInfo(!moreInfo)}>
                <div className="card">
                    <div className="card-header">
                        <h2>{task.name}</h2>
                    </div>
                    <div className="card-body">
                        <p className="card-text">discription: {task.discription}</p>
                        <p className="card-text">time: {task.time}</p>
                        <p className="card-text">Reminder: {String(Boolean(task.reminder))}</p>
                        <p className="card-text">id: {task.id}</p>
                        <button className="btn btn-danger" onClick={() => { deleteTask() }}>Delete task</button>
                        <button className="btn btn-primary" onClick={() => { setEditTaskToggel(!editTaskToggel) }}>{editTaskText}</button>
                    </div>
                </div>
            </div>
        )
    }


    const EditTaskForm = () => {
        if (editTaskToggel) {
            return (
                <div className="card">
                    <TaskForm task={task} form={form} />
                </div>
            )
        } else {
            return (<TaskInfo />)
        }
    }

    return (
        <EditTaskForm />
        // <div className="btn btn-primary btn-lg btn-block" onClick={() => (!editTaskToggel) && setMoreInfo(!moreInfo)}  >
        // </div>
    )
}

export default Task