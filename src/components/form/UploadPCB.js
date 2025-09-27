import { Field, Textarea, Text } from "@chakra-ui/react"

import { HiUpload } from "react-icons/hi";
import { MdDescription } from 'react-icons/md';
import { FaTimes } from 'react-icons/fa';

import { useRef, useState } from "react";

function Upload({ formData, setFormData, errors }) {
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState(formData.boardfile?.name);

    const handlechangeInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const showToast = (message, type = "info") => {
        const toast = document.createElement("div");
        toast.innerText = message;
        toast.style.position = "fixed";
        toast.style.top = "20px";
        toast.style.left = "50%";
        toast.style.transform = "translateX(-50%)";
        toast.style.padding = "12px 24px";
        toast.style.borderRadius = "8px";
        toast.style.color = "white";
        toast.style.zIndex = "9999";
        toast.style.fontSize = "14px";
        toast.style.textAlign = "center";

        if (type === "success") {
            toast.style.backgroundColor = "#4CAF50";
        } else if (type === "error") {
            toast.style.backgroundColor = "#f44336";
        } else {
            toast.style.backgroundColor = "#2196F3";
        }

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transition = "opacity 0.5s ease";
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 500);
        }, 3000);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.size > 30 * 1024 * 1024) {
            showToast("فایل بیش از حد بزرگ است. حداکثر 30 مگابایت مجاز است.", "error");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;

            setFormData({
                ...formData,
                boardfile: {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    base64: base64String,
                },
            });

            setFileName(file.name);
            showToast("فایل با موفقیت آپلود شد", "success");
        };

        reader.onerror = () => {
            showToast("خطا در خواندن فایل", "error");
        };

        reader.readAsDataURL(file);
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemoveFile = () => {
        setFormData({
            ...formData,
            boardfile: null,
        });
        setFileName("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <>
            <Text display="flex">
                فایل برد : <Text marginRight="7px" fontSize="16px" color="red">*</Text>
            </Text>
            <div className="Boardfile-Upload">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".zip,.rar,.xls,.xlsx,.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
                />
                <button className="handleUpload" onClick={handleUploadClick}>
                    <div className="upload-text">
                        <span>آپلود فایل</span>
                        <div className="upload-icon"><HiUpload /></div>
                    </div>
                </button>
                {(fileName !== "" && formData.boardfile !== null) && (
                    <p className="file-text">
                        <p className="handleRemove" onClick={handleRemoveFile}>
                            <FaTimes size={30} />
                        </p>
                        <div>
                            <span>{formData.boardfile?.name}</span>
                            <MdDescription size={40} />
                        </div>
                    </p>
                )}
            </div>
            <Text fontSize="14px" color="gray" paddingTop="5px" paddingBottom="20px">
                انواع فایل های مجاز : zip,exel,rar , حداکثر اندازه فایل: 30 MB.
            </Text>
            <Field.Root>
                <Field.Label>توضیحات سفارش :</Field.Label>
                <Textarea backgroundColor="white" key="description" name="description" value={formData.description || ""} onChange={handlechangeInput} minH="200px" />
            </Field.Root>
        </>
    );
}

export default Upload;