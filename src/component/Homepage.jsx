import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Homepage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.slice(0, 8).map(product => ({
          ...product,
          price: product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }));
        setProducts(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <div>
      <header
        style={{ margin: "0 auto" }}
        className="flex justify-between items-center py-10 px-10 bg-white w-[900px]  "
      >
        <nav className="text-sm">
          <a href="#" className="text-[#e8d0a8]">
            Home
          </a>{" "}
          <span className="mx-2"></span>
          <a href="#" className="italic text-black">
            Shop
          </a>
        </nav>
        <h1 className="text-sm font-black italic text-[#625456]">BOUTIQUE</h1>
        <div className="text-sm text-gray-500">
          <span className="mr-4 cursor-pointer">🛒 Cart</span>
          <span className="cursor-pointer">👤 Login</span>
        </div>
      </header>

      <div className=" justify-center  items-center h-64 bg-gray-500 text-gray-500 italic banner ml-[200px]">
        <div className="pt-[100px] pl-[20px]">
          <h1 className="text-gray-500 text-sm uppercase">
            NEW INSPIRATION 2020
          </h1>
          <h1 className="text-4x1 font-bold mt-2">20% OFF ON NEW SEASON</h1>
          <button
            onClick={() => navigate("/shop")}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            Brower Collections
          </button>
        </div>
      </div>

      <div>
        <h1 className="uppercase">Carefully created collections</h1>
        <h1 className="uppercase">Browse our categories</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer transition transform hover:scale-105 hover:shadow-xl"
            onClick={() => navigate("/shop")}
          >
            <img
              src={product.img1}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-red-500 font-bold">{product.price} VND</p>
          </div>
        ))}
        ;

      </div>
      <footer className="bg-black text-white py-10 px-10">
        <div className="grid grid-cols-3 gap-10 text-sm">
          <div>
            <h2 className="font-semibold">CUSTOMER SERVICES</h2>
            <ul className="text-gray-400 italic">
              <li>Help & Contact Us</li>
              <li>Returns & Refunds</li>
              <li>Online Stores</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold">COMPANY</h2>
            <ul className="text-gray-400 italic">
              <li>What We Do</li>
              <li>Available Services</li>
              <li>Latest Posts</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold">SOCIAL MEDIA</h2>
            <ul className="text-gray-400 italic">
              <li>Twitter</li>
              <li>Instagram</li>
              <li>Facebook</li>
              <li>Pinterest</li>
            </ul>
          </div>
        </div>

      </footer>
      <div className="bg-gray-100 p-10">
      {/* Service Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 text-center py-6 bg-gray-50 rounded-lg shadow-md">
        <div className="p-4">
          <h3 className="font-semibold italic">FREE SHIPPING</h3>
          <p className="text-gray-500 text-sm">Free shipping worldwide</p>
        </div>
        <div className="p-4">
          <h3 className="font-semibold italic">24 X 7 SERVICE</h3>
          <p className="text-gray-500 text-sm">Free shipping worldwide</p>
        </div>
        <div className="p-4">
          <h3 className="font-semibold italic">FESTIVAL OFFER</h3>
          <p className="text-gray-500 text-sm">Free shipping worldwide</p>
        </div>
      </div>
      
     
      <div className="mt-8 flex justify-between">
        <div>
        <h3 className="italic font-semibold"> LET'S BE FRIENDS!</h3>
        <p className="text-gray-500 text-sm">Nisi nisi tempor consequat laboris nisi.</p>
        </div>
        
        <div className="mt-4 flex max-w-md">
          <input
            type="email"
            placeholder="Enter your email address"
            className="p-2 flex-grow border border-gray-300 rounded-l-md focus:outline-none w-3xs" 

          />
          <button className="bg-gray-800 text-white px-4 py-2 rounded-r-md ]">Subscribe</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Homepage;
