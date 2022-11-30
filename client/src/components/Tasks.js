import Task from "./Task"

const Tasks = ({ tasks, editTasks }) => {
    return (
        <div className="blue-block">
            {tasks.map((task, index) => {
                return <Task key={index} task={task} editTasks={editTasks} />
            })}
        </div>
    )
}

export default Tasks