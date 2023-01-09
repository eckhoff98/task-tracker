import Container from 'react-bootstrap/esm/Container';
import Nav from 'react-bootstrap/esm/Nav';
import Navbar from 'react-bootstrap/esm/Navbar';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Firebase
import { doc, getDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase-config"

function NavBar({ logout }) {
    const [user, setUser] = useState(null)
    const [firestoreUser, setFirestoreUser] = useState(null)


    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            console.log("onAuthStateChanged")
            if (!user) return setUser(null)
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef)
            // user.extraInfo = docSnap.data()
            setFirestoreUser(docSnap.data())
            setUser(user)
        })
    }, [])

    const LoginRegister = () => {
        if (user) {
            return (
                <>
                    <NavDropdown title={firestoreUser ? firestoreUser.name : user.email} id="collasible-nav-dropdown" >
                        <NavDropdown.Item eventKey="6" as={Link} to="/account">Account</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item eventKey="7" as={Link} to="/" onClick={() => { logout() }}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </>
            )
        } else {
            return (
                <>
                    <Nav.Link eventKey="1" as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link eventKey="2" as={Link} to="/register">Register</Nav.Link>
                </>
            )
        }
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand >
                    <Nav.Link eventKey="10" as={Link} to="/">Task Tracker</Nav.Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link eventKey="3" as={Link} to="/tasks">Tasks</Nav.Link>
                        <Nav.Link eventKey="4" as={Link} to="/about">About</Nav.Link>

                        {/* Example code */}
                        {/* <Nav.Link eventKey="5" as={Link} to="/more">More stuff</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown> */}

                    </Nav>
                    <Nav>
                        <LoginRegister />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;