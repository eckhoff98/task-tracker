import React, { useState } from "react"
import Alert from "react-bootstrap/Alert"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';


export default function ChangePassword() {
    const [changePasswordData, setChangePasswordData] = useState({})
    const submit = (e) => {
        e.preventDefault()
        console.log(changePasswordData)
    }
    return (
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <form onSubmit={(e) => submit(e)}>
                            {/* {loginVal && <Alert variant="danger">{loginVal}</Alert>} */}
                            {/* <!-- Email input --> */}
                            <FloatingLabel controlId="floatingInput" label="current Password" className="mb-3">
                                <Form.Control type="password" onChange={e => setChangePasswordData({ ...changePasswordData, password: e.target.value })} />
                            </FloatingLabel>

                            {/* <!-- Password input --> */}
                            <FloatingLabel controlId="floatingInput" label="New Password" className="mb-3">
                                <Form.Control type="password" onChange={e => setChangePasswordData({ ...changePasswordData, newPassword: e.target.value })} />
                            </FloatingLabel>
                            {/* <!-- Password input --> */}
                            <FloatingLabel controlId="floatingInput" label="Confirm Password" className="mb-3">
                                <Form.Control type="password" onChange={e => setChangePasswordData({ ...changePasswordData, passwordConfirmation: e.target.value })} />
                            </FloatingLabel>


                            {/* <!-- Submit button --> */}
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary btn-lg btn-block" >Change password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}