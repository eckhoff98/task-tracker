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
  const [loggedInState, setLoggedInState] = useState()

  useEffect(() => {
    if (pb.authStore.isValid) {
      getTasks()
    } else {
      setTasks([])
    }
  }, [loggedInState])

  // Helper Functions 
  const getTasks = async () => {
    try {
      const list = await pb.collection('tasks').getList(1, 100);
      setTasks([...list.items])
    } catch (err) { console.log(err) }
  }

  const addTask = async (task) => {
    try {
      const record = await pb.collection('tasks').create({ ...task, user_id: pb.authStore.model.id });
      setTasks([...tasks, task])
    } catch (err) { console.log(err) }
  }

  const updateTask = async (task) => {
    try {
      const record = await pb.collection('tasks').update(task.id, task);
      setTasks([...tasks.map((t) => (t.id === task.id) ? task : t)])
    } catch (err) { console.log(err) }
  }

  const deleteTask = async (task) => {
    try {
      const record = await pb.collection('tasks').delete(task.id);
      setTasks([...tasks.filter((t) => t.id != task.id)])
    } catch (err) { console.log(err) }
  }

  const logout = () => {
    console.log("LOGOUT")
    setLoggedInState(false)
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
            <AddTask _addTask={addTask} />
            <Tasks tasks={tasks} _updateTask={updateTask} _deleteTask={deleteTask} />
          </>
        } />
        <Route path="/about" element={
          <>
            about info
          </>
        } />
        <Route path="/login" element={<Login _loggedIn={() => setLoggedInState(true)} pb={pb} />} />
        <Route path="/register" element={<Register pb={pb} _loggedIn={() => setLoggedInState(true)} />} />
      </Routes>
    </div>
  )
}

export default App;
