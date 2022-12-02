import { useEffect, useState } from "react"
import TaskForm from "./TaskForm"

const AddTask = ({ editTasks }) => {
    const [addTaskToggle, setAddTaskToggle] = useState(false)
    const [addTaskText, setAddTaskText] = useState("")
    const [buttonClassName, setButtonClassName] = useState("btn btn-primary")

    useEffect(() => {
        if (addTaskToggle) {
            setAddTaskText("Cancel")
            setButtonClassName("btn btn-danger")
        } else {
            setAddTaskText("Add")
            setButtonClassName("btn btn-primary")
        }
    }, [addTaskToggle])

    const addTask = (taskData) => {
        editTasks(taskData, { action: "add" })
        setAddTaskToggle(false)
    }

    return (
        <div className="addTask">
            <button className={buttonClassName} onClick={() => setAddTaskToggle(!addTaskToggle)}>{addTaskText}</button>
            {addTaskToggle && <TaskForm task={{ name: "", time: "", discription: "", reminder: false }} form={addTask} />}
        </div>
    )
}

export default AddTask