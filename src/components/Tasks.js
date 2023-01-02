import Task from "./Task"
import TasksHeader from "./TasksHeader"
import { useEffect } from "react"


const Tasks = ({ tasks, _updateTask, _deleteTask, _addTask, nav, user }) => {
    useEffect(() => {
        if (!user) {
            return nav("/")
        }
    })

    return (
        <>
            <div className="tasks">
                <TasksHeader _addTask={_addTask} />
                {tasks.map((task, index) => {
                    return <Task key={index} task={task} _updateTask={_updateTask} _deleteTask={_deleteTask} />
                })}
            </div>

        </>
    )
}

export default Tasks