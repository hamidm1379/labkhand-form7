"use client"

import { useState } from "react";

import { Field, SimpleGrid, Box, Input, Image, HStack, GridItem, RadioCard } from "@chakra-ui/react"
import { FaCheck } from "react-icons/fa";

import { Tooltip } from "../../components/ui/tooltip"
import { FaQuestionCircle } from 'react-icons/fa';

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
    { value: "1", title: "1" },
    { value: "2", title: "2" },
    { value: "3", title: "3" },
    { value: "4", title: "4" },
    { value: "5", title: "5" },
    { value: "6", title: "6" },
    { value: "7", title: "7" },
    { value: "8", title: "8" }
]

const material = [
    { value: "FR-4", title: "FR-4", src: FRImage },
    { value: "flex", title: "flex", src: FlexImage },
    { value: "aluminium", title: "aluminium", src: AluminiumImage },
    { value: "copper-core", title: "copper core", src: copperImage },
    { value: "rogers", title: "rogers", src: RogersImage },
    { value: "PTFE teflon", title: "PTFE teflon", src: PTFEImage }
]

export default function DesignQuantityType({ formData, setFormData }) {
    const [selectedValue, setSelectedValue] = useState(items[0]?.value);
    const [selectedValueTwo, setSelectedValueTwo] = useState(numbers[0]?.value);
    const [selectedValueThree, setSelectedValueThree] = useState(material[0]?.value);
    const [isInputFilled, setIsInputFilled] = useState(false);

    const handlechange = (key, value) => {
        setFormData({ ...formData, [key]: value.target.value });
    };

    const handlechangeInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlechangeInputFile = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === "countdisignnumber") {
            setIsInputFilled(value.trim() !== "");
        }
    };

    return (
        <>

            <RadioCard.Root
                orientation="vertical"
                align="center"
                maxW="220px"
                defaultValue="برد تک"
                paddingY="20px"
                dir="rtl"
            >
                <RadioCard.Label dir="rtl">طرح فایل :
                    <Tooltip
                        content="تعداد طرح را وارد کنید"
                        positioning={{ placement: "top" }}
                        openDelay={100}
                        closeDelay={100}
                        contentProps={{ css: { "--tooltip-bg": "white", "color": "black" } }}
                        showArrow
                    >
                        <Box cursor="pointer" as={FaQuestionCircle}></Box>
                    </Tooltip>
                </RadioCard.Label>
                <HStack key="filedisign" name="filedisign" value={formData.filedisign || "برد تک"} onChange={(value) => handlechange("filedisign", value)}>
                    {items.map((item) => (
                        <RadioCard.Item height="88px" _hover={{ boxShadow: "md" }} transitionDuration="300ms" cursor="pointer" onClick={() => setSelectedValue(item.value)} key={item.value} value={item.value} colorPalette="blue">
                            <RadioCard.ItemHiddenInput />
                            <RadioCard.ItemControl>
                                {selectedValue === item.value && (
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
                                <Image src={item.src} />
                                <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
                            </RadioCard.ItemControl>
                        </RadioCard.Item>
                    ))}
                </HStack>
            </RadioCard.Root>
            
            <SimpleGrid columns={[1, null, 6]} gap="6">
                <GridItem colSpan={[1, null, 3]}>
                    <RadioCard.Root
                        orientation="vertical"
                        align="center"
                        defaultValue="1"
                        paddingY="20px"
                        maxW="550px"
                        dir="rtl"
                        disabled={isInputFilled}
                    >
                        <RadioCard.Label dir="rtl">تعداد طرح ؟</RadioCard.Label>
                        <HStack key="countdisign" name="countdisign" value={formData.countdisign || "1"} onChange={(value) => handlechange("countdisign", value)} spacing={3} wrap="wrap" justify="center">
                            {numbers.map((item) => (
                                <RadioCard.Item _hover={{ boxShadow: "md" }} transitionDuration="300ms" cursor="pointer" onClick={() => setSelectedValueTwo(item.value)} key={item.value} value={item.value} colorPalette="blue">
                                    <RadioCard.ItemHiddenInput />
                                    <RadioCard.ItemControl>
                                        {selectedValueTwo === item.value && (
                                            <RadioCard.ItemIndicator
                                                as={FaCheck}
                                                color=""
                                                position="absolute"
                                                borderWidth="2px"
                                                borderColor="gray.400"
                                                bottom="-6px"
                                                left="-6px"
                                                padding="3px"
                                                display={isInputFilled ? "none" : ""}
                                            />
                                        )}
                                        <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
                                    </RadioCard.ItemControl>
                                </RadioCard.Item>
                            ))}
                        </HStack>
                    </RadioCard.Root>
                </GridItem>
                <GridItem marginY="auto" colSpan={[1, null, 2]}>
                    <Field.Root width="full" sm={{ width: "220px" }}>
                        <Field.Label>
                            تعداد طرح دلخواه را وارد کنید
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <Input backgroundColor="white" min={1} type="number" key="countdisignnumber" name="countdisignnumber" value={formData.countdisignnumber || ""} onChange={(e)=>{handlechangeInput(e);handlechangeInputFile(e);}} height="44px" />
                    </Field.Root>
                </GridItem>
            </SimpleGrid>

            <RadioCard.Root
                orientation="vertical"
                align="center"
                maxW="740px"
                defaultValue="FR-4"
                paddingY="20px"
                dir="rtl"
            >
                <RadioCard.Label dir="rtl">جنس برد :
                    <Tooltip
                        content="جنس برد را وارد کنید"
                        positioning={{ placement: "top" }}
                        openDelay={100}
                        closeDelay={100}
                        contentProps={{ css: { "--tooltip-bg": "white", "color": "black" } }}
                        showArrow
                    >
                        <Box cursor="pointer" as={FaQuestionCircle}></Box>
                    </Tooltip>
                </RadioCard.Label>
                <HStack key="boardmaterial" name="boardmaterial" value={formData.boardmaterial || "FR-4"} onChange={(value) => handlechange("boardmaterial", value)} spacing={3} wrap="wrap" justify="center">
                    {material.map((item) => (
                        <RadioCard.Item _hover={{ boxShadow: "md" }} transitionDuration="300ms" cursor="pointer" onClick={() => setSelectedValueThree(item.value)} height="90px" key={item.value} value={item.value} colorPalette="blue">
                            <RadioCard.ItemHiddenInput />
                            <RadioCard.ItemControl>
                                {selectedValueThree === item.value && (
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