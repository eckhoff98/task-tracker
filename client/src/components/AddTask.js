import { useEffect, useState } from "react"
import TaskForm from "./TaskForm"



const AddTask = ({ editTasks }) => {
    const [addTaskToggle, setAddTaskToggle] = useState(false)
    const [addTaskText, setAddTaskText] = useState("")
    const [buttonClassName, setButtonClassName] = useState("btn btn-primary btn-lg")

    useEffect(() => {
        if (addTaskToggle) {
            setAddTaskText("Cancel")
            setButtonClassName("btn btn-danger btn-lg")
        } else {
            setAddTaskText("Add")
            setButtonClassName("btn btn-primary btn-lg")
        }
    }, [addTaskToggle])

    const addTask = (taskData) => {
        editTasks(taskData, { action: "add" })
        setAddTaskToggle(false)
    }
    const AddTaskForm = () => {
        if (addTaskToggle) {
            return (
                <div className="card addTaskForm">
                    <div >
                        {addTaskToggle && <TaskForm task={{ name: "", time: "", discription: "", reminder: false }} form={addTask} />}
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="addTask">
            <div className="addTaskButtons">
                <button className={buttonClassName} onClick={() => setAddTaskToggle(!addTaskToggle)}>{addTaskText}</button>
                <button className="btn btn-secondary">Test button</button>
                <button className="btn btn-secondary">Test button</button>
            </div>
            <AddTaskForm />
        </div>
    )
}

export default AddTask