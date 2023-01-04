import { useState } from "react"
import { BsAlarmFill } from "react-icons/bs"
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';


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

                <FloatingLabel controlId="floatingInput" label="Description" className="mb-3">
                    <Form.Control
                        autoComplete="off"
                        className="form-control"
                        type="text"
                        name="description"
                        placeholder="description"
                        value={taskData.description ? taskData.description : ""}
                        onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                    />
                </FloatingLabel>

                <div className="btn-grid">
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

                    </div>

                    {/* Reminder Button */}
                    <Button className="mb-3"
                        type="button"
                        variant="outline-primary"
                        size="lg"
                        style={{ padding: "0" }}
                        onClick={() => setTaskData({ ...taskData, reminder: !taskData.reminder })}
                    >Reminder ( ! )<ReminderIcon /></Button>
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