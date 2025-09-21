import Fields from "../components/formOEM/Fields"
import DesignQuantityType from "../components/formOEM/DesignQuantityType";
import NumberThickness from "../components/formOEM/NumberThickness";
import Colors from "../components/formOEM/Colors";
import UploadOEM from "../components/formOEM/UploadOEM";

import { Container, HStack, Button, Box } from "@chakra-ui/react"

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

function HomeOEM() {

    const [pageOneDataOEM, setPageOneDataOEM] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const savedData = localStorage.getItem("pageOneDataOEM");
        if (savedData) {
            const parsed = JSON.parse(savedData);
            setPageOneDataOEM({
                ...parsed,
                pagename: "OEM",
                filedisign: "برد تک",
                countdisign: "1",
                boardmaterial: "FR-4",
                countlayer: "2",
                boardthickness: "1.6",
                copperthickness: "1oz",
                boardcolor: "سبز",
                guidecolor: "سفید",
                finalcover: "HASL",
                boardcut: "CNC",
                stansil: "خیر",
                montage: "بله",
                costumerbrand: "بله"
            });
        } else {
            setPageOneDataOEM({
                pagename: "OEM",
                filedisign: "برد تک",
                countdisign: "1",
                boardmaterial: "FR-4",
                countlayer: "2",
                boardthickness: "1.6",
                copperthickness: "1oz",
                boardcolor: "سبز",
                guidecolor: "سفید",
                finalcover: "HASL",
                boardcut: "CNC",
                stansil: "خیر",
                montage: "بله",
                costumerbrand: "بله",
                boardfile: null,
                BOMfile: null
            });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("pageOneDataOEM", JSON.stringify(pageOneDataOEM));
    }, [pageOneDataOEM]);

    const goNext = () => {

        window.scrollTo({ top: 0, behavior: 'smooth' });

        const { productname, countproduct, width, length, boardfile, BOMfile } = pageOneDataOEM;
        let newErrors = {};

        if (!productname) newErrors.productname = "نام";
        if (!countproduct) newErrors.countproduct = "تعداد";
        if (!width) newErrors.width = "تعداد";
        if (!length) newErrors.length = "تعداد";
        if (!boardfile) newErrors.boardfile = "تعداد";
        if (!BOMfile) newErrors.BOMfile = "تعداد";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            navigate("/registerOEM");
        }
    };

    return (
        <Container dir="rtl" maxW="6xl" backgroundColor="#F2F7FE" marginY="20px" borderRadius="20px">
            <Box color="#0662EA" paddingY="40px" fontSize="23px">
                فرم سفارش محصول سفارشی (OEM)
            </Box>
            <Fields errors={errors} formData={pageOneDataOEM} setFormData={setPageOneDataOEM} />

            <DesignQuantityType formData={pageOneDataOEM} setFormData={setPageOneDataOEM} />

            <NumberThickness formData={pageOneDataOEM} setFormData={setPageOneDataOEM} />

            <Colors formData={pageOneDataOEM} setFormData={setPageOneDataOEM} />

            <UploadOEM errors={errors} formData={pageOneDataOEM} setFormData={setPageOneDataOEM} />


            <HStack paddingY="20px">
                <Button onClick={goNext} colorPalette="blue" variant="solid">
                    بعدی
                </Button>
            </HStack>

        </Container>
    );
}

export default HomeOEM;