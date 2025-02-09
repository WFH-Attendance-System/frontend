import { useEffect, useState } from "react";
import useTitle from "@/hooks/useTitle";
import { EmployeeForm, EmployeeDetail } from "@/components";

function Edit() {
    const { setTitle } = useTitle();
    const [employee, setEmployee] = useState({});

    useEffect(() => {
        setTitle("Ubah Data Karyawan - " + (employee?.name || "Loading..."));
    }, [employee]);

    return (
        <>
            <EmployeeDetail setEmployee={setEmployee} />
            <EmployeeForm
                employee={employee}
                setEmployee={setEmployee}
                newData={false}
            />
            {/*   <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        {fields.map(
                            ({ name, label, type, options, placeholder }) => (
                                <HorizontalForm
                                    key={name}
                                    name={name}
                                    label={label}
                                    type={type}
                                    placeholder={placeholder}
                                    options={options || []}
                                    onChange={(e) =>
                                        setEmployee((prev) => ({
                                            ...prev,
                                            [name]: e.target.value,
                                        }))
                                    }
                                    value={employee[name]}
                                />
                            )
                        )}
                        <Button type="submit">Simpan</Button>
                    </Form>
                </Card.Body>
            </Card> */}
        </>
    );
}

export default Edit;
