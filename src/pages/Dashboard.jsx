import { formatDate, formatDateApi, formatDateTime } from "@/utils/formatter";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useTitle from "@/hooks/useTitle";
import useAuth from "@/hooks/useAuth";

import { ImageUpload } from "@/components";
import axios from "axios";

import { VITE_API_URL } from "@/utils/constants";

function dataCard(title, time = null) {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title className="fs-6">
                    Data {title ? title : "Check In"}
                </Card.Title>
                <Card.Text>
                    {time ? (
                        <span>{formatDateTime(time)}</span>
                    ) : (
                        <span>Anda belum melakukan check in</span>
                    )}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

function Dashboard() {
    const today = new Date();
    const { setTitle } = useTitle();
    const { token, user } = useAuth();

    const [uploadedImageTime, setUploadedImageTime] = useState(null);
    const [checkinTime, setCheckinTime] = useState(null);
    const [checkoutTime, setCheckoutTime] = useState(null);
    const [image, setImage] = useState(null);
    const [previewStatus, setPreviewStatus] = useState(null);

    const [attendanceList, setAttendanceList] = useState([]);

    const handleCheckInOut = async () => {
        const formData = new FormData();
        formData.append("photo", image);
        formData.append("created_date", formatDateApi(uploadedImageTime));

        try {
            const response = await axios.post(
                `${VITE_API_URL}/api/attendance/`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const { data } = response.data;
            setCheckinTime(data.check_in_time);
            setCheckoutTime(data.check_out_time);

            alert("Berhasil melakukan check in/out");

            setImage(null);
            setPreviewStatus(false);
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Terjadi kesalahan");
        }
    };

    useEffect(() => {
        setTitle("Dashboard");
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${VITE_API_URL}/api/attendances/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            userId: user.id,
                            latest: true,
                        },
                    }
                );

                const { data } = response.data;
                setAttendanceList(data);
                if (
                    data[0] &&
                    new Date(data[0].check_in_time).getDay() == today.getDay()
                ) {
                    setCheckinTime(data[0].check_in_time);
                    setCheckoutTime(data[0].check_out_time);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <Row style={{ rowGap: "1rem" }}>
            <Col xs={12} md={6} lg={4}>
                <Card className="h-100">
                    <Card.Body>
                        <Card.Title className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between">
                            <span className="card-title">Absensi Harian</span>
                            <span className="fs-6">{formatDate(today)}</span>
                        </Card.Title>
                        {dataCard("Check In", checkinTime)}
                        {checkoutTime && dataCard("Check Out", checkoutTime)}

                        {(!checkinTime || !checkoutTime) && (
                            <>
                                <ImageUpload
                                    setImage={setImage}
                                    setUploadedImageTime={setUploadedImageTime}
                                    previewStatus={previewStatus}
                                    setPreviewStatus={setPreviewStatus}
                                />
                                <Button
                                    onClick={handleCheckInOut}
                                    disabled={!image}
                                >
                                    {checkinTime ? "Check Out" : "Check In"}
                                </Button>
                            </>
                        )}
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} md={6} lg={8}>
                <Card className="h-100">
                    <Card.Body>
                        <Card.Title>
                            <span className="card-title">Riwayat Absensi</span>
                        </Card.Title>
                        <div className="max-height-400 table-responsive">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Check In</th>
                                        <th>Check Out</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendanceList.length > 0 ? (
                                        attendanceList.map(
                                            (attendance, index) => (
                                                <tr key={attendance.id}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        {formatDateTime(
                                                            attendance.check_in_time
                                                        )}
                                                    </td>
                                                    <td>
                                                        {formatDateTime(
                                                            attendance.check_out_time
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    ) : (
                                        <tr>
                                            <td colSpan="3">Tidak ada data</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default Dashboard;
