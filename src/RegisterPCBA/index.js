import { Field, SimpleGrid, RadioCard, HStack, Button, Box, Input, Badge, Text, Textarea, createListCollection } from "@chakra-ui/react"
import { FaCheck } from "react-icons/fa";
import { Container } from "@chakra-ui/react"

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://xecdqvinprrsugkcvutb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlY2RxdmlucHJyc3Vna2N2dXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0ODQ4NDEsImV4cCI6MjA3MzA2MDg0MX0.xpeIwyZMCNEJct0GnM_NgYiSK5bbs-HEN1IdEEFezp0"
);

const stasil = [
    { id: 1, value: "yes", title: "بله" },
    { id: 2, value: "no", title: "خیر" }
]

function Register() {
    const [selectedValueFive, setSelectedValueFive] = useState(stasil[1]?.value);
    const [value, setValue] = useState();
    const [valueSec, setValueSec] = useState();
    const [errors, setErrors] = useState({});
    const [pageTwoData, setPageTwoData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const navigate = useNavigate();
    const pag = JSON.parse(localStorage.getItem("PageOneDataPCBA") || "{}");

    const page1 = JSON.parse(localStorage.getItem("PageOneDataPCBA") || "{}");

    const [formData, setFormData] = useState({
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
        orderdescription: "",
        changename: "",
        changelastname: "",
        changecompany: "",
        changeaddress: "",
        changeprovince: "",
        changecity: "",
        changepostcode: ""
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://labkhandelec.com/wp-json/custom-api/v1/users?user_id=${pag.user_id || 6}`);
                const data = await response.json();

                if (data && data.length > 0) {
                    const user = data[0];
                    setUserData(user);

                    setFormData(prev => ({
                        ...prev,
                        firstname: user.billing?.billing_first_name || "",
                        lastname: user.billing?.billing_last_name || "",
                        companyname: user.billing?.billing_company || "",
                        address: user.billing?.billing_address_1 || "",
                        city: user.billing?.billing_city || "",
                        postcode: user.billing?.billing_postcode || "",
                        email: user.billing?.billing_email || "",
                        mobilephone: user.billing?.billing_phone || "",
                        changename: user.shipping?.shipping_first_name || "",
                        changelastname: user.shipping?.shipping_last_name || "",
                        changecompany: user.shipping?.shipping_company || "",
                        changeaddress: user.shipping?.shipping_address_1 || "",
                        changepostcode: user.shipping?.shipping_postcode || "",
                        changecity: user.shipping?.shipping_city || "",
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
            setPageTwoData({
                ...parsed,
                province: "",
                city: "",
                changeprovince: "",
                changecity: "",
            });
        } else {
            setPageTwoData({
                province: "",
                city: "",
                changeprovince: "",
                changecity: "",
            });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("pageTwoData", JSON.stringify(formData));
    }, [formData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlechangeSelect = (key, value) => {
        setFormData({ ...formData, [key]: value.target.value });
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

        if (!validateEmail(formData.email)) {
            newErrors.email = "فرمت ایمیل معتبر نیست";
            errorList.push("فرمت ایمیل معتبر نیست");
        }

        if (!formData.firstname) {
            newErrors.firstname = "الزامی";
            errorList.push("نام الزامی است");
        }
        if (!formData.lastname) {
            newErrors.lastname = "الزامی";
            errorList.push("نام خانوادگی الزامی است");
        }
        if (!formData.address) {
            newErrors.address = "الزامی";
            errorList.push("آدرس الزامی است");
        }
        if (!formData.postcode) {
            newErrors.postcode = "لطفا فرم را کامل کنید.";
            errorList.push("کد پستی الزامی است");
        }
        if (!formData.province) {
            newErrors.province = "الزامی";
            errorList.push("استان الزامی است");
        }
        if (!formData.city) {
            newErrors.city = "الزامی";
            errorList.push("شهر الزامی است");
        }
        if (!formData.email) {
            newErrors.email = "الزامی";
            errorList.push("ایمیل الزامی است");
        }
        if (!formData.telephone) {
            newErrors.telephone = "لطفا فرم را کامل کنید.";
            errorList.push("شماره ثابت الزامی است");
        }
        if (!formData.mobilephone) {
            newErrors.mobilephone = "لطفا فرم را کامل کنید.";
            errorList.push("شماره موبایل الزامی است");
        }

        if (formData.telephone && !validateTelephone(formData.telephone)) {
            newErrors.telephone = "شماره ثابت باید با 0 شروع شود و 11 رقم باشد.";
            errorList.push("شماره ثابت باید با 0 شروع شود و 11 رقم باشد");
        }
        if (formData.mobilephone && !validateMobile(formData.mobilephone)) {
            newErrors.mobilephone = "شماره موبایل باید با 09 شروع شود و 11 رقم باشد";
            errorList.push("شماره موبایل باید با 09 شروع شود و 11 رقم باشد");
        }

        if (formData.postcode && formData.postcode.length !== 10) {
            newErrors.postcode = "کد پستی باید دقیقاً 10 رقم باشد";
            errorList.push("کد پستی باید دقیقاً 10 رقم باشد");
        }

        if (value === "yes") {
            if (!formData.changename) {
                newErrors.changename = "لطفا فرم را کامل کنید.";
                errorList.push("نام آدرس حمل و نقل الزامی است");
            }
            if (!formData.changelastname) {
                newErrors.changelastname = "لطفا فرم را کامل کنید.";
                errorList.push("نام خانوادگی آدرس حمل و نقل الزامی است");
            }
            if (!formData.changeaddress) {
                newErrors.changeaddress = "لطفا فرم را کامل کنید.";
                errorList.push("آدرس حمل و نقل الزامی است");
            }
            if (!formData.changeprovince) {
                newErrors.changeprovince = "لطفا فرم را کامل کنید.";
                errorList.push("استان آدرس حمل و نقل الزامی است");
            }
            if (!formData.changecity) {
                newErrors.changecity = "لطفا فرم را کامل کنید.";
                errorList.push("شهر آدرس حمل و نقل الزامی است");
            }
            if (!formData.changepostcode) {
                newErrors.changepostcode = "لطفا فرم را کامل کنید.";
                errorList.push("کد پستی آدرس حمل و نقل الزامی است");
            }

            if (formData.changepostcode && formData.changepostcode.length !== 10) {
                newErrors.changepostcode = "کد پستی باید دقیقاً 10 رقم باشد";
                errorList.push("کد پستی آدرس حمل و نقل باید دقیقاً 10 رقم باشد");
            }
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
            const page1 = JSON.parse(localStorage.getItem("PageOneDataPCBA") || "{}");
            const page2 = JSON.parse(localStorage.getItem("pageTwoData") || "{}");

            const allData = { ...page1, ...page2 };

            const { data, error } = await supabase.from("OrderForm").insert([allData]);

            if (error) {
                console.error("Supabase Error:", error);
                alert("خطا در ارسال فرم. لطفا دوباره تلاش کنید.");
            } else {
                console.log("Sent to Supabase:", data);

                setSubmitSuccess(true);

                setTimeout(() => {
                    localStorage.removeItem("PageOneDataPCBA");
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

            <Box color="#0662EA" fontWeight="bold" paddingY="40px" fontSize="23px">
                فرم سفارش برد مدار چاپی ({page1.pagename})
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
                    <Input disabled backgroundColor="white" height="44px" type="text" key="firstname" name="firstname" value={formData.firstname || ""} onChange={handleChange} />
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
                    <Input disabled backgroundColor="white" height="44px" type="text" key="lastname" name="lastname" value={formData.lastname || ""} onChange={handleChange} />
                    <Field.ErrorText>
                        لطفا فرم را کامل کنید.
                    </Field.ErrorText>
                </Field.Root>
            </SimpleGrid>

            <Field.Root width="full" {...(errors?.companyname ? { invalid: true } : {})} marginTop="10px">
                <Field.Label>
                    نام شرکت :
                </Field.Label>
                <Input disabled backgroundColor="white" height="44px" type="text" key="companyname" name="companyname" value={formData.companyname || ""} onChange={handleChange} />
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
                <Text width="full" fontSize="14px" color="gray.600">خیابان ، کوچه ، پلاک ، واحد و ... :</Text>
                <Input disabled backgroundColor="white" height="44px" type="text" key="address" name="address" value={formData.address || ""} onChange={handleChange} />
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
                    <Input disabled backgroundColor="white" height="44px" type="text" key="province" name="province" value={formData.province || ""} onChange={handleChange} />
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
                    <Input disabled backgroundColor="white" height="44px" type="text" key="city" name="city" value={formData.city || ""} onChange={handleChange} />
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
                    <Input disabled maxLength={10} type="text" backgroundColor="white" height="44px" key="postcode" name="postcode" value={formData.postcode || ""} onChange={handleNumberChange} onKeyDown={handleKeyDown} />
                    <Field.ErrorText>
                        {errors.postcode || "لطفا فرم را کامل کنید."}
                    </Field.ErrorText>
                </Field.Root>

                <Field.Root {...(submitted && !validateEmail(formData.email) ? { invalid: true } : {})} width="full" marginTop="10px">
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
                    <Input disabled backgroundColor="white" height="44px" type="email" key="email" name="email" value={formData.email || ""} onChange={handleChange} />
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
                    <Input disabled maxLength={11} type="text" backgroundColor="white" height="44px" key="telephone" name="telephone" value={formData.telephone || ""} onChange={handleNumberChange} onKeyDown={handleKeyDown} />
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
                    <Input disabled maxLength={11} type="text" backgroundColor="white" height="44px" min={1} key="mobilephone" name="mobilephone" value={formData.mobilephone || ""} onChange={handleNumberChange} onKeyDown={handleKeyDown} />
                    <Field.ErrorText>
                        {errors.mobilephone || "لطفا فرم را کامل کنید."}
                    </Field.ErrorText>
                </Field.Root>
            </SimpleGrid>

            <Field.Root marginTop="10px">
                <Field.Label>توضیحات ارسال :</Field.Label>
                <Textarea backgroundColor="white" key="orderdescription" name="orderdescription" value={formData.orderdescription || ""} onChange={handleChange} minH="200px" />
            </Field.Root>

            <RadioCard.Root
                orientation="vertical"
                align="center"
                paddingY="20px"
                maxW="200px"
                dir="rtl"
                defaultValue="no"
            >
                <RadioCard.Label dir="rtl">حمل و نقل به آدرس متفاوت :</RadioCard.Label>
                <HStack width="120px" key={14} onChange={(e) => setValue(e.target.value)}>
                    {stasil.map((item) => (
                        <>
                            <RadioCard.Item _hover={{ boxShadow: "md" }} transitionDuration="300ms" cursor="pointer" key={item.id} value={item.value} colorPalette="blue">
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
                        </>
                    ))}
                </HStack>
            </RadioCard.Root>

            {value === "yes" && (
                <>
                    <SimpleGrid columns={[1, null, 2]} gap="6">
                        <Field.Root width="full" {...(errors?.changename ? { invalid: true } : {})}>
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
                            <Input disabled backgroundColor="white" height="44px" type="text" key="changename" name="changename" value={formData.changename || ""} onChange={handleChange} />
                            <Field.ErrorText>
                                لطفا فرم را کامل کنید.
                            </Field.ErrorText>
                        </Field.Root>

                        <Field.Root width="full" {...(errors?.changelastname ? { invalid: true } : {})}>
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
                            <Input disabled backgroundColor="white" height="44px" type="text" key="changelastname" name="changelastname" value={formData.changelastname || ""} onChange={handleChange} />
                            <Field.ErrorText>
                                لطفا فرم را کامل کنید.
                            </Field.ErrorText>
                        </Field.Root>
                    </SimpleGrid>

                    <Field.Root width="full" marginTop="10px">
                        <Field.Label>
                            نام شرکت :
                        </Field.Label>
                        <Input disabled backgroundColor="white" height="44px" type="text" key="changecompany" name="changecompany" value={formData.changecompany || ""} onChange={handleChange} />
                    </Field.Root>

                    <Field.Root width="full" {...(errors?.changeaddress ? { invalid: true } : {})} marginTop="10px">
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
                        <Text width="full" fontSize="14px" color="gray.600">خیابان ، کوچه ، پلاک ، واحد و ... :</Text>
                        <Input disabled backgroundColor="white" height="44px" type="text" key="changeaddress" name="changeaddress" value={formData.changeaddress || ""} onChange={handleChange} />
                        <Field.ErrorText>
                            لطفا فرم را کامل کنید.
                        </Field.ErrorText>
                    </Field.Root>
                    <SimpleGrid columns={[1, null, 2]} gap="6" marginTop="10px">
                        <Field.Root width="full" {...(errors?.changeprovince ? { invalid: true } : {})} marginTop="10px">
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
                            <Input disabled backgroundColor="white" height="44px" type="text" key="changeprovince" name="changeprovince" value={formData.changeprovince || ""} onChange={handleChange} />
                        </Field.Root>
                        <Field.Root width="full" {...(errors?.changecity ? { invalid: true } : {})} marginTop="10px">
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
                            <Input disabled backgroundColor="white" height="44px" type="text" key="changecity" name="changecity" value={formData.changecity || ""} onChange={handleChange} />
                        </Field.Root>
                        <Field.Root {...(errors?.changepostcode ? { invalid: true } : {})} width="full" marginTop="10px">
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
                            <Input disabled maxLength={10} backgroundColor="white" height="44px" type="text" key="changepostcode" name="changepostcode" value={formData.changepostcode || ""} onChange={handleNumberChange} onKeyDown={handleKeyDown} />
                            <Field.ErrorText>
                                {errors.changepostcode || "لطفا فرم را کامل کنید."}
                            </Field.ErrorText>
                        </Field.Root>
                    </SimpleGrid>
                </>
            )}
            <HStack paddingY="20px">
                {page1.pagename === "OEM" && <Button onClick={() => navigate("/OEM")} colorPalette="blue" variant="solid">قبلی</Button>}
                {page1.pagename === "PCB" && <Button onClick={() => navigate("/PCB")} colorPalette="blue" variant="solid">قبلی</Button>}
                {page1.pagename === "PCBA" && <Button onClick={() => navigate("/PCBA")} colorPalette="blue" variant="solid">قبلی</Button>}
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