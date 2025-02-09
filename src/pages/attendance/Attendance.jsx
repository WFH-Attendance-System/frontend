import { useEffect, useState } from "react";
import useTitle from "@/hooks/useTitle";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { VITE_API_URL } from "@/utils/constants";
import { formatDateTime } from "@/utils/formatter";
import { Table, Modal, Button } from "react-bootstrap";

function Attendance() {
    const { setTitle } = useTitle();
    const { token, user } = useAuth();
    const [attendanceList, setAttendanceList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    const handleOpenModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedImage("");
    };

    useEffect(() => {
        setTitle("Daftar Kehadiran");
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${VITE_API_URL}/api/attendances/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            latest: true,
                        },
                    }
                );

                const { data } = response.data;
                setAttendanceList(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nama Karyawan</th>
                        <th>Departemen</th>
                        <th>Tanggal Check In</th>
                        <th>Foto Check In</th>
                        <th>Tanggal Check Out</th>
                        <th>Foto Check Out</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        attendanceList.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    Tidak ada data kehadiran
                                </td>
                            </tr>
                        )
                    }
                    {attendanceList.map((attendance) => (
                        <tr key={attendance.id}>
                            <td>{attendance.employee_name}</td>
                            <td>{attendance.department_name}</td>
                            <td>{formatDateTime(attendance.check_in_time)}</td>
                            <td>
                                {attendance.check_in_photo && (
                                    <Button
                                        onClick={() =>
                                            handleOpenModal(
                                                attendance.check_in_photo
                                            )
                                        }
                                    >
                                        Lihat Foto
                                    </Button>
                                )}
                            </td>
                            <td>{formatDateTime(attendance.check_out_time)}</td>
                            <td>
                                {attendance.check_out_photo && (
                                    <Button
                                        onClick={() =>
                                            handleOpenModal(
                                                attendance.check_out_photo
                                            )
                                        }
                                    >
                                        Lihat Foto
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={closeModal} centered>
                <Modal.Body className="text-center">
                    <img
                        src={`${VITE_API_URL}/images/${selectedImage}`}
                        alt="Preview"
                        style={{ width: "100%", maxHeight: "90vh" }}
                    />
                    <Button
                        variant="secondary"
                        className="mt-2"
                        onClick={closeModal}
                    >
                        Close
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Attendance;
