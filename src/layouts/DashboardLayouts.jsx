import { Outlet, useLocation } from "react-router-dom";
import { Sidebar, Navbar } from "@/components";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";

function DashboardLayouts() {
    const location = useLocation();

    const [isOpenSidebar, setIsOpenSidebar] = useState(true);
    const pageTitles = {
        "/dashboard": "Dashboard",
        "/employee": "Karyawan",
        "/attendance": "Daftar Presensi Karyawan",
    };

    const pageTitle = pageTitles[location.pathname] || "WFH Attendance App";
    useEffect(() => {
        document.title = `${pageTitle}`;
    }, [location.pathname]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsOpenSidebar(false); // Collapse on small screens
            } else {
                setIsOpenSidebar(true); // Expand on large screens
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="d-flex" style={{ minHeight: "100vh" }}>
            <aside
                className={`sidebar ${
                    isOpenSidebar ? "d-flex open" : "close"
                } flex-column flex-shrink-0 text-white bg-dark col-lg-2`}
                style={{ minHeight: "100%" }}
            >
                <Sidebar />
            </aside>

            <main className="col mb-4">
                <Navbar
                    isOpenSidebar={isOpenSidebar}
                    setIsOpenSidebar={setIsOpenSidebar}
                />

                <Container>
                    <h1 className="fs-3 fw-semibold">{pageTitle}</h1>

                    <Outlet />
                </Container>
            </main>
        </div>
    );
}

export default DashboardLayouts;
