import { Button } from "@mui/material";
import { useState } from "react";
import { useEffect, useRef } from "react";

const UploadWidget = ({ setUrlImages, showMessage }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "dse71o3zv",
            uploadPreset: "demo_shop"
        }, function (error, result) {
            if (!error && result && result.event === "success") {
                let newImage = {
                    colorId: 0,
                    url: result.info.secure_url
                }
                setUrlImages(prevImages => [...prevImages, newImage]);
            }
        });
    }, [setUrlImages]);


    const handleUpload = () => {
        
        widgetRef.current.open()
        
    }

    return (
        <Button onClick={handleUpload}>
            Tải ảnh
        </Button>
    );
};

export default UploadWidget;
