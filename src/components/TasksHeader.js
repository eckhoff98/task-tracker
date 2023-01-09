import { requestPermission } from "../firebase-config"

const TasksHeader = ({ _addTask }) => {
    return (
        <div className="tasksHeader">
            <button className='btn btn-primary btn-lg' type="button" onClick={() => _addTask({
                name: "",
                description: "",
                location: "",
                reminder: false,
                datetime: new Date()
            })}>Add Task</button>
            <button className="btn btn-lg btn-outline-primary" >Button</button>
            <button className="btn btn-lg btn-outline-primary">Button</button>
        </div>
    )
}

export default TasksHeader