import Task from "./Task"

const Tasks = ({ tasks, _updateTask, _deleteTask, _addTask }) => {
    return (
        <>
            <button className='btn btn-primary btn-lg' type="button" onClick={() => _addTask({
                name: "",

                discription: "",
                location: "",
                reminder: false
            })}>Add Task</button>
            <div className="tasks">
                {tasks.map((task, index) => {
                    return <Task key={index} task={task} _updateTask={_updateTask} _deleteTask={_deleteTask} />
                })}
            </div>
        </>
    )
}

export default Tasks