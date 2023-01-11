import Task from "./Task"
import TasksHeader from "./TasksHeader"
// import { useEffect, useState } from "react"

// Firebase
// import { doc, setDoc, getDoc } from "firebase/firestore"
// import { onAuthStateChanged } from "firebase/auth";
// import { db, auth } from "../firebase-config"


const Tasks = ({ tasks, _updateTask, _deleteTask, _addTask }) => {

    return (
        <>
            <div className="tasks">
                <TasksHeader _addTask={_addTask} />
                {tasks.map((task, index) => {
                    return <Task key={index} task={task} _updateTask={_updateTask} _deleteTask={_deleteTask} />
                })}
            </div>

        </>
    )
}

export default Tasks