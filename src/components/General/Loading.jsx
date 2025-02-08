import Spinner from "react-bootstrap/Spinner";

function Loading({ size = null, bgSize }) {
    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: bgSize }}
        >
            <Spinner animation="border" role="status" style={{ width: size, height: size }}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
}

export default Loading;
