import { useEffect, useState } from "react"
import TaskForm from "./TaskForm"

const AddTask = ({ editTasks }) => {
    const [addTaskToggle, setAddTaskToggle] = useState(false)
    const [addTaskText, setAddTaskText] = useState("")

    useEffect(() => {
        console.log("did this")
        if (addTaskToggle) {
            setAddTaskText("Cancel")
        } else {
            setAddTaskText("Add")
        }
    }, [addTaskToggle])

    const addTask = (taskData) => {
        editTasks(taskData, { action: "add" })
        setAddTaskToggle(false)
    }

    return (
        <div>
            <button onClick={() => setAddTaskToggle(!addTaskToggle)}>{addTaskText}</button>
            {addTaskToggle && <TaskForm task={{ name: "", time: "", discription: "", reminder: false }} editTasks={addTask} />}
        </div>
    )
}

export default AddTask