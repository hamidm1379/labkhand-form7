import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Home"
import Register from "./register/index"
import OrderForm from "./OrderForm/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/order-form" element={<OrderForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
