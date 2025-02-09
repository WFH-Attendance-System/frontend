import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { VITE_API_URL } from "@/utils/constants";

const Logout = () => {
    const { token, user, setToken } = useAuth();
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
                    navigate("/login", { replace: true });
                } else {
                    alert("An error occurred: " + response.data.message);
                }
            } catch (error) {
                console.error("Logout error:", error);
            }
        };

        logout();
    }, [token, setToken, navigate]);
};

export default Logout;
