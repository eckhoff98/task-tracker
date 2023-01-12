import { useState, useEffect } from "react";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Form from "react-bootstrap/esm/Form"
import Alert from "react-bootstrap/esm/Alert"

// Firebase
import { doc, setDoc, getDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase-config"

export default function ChangeUserInfo({ firestoreUser, user, changeName }) {
    const [name, setName] = useState("")
    const [alert, setAlert] = useState()
    useEffect(() => {
        setName(firestoreUser.name)
    }, [firestoreUser, user])


    const submit = async (e) => {
        e.preventDefault()
        if (name === "") return setAlert({ message: "Name cannot be blank.", varient: "danger" })
        try {
            await setDoc(doc(db, "users", user.uid), { name: name })
            changeName(name)
            setAlert({ message: "Info changed successfully. ", varient: "success" })
        } catch (err) {
            console.log(err)
            // setErrorData(err)
            setAlert({ message: err.message, varient: "danger" })
        }
    }

    return (
        <div className="container py-5 ">
            <div className="row d-flex align-items-center justify-content-center ">
                <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                    <form onSubmit={(e) => submit(e)}>
                        {(alert) && <Alert variant={alert.varient}>{alert.message}</Alert>}

                        {/* <!-- Name input --> */}
                        {/* {errorData && (errorData.name && <Alert variant="danger">{errorData.name.message}</Alert>)} */}
                        <FloatingLabel controlId="name" label="Name" className="mb-3">
                            <Form.Control type="text" autoComplete="off" value={name} onChange={e => setName(e.target.value)} />
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