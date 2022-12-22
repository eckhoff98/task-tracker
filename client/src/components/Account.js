import ChangePassword from "./ChangePassword"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { useEffect } from "react";


export default function Account({ pb, nav }) {
    useEffect(() => {
        if (!pb.authStore.isValid) {
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
                            Name: {pb.authStore.model.name}
                        </Card.Text>
                        <Card.Text>
                            Username: {pb.authStore.model.username}
                        </Card.Text>
                        <Card.Text>
                            Email: {pb.authStore.model.email}
                        </Card.Text>
                        <Card.Text>
                            Verified: {String(pb.authStore.model.verified)}
                        </Card.Text>
                        <div className="btn-grid">
                            <Button variant="outline-primary" size="lg" as={Link} to="/change-user-info">Change info</Button>
                            <Button variant="outline-primary" size="lg" as={Link} to="/change-password">Change password</Button>
                            <Button variant="outline-danger" size="lg" as={Link} to="/change-password">Delete Account</Button>
                        </div>
                    </Card.Body>
                </Card>

            </section>
            {/* <div>{JSON.stringify(pb.authStore.model)}</div> */}
            {/* <Button as={Link} to="/change-password">Change password</Button> */}
        </>
    )
}