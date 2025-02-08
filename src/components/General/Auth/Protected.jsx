import useAuth from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/login" replace={true} />;
    } else {
        return children;
    }
}

export default Protected;
