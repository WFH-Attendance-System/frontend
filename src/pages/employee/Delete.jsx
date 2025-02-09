import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import { VITE_API_URL } from "@/utils/constants";

function Delete() {
    const { token } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.delete(`${VITE_API_URL}/api/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                navigate("/employee", { replace: true });
            } catch (error) {
                console.error("Error deleting employee:", error);
            }
        };
        fetchData();
    });
}

export default Delete;
