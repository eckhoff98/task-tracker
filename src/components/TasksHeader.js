import { requestPermission } from "../firebase-config"
import AllowNotifications from "./AllowNotifications"


const TasksHeader = ({ _addTask, user }) => {
    return (
        <div className="tasksHeader">
            <button className='btn btn-primary btn-lg' type="button" onClick={() => _addTask({
                name: "",
                description: "",
                location: "",
                reminder: false,
                datetime: new Date()
            })}>Add Task</button>
            <AllowNotifications user={user} />
            <button className="btn btn-lg btn-outline-primary">Button</button>
        </div>
    )
}

export default TasksHeader