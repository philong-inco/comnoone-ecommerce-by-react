import { Button } from "@mui/material";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { IconCirclePlus } from '@tabler/icons-react';

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
                let url = result.info.secure_url
                setUrlImages(prevImages => [url, ...prevImages]);
            }
        });
    }, [setUrlImages]);


    const handleUpload = () => {
        widgetRef.current.open()
    }

    return (
        <Button title='Tải ảnh lên' sx={{color: "#FFFFFF"}} onClick={handleUpload}>
            <IconCirclePlus stroke={2}/>
        </Button>
    );
};

export default UploadWidget;
