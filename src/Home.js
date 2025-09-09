import Fields from "./components/form/Fields"
import DesignQuantityType from "./components/form/DesignQuantityType";
import NumberThickness from "./components/form/NumberThickness";
import Colors from "./components/form/Colors";
import Upload from "./components/form/Upload";

import { Container } from "@chakra-ui/react"



function Home() {
  return (
    <Container dir="rtl" maxW="6xl" backgroundColor="gray.50" marginY="20px" borderRadius="20px">

      <Fields />

      <DesignQuantityType />

      <NumberThickness />

      <Colors />

      <Upload />

    </Container>
  );
}

export default Home;
