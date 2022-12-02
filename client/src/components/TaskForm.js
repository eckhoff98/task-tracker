import { useState } from "react"

const TaskForm = ({ task, form }) => {
    const [taskData, setTaskData] = useState(task)

    const submit = () => {
        // e.preventDefault()
        console.log(taskData)
        form(taskData)
    }

    return (
        <form onSubmit={submit}>
            <div className="taskForm">
                <label className="hideLable" htmlFor="name">Task name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="task"
                    value={taskData.name ? taskData.name : ""}
                    onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
                />

                <label className="hideLable" htmlFor="time">Time</label>
                <input
                    type="text"
                    name="time"
                    placeholder="time"
                    value={taskData.time ? taskData.time : ""}
                    onChange={(e) => setTaskData({ ...taskData, time: e.target.value })}
                />

                <label className="hideLable" htmlFor="discription">Discription</label>
                <input
                    type="text"
                    name="discription"
                    placeholder="discription"
                    value={taskData.discription ? taskData.discription : ""}
                    onChange={(e) => setTaskData({ ...taskData, discription: e.target.value })}
                />

                <div>
                    <label htmlFor="reminder">Set Reminder</label>
                    <input
                        type="checkbox"
                        name="reminder"
                        checked={taskData.reminder}
                        value={taskData.reminder}
                        onChange={(e) => setTaskData({ ...taskData, reminder: e.currentTarget.checked })}
                    />
                </div>

                <button type="button" onClick={() => submit()}>Save</button>
            </div>
        </form>
    )
}

export default TaskForm