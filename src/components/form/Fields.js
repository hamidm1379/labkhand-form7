import { Field, SimpleGrid, Box, Input, Badge, Image } from "@chakra-ui/react"
import SizeImage from "../../image/size.png"
import { Tooltip } from "../../components/ui/tooltip"
import { FaExclamationCircle } from 'react-icons/fa';

export default function Fields({ formData, setFormData, errors }) {

    const handlechange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            
            <SimpleGrid columns={[1, 2, 3]} gap="6">
                <Field.Root {...(errors?.productname ? { invalid: true } : {})} width="full" sm={{ width: "220px" }} >
                    <Field.Label>
                        نام سفارش :
                        <Field.RequiredIndicator
                            fallback={
                                <>
                                    <Badge size="xs" color="red" backgroundColor="gray.50">
                                        (ضروری)
                                    </Badge>
                                    <Tooltip
                                        content="نام را وارد کنید"
                                        positioning={{ placement: "top" }}
                                        openDelay={100}
                                        closeDelay={100}
                                        contentProps={{ css: { "--tooltip-bg": "white", "color": "black" } }}
                                        showArrow
                                    >
                                        <Box cursor="pointer" as={FaExclamationCircle}></Box>
                                    </Tooltip>
                                </>
                            }
                        />
                    </Field.Label>
                    <Input height="44px" type="text" key="productname" name="productname" value={formData.productname || ""} onChange={handlechange} />
                    <Field.ErrorText>
                        لطفا فرم را کامل کنید.
                    </Field.ErrorText>
                </Field.Root>
                <Field.Root {...(errors?.countproduct ? { invalid: true } : {})} width="full" sm={{ width: "220px" }}>
                    <Field.Label>
                        تعداد سفارش :
                        <Field.RequiredIndicator
                            fallback={
                                <>
                                    <Badge size="xs" color="red" backgroundColor="gray.50">
                                        (ضروری)
                                    </Badge>
                                    <Tooltip
                                        content="تعداد سفارش را وارد کنید"
                                        positioning={{ placement: "top" }}
                                        openDelay={100}
                                        closeDelay={100}
                                        contentProps={{ css: { "--tooltip-bg": "white", "color": "black" } }}
                                        showArrow
                                    >
                                        <Box cursor="pointer" as={FaExclamationCircle}></Box>
                                    </Tooltip>
                                </>
                            }
                        />
                    </Field.Label>
                    <Input height="44px" type="number" key="countproduct" name="countproduct" value={formData.countproduct} onChange={handlechange} min={1}/>
                    <Field.ErrorText>
                        لطفا فرم را کامل کنید.
                    </Field.ErrorText>
                </Field.Root>

            </SimpleGrid>

            <Box paddingY="20px">
                ابعاد (میلی متر * میلی متر) :
            </Box>

            <SimpleGrid columns={[1, 2, 3]} gap="6">
                <Field.Root {...(errors?.width ? { invalid: true } : {})} width="full" sm={{ width: "220px" }}>
                    <Field.Label>
                        طول :
                        <Field.RequiredIndicator
                            fallback={
                                <>
                                    <Badge size="xs" color="red" backgroundColor="gray.50">
                                        (ضروری)
                                    </Badge>
                                    <Tooltip
                                        content="طول را وارد کنید"
                                        positioning={{ placement: "top" }}
                                        openDelay={100}
                                        closeDelay={100}
                                        contentProps={{ css: { "--tooltip-bg": "white", "color": "black" } }}
                                        showArrow
                                    >
                                        <Box cursor="pointer" as={FaExclamationCircle}></Box>
                                    </Tooltip>
                                </>
                            }
                        />
                    </Field.Label>
                    <Input height="44px" type="number" key="length" name="length" value={formData.length} onChange={handlechange} />
                    <Field.ErrorText>
                        لطفا فرم را کامل کنید.
                    </Field.ErrorText>
                </Field.Root>

                <Field.Root {...(errors?.length ? { invalid: true } : {})} width="full" sm={{ width: "220px" }}>
                    <Field.Label>
                        عرض :
                        <Field.RequiredIndicator
                            fallback={
                                <>
                                    <Badge size="xs" color="red" backgroundColor="gray.50">
                                        (ضروری)
                                    </Badge>
                                    <Tooltip
                                        content="عرض را وارد کنید"
                                        positioning={{ placement: "top" }}
                                        openDelay={100}
                                        closeDelay={100}
                                        contentProps={{ css: { "--tooltip-bg": "white", "color": "black" } }}
                                        showArrow
                                    >
                                        <Box cursor="pointer" as={FaExclamationCircle}></Box>
                                    </Tooltip>
                                </>
                            }
                        />
                    </Field.Label>
                    <Input height="44px" type="number" key="width" name="width" value={formData.width} onChange={handlechange} />
                    <Field.ErrorText>
                        لطفا فرم را کامل کنید.
                    </Field.ErrorText>
                </Field.Root>

                <Image margin="auto" sm={{ margin: "0" }} src={SizeImage} alt="ابعاد" />

            </SimpleGrid>
        </>
    )
}