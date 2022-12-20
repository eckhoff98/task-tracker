import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const Home = ({ pb }) => {
    const navigate = useNavigate()
    useEffect(() => {
        if (pb.authStore.isValid) {
            navigate("/tasks")
        }
    })

    if (pb.authStore.isValid) return navigate('/tasks')
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