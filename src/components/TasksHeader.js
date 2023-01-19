import { requestPermission } from "../firebase-config"
import { Button } from "react-bootstrap"
import AllowNotifications from "./AllowNotifications"


const TasksHeader = ({ createNewTask, addTask, user }) => {
    return (
        <div className="tasksHeader">
            {/* <button className='btn btn-primary btn-lg' type="button" onClick={() => addTask({
                name: "",
                description: "",
                location: "",
                reminder: false,
                datetime: new Date()
            })}>Add Task</button> */}
            <Button variant="primary" onClick={() => createNewTask()} >Create task</Button>
            <AllowNotifications user={user} />
            <button className="btn btn-lg btn-outline-primary">Button</button>
        </div>
    )
}

export default TasksHeader