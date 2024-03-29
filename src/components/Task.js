import React, { useEffect, useState } from "react"
import TaskForm from "./TaskForm"

// Icons
import {
    BsFillPinMapFill,
    BsFillClockFill,
    BsFillCalendarEventFill,
    BsPencilSquare,
    BsAlarmFill
} from "react-icons/bs"


import moment from "moment"
import { convertToDate, convertToTime } from "../time"


const Task = ({ task, updateTask, _deleteTask, addTask }) => {

    const [moreInfo, setMoreInfo] = useState(false)
    const [editTaskToggel, setEditTaskToggel] = useState(task.freshTask)

    const ReminderIcon = () => {
        if (task.reminder) return (
            <>
                &nbsp;
                &nbsp;
                <BsAlarmFill size={15} />
            </>
        )
    }

    const form = (task) => {
        updateTask(task)
        setEditTaskToggel(false)
    }

    const deleteTask = () => {
        _deleteTask(task)
        setMoreInfo(false)
    }

    const timeToReminder = (datetimeString) => {
        const reminder = new Date(datetimeString)
        return moment(reminder).fromNow()
    }

    const cancel = () => {
        if (task.freshTask) return deleteTask()
        return setEditTaskToggel(false)
    }


    const TaskInfo = () => {
        const notificationActive = (new Date(task.datetime) <= new Date()) && task.reminder
        if (!moreInfo) {
            return (
                <div onClick={() => (!editTaskToggel) && setMoreInfo(!moreInfo)}>
                    <div className={notificationActive ? "card bg-dark border-success" : "card bg-dark"}>
                        <div className="card-header taskLess">
                            <h2 >{task.name}</h2>
                            <div className="taskLessInfo">
                                {timeToReminder(task.datetime)}
                                <ReminderIcon />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div onClick={() => (!editTaskToggel) && setMoreInfo(!moreInfo)}>
                <div className={notificationActive ? "card bg-dark border-success" : "card bg-dark"}>
                    <div className="card-header taskLess">
                        <h2 >{task.name}</h2>
                        <div className="taskLessInfo">
                            {timeToReminder(task.datetime)}
                            <ReminderIcon />
                        </div>
                        {/* <h2 className="taskLessInfo">
                            {timeToReminder(task.datetime)} &nbsp; <ReminderIcon />
                        </h2> */}
                    </div>
                    <div className="card-body">
                        <p className="card-text"><BsPencilSquare /> {task.description}</p>
                        <p className="card-text"><BsFillCalendarEventFill /> {convertToDate(task.datetime)}</p>
                        <p className="card-text"><BsFillClockFill /> {new Date(task.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        <p className="card-text"><BsFillPinMapFill /> {task.location}</p>
                        <div className="btn-grid">
                            <button className="btn btn-outline-primary btn-lg" onClick={() => { setEditTaskToggel(true) }}><strong>Edit</strong></button>
                            <button className="btn btn-outline-danger btn-lg" onClick={() => { deleteTask() }}><strong>Delete </strong></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    if (editTaskToggel) {
        return (
            <div className="card bg-dark" >
                <TaskForm task={task} form={form} _cancel={cancel} addTask={addTask} updateTask={updateTask} setEditTaskToggel={setEditTaskToggel} />
            </div>
        )
    } else {
        return (<TaskInfo />)
    }
}

export default Task