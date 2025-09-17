import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Home";
import Register from "./register/index";
import OrderForm from "./OrderForm/index";
import PCBA from "./PCBA/index";
import OEM from "./OEM/index";
import OrderFormRegister from "./OrderFormRegister/index";
import Admin from "./admin/index";
import AdminOrder from "./order-admin/index";
import RegisterPCBA from "./RegisterPCBA/index";
import RegisterOEM from "./RegisterOEM/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/PCB" element={<Home />}></Route>
        <Route path="/PCBA" element={<PCBA />}></Route>
        <Route path="/OEM" element={<OEM />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/registerPCBA" element={<RegisterPCBA />}></Route>
        <Route path="/registerOEM" element={<RegisterOEM />}></Route>
        <Route path="/order-form-register" element={<OrderFormRegister />}></Route>
        <Route path="/order-form" element={<OrderForm />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/admin-order" element={<AdminOrder />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
