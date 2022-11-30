import './App.css';
import axios from "axios"
import { useState, useEffect } from "react"

import Tasks from "./components/Tasks"
import AddTask from './components/AddTask';

function App() {
  axios.defaults.withCredentials = true

  const [tasks, setTasks] = useState([])


  const getTasks = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/tasks"
    }).then((res) => {
      console.log(res.data)
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

  useEffect(() => {
    getTasks()
  }, [])


  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <AddTask editTasks={editTasks} />
      <Tasks tasks={tasks} editTasks={editTasks} />
    </div>
  )
}

export default App;
