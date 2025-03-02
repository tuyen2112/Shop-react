import { Route, Routes } from "react-router-dom";
import "./App.css";

import Homepage from "./component/Homepage";
import ShopPage from "./component/ShopPage";
import ProductDetail from "./component/ProductDetail";
import ShopCart from "./component/ShopCart";
import CheckoutPage from "./component/CheckoutPage";



function App() {
  return (
    
    <div className="font-sans">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<ShopCart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<div>Not Found</div>} /> 
      </Routes>
    </div>
    
  );
}

export default App;

