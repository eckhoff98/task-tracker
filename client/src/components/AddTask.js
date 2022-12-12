import { useEffect, useState } from "react"
import TaskForm from "./TaskForm"

const AddTask = ({ _addTask }) => {
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
        _addTask(taskData)
        setAddTaskToggle(false)
    }

    const getCurrentDate = () => {
        // convert Javascript Date to HTML Input
        const now = new Date();
        const day = ("0" + now.getDate()).slice(-2);
        const month = ("0" + (now.getMonth() + 1)).slice(-2);
        const hour = ("0" + (now.getHours())).slice(-2);
        const min = ("0" + (now.getMinutes())).slice(-2);
        const today = now.getFullYear() + "-" + month + "-" + day
        console.log("today " + today)
        return today
    }

    const getCurrentTime = () => {
        // convert Javascript Date to HTML Input
        const now = new Date();
        const hour = ("0" + (now.getHours())).slice(-2);
        const min = ("0" + (now.getMinutes())).slice(-2);
        const time = `${hour}:${min}`
        return time
    }

    const AddTaskForm = () => {
        if (addTaskToggle) {
            return (
                <div className="card addTaskForm">
                    <div >
                        {addTaskToggle && <TaskForm task={{
                            name: "",
                            time: getCurrentTime(),
                            date: getCurrentDate(),
                            discription: "",
                            location: "",
                            reminder: false

                        }}
                            form={addTask} />}
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