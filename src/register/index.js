import { Field, SimpleGrid, RadioCard, HStack, Button, Box, Input, Badge, Text, Select, Portal, Textarea, createListCollection } from "@chakra-ui/react"
import { FaCheck } from "react-icons/fa";
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

const stasil = [
    { id: 1, value: "yes", title: "بله" },
    { id: 2, value: "no", title: "خیر" }
]

function Register() {
    const [selectedValueFive, setSelectedValueFive] = useState();
    const [value, setValue] = useState("no");
    const [errors, setErrors] = useState({});
    const [pageTwoData, setPageTwoData] = useState({});
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

    const validate = () => {

        let newErrors = {};

        if (!formData.firstname) newErrors.firstname = "الزامی"
        if (!formData.lastname) newErrors.lastname = "الزامی"
        if (!formData.companyname) newErrors.companyname = "الزامی"
        if (!formData.address) newErrors.address = "الزامی"
        if (!formData.postcode) newErrors.postcode = "الزامی"
        if (!formData.province) newErrors.province = "الزامی"
        if (!formData.city) newErrors.city = "الزامی"
        if (!formData.email) newErrors.email = "الزامی"
        if (!formData.telephone) newErrors.telephone = "الزامی"
        if (!formData.mobilephone) newErrors.mobilephone = "الزامی"

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    const handleSubmit = async () => {

        if (!validate()) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const page1 = JSON.parse(localStorage.getItem("pageOneData") || "{}");
        const page2 = JSON.parse(localStorage.getItem("pageTwoData") || "{}");

        const allData = { ...page1, ...page2 };

        const { data, error } = await supabase.from("OrderForm").insert([allData]);
        if (error) {
            console.error("Supabase Error:", error);
        } else {
            console.log("Sent to Supabase:", data);
            localStorage.removeItem("pageOneData");
            localStorage.removeItem("pageTwoData");
            if (page1.pagename === "PCB"){navigate("/PCB");}
            if (page1.pagename === "OEM"){navigate("/OEM");}
            if (page1.pagename === "PCBA"){navigate("/PCBA");}
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

    return (
        <Container dir="rtl" maxW="6xl" backgroundColor="gray.50" marginY="20px" borderRadius="20px">
            <Box fontWeight="bold" color="#0662EA" paddingY="40px" fontSize="23px">
                فرم سفارش ({page1.pagename})
            </Box>
            <SimpleGrid columns={[1, null, 2]} gap="6">
                <Field.Root width="full" {...(errors?.firstname ? { invalid: true } : {})}>
                    <Field.Label>
                        نام  :
                        <Field.RequiredIndicator
                            fallback={
                                <>
                                    <Badge size="xs" color="red" backgroundColor="gray.50">
                                        (ضروری)
                                    </Badge>
                                </>
                            }
                        />
                    </Field.Label>
                    <Input height="44px" type="text" key="firstname" name="firstname" value={formData.firstname || ""} onChange={handleChange} />
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
                                    <Badge size="xs" color="red" backgroundColor="gray.50">
                                        (ضروری)
                                    </Badge>

                                </>
                            }
                        />
                    </Field.Label>
                    <Input height="44px" type="text" key="lastname" name="lastname" value={formData.lastname || ""} onChange={handleChange} />
                    <Field.ErrorText>
                        لطفا فرم را کامل کنید.
                    </Field.ErrorText>
                </Field.Root>

            </SimpleGrid>
            <Field.Root width="full" {...(errors?.companyname ? { invalid: true } : {})} marginTop="10px">
                <Field.Label>
                    نام شرکت :
                    <Field.RequiredIndicator
                        fallback={
                            <>
                                <Badge size="xs" color="red" backgroundColor="gray.50">
                                    (ضروری)
                                </Badge>
                            </>
                        }
                    />
                </Field.Label>
                <Input height="44px" type="text" key="companyname" name="companyname" value={formData.companyname || ""} onChange={handleChange} />
                <Field.ErrorText>
                    لطفا فرم را کامل کنید.
                </Field.ErrorText>
            </Field.Root>

            <Field.Root width="full" {...(errors?.address ? { invalid: true } : {})} marginTop="10px">
                <Field.Label>
                    آدرس:
                    <Field.RequiredIndicator
                        fallback={
                            <>
                                <Badge size="xs" color="red" backgroundColor="gray.50">
                                    (ضروری)
                                </Badge>
                            </>
                        }
                    />
                </Field.Label>
                <Text width="full" fontSize="14px" color="gray.600">خیابان ، کوچه ، پلاک ، واحد و ... : (ضروری)</Text>
                <Input height="44px" type="text" key="address" name="address" value={formData.address || ""} onChange={handleChange} />
                <Field.ErrorText>
                    لطفا فرم را کامل کنید.
                </Field.ErrorText>
            </Field.Root>

            <SimpleGrid columns={[1, null, 2]} gap="6" marginTop="10px">
                <Field.Root width="full" {...(errors?.province ? { invalid: true } : {})}>
                    <Select.Root collection={frameworks}>
                        <Select.HiddenSelect key="province" name="province" value={formData.province || ""} onChange={(value) => handlechangeSelect("province", value)} />
                        <Select.Label color="gray.600" dir="rtl">استان : (ضروری)</Select.Label>
                        <Select.Control dir="rtl">
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
                <Field.Root width="full" {...(errors?.province ? { invalid: true } : {})}>
                    <Select.Root collection={city}>
                        <Select.HiddenSelect key="city" name="city" value={formData.city || ""} onChange={(value) => handlechangeSelect("city", value)} />
                        <Select.Label color="gray.600" dir="rtl">شهر : (ضروری)</Select.Label>
                        <Select.Control dir="rtl">
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
                                    <Badge size="xs" color="red" backgroundColor="gray.50">
                                        (ضروری)
                                    </Badge>
                                </>
                            }
                        />
                    </Field.Label>
                    <Input height="44px" type="text" key="postcode" name="postcode" value={formData.postcode || ""} onChange={handleChange} />
                    <Field.ErrorText>
                        لطفا فرم را کامل کنید.
                    </Field.ErrorText>
                </Field.Root>
                <Field.Root {...(errors?.email ? { invalid: true } : {})} width="full" marginTop="10px">
                    <Field.Label>
                        ایمیل :
                        <Field.RequiredIndicator
                            fallback={
                                <>
                                    <Badge size="xs" color="red" backgroundColor="gray.50">
                                        (ضروری)
                                    </Badge>

                                </>
                            }
                        />
                    </Field.Label>
                    <Input height="44px" type="text" key="email" name="email" value={formData.email || ""} onChange={handleChange} />
                    <Field.ErrorText>
                        لطفا فرم را کامل کنید.
                    </Field.ErrorText>
                </Field.Root>
                <Field.Root {...(errors?.telephone ? { invalid: true } : {})} width="full" marginTop="10px">
                    <Field.Label>
                        شماره ثابت :
                        <Field.RequiredIndicator
                            fallback={
                                <>
                                    <Badge size="xs" color="red" backgroundColor="gray.50">
                                        (ضروری)
                                    </Badge>
                                </>
                            }
                        />
                    </Field.Label>
                    <Input height="44px" type="number"  min={1}key="telephone" name="telephone" value={formData.telephone || ""} onChange={handleChange} />
                    <Field.ErrorText>
                        لطفا فرم را کامل کنید.
                    </Field.ErrorText>
                </Field.Root>
                <Field.Root {...(errors?.mobilephone ? { invalid: true } : {})} width="full" marginTop="10px">
                    <Field.Label>
                        شماره موبایل :
                        <Field.RequiredIndicator
                            fallback={
                                <>
                                    <Badge size="xs" color="red" backgroundColor="gray.50">
                                        (ضروری)
                                    </Badge>
                                </>
                            }
                        />
                    </Field.Label>
                    <Input height="44px" type="number"  min={1} key="mobilephone" name="mobilephone" value={formData.mobilephone || ""} onChange={handleChange} />
                    <Field.ErrorText>
                        لطفا فرم را کامل کنید.
                    </Field.ErrorText>
                </Field.Root>
            </SimpleGrid>

            <Field.Root marginTop="10px">
                <Field.Label>توضیحات سفارش :</Field.Label>
                <Textarea key="orderdescription" name="orderdescription" value={formData.orderdescription || ""} onChange={handleChange} minH="200px" />
            </Field.Root>

            <RadioCard.Root
                orientation="vertical"
                align="center"
                paddingY="20px"
                maxW="200px"
                dir="rtl"
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
                        <Field.Root width="full">
                            <Field.Label>
                                نام  :
                                <Field.RequiredIndicator
                                    fallback={
                                        <>
                                            <Badge size="xs" color="red" backgroundColor="gray.50">
                                                (ضروری)
                                            </Badge>
                                        </>
                                    }
                                />
                            </Field.Label>
                            <Input height="44px" type="text" key="changename" name="changename" value={formData.changename || ""} onChange={handleChange} />
                        </Field.Root>

                        <Field.Root width="full">
                            <Field.Label>
                                نام خانوادگی:
                                <Field.RequiredIndicator
                                    fallback={
                                        <>
                                            <Badge size="xs" color="red" backgroundColor="gray.50">
                                                (ضروری)
                                            </Badge>
                                        </>
                                    }
                                />
                            </Field.Label>
                            <Input height="44px" type="text" key="changelastname" name="changelastname" value={formData.changelastname || ""} onChange={handleChange} />
                        </Field.Root>
                    </SimpleGrid>
                    <Field.Root width="full" marginTop="10px">
                        <Field.Label>
                            نام شرکت :
                            <Field.RequiredIndicator
                                fallback={
                                    <>
                                        <Badge size="xs" color="red" backgroundColor="gray.50">
                                            (ضروری)
                                        </Badge>
                                    </>
                                }
                            />
                        </Field.Label>
                        <Input height="44px" type="text" key="changecompany" name="changecompany" value={formData.changecompany || ""} onChange={handleChange} />
                        <Field.ErrorText>
                            نام به درستی وارد نشده.
                        </Field.ErrorText>
                    </Field.Root>
                    <Field.Root width="full" marginTop="10px">
                        <Field.Label>
                            آدرس:
                            <Field.RequiredIndicator
                                fallback={
                                    <>
                                        <Badge size="xs" color="red" backgroundColor="gray.50">
                                            (ضروری)
                                        </Badge>
                                    </>
                                }
                            />
                        </Field.Label>
                        <Text width="full" fontSize="14px" color="gray.600">خیابان ، کوچه ، پلاک ، واحد و ... : (ضروری)</Text>
                        <Input height="44px" type="text" key="changeaddress" name="changeaddress" value={formData.changeaddress || ""} onChange={handleChange} />
                        <Field.ErrorText>
                            نام به درستی وارد نشده.
                        </Field.ErrorText>
                    </Field.Root>
                    <SimpleGrid columns={[1, null, 2]} gap="6" marginTop="10px">
                        <Select.Root collection={frameworks}>
                            <Select.HiddenSelect key="changeprovince" name="changeprovince" value={formData.changeprovince || ""} onChange={(value) => handlechangeSelect("changeprovince", value)} />
                            <Select.Label color="gray.600" dir="rtl">استان : (ضروری)</Select.Label>
                            <Select.Control dir="rtl">
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
                        <Select.Root collection={changecity}>
                            <Select.HiddenSelect key="changecity" name="changecity" value={formData.changecity || ""} onChange={(value) => handlechangeSelect("changecity", value)} />
                            <Select.Label color="gray.600" dir="rtl">شهر : (ضروری)</Select.Label>
                            <Select.Control dir="rtl">
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
                        <Field.Root width="full" marginTop="10px">
                            <Field.Label>
                                کدپستی :
                                <Field.RequiredIndicator
                                    fallback={
                                        <>
                                            <Badge size="xs" color="red" backgroundColor="gray.50">
                                                (ضروری)
                                            </Badge>

                                        </>
                                    }
                                />
                            </Field.Label>
                            <Input height="44px" type="number"  min={1} key="changepostcode" name="changepostcode" value={formData.changepostcode || ""} onChange={handleChange} />
                            <Field.ErrorText>
                                نام به درستی وارد نشده.
                            </Field.ErrorText>
                        </Field.Root>
                    </SimpleGrid>
                </>
            )}
            <HStack paddingY="20px">
                {page1.pagename === "OEM" && <Button onClick={() => navigate("/OEM")} colorPalette="blue" variant="solid">قبلی</Button>}
                {page1.pagename === "PCB" && <Button onClick={() => navigate("/PCB")} colorPalette="blue" variant="solid">قبلی</Button>}
                {page1.pagename === "PCBA" && <Button onClick={() => navigate("/PCBA")} colorPalette="blue" variant="solid">قبلی</Button>}
                <Button onClick={handleSubmit} colorPalette="blue" variant="solid">
                    ارسال
                </Button>
            </HStack>

        </Container>
    );
}

export default Register;
