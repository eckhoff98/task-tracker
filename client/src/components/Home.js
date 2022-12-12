import { Link } from "react-router-dom"
const Home = () => {
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