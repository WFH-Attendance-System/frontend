import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import AuthProvider from './contexts/AuthProvider.tsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        {/* <AuthProvider> */}
        <App />
        {/* </AuthProvider> */}
    </BrowserRouter>
);