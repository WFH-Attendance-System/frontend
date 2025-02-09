import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import { VITE_API_URL } from "@/utils/constants";

function EmployeeDetail({ setEmployee }) {
    const { id } = useParams();
    const { token } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${VITE_API_URL}/api/users/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setEmployee(response.data.data);
            } catch (error) {
                console.error("Error fetching employee:", error);
            }
        };
        fetchData();
    }, [id]);

    return null;
}

export default EmployeeDetail;
