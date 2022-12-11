// import { Link } from "react-router-dom"
// // import AddTask from "./AddTask"
// import 'bootstrap/dist/css/bootstrap.css';
// import { Button } from 'reactstrap';

// const NavBar = ({ appName }) => {
//     return (
//         <>
//             <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
//                 <div className="container-fluid">
//                     <Link className="navbar-brand" to="/">{appName}</Link>

//                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                             <li className="nav-item">
//                                 <Link className="nav-link active" aria-current="page" to="/">Home</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="#">Link</Link>
//                             </li>
//                             <li className="nav-item dropdown">
//                                 <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                                     Dropdown
//                                 </Link>
//                                 <ul className="dropdown-menu">
//                                     <li><Link className="dropdown-item" to="#">Action</Link></li>
//                                     <li><Link className="dropdown-item" to="#">Another action</Link></li>
//                                     <li><hr className="dropdown-divider" /></li>
//                                     <li><Link className="dropdown-item" to="#">Something else here</Link></li>
//                                 </ul>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link disabled">Disabled</Link>
//                             </li>
//                         </ul>
//                         <ul className="nav navbar-nav navbar-right">
//                             <li className="nav-item dropdown">
//                                 <Link className="nav-link dropdown-toggle decks-button" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Account</Link>
//                                 <ul className="dropdown-menu dropdown-menu-end">
//                                     <li><Link className="dropdown-item" to="">Acount info</Link></li>
//                                     <hr className="dropdown-divider" />
//                                     <li><Link className="dropdown-item " to="">Log out</Link></li>
//                                 </ul>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/login">Log in</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/register">Sign up</Link>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
//         </>
//     )
// }

// export default NavBar



import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function CollapsibleExample() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Task Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/about">Features</Nav.Link>
                        <Nav.Link href="/more">More stuff</Nav.Link>
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
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CollapsibleExample;