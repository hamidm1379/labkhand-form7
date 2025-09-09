import { Field, Textarea, HStack, Text, Button, FileUpload,Link } from "@chakra-ui/react"

import { HiUpload } from "react-icons/hi"

const Upload = () => {
    return (
        <>
            <Text>
                فایل برد :
            </Text>

            <FileUpload.Root dir="rtl" accept={["image/*", "application/zip"]}>
                <FileUpload.HiddenInput />
                <FileUpload.Trigger asChild>
                    <Button variant="outline" size="sm">
                        <HiUpload /> Upload file
                    </Button>
                </FileUpload.Trigger>
                <FileUpload.List />
            </FileUpload.Root>
            <Text fontSize="14px" color="gray" paddingTop="5px" paddingBottom="20px">
                انواع فایل های مجاز : zip, pcbdoc, gerbar, حداکثر اندازه فایل: 30 MB.
            </Text>

            <Field.Root>
                <Field.Label>توضیحات :</Field.Label>
                <Textarea minH="200px" placeholder="توضیحات :" />
            </Field.Root>

            <HStack paddingY="20px">
                <Button colorPalette="blue" variant="solid">
                    <Link color="white" href="/register">بعدی</Link>
                </Button>
            </HStack>
        </>
    )
}
export default Upload;