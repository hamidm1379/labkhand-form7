import Fields from "./components/form/Fields"
import DesignQuantityType from "./components/form/DesignQuantityType";
import NumberThickness from "./components/form/NumberThickness";
import Colors from "./components/form/Colors";
import Upload from "./components/form/Upload";

import { Container } from "@chakra-ui/react"



function App() {
  return (
    <Container dir="rtl" maxW="6xl">

      <Fields />

      <DesignQuantityType />

      <NumberThickness />

      <Colors />

      <Upload />

    </Container>
  );
}

export default App;
