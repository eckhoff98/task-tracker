import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';
import { Link } from "react-router-dom";


export default function Account({ user, firestoreUser }) {

    return (
        <>
            <h1>Account</h1>
            <section>
                <Card className="bg-dark">
                    <Card.Header>Info</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Name: {firestoreUser ? firestoreUser.name : (user && user.displayName)}
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