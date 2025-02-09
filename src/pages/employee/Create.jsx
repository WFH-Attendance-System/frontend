import { useEffect, useState } from "react";
import useTitle from "@/hooks/useTitle";
import { EmployeeForm } from "@/components";

function Create() {
    const { title, setTitle } = useTitle();
    const [employee, setEmployee] = useState({
        name: "",
        username: "",
        email: "",
        phone_number: "",
        dept_id: 1,
        password: "",
    });

    useEffect(() => {
        setTitle("Buat Karyawan");
    }, []);

    return (
        <>
            <EmployeeForm
                newData={true}
                employee={employee}
                setEmployee={setEmployee}
            />
        </>
    );
}

export default Create;
