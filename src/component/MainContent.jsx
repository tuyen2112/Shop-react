import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MainContent = () => {
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div 
            key={product._id} 
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer transition transform hover:scale-105 hover:shadow-xl"
            onClick={() => navigate("/shop")}
          >
            <img src={product.img1} alt={product.name} className="w-full h-40 object-cover rounded-lg" />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-red-500 font-bold">{product.price} VND</p>
          </div>
        ))};
        </div>
    </div>
  );
};

export default MainContent;
