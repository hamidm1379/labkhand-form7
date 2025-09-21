"use client"

import { useState, useEffect } from 'react';

import { Field, SimpleGrid, Input, Image, HStack, GridItem, RadioCard, Box } from "@chakra-ui/react"
import { FaCheck } from "react-icons/fa";
import { Tooltip } from "../../components/ui/tooltip"

import BoardThickImage from "../../image/boardThick.png";
import { FaQuestionCircle } from 'react-icons/fa';
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


const NumberThickness = ({ formData, setFormData }) => {
    const [selectedValue, setSelectedValue] = useState(boardThickness[6]?.value);
    const [selectedValueTwo, setSelectedValueTwo] = useState(layers[0]?.value);
    const [selectedValueThree, setSelectedValueThree] = useState(copperThickness[0]?.value);
    const [isInputFilled, setIsInputFilled] = useState(false);
    const [isInputFilledSec, setIsInputFilledSec] = useState(false);
    const [isInputFilledThird, setIsInputFilledThird] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (!isInitialized) {
            setSelectedValueTwo(formData.countlayer || layers[0]?.value);
            setSelectedValue(formData.boardthickness || boardThickness[6]?.value);
            setSelectedValueThree(formData.copperthickness || copperThickness[0]?.value);
            
            const hasCustomLayer = formData.countlayernumber && formData.countlayernumber.trim() !== "";
            const hasCustomBoard = formData.boardthicknessnumber && formData.boardthicknessnumber.trim() !== "";
            const hasCustomCopper = formData.copperthicknessnumber && formData.copperthicknessnumber.trim() !== "";
            
            setIsInputFilled(hasCustomLayer);
            setIsInputFilledSec(hasCustomBoard);
            setIsInputFilledThird(hasCustomCopper);
            
            if (hasCustomLayer) setSelectedValueTwo(null);
            if (hasCustomBoard) setSelectedValue(null);
            if (hasCustomCopper) setSelectedValueThree(null);
            
            setIsInitialized(true);
        }
    }, [formData, isInitialized]);

    useEffect(() => {
        if (isInitialized) {
            const hasCustomLayer = formData.countlayernumber && formData.countlayernumber.trim() !== "";
            setIsInputFilled(hasCustomLayer);
            
            if (hasCustomLayer && selectedValueTwo !== null) {
                setSelectedValueTwo(null);
            } else if (!hasCustomLayer && selectedValueTwo === null) {
                setSelectedValueTwo(layers[0]?.value);
                setFormData(prev => ({ ...prev, countlayer: layers[0]?.value }));
            }
        }
    }, [formData.countlayernumber, isInitialized]);

    useEffect(() => {
        if (isInitialized) {
            const hasCustomBoard = formData.boardthicknessnumber && formData.boardthicknessnumber.trim() !== "";
            setIsInputFilledSec(hasCustomBoard);
            
            if (hasCustomBoard && selectedValue !== null) {
                setSelectedValue(null);
            } else if (!hasCustomBoard && selectedValue === null) {
                setSelectedValue(boardThickness[6]?.value);
                setFormData(prev => ({ ...prev, boardthickness: boardThickness[6]?.value }));
            }
        }
    }, [formData.boardthicknessnumber, isInitialized]);

    useEffect(() => {
        if (isInitialized) {
            const hasCustomCopper = formData.copperthicknessnumber && formData.copperthicknessnumber.trim() !== "";
            setIsInputFilledThird(hasCustomCopper);
            
            if (hasCustomCopper && selectedValueThree !== null) {
                setSelectedValueThree(null);
            } else if (!hasCustomCopper && selectedValueThree === null) {
                setSelectedValueThree(copperThickness[0]?.value);
                setFormData(prev => ({ ...prev, copperthickness: copperThickness[0]?.value }));
            }
        }
    }, [formData.copperthicknessnumber, isInitialized]);

    const handleRadioClickLayer = (value) => {
        if (!isInputFilled) {
            setSelectedValueTwo(value);
            setFormData(prev => ({ ...prev, countlayer: value }));
        }
    };

    const handleRadioClickBoard = (value) => {
        if (!isInputFilledSec) {
            setSelectedValue(value);
            setFormData(prev => ({ ...prev, boardthickness: value }));
        }
    };

    const handleRadioClickCopper = (value) => {
        if (!isInputFilledThird) {
            setSelectedValueThree(value);
            setFormData(prev => ({ ...prev, copperthickness: value }));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <SimpleGrid columns={[1, null, 6]} gap="6">
                <GridItem colSpan={[1, null, 3]}>
                    <RadioCard.Root
                        orientation="vertical"
                        align="center"
                        maxW="460px"
                        paddingY="20px"
                        dir="rtl"
                        defaultValue={2}
                        disabled={isInputFilled}
                    >
                        <RadioCard.Label dir="rtl">تعداد لایه ها :
                            <Tooltip
                                content="تعداد لایه را وارد کنید"
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
                            {layers.map((item) => (
                                <RadioCard.Item 
                                    _hover={!isInputFilled ? { boxShadow: "md" } : {}} 
                                    transitionDuration="300ms" 
                                    cursor={isInputFilled ? "not-allowed" : "pointer"} 
                                    onClick={() => handleRadioClickLayer(item.value)} 
                                    key={item.value} 
                                    value={item.value} 
                                    colorPalette="blue"
                                    opacity={isInputFilled ? 0.5 : 1}
                                >
                                    <RadioCard.ItemHiddenInput />
                                    <RadioCard.ItemControl position="relative">
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
                            تعداد لایه دلخواه را وارد کنید
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <Input 
                            backgroundColor="white" 
                            min={1} 
                            height="44px" 
                            type="number" 
                            name="countlayernumber" 
                            value={formData.countlayernumber || ""} 
                            onChange={handleInputChange} 
                        />
                    </Field.Root>
                </GridItem>
            </SimpleGrid>

            <SimpleGrid columns={[1, 2, 6]} gap="6">
                <GridItem colSpan={[1, 1, 3]}>
                    <RadioCard.Root
                        orientation="vertical"
                        align="center"
                        maxW="550px"
                        paddingY="20px"
                        dir="rtl"
                        defaultValue={1.6}
                        disabled={isInputFilledSec}
                    >
                        <RadioCard.Label dir="rtl">ضخامت برد :
                            <Tooltip
                                content="ضخامت برد را وارد کنید"
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
                            {boardThickness.map((item) => (
                                <RadioCard.Item 
                                    _hover={!isInputFilledSec ? { boxShadow: "md" } : {}} 
                                    transitionDuration="300ms" 
                                    cursor={isInputFilledSec ? "not-allowed" : "pointer"} 
                                    onClick={() => handleRadioClickBoard(item.value)} 
                                    key={item.value} 
                                    value={item.value} 
                                    colorPalette="blue"
                                    opacity={isInputFilledSec ? 0.5 : 1}
                                >
                                    <RadioCard.ItemHiddenInput />
                                    <RadioCard.ItemControl position="relative">
                                        {selectedValue === item.value && !isInputFilledSec && (
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
                <GridItem marginY="auto" colSpan={[1, 1, 1]}>
                    <Field.Root width="full" sm={{ width: "220px" }}>
                        <Field.Label>
                            ضخامت برد دلخواه را وارد کنید
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <Input 
                            backgroundColor="white" 
                            min={1} 
                            height="44px" 
                            type="number" 
                            name="boardthicknessnumber" 
                            value={formData.boardthicknessnumber || ""} 
                            onChange={handleInputChange} 
                        />
                    </Field.Root>
                </GridItem>
                <GridItem margin="auto" colSpan={[1, 1, 2]}>
                    <Image marginTop="24px" marginX="auto" width="200px" height="50px" src={BoardThickImage} />
                </GridItem>
            </SimpleGrid>

            <SimpleGrid columns={[1, null, 6]} gap="6">
                <GridItem colSpan={[1, 1, 3]}>
                    <RadioCard.Root
                        orientation="vertical"
                        align="center"
                        paddingY="20px"
                        maxW="130px"
                        dir="rtl"
                        defaultValue="1oz"
                        disabled={isInputFilledThird}
                    >
                        <RadioCard.Label dir="rtl">ضخامت مس :
                            <Tooltip
                                content="ضخامت مس را وارد کنید"
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
                            {copperThickness.map((item) => (
                                <RadioCard.Item 
                                    width="60px" 
                                    _hover={!isInputFilledThird ? { boxShadow: "md" } : {}} 
                                    transitionDuration="300ms" 
                                    cursor={isInputFilledThird ? "not-allowed" : "pointer"} 
                                    onClick={() => handleRadioClickCopper(item.value)} 
                                    key={item.value} 
                                    value={item.value} 
                                    colorPalette="blue"
                                    opacity={isInputFilledThird ? 0.5 : 1}
                                >
                                    <RadioCard.ItemHiddenInput />
                                    <RadioCard.ItemControl>
                                        {selectedValueThree === item.value && !isInputFilledThird && (
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
                <GridItem marginY="auto" colSpan={1}>
                    <Field.Root width="full" sm={{ width: "220px" }}>
                        <Field.Label>
                            ضخامت مس دلخواه را وارد کنید
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <Input 
                            backgroundColor="white" 
                            min={1} 
                            height="44px" 
                            type="number" 
                            name="copperthicknessnumber" 
                            value={formData.copperthicknessnumber || ""} 
                            onChange={handleInputChange} 
                        />
                    </Field.Root>
                </GridItem>
                <GridItem margin="auto" colSpan={2}>
                    <Image marginTop="24px" marginX="auto" width="200px" height="50px" src={coppThickImage} />
                </GridItem>
            </SimpleGrid>
        </>
    )
}
export default NumberThickness;