import './App.css';
import axios from "axios"
import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"

import Tasks from "./components/Tasks"
import AddTask from './components/AddTask';
import NavBar from './components/NavBar';
import Login from "./components/Login"
import Register from "./components/Register"
import PocketBase from "pocketbase"


function App() {
  axios.defaults.withCredentials = true
  const pb = new PocketBase('http://127.0.0.1:8090');


  const [tasks, setTasks] = useState([])

  useEffect(() => {
    getTasks()
    console.log("render")
  }, [])

  // Helper Functions 
  const getTasks = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/tasks"
    }).then((res) => {
      setTasks([...res.data])
    })
  }

  const postTasks = (task) => {
    const data = {
      task: task
    }
    axios({
      method: "POST",
      withCredentials: true,
      data: data,
      url: "http://localhost:5000/tasks"
    }).then((res) => {
      getTasks()
    })
  }

  const putTasks = (task) => {
    const data = {
      task: task
    }
    axios({
      method: "PUT",
      withCredentials: true,
      data: data,
      url: "http://localhost:5000/tasks"
    }).then((res) => {
      getTasks()
    })
  }

  const deleteTasks = (task) => {
    const data = {
      task: task
    }
    axios({
      method: "DELETE",
      withCredentials: true,
      data: data,
      url: "http://localhost:5000/tasks"
    }).then((res) => {
      getTasks()
    })
  }

  const editTasks = (task, change) => {
    if (change.action === "delete") {
      // setTasks(tasks.filter((t) => t.id !== task.id))
      deleteTasks(task)
    }
    else if (change.action === "add") {
      // setTasks([...tasks, task])
      postTasks(task)
    }
    else if (change.action === "change") {
      putTasks(task)
    }

  }

  const logout = () => {
    console.log("LOGOUT")
    pb.authStore.clear();
  }
  // -------------------- End of (Helpers) --------------------

  return (
    <div className="App">

      <link href="https://bootswatch.com/5/superhero/bootstrap.min.css" rel="stylesheet" ></link>

      <NavBar appName={"Task Tracker"} loggedIn={pb.authStore.isValid} logout={logout} />
      <Routes>
        <Route path="/" element={
          <>
            <AddTask editTasks={editTasks} />
            <Tasks tasks={tasks} editTasks={editTasks} />
          </>
        } />
        <Route path="/about" element={
          <>
            about info
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </div>
  )
}

export default App;
