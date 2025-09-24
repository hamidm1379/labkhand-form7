import { useState, useEffect, useRef } from "react";
import {
    Box,
    Button,
    Input,
    Text,
    Field,
    Stack,
    HStack,
    Badge,
    Link
} from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi"
import { Container } from "@chakra-ui/react"
import { MdDescription } from 'react-icons/md';
import { FaTimes } from 'react-icons/fa';

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function OrderForm() {
    const navigate = useNavigate();
    const [linkErrors, setLinkErrors] = useState({});
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    const createDefaultForms = () => {
        return Array.from({ length: 5 }, (_, index) => ({
            id: Date.now() + Math.random() + index,
            number: "",
            brand: "",
            link: "",
            count: "",
            description: "",
        }));
    };

    const [forms, setForms] = useState(createDefaultForms());
    const [isInitialized, setIsInitialized] = useState(false);

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState("");

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
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
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

            setFormData(prev => ({
                ...prev,
                boardfile: {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    base64: base64String,
                },
            }));

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

        if (formData.boardfile) {
            navigate("/order-form-register");
            return;
        }
        const hasInvalidLink = forms.some(f => {
            const link = f.link?.trim();
            return link && !isValidUrl(link);
        });

        if (hasInvalidLink) {
            showToast("یک یا چند لینک دیتاشیت معتبر نیستند. لطفاً اصلاح کنید.", "error");
            return;
        }

        const { brand, number, count } = forms[0];
        let newErrors = {};

        if (!brand?.trim()) newErrors.brand = "برند الزامی است.";
        if (!number?.trim()) newErrors.number = "شماره فنی الزامی است.";
        if (!count?.toString().trim()) newErrors.count = "تعداد الزامی است.";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            navigate("/order-form-register");
        }
    };

    useEffect(() => {
        try {
            const savedOrder = localStorage.getItem("formData");
            const savedForms = localStorage.getItem("FormsData");

            if (savedOrder) {
                const parsedFormData = JSON.parse(savedOrder);
                setFormData(parsedFormData);
                if (parsedFormData.boardfile?.name) {
                    setFileName(parsedFormData.boardfile.name);
                }
            }

            if (savedForms) {
                const parsedForms = JSON.parse(savedForms);
                if (Array.isArray(parsedForms) && parsedForms.length > 0) {
                    setForms(parsedForms);
                } else {
                    setForms(createDefaultForms());
                }
            }
        } catch (error) {
            console.error("خطا در بارگذاری داده‌ها از localStorage:", error);
            setForms(createDefaultForms());
        } finally {
            setIsInitialized(true);
        }
    }, []);

    useEffect(() => {
        if (isInitialized) {
            try {
                localStorage.setItem("formData", JSON.stringify(formData));
            } catch (error) {
                console.error("خطا در ذخیره formData:", error);
            }
        }
    }, [formData, isInitialized]);

    useEffect(() => {
        if (isInitialized) {
            try {
                localStorage.setItem("FormsData", JSON.stringify(forms));
            } catch (error) {
                console.error("خطا در ذخیره FormsData:", error);
            }
        }
    }, [forms, isInitialized]);

    const addForm = () => {
        setForms((prev) => [
            ...prev,
            {
                id: Date.now() + Math.random(),
                number: "",
                brand: "",
                link: "",
                count: "",
                description: "",
            },
        ]);
    };

    const handleChange = (id, field, value) => {
        if (field === 'count') {
            const numericValue = value.replace(/[^0-9]/g, '');

            setForms((prev) =>
                prev.map((f) => (f.id === id ? { ...f, [field]: numericValue } : f))
            );
            return;
        }

        setForms((prev) =>
            prev.map((f) => (f.id === id ? { ...f, [field]: value } : f))
        );

        if (field === 'link') {
            if (value.trim()) {
                if (!isValidUrl(value)) {
                    setLinkErrors(prev => ({ ...prev, [id]: "لینک وارد شده معتبر نیست." }));
                } else {
                    setLinkErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors[id];
                        return newErrors;
                    });
                }
            } else {
                setLinkErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors[id];
                    return newErrors;
                });
            }
        }
    };

    const removeForm = (id) => {
        setForms((prev) => prev.filter((f) => f.id !== id));
    };

    const handleRemoveFile = () => {
        setFormData(prev => ({
            ...prev,
            boardfile: null,
        }));
        setFileName("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    if (!isInitialized) {
        return (
            <Container dir="rtl" maxW="6xl" backgroundColor="gray.50" marginY="20px" borderRadius="20px">
                <Box color="#0662EA" paddingY="40px" fontSize="23px" textAlign="center">
                    در حال بارگذاری...
                </Box>
            </Container>
        );
    }

    return (
        <Container dir="rtl" maxW="6xl" backgroundColor="#F2F7FE" marginY="20px" borderRadius="20px">
            <Box color="#0662EA" paddingY="40px" fontSize="23px">
                فرم سفارش قطعات الکترونیک
            </Box>
            {(errors?.number || errors?.brand || errors?.count) && <Text paddingBottom="10px" color="red" fontSize="14px">لطفا حداقل یک فرم را کامل کنید یا یک فایل ارسال کنید .</Text>}

            {Object.keys(linkErrors).length > 0 && (
                <ul>
                    {forms
                        .filter(form => linkErrors[form.id])
                        .map(form => (
                            <li key={form.id}>
                                <Text paddingY="10px" color="red" fontSize="14px" as="span">لینک دیتاشیت ردیف  {forms.indexOf(form) + 1} به درستی وارد نشده .</Text>
                            </li>
                        ))}
                    <Text color="red" fontSize="14px" paddingTop="10px" dir="ltr" textAlign="right"> (فرمت مورد نظر : https://...) </Text>
                </ul>
            )}

            <Stack marginY="10px" fontSize="14px" fontWeight="semibold" display="none" sm={{ display: "flex" }} direction="row">
                <Text width="85px">
                    عنوان ردیف
                </Text>
                <Text width="200px" display="flex">
                    شماره فنی
                    <Text marginRight="7px" fontSize="16px" color="red">*</Text>
                </Text>
                <Text width="200px" display="flex">
                    برند
                    <Text marginRight="7px" fontSize="16px" color="red">*</Text>
                </Text>
                <Text width="200px">
                    لینک دیتاشیت
                </Text>
                <Text width="200px" display="flex">
                    تعداد
                    <Text marginRight="7px" fontSize="16px" color="red">*</Text>
                </Text>
                <Text width="200px">
                    توضیحات
                </Text>
                <Text opacity={0} width="70px">
                    aaaaaaa
                </Text>
            </Stack>
            {forms.map((form, index) => (
                <div key={form.id}>
                    <Stack direction="row" marginY="10px">
                        <Text paddingLeft="10px" marginY="auto" sm={{ display: "none" }}>
                            {index + 1}
                        </Text>
                        <Stack width="100%" direction={{ base: "column", sm: "row" }}>
                            <Text width="80px" paddingRight="22px" margin="auto" display="none" sm={{ display: "flex" }}>
                                {index + 1}
                            </Text>
                            <Field.Root width="full" md={{ width: "200px" }}>
                                <Field.Label sm={{ display: "none" }}>
                                    شماره فنی
                                    <Field.RequiredIndicator
                                        fallback={
                                            <>
                                                <Badge fontSize="16px" size="xs" color="red" backgroundColor="#F2F7FE">
                                                    *
                                                </Badge>
                                            </>
                                        }
                                    />
                                </Field.Label>
                                <Input
                                    height="38px"
                                    type="text"
                                    name={form.number}
                                    value={form.number}
                                    onChange={(e) => handleChange(form.id, 'number', e.target.value)}
                                    backgroundColor="white"
                                />
                            </Field.Root>
                            <Field.Root width="full" md={{ width: "200px" }}>
                                <Field.Label sm={{ display: "none" }}>
                                    برند
                                    <Field.RequiredIndicator
                                        fallback={
                                            <>
                                                <Badge fontSize="16px" size="xs" color="red" backgroundColor="#F2F7FE">
                                                    *
                                                </Badge>
                                            </>
                                        }
                                    />
                                </Field.Label>
                                <Input
                                    height="38px"
                                    type="text"
                                    name={form.brand}
                                    value={form.brand}
                                    backgroundColor="white"
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
                                    name={form.link}
                                    value={form.link}
                                    backgroundColor="white"
                                    onChange={(e) => handleChange(form.id, 'link', e.target.value)}
                                />
                                <Field.ErrorText>
                                    نام به درستی وارد نشده.
                                </Field.ErrorText>
                            </Field.Root>
                            <Field.Root width="full" md={{ width: "200px" }}>
                                <Field.Label sm={{ display: "none" }}>
                                    تعداد
                                    <Field.RequiredIndicator
                                        fallback={
                                            <>
                                                <Badge fontSize="16px" size="xs" color="red" backgroundColor="#F2F7FE">
                                                    *
                                                </Badge>
                                            </>
                                        }
                                    />
                                </Field.Label>
                                <Input
                                    height="38px"
                                    type="text"
                                    name={form.count}
                                    value={form.count}
                                    onChange={(e) => handleChange(form.id, 'count', e.target.value)}
                                    backgroundColor="white"
                                    inputMode="numeric"
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
                                    name={form.description}
                                    value={form.description}
                                    backgroundColor="white"
                                    onChange={(e) => handleChange(form.id, 'description', e.target.value)}
                                />
                                <Field.ErrorText>
                                    نام به درستی وارد نشده.
                                </Field.ErrorText>
                            </Field.Root>
                            <Stack direction="row" padding="10px" margin="auto" gap="4px">
                                <Box 
                                    width="22px" 
                                    onClick={addForm} 
                                    padding="3px" 
                                    backgroundColor="blue" 
                                    borderRadius="full" 
                                    cursor="pointer"
                                    fontWeight="bold"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <AiOutlinePlus color="white" style={{ strokeWidth: '100px', fontWeight: 'bold' }} />
                                </Box>
                                {forms.length > 1 && (
                                    <Box 
                                        width="22px" 
                                        onClick={() => removeForm(form.id)} 
                                        padding="3px" 
                                        backgroundColor="blue" 
                                        borderRadius="full" 
                                        cursor="pointer"
                                        fontWeight="bold"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <AiOutlineMinus color="white" style={{ strokeWidth: '100px', fontWeight: 'bold' }} />
                                    </Box>
                                )}
                            </Stack>
                        </Stack>
                    </Stack>
                </div>
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
                انواع فایل های مجاز : xlsx, حداکثر اندازه فایل: 30 MB.
            </Text>
            <Text fontSize="16px" color="gray" paddingY="30px">
                نمونه BOM مورد نظر را از <Link href="https://labkhandelec.com/wp-content/uploads/2025/04/BOM-Sample.xlsx">اینجا</Link> دانلود کنید.
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