import ChangePassword from "./ChangePassword"
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";


export default function Account({ pb }) {
    return (
        <>
            <h1>Account</h1>
            <Button as={Link} to="/change-password">Change password</Button>
        </>
    )
}