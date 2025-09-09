import { useState } from "react";
import {
    Box,
    Button,
    Input,
    Text,
    Field,
    Stack,
    FileUpload,
    HStack,
    Link
} from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi"
import { Container } from "@chakra-ui/react"

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

function OrderForm() {
    const [forms, setForms] = useState([
        { id: Date.now(), number: "", brand: "", link: "", count: "", description: "" },
    ]);

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
        setForms((prev) =>
            prev.map((f) => (f.id === id ? { ...f, [field]: value } : f))
        );
    };
    const removeForm = (id) => {
        setForms((prev) => prev.filter((f) => f.id !== id));
    };
    return (
        <Container dir="rtl" maxW="6xl" backgroundColor="gray.50" marginY="20px" borderRadius="20px">
            <Box paddingY="40px" fontSize="23px">
                فرم سفارش قطعات الکترونیک
            </Box>
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
                                value={form.number}
                                onChange={(e) =>
                                    handleChange(form.id, "number", e.target.value)
                                }
                            />
                            <Field.ErrorText>
                                نام به درستی وارد نشده.
                            </Field.ErrorText>
                        </Field.Root>
                        <Field.Root width="full" md={{ width: "200px" }}>
                            <Field.Label sm={{ display: "none" }}>
                                برند
                            </Field.Label>
                            <Input
                                height="38px"
                                value={form.brand}
                                onChange={(e) =>
                                    handleChange(form.id, "brand", e.target.value)
                                }
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
                                type="number"
                                value={form.link}
                                onChange={(e) =>
                                    handleChange(form.id, "link", e.target.value)
                                }
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
                                value={form.count}
                                onChange={(e) =>
                                    handleChange(form.id, "count", e.target.value)
                                }
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
                                value={form.description}
                                onChange={(e) =>
                                    handleChange(form.id, "description", e.target.value)
                                }
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
            <FileUpload.Root marginTop="10px" dir="rtl" accept={["application/vnd.ms-excel"]}>
                <FileUpload.HiddenInput />
                <FileUpload.Trigger asChild>
                    <Button variant="outline" size="sm">
                        <HiUpload /> Upload file
                    </Button>
                </FileUpload.Trigger>
                <FileUpload.List />
            </FileUpload.Root>
            <Text fontSize="14px" color="gray" paddingTop="5px">
                انواع فایل های مجاز : xlsx, حداکثر اندازه فایل: 1 MB.
            </Text>
            <Text fontSize="16px" color="gray" paddingY="30px">
                نمونه BOM مورد نظر را از اینجا دانلود کنید.
            </Text>
            <HStack paddingTop="10px" paddingBottom="40px">
                <Link color="white" href="/">
                    <Button colorPalette="blue" variant="solid">
                        بعدی
                    </Button>
                </Link>
            </HStack>
        </Container>
    );
}

export default OrderForm;
