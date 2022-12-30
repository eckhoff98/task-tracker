import ChangePassword from "./ChangePassword"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { useEffect } from "react";


export default function Account({ pb, nav, user }) {
    useEffect(() => {
        if (!user) {
            return nav("/login")
        }
    })

    return (
        <>
            <h1>Account</h1>
            <section>
                <Card className="bg-dark">
                    <Card.Header>Info</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Name: {user.extraInfo.name}
                        </Card.Text>
                        <Card.Text>
                            Email: {user.email}
                        </Card.Text>
                        <div className="btn-grid">
                            {/* <Button variant="outline-primary" size="lg" as={Link} to="/change-user-info">Change info</Button>
                            <Button variant="outline-primary" size="lg" as={Link} to="/change-password">Change password</Button>
                            <Button variant="outline-danger" size="lg" as={Link} to="/change-password">Delete Account</Button> */}
                        </div>
                    </Card.Body>
                </Card>

            </section>
        </>
    )
}