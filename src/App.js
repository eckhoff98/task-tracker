import './App.css';
import { useState, useEffect, lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Container from 'react-bootstrap/esm/Container';
import { useNavigate } from "react-router-dom"

import { getCurrentDate, getCurrentTime } from './time';

// FIREBASE
import { db, auth, requestPermission } from "./firebase-config"
import { collection, setDoc, getDoc, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"


// Components
const Home = lazy(() => import("./components/Home"))
const Tasks = lazy(() => import("./components/Tasks"))
const NavBar = lazy(() => import("./components/NavBar"))
const Login = lazy(() => import("./components/Login"))
const Register = lazy(() => import("./components/Register"))
const About = lazy(() => import("./components/About"))
const ChangePassword = lazy(() => import("./components/ChangePassword"))
const Account = lazy(() => import("./components/Account"))
const ChangeUserInfo = lazy(() => import("./components/ChangeUserInfo"))

function App() {
  const [tasks, setTasks] = useState([])

  const [user, setUser] = useState(null)
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) return setUser(null)
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef)
      user.extraInfo = docSnap.data()
      setUser(user)
      requestPermission()
    })
  }, [])

  useEffect(() => {
    if (user) {
      getTasks()
    } else {
      setTasks([])
    }
  }, [user])

  const nav = useNavigate();

  const addExtraUserInfo = async (info) => {
    if (user.extraInfo.name) return
    try {
      await setDoc(doc(db, "users", info.uid), {
        name: info.name
      })
    } catch (err) {
      console.log(err)
    }
  }

  const getTasks = async () => {
    try {
      if (!user) return
      const userDoc = doc(db, "users", user.uid)
      const tasksSubCollection = collection(userDoc, "tasks")
      const data = await getDocs(tasksSubCollection)
      setTasks(data.docs.map((item) => ({ ...item.data(), id: item.id })))
    } catch (err) {
      console.log(err)
    }
  }

  const addTask = async (task) => {
    try {
      if (!user) return
      const userDoc = doc(db, "users", user.uid)
      const tasksSubCollection = collection(userDoc, "tasks")
      const record = await addDoc(tasksSubCollection, { ...task, uid: user.uid, time: getCurrentTime(), date: getCurrentDate() })
      setTasks([...tasks, { ...task, freshTask: true, id: record.id, uid: user.uid, time: getCurrentTime(), date: getCurrentDate() }])
    } catch (err) {
      console.log(err)
    }
  }

  const updateTask = async (task) => {
    if (task.name === "") task.name = "New Task"
    try {
      if (!user) return
      const userDoc = doc(db, "users", user.uid)
      const taskDoc = doc(userDoc, "tasks", task.id)
      setTasks([...tasks.map((t) => (t.id === task.id) ? task : t)])
      await updateDoc(taskDoc, task)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteTask = async (task) => {
    try {
      if (!user) return
      const userDoc = doc(db, "users", user.uid)
      const taskDoc = doc(userDoc, "tasks", task.id)
      setTasks([...tasks.filter((t) => t.id !== task.id)])
      await deleteDoc(taskDoc, task.id)
    } catch (err) {
      console.log(err)
    }
  }

  const logout = () => {
    // setLoggedInState(false)
    auth.signOut()
  }
  // -------------------- End of (Helpers) --------------------

  return (
    <div className="App">

      <NavBar appName={"Task Tracker"} logout={logout} />

      <Container className='mainBody'>
        <Suspense fallback={<h1>LOADING...</h1>}>
          <Routes>
            <Route path="/" element={<Home nav={nav} />} />

            <Route path="/tasks" element={<Tasks tasks={tasks} _addTask={addTask} _updateTask={updateTask} _deleteTask={deleteTask} nav={nav} />} />
            <Route path="/about" element={<About />} />

            {/* Account Info */}
            <Route path="/login" element={<Login nav={nav} addExtraUserInfo={addExtraUserInfo} />} />
            <Route path="/register" element={<Register nav={nav} addExtraUserInfo={addExtraUserInfo} />} />
            <Route path="/account" element={<Account logout={logout} nav={nav} />} />
            <Route path="/change-password" element={<ChangePassword nav={nav} user={user} />} />
            <Route path="/change-user-info" element={<ChangeUserInfo nav={nav} />} />
          </Routes>
        </Suspense>
      </Container>

    </div>
  )
}

export default App;
