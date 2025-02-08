import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import useTitle from "@/hooks/useTitle";
import useAuth from "@/hooks/useAuth";

import { NavbarLogo } from "@/components";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

function Login() {
    const { setTitle } = useTitle();
    const { isAuthenticated, login } = useAuth();

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log(formData);

        // const data = Object.fromEntries(formData.entries());

        login(formData, "/dashboard", "/login");
    };

    useEffect(() => {
        setTitle("Login");
    }, []);

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace={true} />;
    }

    return (
        <div
            className="bg-dark d-flex flex-column justify-content-center align-items-center"
            style={{ height: "100vh", width: "100vw" }}
        >
            <h1 className="text-light">
                <NavbarLogo />
            </h1>
            <Container className=" d-flex justify-content-center align-items-center">
                <Card className="col-lg-6 col-md-8 col-12">
                    <Card.Body>
                        <Card.Title className="text-center">Login</Card.Title>
                        <Form onSubmit={onSubmit}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    name="email"
                                    type="email"
                                    placeholder="Masukkan email"
                                />
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    name="password"
                                    type="password"
                                    placeholder="Masukkan password"
                                    autoComplete="on"
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                className="mt-3 w-100"
                            >
                                Login
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default Login;
