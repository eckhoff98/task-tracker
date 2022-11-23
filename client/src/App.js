import './App.css';
import axios from "axios"
import { useState, useEffect } from "react"
import TaskComponent from "./components/task"

function App() {
  axios.defaults.withCredentials = true

  const [tasks, setTasks] = useState([])

  function Task(name, time, discription = "", reminder = false, id) {
    this.name = name
    this.time = time
    this.discription = discription
    this.reminder = reminder
    this.id = id
  }



  // const addTask = (task) => {
  //   demoTasks = [...demoTasks, task]
  // }
  // addTask(new Task("Test task 4", "12 pm", "test discription", false))
  // addTask(new Task("Test task 5", "9 pm", "test discription", false))

  const getTasks = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/tasks"
    }).then((res) => {
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
    })
  }

  const editTasks = (task, change) => {
    if (change.action === "delete") {
      setTasks(tasks.filter((t) => t.id !== task.id))
      return console.log(`Delete task: ${task.name}`)
    }
    else if (change.action === "add") {
      console.log(`Add task: ${task.name}`)
    }
    else if (change.action === "edit") {
      console.log(`Edit task: ${task.name}`)
    }

  }

  useEffect(() => {
    const demoTasks = [
      new Task("Test task 1", "1 pm", "test discription", false, Math.random()),
      new Task("Test task 2", "5 pm", "test discription", true, Math.random()),
      new Task("Test task 3", "3 pm", "test discription", false, Math.random())
    ]
    setTasks(demoTasks)
  }, [])


  return (
    <div className="App">
      <p>Hello, world</p>
      {tasks.map((task, index) => {
        return <TaskComponent key={index} task={task} editTasks={editTasks} />
      })}
    </div>
  )
}

export default App;
