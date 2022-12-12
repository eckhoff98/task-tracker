import Task from "./Task"

const Tasks = ({ tasks, _updateTask, _deleteTask, _cancel }) => {
    return (
        <div className="tasks">
            {tasks.map((task, index) => {
                return <Task key={index} task={task} _updateTask={_updateTask} _deleteTask={_deleteTask} />
            })}
        </div>
    )
}

export default Tasks