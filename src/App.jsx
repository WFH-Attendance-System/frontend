import useAuth from '@/hooks/useAuth';
import { Navigate, Route, Routes } from "react-router-dom";
import { Protected } from "@/components";
import { DashboardLayouts } from "@/layouts";

import "./App.css";
import {
    Login,
    Logout,
    Dashboard,
    Error404,
    Employee,
    EmployeeCreate,
    EmployeeDetail,
    EmployeeEdit,
    Attendance,
    AttendanceDetail,
} from "@/pages";

function App() {
    const { isAuthenticated } = useAuth();

    return (
        <>
            <Routes>
                <Route
                    index
                    element={
                        isAuthenticated ? (
                            <Navigate to="/dashboard" replace />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />

                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />

                <Route
                    path="/"
                    element={
                        <Protected>
                            <DashboardLayouts />
                        </Protected>
                    }
                >
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/employee" element={<Employee />} />
                    <Route
                        path="/employee/create"
                        element={<EmployeeCreate />}
                    />
                    <Route path="/employee/:id" element={<EmployeeDetail />} />
                    <Route
                        path="/employee/:id/edit"
                        element={<EmployeeEdit />}
                    />
                    <Route path="/attendance" element={<Attendance />} />
                    <Route
                        path="/attendance/:id"
                        element={<AttendanceDetail />}
                    />
                </Route>

                <Route path="*" element={<Error404 />} />
            </Routes>
        </>
    );
}

export default App;
