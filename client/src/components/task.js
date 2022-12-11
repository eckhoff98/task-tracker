import React, { useEffect, useState } from "react"
import TaskForm from "./TaskForm"

const Task = ({ task, _updateTask, _deleteTask }) => {
    const [moreInfo, setMoreInfo] = useState(false)
    const [editTaskToggel, setEditTaskToggel] = useState(false)
    const [editTaskText, setEditTaskText] = useState("Edit")



    useEffect(() => {
        editTaskToggel ? setEditTaskText("Cancel") : setEditTaskText("Edit")
    }, [editTaskToggel, moreInfo])

    const form = (taskData) => {
        _updateTask(taskData)
        setEditTaskToggel(!editTaskToggel)
    }

    const deleteTask = () => {
        _deleteTask(task)
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
                        <p className="card-text">date: {task.date}</p>
                        <p className="card-text">time: {task.time}</p>
                        <p className="card-text">Reminder: {String(Boolean(task.reminder))}</p>
                        <p className="card-text">location: {task.location}</p>
                        <p className="card-text">id: {task.id}</p>
                        <div className="taskEditButtons">
                            <button className="btn btn-primary btn-lg" onClick={() => { setEditTaskToggel(!editTaskToggel) }}>{editTaskText}</button>
                            <button className="btn btn-danger btn-lg" onClick={() => { deleteTask() }}>Delete task</button>
                        </div>
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