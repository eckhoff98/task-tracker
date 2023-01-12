import './App.css';
import { useState, useEffect, lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Container from 'react-bootstrap/esm/Container';
import { useNavigate } from "react-router-dom"

// FIREBASE
import { db, auth, messaging } from "./firebase-config"
import { collection, setDoc, getDoc, getDocs, addDoc, updateDoc, doc, deleteDoc, arrayUnion } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { getToken } from "firebase/messaging";

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
  // const [firestoreUser, setFirestoreUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      console.log("auth change")
      if (!user) return setUser(null)
      user.firestoreUser = await getFirestoreUser(user)
      setUser(user)
      addFcmToken(user)
    })
  }, [])

  useEffect(() => {
    user ? getTasks() : setTasks([])
  }, [user])

  const getFirestoreUser = async (user) => {
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef)
      return docSnap.data()
    } catch (err) {
      console.log(err)
      return null
    }
  }

  const nav = useNavigate();

  const addFirestoreUser = async (_user, extraInfo) => {
    const docRef = doc(db, "users", _user.uid);
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) return

    const result = await setDoc(doc(db, "users", _user.uid), {
      name: extraInfo.name
    }).catch(err => console.log(err))
    return result
  }

  const addFcmToken = async (_user) => {
    const currentToken = await getToken(messaging, { vapidKey: 'BJje9NpOzGlOceheK6J7-c8UsFlyzQmV-XUpqJDLqg6UkbEeoLbH-2aaYNGyIstVMSpcJnTiQFjumJyj3psmBPI' })
    console.log(currentToken)
    await updateDoc(doc(db, "users", _user.uid), {
      fcmTokens: arrayUnion(currentToken)
    });
    // await setDoc(doc(db, "users", _user.uid), {
    //   fcmToken: currentToken
    // }, { merge: true }).catch(err => console.log(err))
    // getToken(messaging, { vapidKey: 'BJje9NpOzGlOceheK6J7-c8UsFlyzQmV-XUpqJDLqg6UkbEeoLbH-2aaYNGyIstVMSpcJnTiQFjumJyj3psmBPI' })
    // .then((currentToken) => {
    //   if (currentToken) {
    //     console.log(currentToken)
    //     return currentToken
    //   } else {
    //     console.log('No registration token available. Request permission to generate one.');
    //   }
    // })
    // .catch((err) => console.log(err))
  }

  const changeName = (name) => {
    user.firestoreUser.name = name
  }

  const getTasks = async () => {
    if (!user) return
    const userDoc = doc(db, "users", user.uid)
    const tasksSubCollection = collection(userDoc, "tasks")
    const data = await getDocs(tasksSubCollection).catch(err => console.log(err))
    setTasks(data.docs.map((item) => ({ ...item.data(), id: item.id })))
  }

  const addTask = async (task) => {
    if (!user) return
    const userDoc = doc(db, "users", user.uid)
    const tasksSubCollection = collection(userDoc, "tasks")
    const record = await addDoc(tasksSubCollection, {
      ...task,
      uid: user.uid,
      datetime: String(new Date())
    }).catch(err => console.log(err))

    setTasks([...tasks, {
      ...task,
      freshTask: true,
      id: record.id,
      uid: user.uid,
      datetime: String(new Date())
    }])
  }

  const updateTask = async (task) => {
    if (task.name === "") task.name = "New Task"
    if (!user) return
    const userDoc = doc(db, "users", user.uid)
    const taskDoc = doc(userDoc, "tasks", task.id)
    setTasks([...tasks.map((t) => (t.id === task.id) ? task : t)])
    await updateDoc(taskDoc, task).catch(err => console.log(err))
  }

  const deleteTask = async (task) => {
    if (!user) return
    const userDoc = doc(db, "users", user.uid)
    const taskDoc = doc(userDoc, "tasks", task.id)
    setTasks([...tasks.filter((t) => t.id !== task.id)])
    await deleteDoc(taskDoc, task.id).catch(err => console.log(err))
  }

  const logout = () => {
    auth.signOut()
  }
  // -------------------- End of (Helpers) --------------------

  return (

    <div className="App">

      <NavBar appName={"Task Tracker"} logout={logout} user={user} />

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
              <Route path="/tasks" element={<Tasks tasks={tasks} _addTask={addTask} _updateTask={updateTask} _deleteTask={deleteTask} nav={nav} />} />
              <Route path="/account" element={<Account logout={logout} nav={nav} user={user} />} />
              <Route path="/change-password" element={<ChangePassword nav={nav} user={user} />} />
              <Route path="/change-user-info" element={<ChangeUserInfo nav={nav} user={user} changeName={changeName} />} />
            </Route>

          </Routes>
        </Suspense>
      </Container>

    </div>
  )
}

export default App;
