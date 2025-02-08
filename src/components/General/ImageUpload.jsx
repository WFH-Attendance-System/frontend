import { useState } from "react";
import Form from "react-bootstrap/Form";
import EXIFReader from "exifreader";

const ImageUpload = ({ setImage, setUploadedImageTime, previewStatus, setPreviewStatus }) => {
    const [preview, setPreview] = useState(null);

    const handleImageChange = (event) => {
        if (!event.target.files || !event.target.files[0]) return;
        const file = event.target.files[0];

        // Show preview
        setPreview(URL.createObjectURL(file));
        setPreviewStatus(true);
        setImage(file);

        const reader = new FileReader();
        reader.onload = function (e) {
            const arrayBuffer = e.target.result;

            try {
                // Parse the EXIF data using exifreader
                const tags = EXIFReader.load(arrayBuffer);
                const exifDate = tags?.DateTimeOriginal || tags?.DateTime;

                if (exifDate) {
                    var date = exifDate.value[0];
                    // Replace colons with hyphens in the date part
                    date = date.replace(/:/g, "-");
                    date = date.replace(
                        /(.*? )(.*)/,
                        (match, before, after) => {
                            return before + after.replace(/-/g, ":");
                        }
                    );

                    setUploadedImageTime(new Date(date));
                } else {
                    console.warn("No EXIF date found. Using fallback.");
                    setUploadedImageTime(
                        file.lastModifiedDate
                            ? new Date(file.lastModifiedDate)
                            : new Date()
                    );
                }
            } catch (error) {
                console.error("Error reading EXIF data:", error);
                setUploadedImageTime(
                    file.lastModifiedDate
                        ? new Date(file.lastModifiedDate)
                        : new Date()
                );
            }
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <Form.Group className="mb-3">
            <Form.Label
                htmlFor="fileInput"
                className="image-upload-label w-100"
                style={{
                    height: "100%",
                    minHeight: "100px",
                    maxHeight: "400px",
                    border: "2px dashed #ccc",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    overflow: "hidden",
                    position: "relative",
                    backgroundColor: "#f8f9fa",
                }}
            >
                {previewStatus && preview ? (
                    <img
                        src={preview}
                        alt="Uploaded"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                ) : (
                    <span style={{ fontSize: "32px", color: "#999" }}>+</span>
                )}
            </Form.Label>

            <Form.Control
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
                accept="image/jpeg, image/png, image/jpg"
            />
        </Form.Group>
    );
};

export default ImageUpload;
