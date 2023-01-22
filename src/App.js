import './App.css';
import { useState, useEffect, lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Container from 'react-bootstrap/esm/Container';
import { useNavigate } from "react-router-dom"

// FIREBASE
import {
  db, auth, messaging,
  requestPermission,
  addTaskServer, updateTaskServer, deleteTaskServer
} from "./firebase-config"
import { collection, setDoc, getDoc, getDocs, addDoc, updateDoc, doc, deleteDoc, arrayUnion, Timestamp } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { getToken, onMessage } from "firebase/messaging";

import PrivateRoutes from './PrivateRoutes';

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
  const [firestoreUser, setFirestoreUser] = useState(null)
  // const [firestoreUser, setFirestoreUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      console.log("auth change")
      if (!user) return setUser(null)
      setUser(user)
      setFirestoreUser(await getFirestoreUser(user))
      requestPermission(user)
    })
  }, [])

  onMessage(messaging, (payload) => {
    setTasks([...tasks])
    console.log("setting tasks")
  });

  useEffect(() => {
    if (!user) return
    if (firestoreUser != null) return
    firestore()
  })

  const firestore = async () => {
    const result = await getFirestoreUser(user)
    if (result != null) setFirestoreUser(result)
    // setFirestoreUser(await getFirestoreUser(user))
  }

  useEffect(() => {
    user ? getTasks() : setTasks([])
  }, [user])

  const getFirestoreUser = async (user) => {
    console.log("getting firestore user")
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        return docSnap.data()
      }
    } catch (err) {
      console.log(err)
      return false
    }
  }

  const nav = useNavigate();

  const addFirestoreUser = async (_user, extraInfo) => {
    const docRef = doc(db, "users", _user.uid);
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) return null

    const currentToken = await getToken(messaging, { vapidKey: 'BJje9NpOzGlOceheK6J7-c8UsFlyzQmV-XUpqJDLqg6UkbEeoLbH-2aaYNGyIstVMSpcJnTiQFjumJyj3psmBPI' })
    console.log(currentToken)

    const result = await setDoc(doc(db, "users", _user.uid), {
      name: extraInfo.name,
      // fcmTokens: arrayUnion({ token: currentToken, timestamp: Timestamp.now() })
    }, { merge: true })
      .catch(err => console.log(err))

    return result
  }

  const changeName = (name) => {
    firestoreUser.name = name
  }

  // -------------------- Tasks --------------------
  const getTasks = async () => {
    if (!user) return
    const userDocRef = doc(db, "users", user.uid)
    const taskDocRef = collection(userDocRef, "tasks")
    const data = await getDocs(taskDocRef).catch(err => console.log(err))

    // converting firebase timestamp to js date here aswell
    setTasks(data.docs.map((item) => ({ ...item.data(), id: item.id, datetime: item.data().datetime.toDate() })))
  }

  const createNewTask = () => {
    if (!user) return
    console.log("TASK")
    const now = new Date()

    setTasks([...tasks, {
      name: "",
      description: "",
      location: "",
      reminder: false,
      freshTask: true,
      datetime: now
    }])
  }

  const addTask = async (task) => {
    if (!user) return
    if (task.name === "") task.name = "New Task"

    const removed = [...tasks.filter((t) => t.freshTask === false)]

    const randomId = String(Date.now() + Math.random()).replace(/[,.-]/g, '');
    setTasks([...removed, { ...task, freshTask: false, id: randomId }])

    const userDocRef = doc(db, "users", user.uid)
    const taskDocRef = doc(userDocRef, "tasks", randomId)

    await setDoc(taskDocRef, {
      ...task,
      freshTask: false,
      id: randomId
    })
  }

  const updateTask = async (task) => {
    // if (task.name === "") task.name = "New Task"
    if (!user) return

    const userDocRef = doc(db, "users", user.uid)
    const taskDocRef = doc(userDocRef, "tasks", task.id)
    await updateDoc(taskDocRef, task)
  }

  const deleteTask = async (task) => {
    if (!user) return
    setTasks([...tasks.filter((t) => t.id !== task.id)])
    const userDocRef = doc(db, "users", user.uid)
    const taskDocRef = doc(userDocRef, "tasks", task.id)
    await deleteDoc(taskDocRef)
  }
  // -------------------- end of (Tasks) --------------------

  const logout = () => {
    auth.signOut()
  }
  // -------------------- End of (Helpers) --------------------

  return (

    <div className="App">

      <NavBar appName={"Task Tracker"} logout={logout} user={user} firestoreUser={firestoreUser} />

      <Container className='mainBody'>
        <Suspense fallback={<h1>LOADING...</h1>}>
          <Routes>
            {/* If there is a user go to tasks */}
            <Route element={<PrivateRoutes user={user} navLocation={"/tasks"} reverse={true} />}>
              <Route path="/" element={<Home nav={nav} />} />
              <Route path="/login" element={<Login nav={nav} addFirestoreUser={addFirestoreUser} />} />
              <Route path="/register" element={<Register nav={nav} addFirestoreUser={addFirestoreUser} getFirestoreUser={getFirestoreUser} />} />
            </Route>

            <Route path="/about" element={<About />} />

            <Route element={<PrivateRoutes user={user} navLocation={"/login"} />}>
              <Route path="/tasks" element={<Tasks tasks={tasks} createNewTask={createNewTask} addTask={addTask} updateTask={updateTask} _deleteTask={deleteTask} nav={nav} user={user} />} />
              <Route path="/account" element={<Account logout={logout} nav={nav} user={user} firestoreUser={firestoreUser} />} />
              <Route path="/change-password" element={<ChangePassword nav={nav} user={user} />} />
              <Route path="/change-user-info" element={<ChangeUserInfo nav={nav} user={user} changeName={changeName} firestoreUser={firestoreUser} />} />
            </Route>

          </Routes>
        </Suspense>
      </Container>

    </div>
  )
}

export default App;
