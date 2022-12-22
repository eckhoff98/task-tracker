import { Link } from "react-router-dom"
import { useEffect } from "react"

const Home = ({ pb, nav }) => {
    useEffect(() => {
        if (pb.authStore.isValid) {
            nav("/tasks")
        }
    })

    return (
        <>
            <h1>Home page</h1>
            <p>
                <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to start using Task Tracker.
                Or you can check out the <Link to="/about">About</Link> page.

            </p>

        </>
    )
}
export default Home