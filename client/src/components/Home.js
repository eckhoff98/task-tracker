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

    return (
        <>
            <h1>Home page</h1>
            <p>
                <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to start using Task Tracker.
            </p>
        </>
    )
}
export default Home