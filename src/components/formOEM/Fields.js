import { Field, SimpleGrid, Box, Input, Badge, Image, Text } from "@chakra-ui/react"
import SizeImage from "../../image/size.png"
import { Tooltip } from "../ui/tooltip"
import { FaQuestionCircle } from 'react-icons/fa';

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
                                    <Badge fontSize="16px" size="xs" color="red" backgroundColor="#F2F7FE">
                                        *
                                    </Badge>
                                    <Tooltip
                                        content="نام را وارد کنید"
                                        positioning={{ placement: "top" }}
                                        openDelay={100}
                                        closeDelay={100}
                                        contentProps={{ css: { "--tooltip-bg": "white", "color": "black" } }}
                                        showArrow
                                    >
                                        <Box cursor="pointer" as={FaQuestionCircle}></Box>
                                    </Tooltip>
                                </>
                            }
                        />
                    </Field.Label>
                    <Input backgroundColor="white" height="44px" type="text" key="productname" name="productname" value={formData.productname || ""} onChange={handlechange} />
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
                                    <Badge fontSize="16px" size="xs" color="red" backgroundColor="#F2F7FE">
                                        *
                                    </Badge>
                                    <Tooltip
                                        content="تعداد سفارش را وارد کنید"
                                        positioning={{ placement: "top" }}
                                        openDelay={100}
                                        closeDelay={100}
                                        contentProps={{ css: { "--tooltip-bg": "white", "color": "black" } }}
                                        showArrow
                                    >
                                        <Box cursor="pointer" as={FaQuestionCircle}></Box>
                                    </Tooltip>
                                </>
                            }
                        />
                    </Field.Label>
                    <Input backgroundColor="white" height="44px" type="number" key="countproduct" name="countproduct" value={formData.countproduct} onChange={handlechange} min={1} />
                    <Field.ErrorText>
                        لطفا فرم را کامل کنید.
                    </Field.ErrorText>
                </Field.Root>
            </SimpleGrid>
            <Box paddingY="20px">
                ابعاد :
            </Box>
            <SimpleGrid columns={[1, 2, 3]} gap="6">
                <Field.Root {...(errors?.width ? { invalid: true } : {})} width="full" sm={{ width: "220px" }}>
                    <Field.Label>
                        طول :
                        <Field.RequiredIndicator
                            fallback={
                                <>
                                    <Badge fontSize="16px" size="xs" color="red" backgroundColor="#F2F7FE">
                                        *
                                    </Badge>
                                    <Tooltip
                                        content="طول را وارد کنید"
                                        positioning={{ placement: "top" }}
                                        openDelay={100}
                                        closeDelay={100}
                                        contentProps={{ css: { "--tooltip-bg": "white", "color": "black" } }}
                                        showArrow
                                    >
                                        <Box cursor="pointer" as={FaQuestionCircle}></Box>
                                    </Tooltip>
                                </>
                            }
                        />
                    </Field.Label>
                    <Input backgroundColor="white" min={1} height="44px" type="number" key="length" name="length" value={formData.length} onChange={handlechange} />
                    <Field.ErrorText>
                        لطفا فرم را کامل کنید.
                    </Field.ErrorText>
                </Field.Root>
                <Box display="flex" marginY="auto">
                    <Field.Root {...(errors?.length ? { invalid: true } : {})} width="full" sm={{ width: "220px" }}>
                        <Field.Label>
                            عرض :
                            <Field.RequiredIndicator
                                fallback={
                                    <>
                                        <Badge fontSize="16px" size="xs" color="red" backgroundColor="#F2F7FE">
                                            *
                                        </Badge>
                                        <Tooltip
                                            content="عرض را وارد کنید"
                                            positioning={{ placement: "top" }}
                                            openDelay={100}
                                            closeDelay={100}
                                            contentProps={{ css: { "--tooltip-bg": "white", "color": "black" } }}
                                            showArrow
                                        >
                                            <Box cursor="pointer" as={FaQuestionCircle}></Box>
                                        </Tooltip>
                                    </>
                                }
                            />
                        </Field.Label>
                        <Input backgroundColor="white" min={1} height="44px" type="number" key="width" name="width" value={formData.width} onChange={handlechange} />
                        <Field.ErrorText>
                            لطفا فرم را کامل کنید.
                        </Field.ErrorText>
                    </Field.Root>
                <Text display="none"  md={{display:"flex"}} marginX="auto" marginY="auto">
                    Unit:mm*
                </Text>
                </Box>
                <Box display="flex" marginY="auto">
                    <Text md={{display:"none"}} margin="auto">
                        Unit:mm*
                    </Text>
                    <Image margin="auto" sm={{ margin: "0" }} src={SizeImage} alt="ابعاد" />
                </Box>

            </SimpleGrid>
        </>
    )
}