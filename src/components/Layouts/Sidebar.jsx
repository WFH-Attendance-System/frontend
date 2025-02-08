import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faUsers,
    faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavbarLogo } from "@/components";

function Sidebar() {
    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon: faHome },
        { name: "Karyawan", href: "/employee", icon: faUsers },
        { name: "Kehadiran", href: "/attendance", icon: faCalendarCheck },
    ];

    const location = useLocation();

    return (
        <>
            <Navbar style={{ height: "50px" }}>
                <Container>
                    <NavbarLogo />
                </Container>
            </Navbar>
            <hr className="mt-0" />
            <ul className="nav nav-pills flex-column mb-auto px-3 py-0">
                {navigation.map((item) => (
                    <li key={item.name} className="nav-item">
                        <Link
                            to={item.href}
                            className={`nav-link text-white ${
                                location.pathname.startsWith(item.href)
                                    ? "active"
                                    : ""
                            }`}
                        >
                            <FontAwesomeIcon
                                className="me-2"
                                icon={item.icon}
                            />
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Sidebar;
