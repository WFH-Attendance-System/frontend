import { Container, Navbar as NavbarBootstrap } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar({ isOpenSidebar, setIsOpenSidebar }) {
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
                    <span>Profil</span>
                </Container>
            </NavbarBootstrap>
            <hr className="mt-0" />
        </>
    );
}

export default Navbar;
