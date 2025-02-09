import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { HorizontalForm } from "@/components";
import { VITE_API_URL } from "@/utils/constants";
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

function EmployeeForm({ employee = null, setEmployee, newData = false }) {
    let url = `${VITE_API_URL}/api/users/${employee.id}`;
    let method = "patch";
    const { token } = useAuth();
    const navigate = useNavigate();

    const fields = [
        {
            name: "name",
            label: "Nama",
            type: "text",
            placeholder: "Masukkan nama karyawan",
        },
        {
            name: "username",
            label: "Username",
            type: "text",
            placeholder: "Masukkan username",
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Masukkan email",
        },
        {
            name: "phone_number",
            label: "Nomor Telepon",
            type: "text",
            placeholder: "Masukkan nomor telepon",
        },
        {
            name: "dept_id",
            label: "Departemen",
            type: "select",
            placeholder: "Departemen",
            options: [
                { value: 1, label: "IT" },
                { value: 2, label: "HRD" },
                { value: 3, label: "Staff" },
            ],
        },
    ];

    if (newData) {
        url = `${VITE_API_URL}/api/users/`;
        method = "post";
        fields.splice(3, 0, {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Masukkan password",
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const fetchData = async () => {
            try {
                console.log(employee);
                const payload = {
                    email: employee.email,
                    dept_id: parseInt(employee.dept_id),
                    name: employee.name,
                    phone_number: employee.phone_number,
                    username: employee.username,
                };

                if (newData) {
                    payload["password"] = employee.password;
                }

                const response = await axios[method](url, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    alert("Data berhasil diubah");
                    navigate("/employee");
                }
            } catch (error) {
                console.error("Error updating employee:", error);
                alert(
                    "Gagal mengubah data karyawan. " +
                        error.response?.data?.message
                );
            }
        };

        fetchData();
    };
    return (
        <Card>
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
        </Card>
    );
}

export default EmployeeForm;
