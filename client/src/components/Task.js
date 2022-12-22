import React, { useEffect, useState } from "react"
import TaskForm from "./TaskForm"
import { BsAlarmFill } from "react-icons/bs"
import { BsPencilSquare } from "react-icons/bs"
import { BsFillCalendarEventFill } from "react-icons/bs"
import { BsFillPinMapFill } from "react-icons/bs"
import moment from "moment"


const Task = ({ task, _updateTask, _deleteTask }) => {

    const [moreInfo, setMoreInfo] = useState(false)
    const [editTaskToggel, setEditTaskToggel] = useState(task.freshTask)

    useEffect(() => {
        timeToReminder(task.date, task.time)
    }, [editTaskToggel, moreInfo])

    const ReminderIcon = () => {
        if (task.reminder) return (<BsAlarmFill size={25} />)
    }

    const form = (task) => {
        _updateTask(task)
        setEditTaskToggel(false)
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
                        <p className="card-text"><BsPencilSquare /> {task.discription}</p>
                        <p className="card-text"><BsFillCalendarEventFill /> {task.date} {task.time}</p>
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

export default Task