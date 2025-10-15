import { Field, SimpleGrid, HStack, Button, Box, Input, Badge, Text, Select, Portal, Textarea, createListCollection } from "@chakra-ui/react"
import { Container } from "@chakra-ui/react"

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://xecdqvinprrsugkcvutb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlY2RxdmlucHJyc3Vna2N2dXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0ODQ4NDEsImV4cCI6MjA3MzA2MDg0MX0.xpeIwyZMCNEJct0GnM_NgYiSK5bbs-HEN1IdEEFezp0"
);

const frameworks = createListCollection({
    items: [
        { id: 1, value: "آذربایجان شرقی", label: "آذربایجان شرقی" },
        { id: 2, value: "آذربایجان غربی", label: "آذربایجان غربی" },
        { id: 3, value: "اردبیل", label: "اردبیل" },
        { id: 4, value: "اصفهان", label: "اصفهان" },
        { id: 5, value: "البرز", label: "البرز" },
        { id: 6, value: "ایلام", label: "ایلام" },
        { id: 7, value: "بوشهر", label: "بوشهر" },
        { id: 8, value: "تهران", label: "تهران" },
        { id: 9, value: "چهارمحال و بختیاری", label: "چهارمحال و بختیاری" },
        { id: 10, value: "خراسان جنوبی", label: "خراسان جنوبی" },
        { id: 11, value: "خراسان رضوی", label: "خراسان رضوی" },
        { id: 12, value: "خراسان شمالی", label: "خراسان شمالی" },
        { id: 13, value: "خوزستان", label: "خوزستان" },
        { id: 14, value: "زنجان", label: "زنجان" },
        { id: 15, value: "سمنان", label: "سمنان" },
        { id: 16, value: "سیستان و بلوچستان", label: "سیستان و بلوچستان" },
        { id: 17, value: "فارس", label: "فارس" },
        { id: 18, value: "قزوین", label: "قزوین" },
        { id: 19, value: "قم", label: "قم" },
        { id: 20, value: "کردستان", label: "کردستان" },
        { id: 21, value: "کرمان", label: "کرمان" },
        { id: 22, value: "کرمانشاه", label: "کرمانشاه" },
        { id: 23, value: "کهگیلویه و بویراحمد", label: "کهگیلویه و بویراحمد" },
        { id: 24, value: "گلستان", label: "گلستان" },
        { id: 25, value: "گیلان", label: "گیلان" },
        { id: 26, value: "لرستان", label: "لرستان" },
        { id: 27, value: "مازندران", label: "مازندران" },
        { id: 28, value: "مرکزی", label: "مرکزی" },
        { id: 29, value: "هرمزگان", label: "هرمزگان" },
        { id: 30, value: "همدان", label: "همدان" },
        { id: 31, value: "یزد", label: "یزد" },
    ],
})

function Register() {
    const [errors, setErrors] = useState({});
    const [value, setValue] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const navigate = useNavigate();
    const pag = JSON.parse(localStorage.getItem("formData") || "{}");

    const [registerData, setRegisterData] = useState({
        firstname: "",
        lastname: "",
        companyname: "",
        address: "",
        province: "",
        city: "",
        postcode: "",
        email: "",
        telephone: "",
        mobilephone: "",
        orderdescription: ""
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://labkhandelec.com/wp-json/custom-api/v1/users?user_id=${pag.user_id || 6}`);
                const data = await response.json();

                if (data && data.length > 0) {
                    const user = data[0];
                    setUserData(user);

                    setRegisterData(prev => ({
                        ...prev,
                        firstname: user.billing?.billing_first_name || "",
                        lastname: user.billing?.billing_last_name || "",
                        companyname: user.billing?.billing_company || "",
                        address: user.billing?.billing_address_1 || "",
                        city: user.billing?.billing_city || "",
                        postcode: user.billing?.billing_postcode || "",
                        email: user.billing?.billing_email || "",
                        mobilephone: user.billing?.billing_phone || "",
                    }));
                }
                setLoading(false);
            } catch (error) {
                console.error('خطا در دریافت اطلاعات کاربر:', error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, [pag.user_id]);

    useEffect(() => {
        const saved = localStorage.getItem("pageTwoData");
        if (saved) {
            const parsed = JSON.parse(saved);
            setRegisterData(prevData => ({
                ...prevData,
                ...parsed,
                province: parsed.province || "",
                city: parsed.city || "",
            }));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("pageTwoData", JSON.stringify(registerData));
    }, [registerData]);

    const handleChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const handlechangeSelect = (key, value) => {
        setRegisterData({ ...registerData, [key]: value.target.value });
    };

    const validateTelephone = (telephone) => {
        return telephone.startsWith('0') && telephone.length >= 10;
    };

    const validateMobile = (mobile) => {
        return mobile.startsWith('09') && mobile.length === 11;
    };

    const [submitted, setSubmitted] = useState(false);
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validate = () => {
        let newErrors = {};
        let errorList = [];

        setSubmitted(true);

        if (!validateEmail(registerData.email)) {
            newErrors.email = "فرمت ایمیل معتبر نیست";
            errorList.push("فرمت ایمیل معتبر نیست");
        }

        if (!registerData.firstname) {
            newErrors.firstname = "الزامی";
            errorList.push("نام الزامی است");
        }
        if (!registerData.lastname) {
            newErrors.lastname = "الزامی";
            errorList.push("نام خانوادگی الزامی است");
        }
        if (!registerData.address) {
            newErrors.address = "الزامی";
            errorList.push("آدرس الزامی است");
        }
        if (!registerData.postcode) {
            newErrors.postcode = "لطفا فرم را کامل کنید.";
            errorList.push("کد پستی الزامی است");
        }
        if (!registerData.province) {
            newErrors.province = "الزامی";
            errorList.push("استان الزامی است");
        }
        if (!registerData.city) {
            newErrors.city = "الزامی";
            errorList.push("شهر الزامی است");
        }
        if (!registerData.email) {
            newErrors.email = "الزامی";
            errorList.push("ایمیل الزامی است");
        }
        if (!registerData.telephone) {
            newErrors.telephone = "لطفا فرم را کامل کنید.";
            errorList.push("شماره ثابت الزامی است");
        }
        if (!registerData.mobilephone) {
            newErrors.mobilephone = "لطفا فرم را کامل کنید.";
            errorList.push("شماره موبایل الزامی است");
        }

        if (registerData.telephone && !validateTelephone(registerData.telephone)) {
            newErrors.telephone = "شماره ثابت باید با 0 شروع شود و 11 رقم باشد.";
            errorList.push("شماره ثابت باید با 0 شروع شود و 11 رقم باشد");
        }
        if (registerData.mobilephone && !validateMobile(registerData.mobilephone)) {
            newErrors.mobilephone = "شماره موبایل باید با 09 شروع شود و 11 رقم باشد";
            errorList.push("شماره موبایل باید با 09 شروع شود و 11 رقم باشد");
        }

        if (registerData.postcode && registerData.postcode.length !== 10) {
            newErrors.postcode = "کد پستی باید دقیقاً 10 رقم باشد";
            errorList.push("کد پستی باید دقیقاً 10 رقم باشد");
        }

        setErrors(newErrors);
        setErrorMessages(errorList);

        if (errorList.length > 0) {
            setShowErrorModal(true);
        }

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsSubmitting(true);

        try {
            const page1 = JSON.parse(localStorage.getItem("formData") || "{}");
            const page3 = JSON.parse(localStorage.getItem("FormsData") || "{}");
            const page2 = JSON.parse(localStorage.getItem("pageTwoData") || "{}");
            const products = page3.products || [];
            const allData = { ...page1, ...page2, ...page3, products: products };

            console.log(allData)
            const { data, error } = await supabase.from("order-request").insert([{ data: allData }]);

            if (error) {
                console.error("Supabase Error:", error);
                alert("خطا در ارسال فرم. لطفا دوباره تلاش کنید.");
            } else {
                console.log("Sent to Supabase:", data);
                setSubmitSuccess(true);
                setTimeout(() => {
                    localStorage.removeItem("FormsData");
                    localStorage.removeItem("formData");
                    localStorage.removeItem("pageTwoData");
                    window.location.href = "https://labkhandelec.com";
                }, 3000);
            }
        } catch (error) {
            console.error("Submit Error:", error);
            alert("خطا در ارسال فرم. لطفا دوباره تلاش کنید.");
        } finally {
            setIsSubmitting(false);
        }
    };

    let iranCity = require('iran-city');
    let SearchByName = iranCity.searchByName(registerData.province);

    const city = createListCollection({
        items: [
            SearchByName
        ][0],
        itemToString: (item) => item.name,
        itemToValue: (item) => item.name,
    })

    const handleNumberChange = (e) => {
        const inputValue = e.target.value;
        if (/^\d*$/.test(inputValue) || inputValue === '') {
            handleChange(e);
        }
    };

    const handleKeyDown = (e) => {
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

        if (allowedKeys.includes(e.key)) {
            return;
        }

        if (e.key >= '0' && e.key <= '9') {
            return;
        }

        e.preventDefault();
    };

    if (loading) {
        return (
            <Container dir="rtl" marginY="50px" borderRadius="20px">
                <Box
                    color="#0662EA"
                    fontWeight="bold"
                    paddingY="80px"
                    fontSize="23px"
                    textAlign="center"
                >
                    در حال بارگذاری اطلاعات...
                </Box>
            </Container>
        );
    }

    if (submitSuccess) {
        return (
            <Container dir="rtl" marginY="50px" borderRadius="20px">
                <Box
                    color="#0662EA"
                    fontWeight="bold"
                    paddingY="80px"
                    fontSize="23px"
                    textAlign="center"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap="20px"
                >
                    <Box fontSize="48px" color="green.500">✓</Box>
                    <Text>فرم شما با موفقیت ارسال شد!</Text>
                    <Text fontSize="16px" color="gray.600">
                        در حال انتقال به صفحه اصلی...
                    </Text>
                </Box>
            </Container>
        );
    }

    return (
        <Container paddingTop="12px" dir="rtl" maxW="6xl" backgroundColor="#F2F7FE" marginY="20px" borderRadius="20px">
            {showErrorModal && (
                <Box
                    backgroundColor="red.50"
                    borderWidth="2px"
                    borderColor="red.400"
                    borderRadius="12px"
                    padding="20px"
                    marginBottom="20px"
                    marginTop="20px"
                >
                    <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="15px">
                        <Text color="red.600" fontSize="16px" fontWeight="bold">
                            خطاهای فرم
                        </Text>
                        <Button
                            size="sm"
                            variant="ghost"
                            colorPalette="red"
                            onClick={() => setShowErrorModal(false)}
                        >
                            ✕
                        </Button>
                    </Box>

                    <Text fontSize="14px" marginBottom="10px" fontWeight="medium" color="red.800">
                        لطفاً موارد زیر را بررسی و اصلاح کنید:
                    </Text>

                    <Box
                        as="ul"
                        paddingRight="20px"
                        backgroundColor="white"
                        padding="15px"
                        borderRadius="8px"
                        borderWidth="1px"
                        borderColor="red.200"
                        maxH="200px"
                        overflowY="auto"
                        fontSize="12px"
                    >
                        {errorMessages.map((error, index) => (
                            <Text as="li" key={index} marginBottom="8px" color="red.700">
                                {error}
                            </Text>
                        ))}
                    </Box>

                    <Box marginTop="15px" display="flex" justifyContent="flex-end">
                        <a href="https://labkhandelec.com/my-account/">
                            <Button
                                colorPalette="blue"
                                variant="solid"
                                onClick={() => setShowErrorModal(false)}
                            >
                                ویرایش فرم
                            </Button>
                        </a>
                    </Box>
                </Box>
            )}

            <Box fontWeight="bold" color="#0662EA" paddingY="40px" fontSize="23px">
                فرم سفارش قطعات الکترونیک
            </Box>
            <SimpleGrid columns={[1, null, 2]} gap="6">
                <Field.Root width="full" {...(errors?.firstname ? { invalid: true } : {})}>
                    <Field.Label>
                        نام  :
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
                    <Input disabled backgroundColor="white" height="44px" type="text" key="firstname" name="firstname" value={registerData.firstname || ""} onChange={handleChange} />
                    <Field.ErrorText>
                        لطفا فرم را کامل کنید.
                    </Field.ErrorText>
                </Field.Root>

                <Field.Root width="full" {...(errors?.lastname ? { invalid: true } : {})}>
                    <Field.Label>
                        نام خانوادگی:
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
                    <Input disabled backgroundColor="white" height="44px" type="text" key="lastname" name="lastname" value={registerData.lastname || ""} onChange={handleChange} />
                    <Field.ErrorText>
                        لطفا فرم را کامل کنید.
                    </Field.ErrorText>
                </Field.Root>
            </SimpleGrid>

            <Field.Root width="full" {...(errors?.companyname ? { invalid: true } : {})} marginTop="10px">
                <Field.Label>
                    نام شرکت :
                </Field.Label>
                <Input disabled backgroundColor="white" height="44px" type="text" key="companyname" name="companyname" value={registerData.companyname || ""} onChange={handleChange} />
            </Field.Root>

            <Field.Root width="full" {...(errors?.address ? { invalid: true } : {})} marginTop="10px">
                <Field.Label>
                    آدرس:
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
                <Text width="full" fontSize="14px" color="gray.600">خیابان ، کوچه ، پلاک ، واحد و ... : </Text>
                <Input disabled backgroundColor="white" height="44px" type="text" key="address" name="address" value={registerData.address || ""} onChange={handleChange} />
                <Field.ErrorText>
                    لطفا فرم را کامل کنید.
                </Field.ErrorText>
            </Field.Root>

            <SimpleGrid columns={[1, null, 2]} gap="6" marginTop="10px">
                <Field.Root width="full" {...(errors?.province ? { invalid: true } : {})} marginTop="10px">
                    <Field.Label>
                        استان :
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
                    <Input disabled backgroundColor="white" height="44px" type="text" key="province" name="province" value={registerData.province || ""} onChange={handleChange} />
                </Field.Root>

                <Field.Root width="full" {...(errors?.city ? { invalid: true } : {})} marginTop="10px">
                    <Field.Label>
                        شهر :
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
                    <Input disabled backgroundColor="white" height="44px" type="text" key="city" name="city" value={registerData.city || ""} onChange={handleChange} />
                </Field.Root>

                <Field.Root {...(errors?.postcode ? { invalid: true } : {})} width="full" marginTop="10px">
                    <Field.Label>
                        کدپستی :
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
                    <Input disabled backgroundColor="white" maxLength={10} height="44px" type="text" key="postcode" name="postcode" value={registerData.postcode || ""} onChange={handleNumberChange} onKeyDown={handleKeyDown} />
                    <Field.ErrorText>
                        {errors.postcode || "لطفا فرم را کامل کنید."}
                    </Field.ErrorText>
                </Field.Root>

                <Field.Root {...(submitted && !validateEmail(registerData.email) ? { invalid: true } : {})} width="full" marginTop="10px">
                    <Field.Label>
                        ایمیل :
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
                    <Input disabled backgroundColor="white" height="44px" type="email" key="email" name="email" value={registerData.email || ""} onChange={handleChange} />
                    <Field.ErrorText>
                        ایمیل به درستی وارد نشده.
                    </Field.ErrorText>
                </Field.Root>

                <Field.Root {...(errors?.telephone ? { invalid: true } : {})} width="full" marginTop="10px">
                    <Field.Label>
                        شماره ثابت :
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
                    <Input disabled backgroundColor="white" maxLength={11} height="44px" type="text" key="telephone" name="telephone" value={registerData.telephone || ""} onChange={handleNumberChange} onKeyDown={handleKeyDown} />
                </Field.Root>

                <Field.Root {...(errors?.mobilephone ? { invalid: true } : {})} width="full" marginTop="10px">
                    <Field.Label>
                        شماره موبایل :
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
                    <Input disabled backgroundColor="white" maxLength={11} height="44px" type="text" key="mobilephone" name="mobilephone" value={registerData.mobilephone || ""} onChange={handleNumberChange} onKeyDown={handleKeyDown} />
                    <Field.ErrorText>
                        {errors.mobilephone || "لطفا فرم را کامل کنید."}
                    </Field.ErrorText>
                </Field.Root>
            </SimpleGrid>

            <Field.Root marginTop="10px">
                <Field.Label>توضیحات ارسال :</Field.Label>
                <Textarea backgroundColor="white" key="orderdescription" name="orderdescription" value={registerData.orderdescription || ""} onChange={handleChange} minH="200px" />
            </Field.Root>

            <HStack paddingY="20px">
                <Button onClick={() => navigate("/order-form")} colorPalette="blue" variant="solid">قبلی</Button>
                <Button
                    onClick={handleSubmit}
                    colorPalette="blue"
                    variant="solid"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "در حال ارسال..." : "ارسال"}
                </Button>
            </HStack>
        </Container>
    );
}

export default Register;