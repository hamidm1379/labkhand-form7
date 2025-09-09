"use client"

import { useState } from 'react';

import { Field, SimpleGrid, Box, Input, ColorSwatch, HStack, GridItem, RadioCard, Text } from "@chakra-ui/react"
import { FaCheck } from "react-icons/fa";

import { Tooltip } from "../../components/ui/tooltip"
import { FaExclamationCircle } from 'react-icons/fa';

const boardColor = [
    { value: "سبز", title: "سبز", color: "green" },
    { value: "سفید", title: "سفید", color: "white" },
    { value: "مشکی", title: "مشکی", color: "black" },
    { value: "قرمز", title: "قرمز", color: "red" },
    { value: "آبی", title: "آبی", color: "blue" },
    { value: "زرد", title: "زرد", color: "yellow" },
    { value: "بنفش", title: "بنفش", color: "purple" }
]

const guideColor = [
    { value: "سفید", title: "سفید", color: "white" },
    { value: "مشکی", title: "مشکی", color: "black" },
    { value: "بی رنگ", title: "بی رنگ", color: "gray" }
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
    const [selectedValue, setSelectedValue] = useState(boardColor[0]?.value);
    const [selectedValueTwo, setSelectedValueTwo] = useState(guideColor[0]?.value);
    const [selectedValueThree, setSelectedValueThree] = useState(finalCover[0]?.value);
    const [selectedValueFour, setSelectedValueFour] = useState(boardcut[0]?.value);
    const [selectedValueFive, setSelectedValueFive] = useState(stasil[0]?.value);

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
                <RadioCard.Label dir="rtl">رنگ برد (سولدر) :
                    <Tooltip
                        content="رنگ برد را وارد کنید"
                        positioning={{ placement: "top" }}
                        openDelay={100}
                        closeDelay={100}
                        contentProps={{ css: { "--tooltip-bg": "white", "color": "black" } }}
                        showArrow
                    >
                        <Box cursor="pointer" as={FaExclamationCircle}></Box>
                    </Tooltip>
                </RadioCard.Label>
                <HStack spacing={3} wrap="wrap" justify="center">
                    {boardColor.map((item) => (
                        <RadioCard.Item _hover={{ boxShadow: "md" }} transitionDuration="300ms" cursor="pointer" onClick={() => setSelectedValue(item.value)} key={item.value} value={item.value} colorPalette="blue">
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
                                <ColorSwatch key={item.value} value={item.color} width="20px" height="20px" />
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
                <RadioCard.Label dir="rtl">رنگ چاپ راهنما :
                    <Tooltip
                        content="رنگ راهنما را وارد کنید"
                        positioning={{ placement: "top" }}
                        openDelay={100}
                        closeDelay={100}
                        contentProps={{ css: { "--tooltip-bg": "white", "color": "black" } }}
                        showArrow
                    >
                        <Box cursor="pointer" as={FaExclamationCircle}></Box>
                    </Tooltip>
                </RadioCard.Label>
                <HStack>
                    {guideColor.map((item) => (
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
                                    />
                                )}
                                <ColorSwatch key={item.value} value={item.color} width="20px" height="20px" />
                                <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
                            </RadioCard.ItemControl>
                        </RadioCard.Item>
                    ))}
                </HStack>
            </RadioCard.Root>

            <SimpleGrid columns={[1, null, 5]} gap="6">
                <GridItem colSpan={[1, null, 3]}>
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
                                <RadioCard.Item _hover={{ boxShadow: "md" }} transitionDuration="300ms" cursor="pointer" onClick={() => setSelectedValueThree(item.value)} key={item.value} value={item.value} colorPalette="blue">
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
                <GridItem marginY="auto" colSpan={[1, null, 2]}>
                    <Field.Root width="full" sm={{ width: "220px" }}>
                        <Field.Label>
                            پوشش نهایی دلخواه را وارد کنید
                            <Field.RequiredIndicator />
                            <Tooltip
                                content="پوشش"
                                positioning={{ placement: "top" }}
                                openDelay={100}
                                closeDelay={100}
                                contentProps={{ css: { "--tooltip-bg": "white", "color": "black" } }}
                                showArrow
                            >
                                <Box cursor="pointer" as={FaExclamationCircle}></Box>
                            </Tooltip>
                        </Field.Label>
                        <Input height="44px" placeholder="تعداد" />
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
                    <RadioCard.Label dir="rtl">برش برد :
                        <Tooltip
                            content="برش"
                            positioning={{ placement: "top" }}
                            openDelay={100}
                            closeDelay={100}
                            contentProps={{ css: { "--tooltip-bg": "white", "color": "black" } }}
                            showArrow
                        >
                            <Box cursor="pointer" as={FaExclamationCircle}></Box>
                        </Tooltip>
                    </RadioCard.Label>
                    <HStack>
                        {boardcut.map((item) => (
                            <RadioCard.Item _hover={{ boxShadow: "md" }} transitionDuration="300ms" cursor="pointer" key={item.value} value={item.value} colorPalette="blue">
                                <RadioCard.ItemHiddenInput />
                                <RadioCard.ItemControl onClick={() => setSelectedValueFour(item.value)}>
                                    {selectedValueFour === item.value && (
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

                <RadioCard.Root
                    orientation="vertical"
                    align="center"
                    defaultValue="yes"
                    paddingY="20px"
                    maxW="200px"
                    dir="rtl"
                >
                    <RadioCard.Label dir="rtl">استنسیل :
                        <Tooltip
                            content="استنسیل"
                            positioning={{ placement: "top" }}
                            openDelay={100}
                            closeDelay={100}
                            contentProps={{ css: { "--tooltip-bg": "white", "color": "black" } }}
                            showArrow
                        >
                            <Box cursor="pointer" as={FaExclamationCircle}></Box>
                        </Tooltip>
                    </RadioCard.Label>
                    <HStack>
                        {stasil.map((item) => (
                            <RadioCard.Item _hover={{ boxShadow: "md" }} transitionDuration="300ms" cursor="pointer" key={item.value} value={item.value} colorPalette="blue">
                                <RadioCard.ItemHiddenInput />
                                <RadioCard.ItemControl onClick={() => setSelectedValueFive(item.value)}>
                                    {selectedValueFive === item.value && (
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
            </SimpleGrid>

            <Text color="gray" fontSize="16px" paddingBottom="20px">
                تست الکتریکال دارد. (رایگان)
            </Text>
        </>
    )
}
export default Colors;