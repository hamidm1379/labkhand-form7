import { Field,SimpleGrid, Grid, Input, Image, HStack, GridItem, RadioCard } from "@chakra-ui/react"

import BordtakImage from "../../image/bordtak.png"
import PanelImage from "../../image/panel.png"

import FRImage from "../../image/fr-4.png"
import FlexImage from "../../image/flex.png"
import AluminiumImage from "../../image/aluminium.png"
import copperImage from "../../image/core.png"
import RogersImage from "../../image/rogers.png"
import PTFEImage from "../../image/ptfe.png"

const items = [
    { value: "برد تک", title: "برد تک", src: BordtakImage },
    { value: "پنل", title: "پنل", src: PanelImage }
]

const numbers = [
    { value: 1, title: 1 },
    { value: 2, title: 2 },
    { value: 3, title: 3 },
    { value: 4, title: 4 },
    { value: 5, title: 5 },
    { value: 6, title: 6 },
    { value: 7, title: 7 },
    { value: 8, title: 8 }
]

const material = [
    { value: "FR-4", title: "FR-4", src: FRImage },
    { value: "flex", title: "flex", src: FlexImage },
    { value: "aluminium", title: "aluminium", src: AluminiumImage },
    { value: "copper-core", title: "copper core", src: copperImage },
    { value: "rogers", title: "rogers", src: RogersImage },
    { value: "PTFE teflon", title: "PTFE teflon", src: PTFEImage }
]

const DesignQuantityType = () => {
    return (
        <>
            <RadioCard.Root
                orientation="vertical"
                align="center"
                maxW="300px"
                defaultValue="برد تک"
                paddingY="20px"
                dir="rtl"
            >
                <RadioCard.Label dir="rtl">طرح فایل :</RadioCard.Label>
                <HStack>
                    {items.map((item) => (
                        <RadioCard.Item height="100px" key={item.value} value={item.value} colorPalette="blue">
                            <RadioCard.ItemHiddenInput />
                            <RadioCard.ItemControl>
                                <Image src={item.src} />
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
                        defaultValue={1}
                        paddingY="20px"
                        dir="rtl"
                    >
                        <RadioCard.Label dir="rtl">تعداد طرح :</RadioCard.Label>
                        <HStack spacing={3} wrap="wrap" justify="center">
                            {numbers.map((item) => (
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
                            تعداد طرح دلخواه را وارد کنید
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <Input placeholder="تعداد" />
                    </Field.Root>
                </GridItem>
            </SimpleGrid>

            <RadioCard.Root
                orientation="vertical"
                align="center"
                maxW="800px"
                defaultValue="FR-4"
                paddingY="20px"
                dir="rtl"
            >
                <RadioCard.Label dir="rtl">جنس برد :</RadioCard.Label>
                <HStack spacing={3} wrap="wrap" justify="center">
                    {material.map((item) => (
                        <RadioCard.Item height="100px" key={item.value} value={item.value} colorPalette="blue">
                            <RadioCard.ItemHiddenInput />
                            <RadioCard.ItemControl>
                                <Image src={item.src} />
                                <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
                            </RadioCard.ItemControl>
                        </RadioCard.Item>
                    ))}
                </HStack>
            </RadioCard.Root>
        </>
    )
}
export default DesignQuantityType;