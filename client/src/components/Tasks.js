import Task from "./Task"
import TasksHeader from "./TasksHeader"

const Tasks = ({ tasks, _updateTask, _deleteTask, _addTask }) => {
    return (
        <>
            <TasksHeader _addTask={_addTask} />
            <div className="tasks">
                {tasks.map((task, index) => {
                    return <Task key={index} task={task} _updateTask={_updateTask} _deleteTask={_deleteTask} />
                })}
            </div>
        </>
    )
}

export default Tasks