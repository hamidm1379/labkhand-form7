import Fields from "../components/formPCBA/Fields"
import DesignQuantityType from "../components/formPCBA/DesignQuantityType";
import NumberThickness from "../components/formPCBA/NumberThickness";
import Colors from "../components/formPCBA/Colors";
import UploadPCBA from "../components/formPCBA/UploadPCBA";

import { Container, HStack, Button, Box } from "@chakra-ui/react"

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

function HomePCBA() {

    const [pageOneDataPCBA, setPageOneDataPCBA] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const savedData = localStorage.getItem("pageOneDataPCBA");
        if (savedData) {
            const parsed = JSON.parse(savedData);
            setPageOneDataPCBA({
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
                montage: "بله"
            });
        } else {
            setPageOneDataPCBA({
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
                montage: "بله",
                boardfile: null,
                BOMfile: null
            });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("pageOneDataPCBA", JSON.stringify(pageOneDataPCBA));
    }, [pageOneDataPCBA]);


    const goNext = () => {

        window.scrollTo({ top: 0, behavior: 'smooth' });

        const { productname, countproduct, width, length, boardfile, BOMfile } = pageOneDataPCBA;
        let newErrors = {};

        if (!productname) newErrors.productname = "نام";
        if (!countproduct) newErrors.countproduct = "تعداد";
        if (!width) newErrors.width = "تعداد";
        if (!length) newErrors.length = "تعداد";
        if (!boardfile) newErrors.boardfile = "تعداد";
        if (!BOMfile) newErrors.BOMfile = "تعداد";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            navigate("/registerPCBA");
        }
    };

    return (
        <Container dir="rtl" maxW="6xl" backgroundColor="gray.50" marginY="20px" borderRadius="20px">
            <Box color="#0662EA" paddingY="40px" fontSize="23px">
                فرم سفارش برد مونتاژ شده (PCBA)
            </Box>
            <Fields errors={errors} formData={pageOneDataPCBA} setFormData={setPageOneDataPCBA} />

            <DesignQuantityType formData={pageOneDataPCBA} setFormData={setPageOneDataPCBA} />

            <NumberThickness formData={pageOneDataPCBA} setFormData={setPageOneDataPCBA} />

            <Colors formData={pageOneDataPCBA} setFormData={setPageOneDataPCBA} />

            <UploadPCBA errors={errors} formData={pageOneDataPCBA} setFormData={setPageOneDataPCBA} />

            <HStack paddingY="20px">
                <Button onClick={goNext} colorPalette="blue" variant="solid">
                    بعدی
                </Button>
            </HStack>

        </Container>
    );
}

export default HomePCBA;
