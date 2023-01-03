import { useState, useEffect } from "react";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Form from "react-bootstrap/esm/Form"
import Alert from "react-bootstrap/esm/Alert"

// Firebase
import { doc, setDoc, getDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase-config"

export default function ChangeUserInfo({ nav }) {
    const [name, setName] = useState("")

    const [user, setUser] = useState(null)
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            console.log("onAuthStateChanged")
            if (!user) return nav("/login")
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef)
            user.extraInfo = docSnap.data()
            setUser(user)
            setName(user.extraInfo.name)
        })
    }, [])

    const [errorData, setErrorData] = useState({})

    const submit = async (e) => {
        try {
            console.log("Changing name")
            await setDoc(doc(db, "users", user.uid), {
                name: name
            })
            window.location.reload(false);
        } catch (err) {
            console.log(err)
            setErrorData(err)
        }
    }

    return (
        <div className="container py-5 ">
            <div className="row d-flex align-items-center justify-content-center ">
                <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                    <form onSubmit={(e) => submit(e)}>
                        {/* {loginVal && <Alert variant="danger">{loginVal}</Alert>} */}
                        {(errorData === "none") && <Alert variant="success">Info changed</Alert>}

                        {/* <!-- Name input --> */}
                        {errorData && (errorData.name && <Alert variant="danger">{errorData.name.message}</Alert>)}
                        <FloatingLabel controlId="name" label="Name" className="mb-3">
                            <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
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