"use client"

import { useState } from 'react';

import { Field, SimpleGrid, Input, Image, HStack, GridItem, RadioCard } from "@chakra-ui/react"
import { FaCheck } from "react-icons/fa";

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


const NumberThickness = ({ formData, setFormData }) => {
    const [selectedValue, setSelectedValue] = useState(boardThickness[0]?.value);
    const [selectedValueTwo, setSelectedValueTwo] = useState(layers[0]?.value);
    const [selectedValueThree, setSelectedValueThree] = useState(copperThickness[0]?.value);

    const handlechange = (key, value) => {
        setFormData({ ...formData, [key]: value.target.value });
    };

    const handlechangeInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <SimpleGrid columns={[1, null, 6]} gap="6">
                <GridItem colSpan={[1, null, 3]}>
                    <RadioCard.Root
                        orientation="vertical"
                        align="center"
                        defaultValue={2}
                        maxW="460px"
                        paddingY="20px"
                        dir="rtl"
                    >
                        <RadioCard.Label dir="rtl">تعداد لایه ها :</RadioCard.Label>
                        <HStack key="countlayer" name="countlayer" value={formData.countlayer || "2"} onChange={(value) => handlechange("countlayer", value)} spacing={3} wrap="wrap" justify="center">
                            {layers.map((item) => (
                                <RadioCard.Item _hover={{ boxShadow: "md" }} transitionDuration="300ms" cursor="pointer" onClick={() => setSelectedValueTwo(item.value)} key={item.value} value={item.value} colorPalette="blue">
                                    <RadioCard.ItemHiddenInput />
                                    <RadioCard.ItemControl position="relative">
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
                        <Input height="44px" type="number" key="countlayernumber" name="countlayernumber" value={formData.countlayernumber || ""} onChange={handlechangeInput}/>
                    </Field.Root>
                </GridItem>
            </SimpleGrid>

            <SimpleGrid columns={[1, 2, 6]} gap="6">
                <GridItem colSpan={[1, 1, 3]}>
                    <RadioCard.Root
                        orientation="vertical"
                        align="center"
                        defaultValue={0.4}
                        maxW="550px"
                        paddingY="20px"
                        dir="rtl"
                    >
                        <RadioCard.Label dir="rtl">ضخامت برد :</RadioCard.Label>
                        <HStack key="boardthickness" name="boardthickness" value={formData.boardthickness || "1"} onChange={(value) => handlechange("boardthickness", value)} spacing={3} wrap="wrap" justify="center">
                            {boardThickness.map((item) => (
                                <RadioCard.Item _hover={{ boxShadow: "md" }} transitionDuration="300ms" cursor="pointer" onClick={() => setSelectedValue(item.value)} key={item.value} value={item.value} colorPalette="blue">
                                    <RadioCard.ItemHiddenInput />
                                    <RadioCard.ItemControl position="relative">
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
                        <Input height="44px" type="number" key="boardthicknessnumber" name="boardthicknessnumber" value={formData.boardthicknessnumber || ""} onChange={handlechangeInput}/>
                    </Field.Root>
                </GridItem>
                <GridItem margin="auto" colSpan={[1, 1, 2]}>
                    <Image margin="auto" width="220px" height="50px" src={BoardThickImage} />
                </GridItem>
            </SimpleGrid>

            <SimpleGrid columns={[1, null, 6]} gap="6">
                <GridItem colSpan={[1, 1, 3]}>
                    <RadioCard.Root
                        orientation="vertical"
                        align="center"
                        defaultValue="1oz"
                        paddingY="20px"
                        maxW="130px"
                        dir="rtl"
                    >
                        <RadioCard.Label dir="rtl">ضخامت مس :</RadioCard.Label>
                        <HStack key="copperthickness" name="copperthickness" value={formData.copperthickness || "1oz"} onChange={(value) => handlechange("copperthickness", value)} spacing={3} wrap="wrap" justify="center">
                            {copperThickness.map((item) => (
                                <RadioCard.Item width="60px" _hover={{ boxShadow: "md" }} transitionDuration="300ms" cursor="pointer" onClick={() => setSelectedValueThree(item.value)} key={item.value} value={item.value} colorPalette="blue">
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
                        <Input height="44px" type="number" key="copperthicknessnumber" name="copperthicknessnumber" value={formData.copperthicknessnumber || ""} onChange={handlechangeInput} />
                    </Field.Root>
                </GridItem>
                <GridItem margin="auto" colSpan={2}>
                    <Image margin="auto" width="220px" height="50px" src={coppThickImage} />
                </GridItem>
            </SimpleGrid>
        </>
    )
}
export default NumberThickness;