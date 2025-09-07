import { Field, SimpleGrid, Box, Input, Badge, Image } from "@chakra-ui/react"
import SizeImage from "../../image/size.png"

const Fields = () => {
    return (
        <>
            <Box paddingY="40px" fontSize="18px">
                فرم سفارش برد مدار چاپی (PCB)
            </Box>
            <SimpleGrid columns={[1, null, 2]} gap="6">
                <Field.Root>
                    <Field.Label>
                        نام سفارش :
                        <Field.RequiredIndicator
                            fallback={
                                <Badge size="xs" color="red" backgroundColor="white">
                                    (ضروری)
                                </Badge>
                            }
                        />
                    </Field.Label>
                    <Input placeholder="نام سفارش" />
                </Field.Root>

                <Field.Root>
                    <Field.Label>
                        تعداد سفارش :
                        <Field.RequiredIndicator
                            fallback={
                                <Badge size="xs" color="red" backgroundColor="white">
                                    (ضروری)
                                </Badge>
                            }
                        />
                    </Field.Label>
                    <Input placeholder="تعداد سفارش" />
                </Field.Root>

            </SimpleGrid>

            <Box paddingY="20px">
                ابعاد (میلی متر * میلی متر) :
            </Box>

            <SimpleGrid  columns={[1, null, 3]} gap="6">
                <Field.Root>
                    <Field.Label>
                        طول :
                        <Field.RequiredIndicator
                            fallback={
                                <Badge size="xs" color="red" backgroundColor="white">
                                    (ضروری)
                                </Badge>
                            }
                        />
                    </Field.Label>
                    <Input placeholder="طول" />
                </Field.Root>

                <Field.Root>
                    <Field.Label>
                        عرض :
                        <Field.RequiredIndicator
                            fallback={
                                <Badge size="xs" color="red" backgroundColor="white">
                                    (ضروری)
                                </Badge>
                            }
                        />
                    </Field.Label>
                    <Input placeholder="عرض" />
                </Field.Root>

                <Image marginX="auto" src={SizeImage} alt="ابعاد" />

            </SimpleGrid>
        </>
    )
}
export default Fields;