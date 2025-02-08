import { useEffect } from "react";
import useTitle from "@/hooks/useTitle";

function Attendance() {
    const { setTitle } = useTitle();

    useEffect(() => {
        setTitle('Daftar Kehadiran');
    }, []);

    return "Attendance";
}

export default Attendance;
