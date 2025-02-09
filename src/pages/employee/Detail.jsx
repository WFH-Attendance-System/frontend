import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useTitle from "@/hooks/useTitle";
import EmployeeDetail from "@/components/Employee/EmployeeDetail";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

function Detail() {
    const { setTitle } = useTitle();
    const [employee, setEmployee] = useState({});

    useEffect(() => {
        setTitle("Detail Karyawan - " + (employee?.name || "Loading..."));
    }, [employee]);

    return (
        <>
            <EmployeeDetail setEmployee={setEmployee} />
            <Card>
                <Card.Body className="d-flex flex-row align-items-center row">
                    <div className="col-12 col-lg-2 d-flex flex-column align-items-center">
                        <Card.Img
                            variant="top"
                            className="w-100"
                            style={{ maxWidth: "6rem" }}
                            src={`https://ui-avatars.com/api/?name=${employee.name}&background=random`}
                        />
                        <Card.Title>{employee.name}</Card.Title>
                    </div>
                    <div className="col-12 col-lg-10 border-start">
                        <Card.Text>
                            <strong>Username:</strong> {employee.username}
                        </Card.Text>
                        <Card.Text>
                            <strong>Email:</strong> {employee.email}
                        </Card.Text>
                        <Card.Text>
                            <strong>Nomor Telepon:</strong>{" "}
                            {employee.phone_number}
                        </Card.Text>
                        <Card.Text>
                            <strong>Department:</strong>{" "}
                            {employee.department_name}
                        </Card.Text>
                        <Card.Text>
                            <strong>Status Karyawan:</strong>{" "}
                            {employee.is_active ? "Aktif" : "Tidak Aktif"}
                        </Card.Text>
                        <div
                            className="d-flex flex-row"
                            style={{ gap: "1rem" }}
                        >
                            <Link to={`/employee/${employee.id}/edit`}>
                                <Button variant="warning">
                                    Ubah Data Karyawan
                                </Button>
                            </Link>
                            {employee.is_active && (
                                <Link to={`/employee/${employee.id}/delete`}>
                                    <Button variant="danger">
                                        Non-aktifkan Karyawan
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

export default Detail;
