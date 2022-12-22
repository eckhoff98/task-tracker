import { useEffect, useState } from "react"
import Alert from "react-bootstrap/Alert"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';


const Register = ({ pb, _onLogin, nav }) => {
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
            nav("/tasks")
        }
    })


    const addUser = async (e) => {
        e.preventDefault()
        try {
            await pb.collection('users').create({
                email: registerData.email,
                password: registerData.password,
                passwordConfirm: registerData.passwordConfirm,
                name: registerData.name
            });
            // login and redirect to home
            await pb.collection('users').authWithPassword(registerData.email, registerData.password);
            _onLogin()
            return nav("/tasks")
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
        <div className="container py-5 h-100">
            <div className="row d-flex align-items-center justify-content-center h-100">
                <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                    <form onSubmit={(e) => addUser(e)}>
                        {/* <!-- name input --> */}
                        <FloatingLabel controlId="name" label="Name" className="mb-3">
                            <Form.Control type="text" onChange={e => setRegisterData({ ...registerData, name: e.target.value })} />
                        </FloatingLabel>

                        {/* <!-- Email input --> */}
                        {emailVal && <Alert variant="danger">{emailVal}</Alert>}
                        <FloatingLabel controlId="email" label="Email" className="mb-3">
                            <Form.Control type="email" onChange={e => setRegisterData({ ...registerData, email: e.target.value })} />
                        </FloatingLabel>

                        {/* <!-- Password input --> */}
                        {passwordVal && <Alert variant="danger">{passwordVal}</Alert>}
                        <FloatingLabel controlId="password" label="Password" className="mb-3">
                            <Form.Control type="password" onChange={e => setRegisterData({ ...registerData, password: e.target.value })} />
                        </FloatingLabel>

                        {/* <!-- Password input --> */}
                        {passwordConfirmVal && <Alert variant="danger">{passwordConfirmVal}</Alert>}
                        <FloatingLabel controlId="passwordConfirm" label="Password Confirmation" className="mb-3">
                            <Form.Control type="password" onChange={e => setRegisterData({ ...registerData, passwordConfirm: e.target.value })} />
                        </FloatingLabel>

                        <div className="d-flex justify-content-around align-items-center mb-4">
                            {/* <!-- Checkbox --> */}
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                                <label className="form-check-label" htmlFor="form1Example3"> Remember me </label>
                            </div>
                        </div>

                        {/* <!-- Submit button --> */}
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-lg btn-block">Register</button>

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
    )
}
export default Register