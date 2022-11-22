import './App.css';
import axios from "axios"
import { useState, useEffect } from "react"

function App() {
  axios.defaults.withCredentials = true

  const [tasks, setTasks] = useState("")

  const getTasks = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/tasks"
    }).then((res) => {
      setTasks(res.data)
    })
  }

  const postTasks = () => {
    const data = {
      task: "task to post"
    }
    axios({
      method: "POST",
      withCredentials: true,
      data: data,
      url: "http://localhost:5000/tasks"
    }).then((res) => {
      setTasks(res.data)
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
      setTasks(res.data)
    })
  }

  const deleteTasks = () => {
    const data = {
      task: "task to delete"
    }
    axios({
      method: "DELETE",
      withCredentials: true,
      data: data,
      url: "http://localhost:5000/tasks"
    }).then((res) => {
      setTasks(res.data)
    })
  }

  useEffect(() => {
    getTasks()
    postTasks()
    putTasks()
    deleteTasks()
  }, [])

  return (
    <div className="App">
      <p>Hello, world</p>
      <p>{JSON.stringify(tasks)}</p>
    </div>
  )
}

export default App;
