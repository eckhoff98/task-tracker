import { useState } from "react"
import { BsAlarmFill } from "react-icons/bs"
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';
import { useEffect } from "react";


const TaskForm = ({ task, form, _cancel }) => {
    const [taskData, setTaskData] = useState(task)
    const [datetime, setdatetime] = useState()

    const stringToHtmlDatetime = (string) => {
        const dt = new Date(string)
        dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
        return dt.toISOString().slice(0, 16)
    }


    useEffect(() => {
        setdatetime(stringToHtmlDatetime(task.datetime))
    }, [])

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
                        defaultValue={taskData.name ? taskData.name : ""}
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
                        defaultValue={taskData.description ? taskData.description : ""}
                        onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                    />
                </FloatingLabel>

                {/* datetime */}
                <FloatingLabel controlId="floatingInput" label="datetime" className="mb-3">
                    <Form.Control
                        className="form-control"
                        type="datetime-local"
                        name="datetime"
                        placeholder="date time"
                        defaultValue={datetime}
                        onChange={(e) => {
                            setdatetime(e.target.value)
                            setTaskData({ ...taskData, datetime: new Date(e.target.value) })
                        }}
                    />
                </FloatingLabel>

                {/* Time And Date */}
                <div className="btn-grid">
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
                        defaultValue={taskData.location ? taskData.location : ""}
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