import { Button } from "@mui/material";
import { useEffect, useRef } from "react";

const UploadWidget = ({ setUrlImages }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "dse71o3zv",
            uploadPreset: "demo_shop"
        }, function (error, result) {
            if (!error && result && result.event === "success") {
                setUrlImages(prevImages => [...prevImages, result.info.secure_url]);
            }
        });
    }, [setUrlImages]);

    return (
        <Button onClick={() => widgetRef.current.open()}>
            Tải ảnh
        </Button>
    );
};

export default UploadWidget;
