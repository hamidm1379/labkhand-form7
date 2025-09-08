import { Field, SimpleGrid, Box, Input, Badge, Image } from "@chakra-ui/react"
import SizeImage from "../../image/size.png"
import { Tooltip } from "../../components/ui/tooltip"
import { FaExclamationCircle } from 'react-icons/fa';


const Fields = () => {
    return (
        <>
            <Box paddingY="40px" fontSize="18px">
                فرم سفارش برد مدار چاپی (PCB)
            </Box>
            <SimpleGrid columns={[1, 2, 3]} gap="6">
                <Field.Root width="288px" sm={{ width: "220px" }}>
                    <Field.Label>
                        نام سفارش :
                        <Field.RequiredIndicator
                            fallback={
                                <>
                                    <Badge size="xs" color="red" backgroundColor="white">
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
                    <Input height="44px" placeholder="نام سفارش" />
                </Field.Root>

                <Field.Root width="288px" sm={{ width: "220px" }}>
                    <Field.Label>
                        تعداد سفارش :
                        <Field.RequiredIndicator
                            fallback={
                                <>
                                    <Badge size="xs" color="red" backgroundColor="white">
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
                    <Input height="44px" placeholder="تعداد سفارش" />
                </Field.Root>

            </SimpleGrid>

            <Box paddingY="20px">
                ابعاد (میلی متر * میلی متر) :
            </Box>

            <SimpleGrid columns={[1, 2, 3]} gap="6">
                <Field.Root width="288px" sm={{ width: "220px" }}>
                    <Field.Label>
                        طول :
                        <Field.RequiredIndicator
                            fallback={
                                <>
                                    <Badge size="xs" color="red" backgroundColor="white">
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
                    <Input height="44px" placeholder="طول" />
                </Field.Root>

                <Field.Root width="288px" sm={{ width: "220px" }}>
                    <Field.Label>
                        عرض :
                        <Field.RequiredIndicator
                            fallback={
                                <>
                                    <Badge size="xs" color="red" backgroundColor="white">
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
                    <Input height="44px" placeholder="عرض" />
                </Field.Root>

                <Image margin="auto" sm={{ margin: "0" }} src={SizeImage} alt="ابعاد" />

            </SimpleGrid>
        </>
    )
}
export default Fields;