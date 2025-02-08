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
    const [authResErrors, setAuthResErrors] = useState(null);
    const [userId, setUserId] = useState(null);
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
                // save userId on mount for cases when user closes or reloads page but not logged-off
                if (!userId) setUserId(jwtDecode(response.data.token).id);

                setToken(response.data.token);
                setAuthResErrors(null);
            } else {
                setToken(null);
                setAuthResErrors(response.data);
            }
        } catch {
            setToken(null);
            setAuthResErrors({
                code: 500,
                data: null,
                message: "something went wrong!",
                status: false,
            });
        } finally {
            setLoading(false);
        }
    }, [api, setToken, setAuthResErrors, setLoading, userId]);

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
                setUserId(response.data.data.user_id);
                setAuthResErrors(null);
                navigate(onSuccess, { replace: true });
            } else {
                setToken(null);
                setAuthResErrors({
                    code: response.status,
                    data: response.data,
                    message: "Something went wrong!",
                    status: false,
                });
                navigate(onError, { replace: true });
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 400) {
                    setToken(null);
                    setAuthResErrors(error.response.data);
                    navigate(onError, { replace: true });
                    alert(
                        error.response.data.message ||
                            "Invalid login credentials"
                    );
                } else {
                    setToken(null);
                    setAuthResErrors({
                        code: error.response.status,
                        data: error.response.data,
                        message: "Something went wrong!",
                        status: false,
                    });
                    navigate(onError, { replace: true });
                    alert(
                        "An error occurred: " +
                            (error.response.data.message || "Please try again.")
                    );
                }
            } else {
                setToken(null);
                setAuthResErrors({
                    code: 500,
                    data: null,
                    message: "Something went wrong!",
                    status: false,
                });
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

    const logout = () => {
        setToken(null);
    };

    return loading ? (
        <Loading size="5vw" bgSize="100vh" />
    ) : (
        <AuthContext.Provider
            value={{
                login,
                logout,
                setLoading,
                authResErrors,
                setAuthResErrors,
                isAuthenticated: !!token,
                userId,
                token,
                refreshToken,
                api,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
