import {
    Container,
    Navbar as NavbarBootstrap,
    NavDropdown,
} from "react-bootstrap";
import { Navigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import useAuth from "@/hooks/useAuth";

function Navbar({ isOpenSidebar, setIsOpenSidebar }) {
    const { user } = useAuth();

    return (
        <>
            <NavbarBootstrap
                style={{ height: "50px" }}
                bg="body-tertiary"
                expand="lg"
            >
                <Container className="d-flex justify-content-between">
                    <button
                        className="btn btn-light"
                        onClick={() => setIsOpenSidebar(!isOpenSidebar)}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <NavDropdown
                        title={user.name}
                        align="end"
                        id="basic-nav-dropdown"
                    >
                        <NavDropdown.Item href="logout">Logout</NavDropdown.Item>
                    </NavDropdown>
                </Container>
            </NavbarBootstrap>
            <hr className="mt-0" />
        </>
    );
}

export default Navbar;
