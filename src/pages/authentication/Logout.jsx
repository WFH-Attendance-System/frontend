import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { VITE_API_URL } from "@/utils/constants";

const Logout = () => {
    const { token, setToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                const response = await axios.post(
                    `${VITE_API_URL}/api/auth/logout`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 200) {
                    setToken(null);
                    localStorage.removeItem("token");
                    navigate("/login", { replace: true });
                } else {
                    alert("An error occurred: " + response.data.message);
                    navigate("/login", { replace: true });
                }
            } catch (error) {
                console.error("Logout error:", error);
                navigate("/", { replace: true });
            }
        };

        logout();
    }, [token, setToken, navigate]);
};

export default Logout;
