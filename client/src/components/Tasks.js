import Task from "./Task"

const Tasks = ({ tasks, editTasks }) => {
    return (
        <div className="tasks">
            {tasks.map((task, index) => {
                return <Task key={index} task={task} editTasks={editTasks} />
            })}
        </div>
    )
}

export default Tasks