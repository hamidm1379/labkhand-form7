import Fields from "../components/form/Fields"
import DesignQuantityType from "../components/form/DesignQuantityType";
import NumberThickness from "../components/form/NumberThickness";
import Colors from "../components/form/Colors";
import UploadPCBA from "../components/form/UploadPCBA";

import { Container, HStack, Button, Box } from "@chakra-ui/react"

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

function HomePCBA() {

    const [pageOneData, setPageOneData] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
    }, []);

    useEffect(() => {
        const savedData = localStorage.getItem("pageOneData");
        if (savedData) {
            const parsed = JSON.parse(savedData);
            setPageOneData({
                ...parsed,
                pagename: "PCBA",
                filedisign: "برد تک",
                countdisign: "1",
                boardmaterial: "FR-4",
                countlayer: "2",
                boardthickness: "0.4",
                copperthickness: "1oz",
                boardcolor: "سبز",
                guidecolor: "سفید",
                finalcover: "HASL",
                boardcut: "CNC",
                stansil: "بله",
                boardfile: null,
                BOMfile: null,
                montage: "بله"
            });
        } else {
            setPageOneData({
                pagename: "PCBA",
                filedisign: "برد تک",
                countdisign: "1",
                boardmaterial: "FR-4",
                countlayer: "2",
                boardthickness: "0.4",
                copperthickness: "1oz",
                boardcolor: "سبز",
                guidecolor: "سفید",
                finalcover: "HASL",
                boardcut: "CNC",
                stansil: "بله",
                boardfile: null,
                BOMfile: null,
                montage: "بله"
            });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("pageOneData", JSON.stringify(pageOneData));
    }, [pageOneData]);


    const goNext = () => {

        window.scrollTo({ top: 0, behavior: 'smooth' });

        const { productname, countproduct, width, length, boardfile, BOMfile } = pageOneData;
        let newErrors = {};

        if (!productname) newErrors.productname = "نام";
        if (!countproduct) newErrors.countproduct = "تعداد";
        if (!width) newErrors.width = "تعداد";
        if (!length) newErrors.length = "تعداد";
        if (!boardfile) newErrors.boardfile = "تعداد";
        if (!BOMfile) newErrors.BOMfile = "تعداد";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            navigate("/register");
        }
    };

    return (
        <Container dir="rtl" maxW="6xl" backgroundColor="gray.50" marginY="20px" borderRadius="20px">
            <Box paddingY="40px" fontSize="23px">
                فرم سفارش برد مونتاژ شده (PCBA)
            </Box>
            <Fields errors={errors} formData={pageOneData} setFormData={setPageOneData} />

            <DesignQuantityType formData={pageOneData} setFormData={setPageOneData} />

            <NumberThickness formData={pageOneData} setFormData={setPageOneData} />

            <Colors formData={pageOneData} setFormData={setPageOneData} />

            <UploadPCBA errors={errors} formData={pageOneData} setFormData={setPageOneData} />

            <HStack paddingY="20px">
                <Button onClick={goNext} colorPalette="blue" variant="solid">
                    بعدی
                </Button>
                <Button colorPalette="blue" variant="outline">
                    <a href="https://labkhandelec.com/">بازگشت</a>
                </Button>
            </HStack>

        </Container>
    );
}

export default HomePCBA;
