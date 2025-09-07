import { Field, SimpleGrid, Grid, Input, HStack, GridItem, RadioCard, Text } from "@chakra-ui/react"

const boardColor = [
    { value: "سبز", title: "سبز", color: "green" },
    { value: "سفید", title: "سفید", color: "gray" },
    { value: "مشکی", title: "مشکی", color: "black" },
    { value: "قرمز", title: "قرمز", color: "red" },
    { value: "آبی", title: "آبی", color: "blue" },
    { value: "زرد", title: "زرد", color: "yellow" },
    { value: "بنفش", title: "بنفش", color: "purple" }
]

const guideColor = [
    { value: "سفید", title: "سفید", color: "gray" },
    { value: "مشکی", title: "مشکی", color: "black" },
    { value: "بی رنگ", title: "بی رنگ", color: "" }
]

const finalCover = [
    { value: "HASL", title: "HASL" },
    { value: "ENIG", title: "ENIG" }
]

const boardcut = [
    { value: "CNC", title: "CNC" },
    { value: "V-Cut", title: "V-Cut" }
]

const stasil = [
    { value: "yes", title: "بله" },
    { value: "no", title: "خیر" }
]

const Colors = () => {
    return (
        <>
            <RadioCard.Root
                orientation="vertical"
                align="center"
                maxW="700px"
                defaultValue="سبز"
                paddingY="20px"
                dir="rtl"
            >
                <RadioCard.Label dir="rtl">رنگ برد (سولدر) :</RadioCard.Label>
                <HStack spacing={3} wrap="wrap" justify="center">
                    {boardColor.map((item) => (
                        <RadioCard.Item key={item.value} value={item.value} colorPalette={item.color}>
                            <RadioCard.ItemHiddenInput />
                            <RadioCard.ItemControl>
                                <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
                            </RadioCard.ItemControl>
                        </RadioCard.Item>
                    ))}
                </HStack>
            </RadioCard.Root>

            <RadioCard.Root
                orientation="vertical"
                align="center"
                maxW="300px"
                defaultValue="سفید"
                paddingY="20px"
                dir="rtl"
            >
                <RadioCard.Label dir="rtl">رنگ چاپ راهنما :</RadioCard.Label>
                <HStack>
                    {guideColor.map((item) => (
                        <RadioCard.Item key={item.value} value={item.value} colorPalette={item.color}>
                            <RadioCard.ItemHiddenInput />
                            <RadioCard.ItemControl>
                                <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
                            </RadioCard.ItemControl>
                        </RadioCard.Item>
                    ))}
                </HStack>
            </RadioCard.Root>

            <SimpleGrid columns={[1, null, 5]} gap="6">
                <GridItem colSpan={3}>
                    <RadioCard.Root
                        orientation="vertical"
                        align="center"
                        defaultValue="HASL"
                        paddingY="20px"
                        maxW="200px"
                        dir="rtl"
                    >
                        <RadioCard.Label dir="rtl">پوشش نهایی :</RadioCard.Label>
                        <HStack>
                            {finalCover.map((item) => (
                                <RadioCard.Item key={item.value} value={item.value} colorPalette="blue">
                                    <RadioCard.ItemHiddenInput />
                                    <RadioCard.ItemControl>
                                        <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
                                    </RadioCard.ItemControl>
                                </RadioCard.Item>
                            ))}
                        </HStack>
                    </RadioCard.Root>
                </GridItem>
                <GridItem marginY="auto" colSpan={2}>
                    <Field.Root>
                        <Field.Label>
                            پوشش نهایی دلخواه را وارد کنید
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <Input placeholder="تعداد" />
                    </Field.Root>
                </GridItem>
            </SimpleGrid>

            <SimpleGrid columns={[1, null, 2]} gap="">
                <RadioCard.Root
                    orientation="vertical"
                    align="center"
                    defaultValue="CNC"
                    paddingY="20px"
                    maxW="200px"
                    dir="rtl"
                >
                    <RadioCard.Label dir="rtl">برش برد :</RadioCard.Label>
                    <HStack>
                        {boardcut.map((item) => (
                            <RadioCard.Item key={item.value} value={item.value} colorPalette="blue">
                                <RadioCard.ItemHiddenInput />
                                <RadioCard.ItemControl>
                                    <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
                                </RadioCard.ItemControl>
                            </RadioCard.Item>
                        ))}
                    </HStack>
                </RadioCard.Root>
                <RadioCard.Root
                    orientation="vertical"
                    align="center"
                    defaultValue="yes"
                    paddingY="20px"
                    maxW="200px"
                    dir="rtl"
                >
                    <RadioCard.Label dir="rtl">استنسیل :</RadioCard.Label>
                    <HStack>
                        {stasil.map((item) => (
                            <RadioCard.Item key={item.value} value={item.value} colorPalette="blue">
                                <RadioCard.ItemHiddenInput />
                                <RadioCard.ItemControl>
                                    <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
                                </RadioCard.ItemControl>
                            </RadioCard.Item>
                        ))}
                    </HStack>
                </RadioCard.Root>
            </SimpleGrid>

            <Text color="gray" fontSize="16px" paddingBottom="20px">
                تست الکتریکال دارد. (رایگان)
            </Text>
        </>
    )
}
export default Colors;