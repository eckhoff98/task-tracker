import './App.css';
import axios from "axios"
import { useState, useEffect } from "react"

import TaskComponent from "./components/Task"
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
      setTasks(res.data)
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
    })
  }

  const putTasks = () => {
    const data = {
      task: "task to put"
    }
    axios({
      method: "PUT",
      withCredentials: true,
      data: data,
      url: "http://localhost:5000/tasks"
    }).then((res) => {
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
    })
  }


  const editTasks = (task, change) => {
    if (change.action === "delete") {
      setTasks(tasks.filter((t) => t.id !== task.id))
      deleteTasks(task)
      return console.log(`Delete task: ${task.name}`)
    }
    else if (change.action === "add") {
      setTasks([...tasks, task])
      postTasks(task)
      console.log(`Add task: ${task.name}`)
    }
    else if (change.action === "edit") {
      console.log(`Edit task: ${task.name}`)
    }

  }

  useEffect(() => {
    getTasks()
  }, [])


  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <AddTask editTasks={editTasks} />
      {tasks.map((task, index) => {
        return <TaskComponent key={index} task={task} editTasks={editTasks} />
      })}
    </div>
  )
}

export default App;
