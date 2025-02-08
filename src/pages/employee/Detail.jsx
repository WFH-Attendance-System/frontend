import { useEffect } from "react";
import useTitle from "@/hooks/useTitle";

function Detail() {
    const {setTitle} = useTitle();

    useEffect(() => {
        setTitle("Detail Karyawan - ");
    }, []);

    return <div>Detail Karyawan</div>;
}

export default Detail;
