import { requestPermission } from '../firebase-config';
import Button from 'react-bootstrap/esm/Button';


export default function AllowNotifications({ user }) {
    return <Button variant="outline-success" size="lg" onClick={() => requestPermission(user)}>Allow Notifications?</Button>
}