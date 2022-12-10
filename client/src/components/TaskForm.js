import { useEffect, useState } from "react"
import { BiCalendarCheck } from "react-icons/bi"

const TaskForm = ({ task, form }) => {
    const [taskData, setTaskData] = useState(task)

    const submit = () => {
        console.log("sub " + taskData.date)
        form(taskData)
    }

    const ReminderIcon = () => {
        if (taskData.reminder) return (<BiCalendarCheck size={25} />)
    }

    return (
        <form onSubmit={submit}>
            <div className="taskForm">
                <label htmlFor="name">Task name</label>
                <input
                    autoComplete="off"
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="task"
                    value={taskData.name ? taskData.name : ""}
                    onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
                />

                <label htmlFor="discription">Discription</label>
                <input
                    autoComplete="off"
                    className="form-control"
                    type="text"
                    name="discription"
                    placeholder="discription"
                    value={taskData.discription ? taskData.discription : ""}
                    onChange={(e) => setTaskData({ ...taskData, discription: e.target.value })}
                />

                <label htmlFor="time">Date/Time</label>
                <div className="taskFormTime">
                    <input
                        className="form-control"
                        type="time"
                        name="time"
                        placeholder="time"
                        value={taskData.time ? taskData.time : ""}
                        onChange={(e) => setTaskData({ ...taskData, time: e.target.value })}
                    />
                    <input
                        className="form-control"
                        type="date"
                        name="date"
                        value={taskData.date ? taskData.date : ""}
                        onChange={(e) => { setTaskData({ ...taskData, date: e.target.value }) }}
                    />
                    <div className="d-grid" onClick={() => setTaskData({ ...taskData, reminder: !taskData.reminder })}>
                        <input type="checkbox"
                            className="btn-check"
                            autoComplete="off"
                            checked={!taskData.reminder}
                            value={taskData.reminder}
                            readOnly
                        />

                        <label className="btn btn-info " htmlFor="btn-check">
                            <div className="reminder">
                                Reminder
                                <ReminderIcon />
                            </div>
                        </label>
                    </div>

                </div>

                <label htmlFor="discription">Location</label>
                <input
                    autoComplete="off"
                    className="form-control"
                    type="text"
                    name="discription"
                    placeholder="discription"
                    value={taskData.location ? taskData.location : ""}
                    onChange={(e) => setTaskData({ ...taskData, location: e.target.value })}
                />

                <label style={{ visibility: "hidden" }} htmlFor="discription">Save</label>
                <div className="d-grid">
                    <button type="submit" className="btn btn-success btn-lg" onClick={() => submit()}>Save</button>
                </div>
            </div>
        </form >
    )
}

export default TaskForm