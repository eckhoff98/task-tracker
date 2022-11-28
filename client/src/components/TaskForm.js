import { useEffect, useState } from "react"

const TaskForm = ({ task, editTasks }) => {
    const [taskData, setTaskData] = useState(task)



    const submit = (e) => {
        e.preventDefault()
        editTasks(taskData)
        console.log(taskData)
    }


    return (
        <form onSubmit={submit}>
            <label htmlFor="name">Task name</label>
            <input
                type="text"
                name="name"
                placeholder="name"
                value={taskData.name ? taskData.name : ""}
                onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
            />
            <br />

            <label htmlFor="time">Time</label>
            <input
                type="text"
                name="time"
                placeholder="time"
                value={taskData.time ? taskData.time : ""}
                onChange={(e) => setTaskData({ ...taskData, time: e.target.value })}
            />
            <br />

            <label htmlFor="discription">Discription</label>
            <input
                type="text"
                name="discription"
                placeholder="discription"
                value={taskData.discription ? taskData.discription : ""}
                onChange={(e) => setTaskData({ ...taskData, discription: e.target.value })}
            />
            <br />

            <label htmlFor="reminder">Set Reminder</label>
            <input
                type="checkbox"
                name="reminder"
                // checked={taskData.reminder ? taskData.reminder : false}
                // value={taskData.reminder ? taskData.reminder : false}
                checked={taskData.reminder}
                value={taskData.reminder}
                onChange={(e) => setTaskData({ ...taskData, reminder: e.currentTarget.checked })}
            />
            <br />

            <button type="submit">submit</button>
            <br />
            <br />
        </form>
    )
}

export default TaskForm