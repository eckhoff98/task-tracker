import { useState, useEffect } from "react";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Form from "react-bootstrap/Form"
import Alert from "react-bootstrap/Alert"


export default function ChangeUserInfo({ user, nav }) {

    const [userInfo, setUserInfo] = useState({
        name: user.extraInfo.name
    })
    const [errorData, setErrorData] = useState({})

    useEffect(() => {
        if (!user) {
            return nav("/login")
        }
    })

    const submit = async (e) => {
        e.preventDefault()
        // try {
        //     const record = await pb.collection('users').update(pb.authStore.model.id, userInfo);
        //     setErrorData("none")
        // } catch (err) {
        //     setErrorData(err.data.data)
        //     console.log(err.data.data)
        // }
    }

    return (
        <div className="container py-5 ">
            <div className="row d-flex align-items-center justify-content-center ">
                <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                    <form onSubmit={(e) => submit(e)}>
                        {/* {loginVal && <Alert variant="danger">{loginVal}</Alert>} */}
                        {(errorData === "none") && <Alert variant="success">Info changed</Alert>}

                        {/* Have to use a request and token to change email. */}
                        {/* <!-- Email input --> */}
                        {/* {errorData && (errorData.email && <Alert variant="danger">{errorData.email.message}</Alert>)}
                        <FloatingLabel controlId="email" label="Email" className="mb-3">
                            <Form.Control type="email" value={userInfo.email} onChange={e => setUserInfo({ ...userInfo, email: e.target.value })} />
                        </FloatingLabel> */}

                        {/* <!-- Name input --> */}
                        {errorData && (errorData.name && <Alert variant="danger">{errorData.name.message}</Alert>)}
                        <FloatingLabel controlId="name" label="Name" className="mb-3">
                            <Form.Control type="text" value={userInfo.name} onChange={e => setUserInfo({ ...userInfo, name: e.target.value })} />
                        </FloatingLabel>
                        {/* <!-- Username input --> */}
                        {errorData && (errorData.username && <Alert variant="danger">{errorData.username.message}</Alert>)}
                        <FloatingLabel controlId="username" label="Name" className="mb-3">
                            <Form.Control type="text" value={userInfo.username} onChange={e => setUserInfo({ ...userInfo, username: e.target.value })} />
                        </FloatingLabel>

                        {/* <!-- Submit button --> */}
                        <div className="d-grid">
                            <button type="submit" className="btn btn-outline-primary btn-lg btn-block" >Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}