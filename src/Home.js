import Fields from "./components/form/Fields"
import DesignQuantityType from "./components/form/DesignQuantityType";
import NumberThickness from "./components/form/NumberThickness";
import Colors from "./components/form/Colors";
import UploadPCB from "./components/form/UploadPCB";

import { Container, HStack, Button, Box } from "@chakra-ui/react"

import { useState, useEffect } from "react";

import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
console.log(useSearchParams)
function Home() {
  const [pageOneData, setPageOneData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const savedData = localStorage.getItem("pageOneData");
    const userId = searchParams.get('user_id');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setPageOneData({
        ...parsed,
        user_id: userId,
        pagename: "PCB",
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
      });
    } else {
      setPageOneData({
        user_id: userId,
        pagename: "PCB",
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
        boardfile: null
      });
    }
  }, [location]);

  useEffect(() => {
    localStorage.setItem("pageOneData", JSON.stringify(pageOneData));
  }, [pageOneData]);

  const goNext = () => {

    window.scrollTo({ top: 0, behavior: 'smooth' });

    const { productname, countproduct, width, length, boardfile } = pageOneData;
    let newErrors = {};

    if (!productname) newErrors.productname = "نام";
    if (!countproduct) newErrors.countproduct = "تعداد";
    if (!width) newErrors.width = "تعداد";
    if (!length) newErrors.length = "تعداد";
    if (!boardfile) newErrors.boardfile = "تعداد";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate("/register");
    }
  };

  return (
    <Container dir="rtl" maxW="6xl" backgroundColor="#F2F7FE" marginY="20px" borderRadius="20px">

      <Box color="#0662EA" paddingY="40px" fontSize="23px">
        فرم سفارش برد مدار چاپی (PCB)
      </Box>

      <Fields errors={errors} formData={pageOneData} setFormData={setPageOneData} />

      <DesignQuantityType formData={pageOneData} setFormData={setPageOneData} />

      <NumberThickness formData={pageOneData} setFormData={setPageOneData} />

      <Colors formData={pageOneData} setFormData={setPageOneData} />

      <UploadPCB errors={errors} formData={pageOneData} setFormData={setPageOneData} />

      <HStack paddingY="20px">
        <Button onClick={goNext} colorPalette="blue" variant="solid">
          بعدی
        </Button>
      </HStack>

    </Container>
  );
}

export default Home;
