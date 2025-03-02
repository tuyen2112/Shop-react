import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();

  // Lấy dữ liệu giỏ hàng từ localStorage khi component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone || !form.address) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    alert("Đặt hàng thành công!");
    localStorage.removeItem("cart"); // Xóa giỏ hàng sau khi đặt hàng
    navigate("/"); // Quay về trang chủ sau khi đặt hàng
  };

  // Tính tổng tiền đơn hàng
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="w-4/5 mx-auto py-10">
      <div className="bg-gray-100 p-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl italic font-semibold">CHECKOUT</h1>
        <nav className="text-gray-500 text-sm italic">
          <span className="text-black font-semibold" onClick={()=> navigate("/")}>HOME</span> / <span className="text-black font-semibold" onClick={()=> navigate("/cart")}>CART</span> / CHECKOUT
        </nav>
      </div>
    </div>
      <div className="flex justify-between gap-8">
        {/* Form nhập thông tin khách hàng */}
        <form className="w-3/5 bg-white p-6 rounded-lg shadow-md" onSubmit={handleOrder}>
          <h3 className="text-lg font-semibold mb-4">BILLING DETAILS</h3>

          <label className="block font-medium mt-4">FULL NAME:</label>
          <input 
            type="text" 
            name="fullName" 
            placeholder="Enter Your Full Name Here!" 
            value={form.fullName} 
            onChange={handleChange} 
            required 
            className="w-full p-3 border border-gray-300 rounded-md mt-1"
          />

          <label className="block font-medium mt-4">EMAIL:</label>
          <input 
            type="email" 
            name="email" 
            placeholder="Enter Your Email Here!" 
            value={form.email} 
            onChange={handleChange} 
            required 
            className="w-full p-3 border border-gray-300 rounded-md mt-1"
          />

          <label className="block font-medium mt-4">PHONE NUMBER:</label>
          <input 
            type="text" 
            name="phone" 
            placeholder="Enter Your Phone Number Here!" 
            value={form.phone} 
            onChange={handleChange} 
            required 
            className="w-full p-3 border border-gray-300 rounded-md mt-1"
          />

          <label className="block font-medium mt-4">ADDRESS:</label>
          <input 
            type="text" 
            name="address" 
            placeholder="Enter Your Address Here!" 
            value={form.address} 
            onChange={handleChange} 
            required 
            className="w-full p-3 border border-gray-300 rounded-md mt-1"
          />

          <button type="submit" className="mt-6 w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition">
            Place order
          </button>
        </form>

        {/* Hiển thị đơn hàng */}
        <div className="w-2/5 bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold border-b pb-2">YOUR ORDER</h3>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between my-3">
              <span>{item.name}</span>
              <span>{item.price.toLocaleString()} VND x {item.quantity}</span>
            </div>
          ))}
          <hr className="my-4 border-gray-300" />
          <h4 className="text-lg font-bold text-right">TOTAL: {total.toLocaleString()} VND</h4>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
