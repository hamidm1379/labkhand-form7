import { Field, Textarea, HStack, Text, Button, RadioCard, SimpleGrid } from "@chakra-ui/react"

import { HiUpload } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import { MdDescription } from 'react-icons/md';
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const stasil = [
    { value: "بله", title: "بله" },
    { value: "خیر", title: "خیر" }
]

const stasilSec = [
    { value: "بله", title: "بله" },
    { value: "خیر", title: "خیر" }
]

function Upload({ formData, setFormData,errors }) {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState(formData.boardfile?.name || "");
    const [selectedValueFive, setSelectedValueFive] = useState(stasil[0]?.value);
    const [selectedValue, setSelectedValue] = useState(stasilSec[0]?.value);

    const fileInputRefSec = useRef(null);
    const [fileNameSec, setFileNameSec] = useState(formData.BOMfile?.name || "");

    const handlechangeInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlechange = (key, value) => {
        setFormData({ ...formData, [key]: value.target.value });
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

        if (file.size > 10 * 1024 * 1024) {
            showToast("فایل بیش از حد بزرگ است. حداکثر 5 مگابایت مجاز است.", "error");
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

    const handleFileChangeSec = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) {
            showToast("فایل بیش از حد بزرگ است. حداکثر 5 مگابایت مجاز است.", "error");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;

            setFormData({
                ...formData,
                BOMfile: {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    base64: base64String,
                },
            });

            setFileNameSec(file.name);
            showToast("فایل با موفقیت آپلود شد", "success");
        };

        reader.onerror = () => {
            showToast("خطا در خواندن فایل", "error");
        };

        reader.readAsDataURL(file);
    };

    const handleUploadClickSec = () => {
        fileInputRefSec.current?.click();
    };

    return (
        <>
            <Text>
                فایل برد :
            </Text>
            <div className="Boardfile-Upload">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".zip,.xls,.xlsx,.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
                />
                <button onClick={handleUploadClick}>
                    <div className="upload-text">
                        <span>آپلود فایل</span>
                        <div className="upload-icon"><HiUpload /></div>
                    </div>
                </button>
                {fileName !== "" && (
                    <p className="file-text">
                        <span>{fileName}</span>
                        <MdDescription size={40} />
                    </p>
                )}
            </div>
            {errors?.boardfile && <p className="Boardfile-Error">لطفا یک فایل آپلود کنید.</p>}
            <Text fontSize="14px" color="gray" paddingTop="5px" paddingBottom="20px">
                انواع فایل های مجاز : zip,exel , حداکثر اندازه فایل: 10 MB.
            </Text>
            <Text marginTop="20px">
                فایل BOM :
            </Text>
            <div className="Boardfile-Upload">
                <input
                    type="file"
                    ref={fileInputRefSec}
                    onChange={handleFileChangeSec}
                    accept=".zip,.xls,.xlsx,.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
                />
                <button onClick={handleUploadClickSec}>
                    <div className="upload-text">
                        <span>آپلود فایل</span>
                        <div className="upload-icon"><HiUpload /></div>
                    </div>
                </button>
                {fileNameSec !== "" && (
                    <p className="file-text">
                        <span>{fileNameSec}</span>
                        <MdDescription size={40} />
                    </p>
                )}
            </div>
            {errors?.BOMfile && <p className="Boardfile-Error">لطفا یک فایل آپلود کنید.</p>}
            <Text fontSize="14px" color="gray" paddingTop="5px" paddingBottom="20px">
                انواع فایل های مجاز : zip,exel , حداکثر اندازه فایل: 10 MB.
            </Text>
            <Text fontSize="16px" color="gray" paddingY="30px">
                نمونه BOM مورد نظر را از اینجا دانلود کنید.
            </Text>
            <SimpleGrid columns={[1, null, 2]} gap="6">
                <RadioCard.Root
                    orientation="vertical"
                    align="center"
                    defaultValue="بله"
                    paddingY="20px"
                    maxW="200px"
                    dir="rtl"
                >
                    <RadioCard.Label dir="rtl">قطعات روی برد مونتاژ شود ؟</RadioCard.Label>
                    <HStack width="125px" key="montage" name="montage" value={formData.montage || "بله"} onChange={(value) => handlechange("montage", value)}>
                        {stasil.map((item) => (
                            <RadioCard.Item _hover={{ boxShadow: "md" }} transitionDuration="300ms" cursor="pointer" key={item.value} value={item.value} colorPalette="blue">
                                <RadioCard.ItemHiddenInput />
                                <RadioCard.ItemControl onClick={() => setSelectedValueFive(item.value)}>
                                    {selectedValueFive === item.value && (
                                        <RadioCard.ItemIndicator
                                            as={FaCheck}
                                            color=""
                                            position="absolute"
                                            borderWidth="2px"
                                            borderColor="gray.400"
                                            bottom="-6px"
                                            left="-6px"
                                            padding="3px"
                                        />
                                    )}
                                    <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
                                </RadioCard.ItemControl>
                            </RadioCard.Item>
                        ))}
                    </HStack>
                </RadioCard.Root>
                <RadioCard.Root
                    orientation="vertical"
                    align="center"
                    defaultValue="بله"
                    paddingY="20px"
                    maxW="400px"
                    dir="rtl"
                >
                    <RadioCard.Label dir="rtl">محصول به صورت کامل با برند مشتری ساخته شود ؟</RadioCard.Label>
                    <HStack width="125px" key="costumerbrand" name="costumerbrand" value={formData.costumerbrand || "بله"} onChange={(value) => handlechange("costumerbrand", value)}>
                        {stasilSec.map((item) => (
                            <RadioCard.Item _hover={{ boxShadow: "md" }} transitionDuration="300ms" cursor="pointer" key={item.value} value={item.value} colorPalette="blue">
                                <RadioCard.ItemHiddenInput />
                                <RadioCard.ItemControl onClick={() => setSelectedValue(item.value)}>
                                    {selectedValue === item.value && (
                                        <RadioCard.ItemIndicator
                                            as={FaCheck}
                                            color=""
                                            position="absolute"
                                            borderWidth="2px"
                                            borderColor="gray.400"
                                            bottom="-6px"
                                            left="-6px"
                                            padding="3px"
                                        />
                                    )}
                                    <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
                                </RadioCard.ItemControl>
                            </RadioCard.Item>
                        ))}
                    </HStack>
                </RadioCard.Root>
            </SimpleGrid>
            <Field.Root>
                <Field.Label>توضیحات :</Field.Label>
                <Textarea key="description" name="description" value={formData.description || ""} onChange={handlechangeInput} minH="200px" />
            </Field.Root>
        </>
    );
}

export default Upload;