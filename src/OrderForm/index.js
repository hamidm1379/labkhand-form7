import { useState, useEffect, useRef } from "react";
import {
    Box,
    Button,
    Input,
    Text,
    Field,
    Stack,
    HStack
} from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi"
import { Container } from "@chakra-ui/react"
import { MdDescription } from 'react-icons/md';
import { FaTimes } from 'react-icons/fa';

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function OrderForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [forms, setForms] = useState([
        { id: Date.now(), number: "", brand: "", link: "", count: "", description: "" },
    ]);
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState(formData.boardfile?.name || "");
    console.log(forms)
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

        if (file.size > 5 * 1024 * 1024) {
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

    const goNext = () => {

        window.scrollTo({ top: 0, behavior: 'smooth' });

        const { id, brand, number, link, count, description } = forms[0];
        let newErrors = {};

        if (!brand) newErrors.brand = "نام";
        if (!number) newErrors.number = "نام";
        if (!link) newErrors.link = "نام";
        if (!count) newErrors.count = "نام";
        if (!description) newErrors.description = "نام";
        if (!id) newErrors.id = "نام";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            navigate("/order-form-register");
        }

    };

    useEffect(() => {
        localStorage.clear();
    }, []);

    useEffect(() => {
        const savedOrder = localStorage.getItem("formData");
        const savedForms = localStorage.getItem("FormsData");

        if (savedOrder) setFormData(JSON.parse(savedOrder));
        if (savedForms) setForms(JSON.parse(savedForms));
    }, []);

    useEffect(() => {
        localStorage.setItem("formData", JSON.stringify(formData));
    }, [formData]);

    useEffect(() => {
        localStorage.setItem("FormsData", JSON.stringify(forms));
    }, [forms]);

    const addForm = () => {
        setForms((prev) => [
            ...prev,
            {
                id: Date.now(),
                number: "",
                brand: "",
                link: "",
                count: "",
                description: "",
            },
        ]);
    };

    const handleChange = (id, field, value) => {
        setForms((prev) =>
            prev.map((f) => (f.id === id ? { ...f, [field]: value } : f))
        );
    };

    const removeForm = (id) => {
        setForms((prev) => prev.filter((f) => f.id !== id));
    };

    const handleRemoveFile = () => {
        setFormData({
            ...formData,
            uploadedFile: null,
        });
        setFileName("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <Container dir="rtl" maxW="6xl" backgroundColor="gray.50" marginY="20px" borderRadius="20px">
            <Box color="#0662EA" paddingY="40px" fontSize="23px">
                فرم سفارش قطعات الکترونیک
            </Box>
            {(errors?.number || errors?.brand || errors?.link || errors?.count || errors?.description) && <Text paddingBottom="10px" color="tomato" fontSize="14px">لطفا حداقل یک فرم را کامل کنید.</Text>}
            <Stack fontSize="14px" fontWeight="semibold" display="none" sm={{ display: "flex" }} direction="row">
                <Text paddingRight="16px" width="200px">
                    شماره فنی
                </Text>
                <Text paddingRight="16px" width="200px">
                    برند
                </Text>
                <Text paddingRight="14px" width="200px">
                    لینک دیتاشیت
                </Text>
                <Text paddingRight="10px" width="200px">
                    تعداد
                </Text>
                <Text paddingRight="8px" width="200px">
                    توضیحات
                </Text>
            </Stack>
            {forms.map((form, index) => (
                <Stack direction="row" marginY="10px">
                    <Text paddingLeft="10px" marginY="auto" sm={{ display: "none" }}>
                        {index + 1}
                    </Text>
                    <Stack width="100%" key={form.id} direction={{ base: "column", sm: "row" }}>
                        <Text paddingLeft="10px" marginY="auto" display="none" sm={{ display: "flex" }}>
                            {index + 1}
                        </Text>
                        <Field.Root width="full" md={{ width: "200px" }}>
                            <Field.Label sm={{ display: "none" }}>
                                شماره فنی
                            </Field.Label>
                            <Input
                                height="38px"
                                type="number"
                                key={form.id}
                                name={form.number}
                                value={form.number}
                                onChange={(e) => handleChange(form.id, 'number', e.target.value)}
                                min={1}
                            />
                        </Field.Root>
                        <Field.Root width="full" md={{ width: "200px" }}>
                            <Field.Label sm={{ display: "none" }}>
                                برند
                            </Field.Label>
                            <Input
                                height="38px"
                                type="text"
                                key={form.id}
                                name={form.brand}
                                value={form.brand}
                                onChange={(e) => handleChange(form.id, 'brand', e.target.value)}
                            />
                            <Field.ErrorText>
                                نام به درستی وارد نشده.
                            </Field.ErrorText>
                        </Field.Root>
                        <Field.Root width="full" md={{ width: "200px" }}>
                            <Field.Label sm={{ display: "none" }}>
                                لینک دیتاشیت
                            </Field.Label>
                            <Input
                                height="38px"
                                type="text"
                                key={form.id}
                                name={form.link}
                                value={form.link}
                                onChange={(e) => handleChange(form.id, 'link', e.target.value)}
                            />
                            <Field.ErrorText>
                                نام به درستی وارد نشده.
                            </Field.ErrorText>
                        </Field.Root>
                        <Field.Root width="full" md={{ width: "200px" }}>
                            <Field.Label sm={{ display: "none" }}>
                                تعداد
                            </Field.Label>
                            <Input
                                height="38px"
                                type="number"
                                key={form.id}
                                name={form.count}
                                value={form.count}
                                onChange={(e) => handleChange(form.id, 'count', e.target.value)}
                                min={1}
                            />
                            <Field.ErrorText>
                                نام به درستی وارد نشده.
                            </Field.ErrorText>
                        </Field.Root>
                        <Field.Root width="full" md={{ width: "200px" }}>
                            <Field.Label sm={{ display: "none" }}>
                                توضیحات
                            </Field.Label>
                            <Input
                                height="38px"
                                key={form.id}
                                name={form.description}
                                value={form.description}
                                onChange={(e) => handleChange(form.id, 'description', e.target.value)}
                            />
                            <Field.ErrorText>
                                نام به درستی وارد نشده.
                            </Field.ErrorText>
                        </Field.Root>
                        <Stack direction="row" padding="10px" margin="auto" gap="4px">
                            <Box width="22px" onClick={addForm} padding="3px" backgroundColor="blue" borderRadius="full" cursor="pointer">
                                <AiOutlinePlus color="white" />
                            </Box>
                            {forms.length > 1 && (
                                <Box width="22px" onClick={() => removeForm(form.id)} padding="3px" backgroundColor="blue" borderRadius="full" cursor="pointer">
                                    <AiOutlineMinus color="white" />
                                </Box>
                            )}
                        </Stack>
                    </Stack>
                </Stack>
            ))}
            <Text fontSize="14px" fontWeight="semibold" marginTop="10px">
                در صورتی که تعداد اقلام مورد نیاز بالا می باشد، میتوانید جزئیات سفارش خود را طبق ستون های فوق و به صورت فایل اکسل آپلود نمایید :
            </Text>
            <div className="Boardfile-Upload">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".zip,.xls,.xlsx,.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
                />
                <button className="handleUpload" onClick={handleUploadClick}>
                    <div className="upload-text">
                        <span>آپلود فایل</span>
                        <div className="upload-icon"><HiUpload /></div>
                    </div>
                </button>
                {fileName !== "" && (
                    <p className="file-text">
                        <p className="handleRemove" onClick={handleRemoveFile}>
                            <FaTimes size={30} />
                        </p>
                        <div>
                            <span>{fileName}</span>
                            <MdDescription size={40} />
                        </div>
                    </p>
                )}
            </div>
            <Text fontSize="14px" color="gray" paddingTop="5px">
                انواع فایل های مجاز : xlsx, حداکثر اندازه فایل: 1 MB.
            </Text>
            <Text fontSize="16px" color="gray" paddingY="30px">
                نمونه BOM مورد نظر را از اینجا دانلود کنید.
            </Text>
            <HStack paddingTop="10px" paddingBottom="40px">
                <Button onClick={goNext} colorPalette="blue" variant="solid">
                    بعدی
                </Button>
            </HStack>
        </Container>
    );
}

export default OrderForm;
