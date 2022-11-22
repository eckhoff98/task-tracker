import './App.css';
import axios from "axios"
import { useState, useEffect } from "react"

function App() {
  axios.defaults.withCredentials = true

  const [tasks, setTasks] = useState("")

  function Task(task, time, discription = "", reminder = false) {
    this.task = task
    this.time = time
    this.discription = discription
    this.reminder = reminder
  }

  let demoTasks = [
    new Task("Test task 1", "1 pm", "test discription", false),
    new Task("Test task 2", "5 pm", "test discription", true),
    new Task("Test task 3", "3 pm", "test discription", false)
  ]

  const addTask = (task) => {
    demoTasks = [...demoTasks, task]
  }
  addTask(new Task("Test task 4", "12 pm", "test discription", false))
  addTask(new Task("Test task 5", "9 pm", "test discription", false))

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
      <p>{JSON.stringify(demoTasks)}</p>
    </div>
  )
}

export default App;
