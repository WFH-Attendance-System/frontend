import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import useTitle from "@/hooks/useTitle";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

function Employee() {
    const { setTitle } = useTitle();
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        setTitle("Daftar Karyawan");
        const list = [
            {
                id: 1,
                name: "John Doe",
                dept: "IT",
            },
            {
                id: 2,
                name: "Jane",
                dept: "IT",
            },
            {
                id: 3,
                name: "Doe",
                dept: "IT",
            },
        ];
        setEmployee(list);
    }, []);

    return (
        <Row style={{ rowGap: "0.5rem" }}>
            {employee.map((item) => (
                <Col xs={12} md={6} lg={4} key={item.id}>
                    <Card style={{ height: "100%" }}>
                        <Card.Body
                            className="d-flex flex-row align-items-center"
                            style={{ gap: "1rem" }}
                        >
                            <div>
                                <Card.Img
                                    variant="top"
                                    src={`https://ui-avatars.com/api/?name=${item.name}&size=64&background=random`}
                                />
                            </div>

                            <div>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>{item.dept}</Card.Text>
                            </div>

                            <div
                                className="ms-auto d-flex flex-column"
                                style={{ gap: "0.25rem" }}
                            >
                                <Link to={`/employee/${item.id}`}>
                                    <Button className="w-100" size="sm">
                                        Detail
                                    </Button>
                                </Link>
                                <Link to={`/employee/${item.id}/edit`}>
                                    <Button
                                        className="w-100"
                                        size="sm"
                                        variant="warning"
                                    >
                                        Ubah
                                    </Button>
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}

            <Col xs={12} md={6} lg={4}>
                <Link to="/employee/create" className="text-decoration-none">
                    <Card style={{ height: "100%", minHeight: "80px" }}>
                        <Card.Body className="d-flex flex-row align-items-center justify-content-center text-primary">
                            <FontAwesomeIcon
                                icon={faPlusCircle}
                                className="me-2"
                            />
                            Tambah Baru
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
        </Row>
    );
}

export default Employee;
