import React, {
    createContext,
    useState,
    useCallback,
    useEffect,
    useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import Api from "@/api/api";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { VITE_API_URL } from "@/utils/constants";
import { Loading } from "@/components";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const api = useMemo(
        () => new Api(VITE_API_URL, token, setToken, navigate),
        [token]
    );

    const refreshToken = useCallback(async () => {
        try {
            const response = await api.get(`/api/auth/refresh-token`);
            if (response.status === 200) {
                if (!user) setUser(jwtDecode(response.data.token));

                setToken(response.data.token);
            } else {
                setToken(null);
            }
        } catch {
            setToken(null);
        } finally {
            setLoading(false);
        }
    }, [api, setToken, setLoading, user]);

    useEffect(() => {
        if (!token) refreshToken();
    }, [refreshToken, token]);

    const login = async (body, onSuccess, onError) => {
        try {
            setLoading(true);
            const response = await api.post("/api/auth/login", body);

            // Handle successful login
            if (response.status === 200) {
                setToken(response.data.data.token);
                const userData = jwtDecode(response.data.data.token);

                setUser(userData);
                navigate(onSuccess, { replace: true });
            } else {
                setToken(null);
                navigate(onError, { replace: true });
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 400) {
                    setToken(null);
                    navigate(onError, { replace: true });
                    alert(
                        error.response.data.message ||
                            "Invalid login credentials"
                    );
                } else {
                    setToken(null);
                    navigate(onError, { replace: true });
                    alert(
                        "An error occurred: " +
                            (error.response.data.message || "Please try again.")
                    );
                }
            } else {
                setToken(null);
                navigate(onError, { replace: true });
                alert(
                    "Network error: " + error.message ||
                        "Unexpected error occurred"
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return loading ? (
        <Loading size="5vw" bgSize="100vh" />
    ) : (
        <AuthContext.Provider
            value={{
                login,
                setLoading,
                isAuthenticated: !!token,
                user,
                token,
                setToken,
                api,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
