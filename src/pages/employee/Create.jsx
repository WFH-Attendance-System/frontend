import { useEffect } from "react";
import useTitle from "@/hooks/useTitle";

function Create() {
    const { title, setTitle } = useTitle();

    useEffect(() => {
        setTitle("Buat Karyawan");
    }, []);

    return <div>Create Karyawan</div>;
}

export default Create;
