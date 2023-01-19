import Task from "./Task"
import TasksHeader from "./TasksHeader"
// import { useEffect, useState } from "react"

// Firebase
// import { doc, setDoc, getDoc } from "firebase/firestore"
// import { onAuthStateChanged } from "firebase/auth";
// import { db, auth } from "../firebase-config"


const Tasks = ({ tasks, updateTask, _deleteTask, addTask, createNewTask, user }) => {

    return (
        <>
            <div className="tasks">
                <TasksHeader addTask={addTask} user={user} createNewTask={createNewTask} />
                {tasks.map((task, index) => {
                    return <Task key={index} task={task} updateTask={updateTask} _deleteTask={_deleteTask} addTask={addTask} />
                })}
            </div>

        </>
    )
}

export default Tasks