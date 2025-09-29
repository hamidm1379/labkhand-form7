"use client"

import { useState, useEffect } from "react";

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
import RigidFlexImage from "../../image/Rigid-Flex.jpg"

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
    { value: "Rogers", title: "Rogers", src: RogersImage },
    { value: "Flex", title: "Flex", src: FlexImage },
    { value: "Rigid-Flex", title: "Rigid-Flex", src: RigidFlexImage },
    { value: "PTFE Teflon", title: "PTFE Teflon", src: PTFEImage },
    { value: "Copper Core", title: "Copper Core", src: copperImage },
]

export default function DesignQuantityType({ formData, setFormData }) {
    const [selectedValue, setSelectedValue] = useState("");
    const [selectedValueTwo, setSelectedValueTwo] = useState("");
    const [selectedValueThree, setSelectedValueThree] = useState("");
    const [isInputFilled, setIsInputFilled] = useState(false);

    useEffect(() => {
        setSelectedValue(formData.filedisign || items[0]?.value);
        
        setSelectedValueThree(formData.boardmaterial || material[0]?.value);
        
        const hasCustomNumber = formData.countdisignnumber && formData.countdisignnumber.trim() !== "";
        setIsInputFilled(hasCustomNumber);
        
        if (hasCustomNumber) {
            setSelectedValueTwo("");
        } else {
            setSelectedValueTwo(formData.countdisign || numbers[0]?.value);
        }
    }, []);

    useEffect(() => {
        const hasCustomNumber = formData.countdisignnumber && formData.countdisignnumber.trim() !== "";
        setIsInputFilled(hasCustomNumber);
        
        if (hasCustomNumber) {
            setSelectedValueTwo("");
        } else if (!hasCustomNumber && selectedValueTwo === "") {
            setSelectedValueTwo(numbers[0]?.value);
            setFormData({ ...formData, countdisign: numbers[0]?.value });
        }
    }, [formData.countdisignnumber]);

    const handleRadioFileDesign = (value) => {
        setSelectedValue(value);
        setFormData({ ...formData, filedisign: value });
    };

    const handleRadioClick = (value) => {
        if (!isInputFilled) {
            setSelectedValueTwo(value);
            setFormData({ ...formData, countdisign: value });
        }
    };

    const handleRadioBoardMaterial = (value) => {
        setSelectedValueThree(value);
        setFormData({ ...formData, boardmaterial: value });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
            <RadioCard.Root
                orientation="vertical"
                align="center"
                maxW="220px"
                value={selectedValue}
                paddingY="20px"
                dir="rtl"
            >
                <RadioCard.Label dir="rtl">طرح فایل :
                    <Tooltip
                        content="طرح فایل را وارد کنید"
                        positioning={{ placement: "top" }}
                        openDelay={100}
                        closeDelay={100}
                        contentProps={{ css: { "--tooltip-bg": "white", "color": "black" } }}
                        showArrow
                    >
                        <Box cursor="pointer" as={FaQuestionCircle}></Box>
                    </Tooltip>
                </RadioCard.Label>
                <HStack spacing={3}>
                    {items.map((item) => (
                        <RadioCard.Item 
                            height="88px" 
                            _hover={{ boxShadow: "md" }} 
                            transitionDuration="300ms" 
                            cursor="pointer" 
                            onClick={() => handleRadioFileDesign(item.value)} 
                            key={item.value} 
                            value={item.value} 
                            colorPalette="blue"
                        >
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
                        value={isInputFilled ? "" : selectedValueTwo}
                        paddingY="20px"
                        maxW="550px"
                        dir="rtl"
                        disabled={isInputFilled}
                    >
                        <RadioCard.Label dir="rtl">تعداد طرح :
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
                        <HStack spacing={3} wrap="wrap" justify="center">
                            {numbers.map((item) => (
                                <RadioCard.Item 
                                    _hover={!isInputFilled ? { boxShadow: "md" } : {}} 
                                    transitionDuration="300ms" 
                                    cursor={isInputFilled ? "not-allowed" : "pointer"} 
                                    onClick={() => handleRadioClick(item.value)} 
                                    key={item.value} 
                                    value={item.value} 
                                    colorPalette="blue"
                                    opacity={isInputFilled ? 0.5 : 1}
                                >
                                    <RadioCard.ItemHiddenInput />
                                    <RadioCard.ItemControl>
                                        {selectedValueTwo === item.value && !isInputFilled && (
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
                        <Input 
                            backgroundColor="white" 
                            min={1} 
                            type="number" 
                            name="countdisignnumber" 
                            value={formData.countdisignnumber || ""} 
                            onChange={handleInputChange} 
                            height="44px" 
                        />
                    </Field.Root>
                </GridItem>
            </SimpleGrid>
            <RadioCard.Root
                orientation="vertical"
                align="center"
                maxW="740px"
                value={selectedValueThree}
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
                <HStack spacing={3} wrap="wrap" justify="center">
                    {material.map((item) => (
                        <RadioCard.Item 
                            _hover={{ boxShadow: "md" }} 
                            transitionDuration="300ms" 
                            cursor="pointer" 
                            onClick={() => handleRadioBoardMaterial(item.value)} 
                            height="90px" 
                            key={item.value} 
                            value={item.value} 
                            colorPalette="blue"
                        >
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
                                <Image width="100%" height="35px" src={item.src} />
                                <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
                            </RadioCard.ItemControl>
                        </RadioCard.Item>
                    ))}
                </HStack>
            </RadioCard.Root>
        </>
    )
}