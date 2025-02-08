// import useAuth from '@/hooks/useAuth';
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Protected } from "@/components";
import { DashboardLayouts } from "@/layouts";

import "./App.css";
import { Login, Logout, Dashboard, Error404, Employee, Attendance } from "@/pages";

function App() {
    // const { isAuthenticated } = useAuth();

    return (
        <>
            <Routes>
                <Route
                    index
                    element={
                        /*   isAuthenticated ? (
                            <Navigate to="/dashboard" replace />
                        ) : (
                            <Navigate to="/login" replace />
                        ) */
                        <Navigate to="/dashboard" replace />
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
                    <Route path="/attendance" element={<Attendance />} />
                </Route>

                <Route path="*" element={<Error404 />} />
            </Routes>
        </>
    );
}

export default App;
