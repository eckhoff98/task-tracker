import './App.css';
import axios from "axios"
import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Container from 'react-bootstrap/Container';
// import PocketBase from "pocketbase"
import { useNavigate } from "react-router-dom"

import { getCurrentDate, getCurrentTime } from './time';

// FIREBASE
import { db } from "./firebaseConfig"
import { collection, setDoc, getDoc, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebaseConfig"


// Components
import Home from "./components/Home"
import Tasks from "./components/Tasks"
import NavBar from './components/NavBar';
import Login from "./components/Login"
import Register from "./components/Register"
import About from './components/About';
import ChangePassword from './components/ChangePassword';
import Account from './components/Account';
import ChangeUserInfo from './components/ChangeUserInfo';


function App() {
  axios.defaults.withCredentials = true
  const nav = useNavigate();
  // const pb = new PocketBase('http://127.0.0.1:8090');

  // Firebase
  // const tasksSubCollection = db.collection('users').doc(user.uid).collection('tasks').doc('message1');
  const userCollection = collection(db, "users")
  const tasksCollection = collection(db, "tasks")

  const [user, setUser] = useState(null)
  const [tasksSubCollection, setTasksSubCollection] = useState([])


  const [tasks, setTasks] = useState([])
  const [loggedInState, setLoggedInState] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const getExtra = async () => {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef)

          // console.log(docSnap.data())
          user.extraInfo = docSnap.data()
        }
        getExtra()
        setUser(user)
        // setExtraUserInfo(getDoc())
        getTasks()

      } else {
        setUser(null)
        setTasks([])

      }
    })


  }, [])

  useEffect(() => {
    // Test
    // const getSubTasks = async () => {
    //   // console.log(user)
    //   try {
    //     if (!user) return
    //     const userDoc = doc(db, "users", user.uid)
    //     const tasksSubCollection = collection(userDoc, "tasks")
    //     const data = await getDocs(tasksSubCollection)
    //     setTasks(data.docs.map((item) => ({ ...item.data(), id: item.id })))
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
    // getSubTasks()
  }, [user])

  useEffect(() => {
    if (user) {
      getTasks()
    } else {
      setTasks([])
    }
  }, [loggedInState, user])


  const addExtraUserInfo = async (info) => {
    await setDoc(doc(db, "users", info.uid), {
      name: info.name
    })
  }

  const getTasks = async () => {
    try {
      if (!user) return
      console.log("DID THING")
      const userDoc = doc(db, "users", user.uid)
      const tasksSubCollection = collection(userDoc, "tasks")
      const data = await getDocs(tasksSubCollection)
      setTasks(data.docs.map((item) => ({ ...item.data(), id: item.id })))

      //testing security 
      const userDoc2 = doc(db, "users", "UlEw0lHqVuTvIJoYN1STyXxt3qC2")
      const tasksSubCollection2 = collection(userDoc2, "tasks")
      const data2 = await getDocs(tasksSubCollection2)
      console.log(data2.docs.map((item) => ({ ...item.data(), id: item.id })))


    } catch (err) {
      console.log(err)
    }
  }

  const addTask = async (task) => {

    if (!user) return
    const userDoc = doc(db, "users", user.uid)
    const tasksSubCollection = collection(userDoc, "tasks")
    const record = await addDoc(tasksSubCollection, { ...task, uid: user.uid, time: getCurrentTime(), date: getCurrentDate() })
    setTasks([...tasks, { ...task, freshTask: true, id: record.id, uid: user.uid, time: getCurrentTime(), date: getCurrentDate() }])


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
      setTasks([...tasks.filter((t) => t.id != task.id)])
      await deleteDoc(taskDoc, task.id)
    } catch (err) {
      console.log(err)
    }
  }

  const logout = () => {
    setLoggedInState(false)
    // pb.authStore.clear();
    auth.signOut()
  }
  // -------------------- End of (Helpers) --------------------

  return (
    <div className="App">
      <link href="https://bootswatch.com/5/superhero/bootstrap.min.css" rel="stylesheet" ></link>
      <NavBar appName={"Task Tracker"} logout={logout} user={user} />

      <Container className='mainBody'>
        <Routes>

          <Route path="/" element={<Home nav={nav} user={user} />} />
          <Route path="/tasks" element={<Tasks tasks={tasks} _addTask={addTask} _updateTask={updateTask} _deleteTask={deleteTask} nav={nav} user={user} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login _onLogin={() => setLoggedInState(true)} nav={nav} user={user} />} />
          <Route path="/register" element={<Register _onLogin={() => setLoggedInState(true)} nav={nav} user={user} addExtraUserInfo={addExtraUserInfo} />} />
          <Route path="/account" element={<Account logout={logout} nav={nav} user={user} />} />
          <Route path="/change-password" element={<ChangePassword nav={nav} user={user} />} />
          <Route path="/change-user-info" element={<ChangeUserInfo nav={nav} user={user} />} />

        </Routes>
      </Container>

    </div>
  )
}

export default App;
