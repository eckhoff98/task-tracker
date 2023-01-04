import { Link } from "react-router-dom"
import { useEffect } from "react"
import Button from "react-bootstrap/esm/Button"

// Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config"

const Home = ({ nav }) => {

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            console.log("onAuthStateChanged")
            if (user) return nav("/tasks")
        })
    }, [])

    return (
        <>
            <h1>Home</h1>
            <p>Task Tracker is a simple app for saving tasks. When you sign up all of your tasks are saved to the cloud so you can access them on any device.</p>
            <p>You can create an account or log in easily with a Google as well.</p>
            <p>
                <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to start using Task Tracker.
                Or you can check out the <Link to="/about">About</Link> page.
            </p>
            <div className="btn-grid">
                <Button variant="outline-primary" as={Link} to="/register">Register</Button>
                <Button variant="outline-success" as={Link} to="/login">Login</Button>
            </div>

        </>
    )
}
export default Home