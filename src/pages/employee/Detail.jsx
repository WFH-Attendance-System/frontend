import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useTitle from "@/hooks/useTitle";
import EmployeeDetail from "@/components/Employee/EmployeeDetail";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

function Detail() {
    const { setTitle } = useTitle();
    const [employee, setEmployee] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const status = !employee.is_active ? " (Non-Aktif)" : "";
        setTitle(
            "Detail Karyawan - " + (employee?.name || "Loading...") + status
        );
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
                            {employee.is_active ? "Aktif" : "Non-Aktif"}
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
                            {employee.is_active ? (
                                <Button
                                    variant="danger"
                                    onClick={() => {
                                        const confirmation = confirm(
                                            "Apakah Anda yakin ingin menon-aktifkan karyawan ini?"
                                        );

                                        if (confirmation) {
                                            navigate(
                                                `/employee/${employee.id}/delete`
                                            );
                                        }

                                        return;
                                    }}
                                >
                                    Non-aktifkan Karyawan
                                </Button>
                            ) : null}
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

export default Detail;
