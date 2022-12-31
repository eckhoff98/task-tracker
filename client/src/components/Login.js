import { useEffect, useState } from "react"
import React from "react"
import Alert from "react-bootstrap/Alert"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

//Firebase
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../firebaseConfig"

// TODO: add hashing for passwords

const Login = ({ nav, user, addExtraUserInfo }) => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })
    // const [loginVal, setLoginVal] = useState("")
    const [loginErr, setLoginErr] = useState()

    useEffect(() => {
        if (user) {
            nav("/tasks")
        }
    })

    const login = async (e) => {
        e.preventDefault()
        if (loginData.email === "" || loginData.password === "") {
            return setLoginErr("Please fill in all fields.")
        }
        signInWithEmailAndPassword(auth, loginData.email, loginData.password)
            .then()
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setLoginErr(errorMessage)
            });
    }

    const GoogleSignin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user.displayName)
                const newUser = {
                    uid: user.uid,
                    name: user.displayName
                }
                addExtraUserInfo(newUser)

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }


    return (
        <div className="container py-5 ">
            <div className="row d-flex align-items-center justify-content-center ">
                <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                    <form onSubmit={(e) => login(e)}>
                        {/* {loginVal && <Alert variant="danger">{loginVal}</Alert>} */}
                        {loginErr && <Alert variant="danger">{loginErr}</Alert>}
                        {/* <!-- Email input --> */}
                        <FloatingLabel controlId="email" label="Email" className="mb-3">
                            <Form.Control type="email" onChange={e => setLoginData({ ...loginData, email: e.target.value })} />
                        </FloatingLabel>

                        {/* <!-- Password input --> */}
                        <FloatingLabel controlId="password" label="Password" className="mb-3">
                            <Form.Control type="password" onChange={e => setLoginData({ ...loginData, password: e.target.value })} />
                        </FloatingLabel>

                        <div className="d-flex justify-content-around align-items-center mb-4">
                            {/* <!-- Checkbox --> */}
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                                <label className="form-check-label" htmlFor="form1Example3"> Remember me </label>
                            </div>
                            <a href="#!">Forgot password?</a>
                        </div>

                        {/* <!-- Submit button --> */}
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-lg btn-block" >Sign in</button>

                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                            </div>

                            <button className="btn btn-secondary" onClick={() => GoogleSignin()}>Google</button>

                        </div>
                        <div className="d-flex justify-content-around align-items-center my-4">
                            Don't have an account yet? &nbsp;
                            <a href="/register">Register</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login