import React, { useEffect, useState } from "react"
import TaskForm from "./TaskForm"
import { IoIosAlarm } from "react-icons/io"
import moment from "moment"


const Task = ({ task, _updateTask, _deleteTask }) => {
    const [moreInfo, setMoreInfo] = useState(false)
    const [editTaskToggel, setEditTaskToggel] = useState(false)
    const [editTaskText, setEditTaskText] = useState("Edit")

    useEffect(() => {
        if (task.freshTask) {
            setEditTaskToggel(true)
        }
    }, [])
    useEffect(() => {
        editTaskToggel ? setEditTaskText("Cancel") : setEditTaskText("Edit")
        timeToReminder(task.date, task.time)
    }, [editTaskToggel, moreInfo])


    const ReminderIcon = () => {
        if (task.reminder) return (<IoIosAlarm size={25} />)
    }

    const form = (task) => {
        _updateTask(task)
        setEditTaskToggel(!editTaskToggel)
    }

    const deleteTask = () => {
        _deleteTask(task)
        setMoreInfo(false)
    }

    const timeToReminder = (date, time) => {
        const reminder = new Date(date + " " + time)
        return moment(reminder).fromNow()
    }

    const cancel = () => {
        if (task.freshTask) {
            deleteTask()
        } else {
            setEditTaskToggel(false)
        }
    }


    const TaskInfo = () => {
        if (!moreInfo) {
            return (
                <div onClick={() => (!editTaskToggel) && setMoreInfo(!moreInfo)}>
                    <div className="card bg-dark">
                        <div className="card-header taskLess">
                            <h2 >{task.name}</h2>
                            <h2 className="taskLessInfo">{timeToReminder(task.date, task.time)} &nbsp; <ReminderIcon /></h2>
                        </div>
                    </div>
                    {/* <div className="time">{task.time}</div> */}
                </div>
            )
        }

        return (
            <div onClick={() => (!editTaskToggel) && setMoreInfo(!moreInfo)}>
                <div className="card bg-dark">
                    <div className="card-header taskLess">
                        <h2 >{task.name}</h2>
                        <h2 className="taskLessInfo">
                            {timeToReminder(task.date, task.time)} &nbsp; <ReminderIcon />
                        </h2>
                    </div>
                    <div className="card-body">
                        <h3 className="card-text">discription: {task.discription}</h3>

                        <p className="card-text">date: {task.date}</p>
                        <p className="card-text">time: {task.time}</p>
                        <p className="card-text">Reminder: {String(Boolean(task.reminder))}</p>
                        <p className="card-text">location: {task.location}</p>
                        <p className="card-text">id: {task.id}</p>
                        <div className="taskEditButtons">
                            <button className="btn btn-outline-primary btn-lg" onClick={() => { setEditTaskToggel(!editTaskToggel) }}><strong>{editTaskText}</strong></button>
                            <button className="btn btn-outline-danger btn-lg" onClick={() => { deleteTask() }}><strong>Delete </strong></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    const EditTaskForm = () => {
        if (editTaskToggel) {
            return (
                <div className="card bg-dark">
                    <TaskForm
                        task={task}
                        form={form}
                        _cancel={cancel} />
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