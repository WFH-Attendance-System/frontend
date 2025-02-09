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

    // local storage function to get token
    const getToken = function () {
        return localStorage.getItem("token");
    };

    const refreshToken = useCallback(async () => {
        try {
            const response = await api.get(`/api/auth/refresh-token`);
            if (response.status === 200) {
                setToken(response.data.token);
                const userData = jwtDecode(response.data.token);
                setUser(userData);
            }
        } catch {
            setToken(null);
            setUser(null);
        } finally {
            setLoading(false);
        }
    });

    const isTokenExpired = function (token) {
        const date = new Date();
        const userData = jwtDecode(token);
        return date >= userData.exp * 1000;
    };

    useEffect(() => {
        const token = getToken();

        const fetchData = async () => {
            try {
                if (token && !isTokenExpired(token)) {
                    setLoading(true); // Start loading before the API call

                    const userData = jwtDecode(token);
                    setToken(token);

                    // API call to get user data
                    const response = await axios.get(
                        `${VITE_API_URL}/api/auth/whoami`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );

                    if (response.status === 200) {
                        setUser(userData);
                    } else {
                        // Handle the case when API response is not 200 (token may be invalid)
                        throw new Error("Invalid token");
                    }

                    localStorage.setItem("token", token); // Store token only after successful validation
                } else {
                    throw new Error("Token expired or invalid");
                }
            } catch (error) {
                console.error("Error:", error.message);

                // Clear user and token data if any error occurs
                setUser(null);
                setToken(null);
                localStorage.removeItem("token");

                // Prevent multiple navigations
                if (window.location.pathname !== "/login") {
                    navigate("/login", { replace: true });
                }
            } finally {
                setLoading(false); // Stop loading after the operation completes
            }
        };

        // Call the async function if token exists
        if (token) {
            fetchData();
        } else {
            setToken(null);
            setUser(null);
            localStorage.removeItem("token");

            // Prevent multiple navigations to login
            if (window.location.pathname !== "/login") {
                navigate("/login", { replace: true });
            }
        }
    }, [token, navigate]);

    const login = async (body, onSuccess, onError) => {
        try {
            setLoading(true);
            const response = await api.post("/api/auth/login", body);

            // Handle successful login
            if (response.status === 200) {
                const token = response.data.data.token;
                localStorage.setItem("token", token);

                setToken(token);
                const userData = jwtDecode(token);
                setUser(userData);
            }
            navigate(onSuccess, { replace: true });
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 400) {
                    alert(
                        error.response.data.message ||
                            "Invalid login credentials"
                    );
                } else {
                    alert(
                        "An error occurred: " +
                            (error.response.data.message || "Please try again.")
                    );
                }
            } else {
                alert(
                    "Network error: " + error.message ||
                        "Unexpected error occurred"
                );
            }
            setToken(null);
            navigate(onError, { replace: true });
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
                token,
                setToken,
                user,
                setUser,
                api,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
