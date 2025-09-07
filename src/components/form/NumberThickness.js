import { Field,Grid, SimpleGrid, Input, Image, HStack, GridItem, RadioCard } from "@chakra-ui/react"

import BoardThickImage from "../../image/boardThick.png";
import coppThickImage from "../../image/coppThick.png";

const layers = [
    { value: 2, title: 2 },
    { value: 4, title: 4 },
    { value: 6, title: 6 },
    { value: 8, title: 8 },
    { value: 10, title: 10 },
    { value: 11, title: 11 },
    { value: 12, title: 12 }
]

const boardThickness = [
    { value: 0.4, title: 0.4 },
    { value: 0.6, title: 0.6 },
    { value: 0.8, title: 0.8 },
    { value: 1, title: 1 },
    { value: 1.2, title: 1.2 },
    { value: 1.4, title: 1.4 },
    { value: 1.6, title: 1.6 },
    { value: 2, title: 2 }
]

const copperThickness = [
    { value: "1oz", title: "1oz" },
    { value: "2oz", title: "2oz" },
]

const NumberThickness = () => {
    return (
        <>
            <SimpleGrid columns={[1, null, 5]} gap="6">
                <GridItem colSpan={3}>
                    <RadioCard.Root
                        orientation="vertical"
                        align="center"
                        defaultValue={2}
                        paddingY="20px"
                        dir="rtl"
                    >
                        <RadioCard.Label dir="rtl">تعداد لایه ها :</RadioCard.Label>
                        <HStack spacing={3} wrap="wrap" justify="center">
                            {layers.map((item) => (
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
                            تعداد لایه دلخواه را وارد کنید
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <Input placeholder="تعداد" />
                    </Field.Root>
                </GridItem>
            </SimpleGrid>

            <SimpleGrid columns={[2, null, 5]} gap="6">
                <GridItem colSpan={3}>
                    <RadioCard.Root
                        orientation="vertical"
                        align="center"
                        defaultValue={0.4}
                        paddingY="20px"
                        dir="rtl"
                    >
                        <RadioCard.Label dir="rtl">ضخامت برد :</RadioCard.Label>
                        <HStack spacing={3} wrap="wrap" justify="center">
                            {boardThickness.map((item) => (
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
                <GridItem marginY="auto" colSpan={1}>
                    <Field.Root>
                        <Field.Label>
                            ضخامت برد دلخواه را وارد کنید
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <Input placeholder="تعداد" />
                    </Field.Root>
                </GridItem>
                <GridItem marginY="auto" colSpan={1}>
                    <Image src={BoardThickImage} />
                </GridItem>
            </SimpleGrid>

            <SimpleGrid columns={[2, null, 5]} gap="6">
                <GridItem colSpan={3}>
                    <RadioCard.Root
                        orientation="vertical"
                        align="center"
                        defaultValue="1oz"
                        paddingY="20px"
                        maxW="200px"
                        dir="rtl"
                    >
                        <RadioCard.Label dir="rtl">ضخامت مس :</RadioCard.Label>
                        <HStack spacing={3} wrap="wrap" justify="center">
                            {copperThickness.map((item) => (
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
                <GridItem marginY="auto" colSpan={1}>
                    <Field.Root>
                        <Field.Label>
                            ضخامت برد دلخواه را وارد کنید
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <Input placeholder="تعداد" />
                    </Field.Root>
                </GridItem>
                <GridItem marginY="auto" colSpan={1}>
                    <Image src={coppThickImage} />
                </GridItem>
            </SimpleGrid>
        </>
    )
}
export default NumberThickness;