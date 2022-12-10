import './App.css';
import axios from "axios"
import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"

import Tasks from "./components/Tasks"
import AddTask from './components/AddTask';
import NavBar from './components/NavBar';

function App() {
  axios.defaults.withCredentials = true

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    getTasks()
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
  // -------------------- End of (Helpers) --------------------

  return (
    <div className="App">
      {/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossOrigin="anonymous"></link> */}
      <link href="https://bootswatch.com/5/superhero/bootstrap.min.css" rel="stylesheet" ></link>
      <NavBar appName={"Task Tracker"} />
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

      </Routes>
    </div>
  )
}

export default App;
