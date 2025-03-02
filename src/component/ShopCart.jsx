import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ShopCartPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); 

  // Fetch dữ liệu sản phẩm từ API
  useEffect(() => {
    fetch(
      "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
    )
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Lỗi tải sản phẩm:", error));
  }, []);

  // Lưu giỏ hàng vào localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Cập nhật số lượng sản phẩm
  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  // Tính tổng giá trị đơn hàng
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">SHOP & CART</h1>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {products.map((product) => (
    <div key={product._id} className="border p-4 rounded-lg shadow-lg flex flex-col items-center">
      <img src={product.img1} alt={product.name} className="w-full h-48 object-cover" />
      <h2 className="text-lg font-semibold mt-2 text-center h-14 flex items-center">
        {product.name}
      </h2>
      <p className="text-gray-600">{product.price.toLocaleString()} VND</p>
      <button
        className="mt-auto bg-black text-white px-4 py-2 rounded-md w-full"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  ))}
</div>


      {/* Hiển thị giỏ hàng nếu có sản phẩm */}
      {cart.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">SHOPPING CART</h2>

          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th>IMAGE</th>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>TOTAL</th>
                <th>REMOVE</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id} className="border-b text-center">
                  <td>
                    <img src={item.img1} alt={item.name} className="w-16 mx-auto" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price.toLocaleString()} VND</td>
                  <td>
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>−</button>
                    <span className="px-3">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                  </td>
                  <td>{(item.price * item.quantity).toLocaleString()} VND</td>
                  <td>
                    <button onClick={() => removeFromCart(item._id)}>🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
         
          {/* Tổng tiền và thao tác */}
          <div>
      {/* Giỏ hàng */}
      {cart.length > 0 && (
        <div className="mt-6 flex justify-between">
          {/* Nút "Continue Shopping" */}
          <button 
            className="border px-4 py-2 rounded-md" 
            onClick={() => navigate("/shop")}
          >
            ← Continue Shopping
          </button>

          {/* Nút "Proceed to Checkout" */}
          <button className="border px-4 py-2 rounded-md bg-black text-white" onClick={() => navigate("/checkout")}>
            Proceed to Checkout →
          </button>
        </div>
      )}
    </div>

          {/* Tổng tiền */}
          <div className="mt-6 p-4 border rounded-lg">
            <h2 className="text-xl font-semibold">CART TOTAL</h2>
            <div className="flex justify-between mt-2">
              <span>SUBTOTAL</span>
              <span>{subtotal.toLocaleString()} VND</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>TOTAL</span>
              <span>{subtotal.toLocaleString()} VND</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopCartPage;
