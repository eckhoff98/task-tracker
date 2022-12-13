

const TasksHeader = ({ _addTask }) => {
    return (
        <div className="tasksHeader">
            <button className='btn btn-primary btn-lg' type="button" onClick={() => _addTask({
                name: "",
                discription: "",
                location: "",
                reminder: false
            })}>Add Task</button>
            <button className="btn btn-lg btn-secondary">Button</button>
            <button className="btn btn-lg btn-secondary">Button</button>
        </div>
    )
}

export default TasksHeader