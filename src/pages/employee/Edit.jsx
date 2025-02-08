import { useEffect } from "react";
import useTitle from "@/hooks/useTitle";
function Edit() {
    const { setTitle } = useTitle();

    useEffect(() => {
        setTitle("Ubah Data Karyawan - ");
    }, []);

    return (
        <div>
            <h1>Edit Employee</h1>
        </div>
    );
}

export default Edit;
