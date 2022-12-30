import './App.css';
import axios from "axios"
import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import PocketBase from "pocketbase"
import { useNavigate } from "react-router-dom"

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
  const pb = new PocketBase('http://127.0.0.1:8090');

  // Firebase
  const tasksCollection = collection(db, "tasks")
  const userCollection = collection(db, "users")

  const [user, setUser] = useState(null)



  const [tasks, setTasks] = useState([])
  const [loggedInState, setLoggedInState] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const getExtra = async () => {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef)

          console.log(docSnap.data())
          user.extraInfo = docSnap.data()
        }
        getExtra()
        setUser(user)
        // setExtraUserInfo(getDoc())
      } else {
        setUser(null)
      }
    })
  }, [])

  useEffect(() => {
    if (user) {
      getTasks()
    } else {
      setTasks([])
    }
  }, [loggedInState])


  const addExtraUserInfo = async (info) => {
    await setDoc(doc(db, "users", info.uid), {
      name: info.name
    })
  }
  // Helper Functions 
  const getCurrentDate = () => {
    // convert Javascript Date to HTML Input
    const now = new Date();
    const day = ("0" + now.getDate()).slice(-2);
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const hour = ("0" + (now.getHours())).slice(-2);
    const min = ("0" + (now.getMinutes())).slice(-2);
    const today = now.getFullYear() + "-" + month + "-" + day
    console.log("today " + today)
    return today
  }

  const getCurrentTime = () => {
    // convert Javascript Date to HTML Input
    const now = new Date();
    const hour = ("0" + (now.getHours())).slice(-2);
    const min = ("0" + (now.getMinutes())).slice(-2);
    const time = `${hour}:${min}`
    return time
  }

  const getTasks = async () => {
    // try {
    //   const list = await pb.collection('tasks').getList(1, 100);
    //   setTasks([...list.items])
    // } catch (err) { console.log(err) }
    // Firebase
    const data = await getDocs(tasksCollection)
    const tasksList = data.docs.map((item) => ({ ...item.data(), id: item.id }))
    setTasks(tasksList)
    // console.log(tasksList)
  }

  const addTask = async (task) => {
    // try {
    //   const record = await pb.collection('tasks').create({
    //     ...task,
    //     user_id: pb.authStore.model.id,
    //     time: getCurrentTime(),
    //     date: getCurrentDate()
    //   });
    //   setTasks([...tasks, { ...record, freshTask: true }])
    //   // I absolutely cannot figure out why this doesnt work!
    //   // setTasks([{ ...record, freshTask: true }, newTasks])
    // } catch (err) { console.log(err) }

    // Firebase
    const record = await addDoc(tasksCollection, { ...task, time: getCurrentTime(), date: getCurrentDate() })
    console.log(record)
    setTasks([...tasks, { ...task, freshTask: true, id: record.id, time: getCurrentTime(), date: getCurrentDate() }])
  }

  const updateTask = async (task) => {
    // try {
    //   const record = await pb.collection('tasks').update(task.id, task);
    //   setTasks([...tasks.map((t) => (t.id === task.id) ? task : t)])
    // } catch (err) { console.log(err) }
    // Firebase
    const tasksDoc = doc(db, "tasks", task.id)
    setTasks([...tasks.map((t) => (t.id === task.id) ? task : t)])
    await updateDoc(tasksDoc, task)
  }

  const deleteTask = async (task) => {
    // try {
    //   const record = await pb.collection('tasks').delete(task.id);
    //   setTasks([...tasks.filter((t) => t.id != task.id)])
    // } catch (err) { console.log(err) }
    // Firebase
    const tasksDoc = doc(db, "tasks", task.id)
    setTasks([...tasks.filter((t) => t.id != task.id)])
    await deleteDoc(tasksDoc, task.id)
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
      <NavBar appName={"Task Tracker"} logout={logout} pb={pb} user={user} />

      <Container className='mainBody'>
        <Routes>

          <Route path="/" element={<Home pb={pb} nav={nav} user={user} />} />
          <Route path="/tasks" element={<Tasks tasks={tasks} _addTask={addTask} _updateTask={updateTask} _deleteTask={deleteTask} pb={pb} nav={nav} user={user} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login _onLogin={() => setLoggedInState(true)} pb={pb} nav={nav} user={user} />} />
          <Route path="/register" element={<Register pb={pb} _onLogin={() => setLoggedInState(true)} nav={nav} user={user} addExtraUserInfo={addExtraUserInfo} />} />
          <Route path="/account" element={<Account pb={pb} logout={logout} nav={nav} user={user} />} />
          <Route path="/change-password" element={<ChangePassword pb={pb} nav={nav} />} />
          <Route path="/change-user-info" element={<ChangeUserInfo pb={pb} nav={nav} />} />

        </Routes>
      </Container>

    </div>
  )
}

export default App;
