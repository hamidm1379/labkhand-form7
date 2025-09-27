import { Field, SimpleGrid, RadioCard, HStack, Button, Box, Input, Badge, Text, Select, Portal, Textarea, createListCollection } from "@chakra-ui/react"
import { FaCheck } from "react-icons/fa";
import { Container } from "@chakra-ui/react"

import { useState, useEffect, useRef } from "react";
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
    const navigate = useNavigate();

    const page1 = JSON.parse(localStorage.getItem("pageOneData") || "{}");

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

    const validate = () => {
        let newErrors = {};

        setSubmitted(true);

        if (!validateEmail(formData.email)) {
            newErrors.email = "فرمت ایمیل معتبر نیست";
        }

        if (!formData.firstname) newErrors.firstname = "الزامی"
        if (!formData.lastname) newErrors.lastname = "الزامی"
        if (!formData.address) newErrors.address = "الزامی"
        if (!formData.postcode) newErrors.postcode = "لطفا فرم را کامل کنید."
        if (!formData.province) newErrors.province = "الزامی"
        if (!formData.city) newErrors.city = "الزامی"
        if (!formData.email) newErrors.email = "الزامی"
        if (!formData.telephone) newErrors.telephone = "لطفا فرم را کامل کنید."
        if (!formData.mobilephone) newErrors.mobilephone = "لطفا فرم را کامل کنید."

        if (formData.telephone && !validateTelephone(formData.telephone)) {
            newErrors.telephone = "شماره ثابت باید با 0 شروع شود و 11 رقم باشد.";
        }
        if (formData.mobilephone && !validateMobile(formData.mobilephone)) {
            newErrors.mobilephone = "شماره موبایل باید با 09 شروع شود و 11 رقم باشد";
        }

        if (formData.postcode && formData.postcode.length !== 10) {
            newErrors.postcode = "کد پستی باید دقیقاً 10 رقم باشد";
        }

        if (value === "yes") {
            if (!formData.changename) newErrors.changename = "لطفا فرم را کامل کنید."
            if (!formData.changelastname) newErrors.changelastname = "لطفا فرم را کامل کنید."
            if (!formData.changeaddress) newErrors.changeaddress = "لطفا فرم را کامل کنید."
            if (!formData.changeprovince) newErrors.changeprovince = "لطفا فرم را کامل کنید."
            if (!formData.changecity) newErrors.changecity = "لطفا فرم را کامل کنید."
            if (!formData.changepostcode) newErrors.changepostcode = "لطفا فرم را کامل کنید."

            if (formData.changepostcode && formData.changepostcode.length !== 10) {
                newErrors.changepostcode = "کد پستی باید دقیقاً 10 رقم باشد";
            }
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsSubmitting(true);

        try {
            const page1 = JSON.parse(localStorage.getItem("pageOneData") || "{}");
            const page2 = JSON.parse(localStorage.getItem("pageTwoData") || "{}");

            const allData = { ...page1, ...page2 };

            const { data, error } = await supabase.from("OrderForm").insert([allData]);
            
            if (error) {
                console.error("Supabase Error:", error);
                alert("خطا در ارسال فرم. لطفا دوباره تلاش کنید.");
            } else {
                console.log("Sent to Supabase:", data);
                const userId = data[0].id;
                
                document.cookie = `user_id=${userId}; path=/; max-age=31536000`; // یک سال اعتبار
                
                setSubmitSuccess(true);
                
                setTimeout(() => {
                    localStorage.removeItem("pageOneData");
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
    let SearchByName = iranCity.searchByName(formData.province);

    const city = createListCollection({
        items: [
            SearchByName
        ][0],
        itemToString: (item) => item.name,
        itemToValue: (item) => item.name,
    })

    let SearchByNameSec = iranCity.searchByName(formData.changeprovince);

    const changecity = createListCollection({
        items: [
            SearchByNameSec
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

    const [submitted, setSubmitted] = useState(false);
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

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
        <Container dir="rtl" maxW="6xl" backgroundColor="#F2F7FE" marginY="20px" borderRadius="20px">
            <Box color="#0662EA" fontWeight="bold" paddingY="40px" fontSize="23px">
                فرم سفارش برد مدار چاپی ({page1.pagename})
            </Box>
            {Object.keys(errors).length > 0 && (
                <Box paddingBottom="10px">
                    <Text color="red" fontSize="14px">���� ������ ��� �� ����� ����:</Text>
                    <ul>
                        {Object.keys(errors).map(key => (
                            <li key={key}>
                                <Text color="red" fontSize="14px">{errors[key]}</Text>
                            </li>
                        ))}
                    </ul>
                </Box>
            )}

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
                    <Input backgroundColor="white" height="44px" type="text" key="firstname" name="firstname" value={formData.firstname || ""} onChange={handleChange} />
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
                    <Input backgroundColor="white" height="44px" type="text" key="lastname" name="lastname" value={formData.lastname || ""} onChange={handleChange} />
                    <Field.ErrorText>
                        لطفا فرم را کامل کنید.
                    </Field.ErrorText>
                </Field.Root>
            </SimpleGrid>

            <Field.Root width="full" {...(errors?.companyname ? { invalid: true } : {})} marginTop="10px">
                <Field.Label>
                    نام شرکت :
                </Field.Label>
                <Input backgroundColor="white" height="44px" type="text" key="companyname" name="companyname" value={formData.companyname || ""} onChange={handleChange} />
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
                <Input backgroundColor="white" height="44px" type="text" key="address" name="address" value={formData.address || ""} onChange={handleChange} />
                <Field.ErrorText>
                    لطفا فرم را کامل کنید.
                </Field.ErrorText>
            </Field.Root>

            <SimpleGrid columns={[1, null, 2]} gap="6" marginTop="10px">
                <Field.Root width="full" {...(errors?.province ? { invalid: true } : {})}>
                    <Select.Root collection={frameworks}>
                        <Select.HiddenSelect key="province" name="province" value={formData.province || ""} onChange={(value) => handlechangeSelect("province", value)} />
                        <Select.Label display="flex" dir="rtl">استان : <Text marginRight="7px" fontSize="16px" color="red">*</Text></Select.Label>
                        <Select.Control backgroundColor="white" dir="rtl">
                            <Select.Trigger dir="rtl">
                                <Select.ValueText placeholder="استان" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                                <Select.Indicator />
                            </Select.IndicatorGroup>
                        </Select.Control>
                        <Portal>
                            <Select.Positioner>
                                <Select.Content >
                                    {frameworks.items.map((framework) => (
                                        <Select.Item dir="rtl" value={framework.id} item={framework} key={framework.id}>
                                            {framework.label}
                                            <Select.ItemIndicator />
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Positioner>
                        </Portal>
                    </Select.Root>
                    <Field.ErrorText>لطفا استان مورد نظر را وارد کنید.</Field.ErrorText>
                </Field.Root>

                <Field.Root width="full" {...(errors?.city ? { invalid: true } : {})}>
                    <Select.Root collection={city}>
                        <Select.HiddenSelect key="city" name="city" value={formData.city || ""} onChange={(value) => handlechangeSelect("city", value)} />
                        <Select.Label display="flex" dir="rtl">شهر : <Text marginRight="7px" fontSize="16px" color="red">*</Text></Select.Label>
                        <Select.Control backgroundColor="white" dir="rtl">
                            <Select.Trigger dir="rtl">
                                <Select.ValueText placeholder="شهر" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                                <Select.Indicator />
                            </Select.IndicatorGroup>
                        </Select.Control>
                        <Select.Positioner>
                            <Select.Content>
                                {city.items.map((item) => (
                                    <Select.Item dir="rtl" value={item.id} item={item} key={item.id}>
                                        {item.name}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Select.Root>
                    <Field.ErrorText>لطفا شهر مورد نظر را وارد کنید.</Field.ErrorText>
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
                    <Input maxLength={10} type="text" backgroundColor="white" height="44px" key="postcode" name="postcode" value={formData.postcode || ""} onChange={handleNumberChange} onKeyDown={handleKeyDown} />
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
                    <Input backgroundColor="white" height="44px" type="email" key="email" name="email" value={formData.email || ""} onChange={handleChange} />
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
                    <Input maxLength={11} type="text" backgroundColor="white" height="44px" key="telephone" name="telephone" value={formData.telephone || ""} onChange={handleNumberChange} onKeyDown={handleKeyDown} />
                    <Field.ErrorText>
                        {errors.telephone || "لطفا فرم را کامل کنید."}
                    </Field.ErrorText>
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
                    <Input maxLength={11} type="text" backgroundColor="white" height="44px" min={1} key="mobilephone" name="mobilephone" value={formData.mobilephone || ""} onChange={handleNumberChange} onKeyDown={handleKeyDown} />
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
                            <Input backgroundColor="white" height="44px" type="text" key="changename" name="changename" value={formData.changename || ""} onChange={handleChange} />
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
                            <Input backgroundColor="white" height="44px" type="text" key="changelastname" name="changelastname" value={formData.changelastname || ""} onChange={handleChange} />
                            <Field.ErrorText>
                                لطفا فرم را کامل کنید.
                            </Field.ErrorText>
                        </Field.Root>
                    </SimpleGrid>

                    <Field.Root width="full" marginTop="10px">
                        <Field.Label>
                            نام شرکت :
                        </Field.Label>
                        <Input backgroundColor="white" height="44px" type="text" key="changecompany" name="changecompany" value={formData.changecompany || ""} onChange={handleChange} />
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
                        <Input backgroundColor="white" height="44px" type="text" key="changeaddress" name="changeaddress" value={formData.changeaddress || ""} onChange={handleChange} />
                        <Field.ErrorText>
                            لطفا فرم را کامل کنید.
                        </Field.ErrorText>
                    </Field.Root>
                    <SimpleGrid columns={[1, null, 2]} gap="6" marginTop="10px">
                        <Field.Root width="full" {...(errors?.changeprovince ? { invalid: true } : {})}>
                            <Select.Root collection={frameworks}>
                                <Select.HiddenSelect key="changeprovince" name="changeprovince" value={formData.changeprovince || ""} onChange={(value) => handlechangeSelect("changeprovince", value)} />
                                <Select.Label display="flex" dir="rtl">استان : <Text marginRight="7px" fontSize="16px" color="red">*</Text></Select.Label>
                                <Select.Control backgroundColor="white" dir="rtl">
                                    <Select.Trigger dir="rtl">
                                        <Select.ValueText placeholder="استان" />
                                    </Select.Trigger>
                                    <Select.IndicatorGroup>
                                        <Select.Indicator />
                                    </Select.IndicatorGroup>
                                </Select.Control>
                                <Portal>
                                    <Select.Positioner>
                                        <Select.Content>
                                            {frameworks.items.map((framework) => (
                                                <Select.Item dir="rtl" item={framework} key={framework.value}>
                                                    {framework.label}
                                                    <Select.ItemIndicator />
                                                </Select.Item>
                                            ))}
                                        </Select.Content>
                                    </Select.Positioner>
                                </Portal>
                            </Select.Root>
                            <Field.ErrorText>لطفا استان مورد نظر را وارد کنید.</Field.ErrorText>
                        </Field.Root>
                        <Field.Root width="full" {...(errors?.changecity ? { invalid: true } : {})}>
                            <Select.Root collection={changecity}>
                                <Select.HiddenSelect key="changecity" name="changecity" value={formData.changecity || ""} onChange={(value) => handlechangeSelect("changecity", value)} />
                                <Select.Label display="flex" dir="rtl">شهر : <Text marginRight="7px" fontSize="16px" color="red">*</Text></Select.Label>
                                <Select.Control backgroundColor="white" dir="rtl">
                                    <Select.Trigger dir="rtl">
                                        <Select.ValueText placeholder="شهر" />
                                    </Select.Trigger>
                                    <Select.IndicatorGroup>
                                        <Select.Indicator />
                                    </Select.IndicatorGroup>
                                </Select.Control>
                                <Select.Positioner>
                                    <Select.Content>
                                        {changecity.items.map((item) => (
                                            <Select.Item dir="rtl" value={item.id} item={item} key={item.id}>
                                                {item.name}
                                                <Select.ItemIndicator />
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                            </Select.Root>
                            <Field.ErrorText>لطفا شهر مورد نظر را وارد کنید.</Field.ErrorText>
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
                            <Input maxLength={10} backgroundColor="white" height="44px" type="text" key="changepostcode" name="changepostcode" value={formData.changepostcode || ""} onChange={handleNumberChange} onKeyDown={handleKeyDown} />
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
