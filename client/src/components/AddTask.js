import { useState } from "react"
import TaskForm from "./TaskForm"

const AddTask = ({ editTasks }) => {
    const [name, setName] = useState("")
    const [time, setTime] = useState("")
    const [discription, setDiscription] = useState("")
    const [reminder, setReminder] = useState(false)

    // const [addTask, setAddTask] = useState({})

    const addTask = (taskData) => {

        editTasks(taskData, { action: "add" })
    }

    return (
        <div>
            <h2> Add task  </h2>
            <TaskForm task={{}} editTasks={addTask} />
            <div>---------------------------------------------------------------------</div>

        </div>
    )
}

export default AddTask