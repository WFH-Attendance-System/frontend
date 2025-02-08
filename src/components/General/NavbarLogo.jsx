import { Link } from "react-router-dom";

function NavbarLogo() {
    return (
        <>
            <Link
                to="/"
                className="d-flex align-items-center text-white text-decoration-none"
            >
                <span>Attendance</span>
            </Link>
        </>
    );
}

export default NavbarLogo;
