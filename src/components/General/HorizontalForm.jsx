import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

function HorizontalForm({
    name,
    label,
    type = "text",
    placeholder,
    value,
    options = [],
    ...rest
}) {
    return (
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
                {label}
            </Form.Label>
            <Col sm="10">
                {type === "select" ? (
                    <Form.Select name={name} value={value} {...rest}>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Form.Select>
                ) : (
                    <Form.Control
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        {...rest}
                    />
                )}
            </Col>
        </Form.Group>
    );
}

export default HorizontalForm;
