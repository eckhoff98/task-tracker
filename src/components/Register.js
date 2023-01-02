import { useEffect, useState } from "react"
import Alert from "react-bootstrap/esm/Alert"
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/esm/Form';
import GoogleSignin from "./GoogleSignin";

//Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config"



const Register = ({ nav, user, addExtraUserInfo }) => {
    const [registerData, setRegisterData] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
    })

    const [registerErr, setRegisterErr] = useState()

    useEffect(() => {
        if (user) {
            nav("/tasks")
        }
    })

    const addUser = async (e) => {
        e.preventDefault()
        if (registerData.name === "" || registerData.email === "" || registerData.password === "" || registerData.passwordConfirm === "") {
            return setRegisterErr("Please fill in all fields.")
        }
        if (registerData.password !== registerData.passwordConfirm) {
            return setRegisterErr("Password confirmation does not match.")
        }

        createUserWithEmailAndPassword(auth, registerData.email, registerData.password)
            .then((userCredential) => {
                // Signed in 
                const newUser = {
                    uid: userCredential.user.uid,
                    name: registerData.name,
                }
                addExtraUserInfo(newUser)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error)
                setRegisterErr(errorMessage)
            })
    }

    return (
        <div className="container py-5 h-100">
            <div className="row d-flex align-items-center justify-content-center h-100">
                <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                    <h1 className="mb-5 text-center">Register</h1>
                    <form onSubmit={(e) => addUser(e)}>
                        {registerErr && <Alert variant="danger">{registerErr}</Alert>}

                        {/* <!-- name input --> */}
                        <FloatingLabel controlId="name" label="Name" className="mb-3">
                            <Form.Control type="text" onChange={e => setRegisterData({ ...registerData, name: e.target.value })} />
                        </FloatingLabel>

                        {/* <!-- Email input --> */}
                        <FloatingLabel controlId="email" label="Email" className="mb-3">
                            <Form.Control type="email" onChange={e => setRegisterData({ ...registerData, email: e.target.value })} />
                        </FloatingLabel>

                        {/* <!-- Password input --> */}
                        <FloatingLabel controlId="password" label="Password" className="mb-3">
                            <Form.Control type="password" onChange={e => setRegisterData({ ...registerData, password: e.target.value })} />
                        </FloatingLabel>

                        {/* <!-- Password input --> */}
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

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-lg btn-block">Register</button>
                        </div>
                    </form>
                    <div className="d-grid">
                        <div className="divider align-items-center my-4">
                            <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                        </div>
                        <GoogleSignin addExtraUserInfo={addExtraUserInfo} setErrMsg={setRegisterErr} />
                    </div>
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