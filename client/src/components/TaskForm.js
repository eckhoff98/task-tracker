import { useState } from "react"
import { BsAlarmFill } from "react-icons/bs"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const TaskForm = ({ task, form, _cancel }) => {
    const [taskData, setTaskData] = useState(task)

    const submit = () => {
        form({ ...taskData, name: (taskData.name === "") ? "New Task" : taskData.name, freshTask: false })
    }

    const ReminderIcon = () => {
        if (taskData.reminder) return (<BsAlarmFill size={25} />)
    }

    return (
        <form onSubmit={submit}>
            <div className="margin-1em">
                <FloatingLabel controlId="floatingInput" label="Task" className="mb-3">
                    <Form.Control
                        autoFocus
                        autoComplete="off"
                        className="form-control name"
                        type="text"
                        name="name"
                        placeholder="task"
                        value={taskData.name ? taskData.name : ""}
                        onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
                    />
                </FloatingLabel>

                <FloatingLabel controlId="floatingInput" label="Discription" className="mb-3">
                    <Form.Control
                        autoComplete="off"
                        className="form-control"
                        type="text"
                        name="discription"
                        placeholder="discription"
                        value={taskData.discription ? taskData.discription : ""}
                        onChange={(e) => setTaskData({ ...taskData, discription: e.target.value })}
                    />
                </FloatingLabel>

                <div className="taskFormTime">
                    <FloatingLabel controlId="floatingInput" label="Time" className="mb-3">
                        <Form.Control
                            className="form-control"
                            type="time"
                            name="time"
                            placeholder="time"
                            value={taskData.time ? taskData.time : ""}
                            onChange={(e) => setTaskData({ ...taskData, time: e.target.value })}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInput" label="Date" className="mb-3">
                        <Form.Control
                            className="form-control"
                            type="date"
                            name="date"
                            value={taskData.date ? taskData.date : ""}
                            onChange={(e) => { setTaskData({ ...taskData, date: e.target.value }) }}
                        />
                    </FloatingLabel>
                    {/* Reminder Button */}
                    <Button className="mb-3" type="button" variant="outline-primary" style={{ padding: "0" }} onClick={() => setTaskData({ ...taskData, reminder: !taskData.reminder })}>Reminder<ReminderIcon /></Button>
                </div>

                <FloatingLabel controlId="floatingInput" label="Location" className="mb-3">
                    <Form.Control
                        autoComplete="off"
                        className="form-control"
                        type="text"
                        name="location"
                        placeholder="location"
                        value={taskData.location ? taskData.location : ""}
                        onChange={(e) => setTaskData({ ...taskData, location: e.target.value })}
                    />
                </FloatingLabel>

                <div className="d-grid btn-grid">
                    <Button variant="outline-success" type="submit" size="lg"><strong>Save</strong></Button>
                    <Button variant="outline-danger" type="button" size="lg" onClick={() => _cancel()}><strong>Cancel</strong></Button>
                </div>
            </div>
        </form >
    )
}

export default TaskForm