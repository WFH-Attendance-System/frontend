// import useAuth from '@/hooks/useAuth';
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login, Dashboard, Error404, Employee, Attendance } from "@/pages";

function App() {
    // const { isAuthenticated } = useAuth();

    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employee" element={<Employee />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </>
    );
}

export default App;
