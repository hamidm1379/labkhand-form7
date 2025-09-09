import { useState } from 'react';
import { Field, SimpleGrid,RadioCard, HStack, Button, Link, Box, Input, Badge, Text, Select, Portal, Textarea, createListCollection } from "@chakra-ui/react"
import { FaCheck } from "react-icons/fa";
import { Container } from "@chakra-ui/react"

const frameworks = createListCollection({
    items: [
        { label: "React.js", value: "react" },
        { label: "Vue.js", value: "vue" },
        { label: "Angular", value: "angular" },
        { label: "Svelte", value: "svelte" },
    ],
})

const stasil = [
    { value: "yes", title: "بله" },
    { value: "no", title: "خیر" }
]

function Register() {
    const [selectedValueFive, setSelectedValueFive] = useState(stasil[0]?.value);
    return (
        <Container dir="rtl" maxW="6xl" backgroundColor="gray.50" marginY="20px" borderRadius="20px">
            <Box paddingY="40px" fontSize="23px">
                فرم سفارش برد مدار چاپی (PCB)
            </Box>
            <SimpleGrid columns={[1, null, 2]} gap="6">
                <Field.Root width="full" invalid>
                    <Field.Label>
                        نام  :
                        <Field.RequiredIndicator
                            fallback={
                                <>
                                    <Badge size="xs" color="red" backgroundColor="gray.50">
                                        (ضروری)
                                    </Badge>
                                </>
                            }
                        />
                    </Field.Label>
                    <Input height="44px" placeholder="نام " />
                    <Field.ErrorText>
                        نام به درستی وارد نشده.
                    </Field.ErrorText>
                </Field.Root>

                <Field.Root width="full">
                    <Field.Label>
                        نام خانوادگی:
                        <Field.RequiredIndicator
                            fallback={
                                <>
                                    <Badge size="xs" color="red" backgroundColor="gray.50">
                                        (ضروری)
                                    </Badge>

                                </>
                            }
                        />
                    </Field.Label>
                    <Input height="44px" placeholder="نام خانوادگی" />
                </Field.Root>

            </SimpleGrid>
            <Field.Root width="full" marginTop="10px">
                <Field.Label>
                    نام شرکت :
                    <Field.RequiredIndicator
                        fallback={
                            <>
                                <Badge size="xs" color="red" backgroundColor="gray.50">
                                    (ضروری)
                                </Badge>

                            </>
                        }
                    />
                </Field.Label>
                <Input height="44px" placeholder="نام شرکت" />
                <Field.ErrorText>
                    نام به درستی وارد نشده.
                </Field.ErrorText>
            </Field.Root>

            <Field.Root width="full" marginTop="10px">
                <Field.Label>
                    آدرس:
                    <Field.RequiredIndicator
                        fallback={
                            <>
                                <Badge size="xs" color="red" backgroundColor="gray.50">
                                    (ضروری)
                                </Badge>
                            </>
                        }
                    />
                </Field.Label>
                <Text width="full" fontSize="14px" color="gray.600">خیابان ، کوچه ، پلاک ، واحد و ... : (ضروری)</Text>

                <Input height="44px" placeholder="آدرس" />
                <Field.ErrorText>
                    نام به درستی وارد نشده.
                </Field.ErrorText>
            </Field.Root>

            <SimpleGrid columns={[1, null, 2]} gap="6" marginTop="10px">
                <Select.Root collection={frameworks}>
                    <Select.HiddenSelect />
                    <Select.Label color="gray.600" dir="rtl">شهر : (ضروری)</Select.Label>
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="شهر" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content>
                                {frameworks.items.map((framework) => (
                                    <Select.Item item={framework} key={framework.value}>
                                        {framework.label}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>
                <Select.Root collection={frameworks}>
                    <Select.HiddenSelect />
                    <Select.Label color="gray.600" dir="rtl">استان : (ضروری)</Select.Label>
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="استان" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content>
                                {frameworks.items.map((framework) => (
                                    <Select.Item item={framework} key={framework.value}>
                                        {framework.label}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>
                <Field.Root width="full" marginTop="10px">
                    <Field.Label>
                        کدپستی :
                        <Field.RequiredIndicator
                            fallback={
                                <>
                                    <Badge size="xs" color="red" backgroundColor="gray.50">
                                        (ضروری)
                                    </Badge>

                                </>
                            }
                        />
                    </Field.Label>
                    <Input height="44px" placeholder="کد پستی" />
                    <Field.ErrorText>
                        نام به درستی وارد نشده.
                    </Field.ErrorText>
                </Field.Root>
                <Field.Root width="full" marginTop="10px">
                    <Field.Label>
                        ایمیل :
                        <Field.RequiredIndicator
                            fallback={
                                <>
                                    <Badge size="xs" color="red" backgroundColor="gray.50">
                                        (ضروری)
                                    </Badge>

                                </>
                            }
                        />
                    </Field.Label>
                    <Input height="44px" placeholder="ایمیل" />
                    <Field.ErrorText>
                        نام به درستی وارد نشده.
                    </Field.ErrorText>
                </Field.Root>
                <Field.Root width="full" marginTop="10px">
                    <Field.Label>
                        شماره ثابت :
                        <Field.RequiredIndicator
                            fallback={
                                <>
                                    <Badge size="xs" color="red" backgroundColor="gray.50">
                                        (ضروری)
                                    </Badge>

                                </>
                            }
                        />
                    </Field.Label>
                    <Input height="44px" placeholder="شماره ثابت" />
                    <Field.ErrorText>
                        نام به درستی وارد نشده.
                    </Field.ErrorText>
                </Field.Root>
                <Field.Root width="full" marginTop="10px">
                    <Field.Label>
                        شماره موبایل :
                        <Field.RequiredIndicator
                            fallback={
                                <>
                                    <Badge size="xs" color="red" backgroundColor="gray.50">
                                        (ضروری)
                                    </Badge>

                                </>
                            }
                        />
                    </Field.Label>
                    <Input height="44px" placeholder="شماره موبایل" />
                    <Field.ErrorText>
                        نام به درستی وارد نشده.
                    </Field.ErrorText>
                </Field.Root>
            </SimpleGrid>

            <Field.Root marginTop="10px">
                <Field.Label>توضیحات سفارش :</Field.Label>
                <Textarea minH="200px" placeholder="توضیحات سفارش" />
            </Field.Root>

            <RadioCard.Root
                orientation="vertical"
                align="center"
                defaultValue="yes"
                paddingY="20px"
                maxW="200px"
                dir="rtl"
            >
                <RadioCard.Label dir="rtl">حمل و نقل به آدرس متفاوت :</RadioCard.Label>
                <HStack width="150px">
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

            <HStack paddingY="20px">
                <Button colorPalette="blue" variant="solid">
                    <Link color="white" href="/">قبلی</Link>
                </Button>
                <Button colorPalette="blue" variant="solid">
                    ارسال
                </Button>
            </HStack>

        </Container>
    );
}

export default Register;
