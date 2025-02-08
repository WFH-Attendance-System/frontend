import { useEffect } from "react";
import useTitle from "@/hooks/useTitle";

function AttendanceDetail() {
    const { setTitle } = useTitle();

    useEffect(() => {
        setTitle('Daftar Kehadiran');
    }, []);

    return "AttendanceDetail";
}

export default AttendanceDetail;
