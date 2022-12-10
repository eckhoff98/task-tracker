import { useState } from "react"

const TaskForm = ({ task, form }) => {
    const [taskData, setTaskData] = useState(task)

    const submit = () => {
        // e.preventDefault()
        form(taskData)
    }

    return (
        <form onSubmit={submit}>
            <div className="taskForm">
                <label htmlFor="name">Task name</label>
                <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="task"
                    value={taskData.name ? taskData.name : ""}
                    onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
                />
                <label htmlFor="time">Time</label>
                <div className="taskFormTime">
                    <input
                        className="form-control"
                        type="text"
                        name="time"
                        placeholder="time"
                        value={taskData.time ? taskData.time : ""}
                        onChange={(e) => setTaskData({ ...taskData, time: e.target.value })}
                    />
                    {/* <button className="btn btn-primary">Reminder</button> */}
                    <div className="d-grid" onClick={() => setTaskData({ ...taskData, reminder: !taskData.reminder })}>
                        <input type="checkbox"
                            className="btn-check"
                            autoComplete="off"
                            checked={taskData.reminder}
                            value={taskData.reminder}
                            readOnly
                        // onChange={(e) => setTaskData({ ...taskData, reminder: e.currentTarget.checked })}
                        />
                        <label className="btn btn-info" htmlFor="btn-check">Reminder</label>
                    </div>
                </div>

                <label htmlFor="discription">Discription</label>
                <input
                    className="form-control"
                    type="text"
                    name="discription"
                    placeholder="discription"
                    value={taskData.discription ? taskData.discription : ""}
                    onChange={(e) => setTaskData({ ...taskData, discription: e.target.value })}
                />

                {/* <div className="form-check">
                    <input
                    className="form-check-input"
                    type="checkbox"
                    name="reminder"
                    checked={taskData.reminder}
                    value={taskData.reminder}
                    onChange={(e) => setTaskData({ ...taskData, reminder: e.currentTarget.checked })}
                    />
                    <label className="form-check-label" htmlFor="reminder">Set Reminder</label>
                </div> */}
                <label style={{ visibility: "hidden" }} htmlFor="discription">Save</label>
                <div className="d-grid">
                    <button type="submit" className="btn btn-success " onClick={() => submit()}>Save</button>
                </div>
            </div>
        </form >
    )
}

export default TaskForm