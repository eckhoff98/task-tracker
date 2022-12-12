import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Alert from "react-bootstrap/Alert"


const Register = ({ pb, _loggedIn }) => {
    const navigate = useNavigate()
    const [registerData, setRegisterData] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    })

    const [emailVal, setEmailVal] = useState("")
    const [passwordVal, setPasswordVal] = useState("")
    const [passwordConfirmVal, setPasswordConfirmVal] = useState("")

    useEffect(() => {
        if (pb.authStore.isValid) {
            navigate("/")
        }
    })


    const addUser = async () => {
        console.log("adding user")
        try {
            await pb.collection('users').create({
                email: registerData.email,
                password: registerData.password,
                passwordConfirm: registerData.passwordConfirmation,
                name: registerData.username
            });
            // login and redirect to home
            await pb.collection('users').authWithPassword(registerData.email, registerData.password);
            _loggedIn()
            return navigate("/")
        } catch (err) {
            errors(err)
        }
    }

    const errors = (err) => {
        console.log(err.data)
        if (!err.data.data) return
        err.data.data.email ? setEmailVal(err.data.data.email.message) : setEmailVal("")
        err.data.data.password ? setPasswordVal(err.data.data.password.message) : setPasswordVal("")
        err.data.data.passwordConfirm ? setPasswordConfirmVal(err.data.data.passwordConfirm.message) : setPasswordConfirmVal("")
    }


    return (
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <form>
                            {/* <!-- Username input --> */}
                            <div className="form-outline mb-4">
                                <input className="form-control form-control-lg" type="text" id="form1Example13" onChange={e => setRegisterData({ ...registerData, username: e.target.value })} />
                                <label className="form-label" htmlFor="form1Example13">Username</label>
                            </div>
                            {/* <!-- Email input --> */}
                            {emailVal && <Alert variant="danger">{emailVal}</Alert>}
                            <div className="form-outline mb-4">
                                <input className="form-control form-control-lg" type="email" id="form1Example13" onChange={e => setRegisterData({ ...registerData, email: e.target.value })} />
                                <label className="form-label" htmlFor="form1Example13">Email address</label>
                            </div>

                            {/* <!-- Password input --> */}
                            {passwordVal && <Alert variant="danger">{passwordVal}</Alert>}
                            <div className="form-outline mb-4">
                                <input className="form-control form-control-lg" type="password" onChange={e => setRegisterData({ ...registerData, password: e.target.value })} />
                                <label className="form-label" htmlFor="form1Example23">Password</label>
                            </div>
                            {/* <!-- Password input --> */}
                            {passwordConfirmVal && <Alert variant="danger">{passwordConfirmVal}</Alert>}
                            <div className="form-outline mb-4">
                                <input className="form-control form-control-lg" type="password" onChange={e => setRegisterData({ ...registerData, passwordConfirmation: e.target.value })} />
                                <label className="form-label" htmlFor="form1Example23">Password confirmation</label>
                            </div>

                            <div className="d-flex justify-content-around align-items-center mb-4">
                                {/* <!-- Checkbox --> */}
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                                    <label className="form-check-label" htmlFor="form1Example3"> Remember me </label>
                                </div>
                            </div>

                            {/* <!-- Submit button --> */}
                            <div className="d-grid">
                                <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => addUser()}>Register</button>

                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                                </div>

                                <a className="btn btn-primary btn-lg" style={{ backgroundColor: "#3b5998" }} href="#!"
                                    role="button">
                                    <i className="fab fa-facebook-f me-2"></i>Continue with Facebook
                                </a>
                                <a className="btn btn-primary btn-lg " style={{ backgroundColor: "#55acee" }} href="#!"
                                    role="button">
                                    <i className="fab fa-twitter me-2"></i>Continue with Twitter</a>
                            </div>
                        </form>
                        <div className="d-flex justify-content-around align-items-center my-4">
                            Already have an account? &nbsp;
                            <a href="/login">Login</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Register