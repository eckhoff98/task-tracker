import ChangePassword from "./ChangePassword"
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Firebase
import { doc, getDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase-config"


export default function Account({ nav }) {
    const [user, setUser] = useState(null)
    const [firestoreUser, setFirestoreUser] = useState(null)

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            console.log("onAuthStateChanged")
            if (!user) return nav("/login")
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef)
            // user.extraInfo = docSnap.data()
            setFirestoreUser(docSnap.data())
            setUser(user)
        })
    }, [])

    return (
        <>
            <h1>Account</h1>
            <section>
                <Card className="bg-dark">
                    <Card.Header>Info</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Name: {firestoreUser ? firestoreUser.name : ""}
                        </Card.Text>
                        <Card.Text>
                            Email: {user ? user.email : ""}
                        </Card.Text>
                        <div className="btn-grid">
                            <Button variant="outline-primary" size="lg" as={Link} to="/change-user-info">Change info</Button>
                            <Button variant="outline-primary" size="lg" as={Link} to="/change-password">Change password (NOT YET IMPLIMENTED)</Button>
                            <Button variant="outline-danger" size="lg" as={Link} to="/">Delete Account (NOT YET IMPLIMENTED)</Button>
                        </div>
                    </Card.Body>
                </Card>

            </section>
        </>
    )
}