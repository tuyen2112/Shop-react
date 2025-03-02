import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [popupData, setPopupData] = useState(null);
  const [isFullPopup, setIsFullPopup] = useState(false);

  const [showAuthModal,setShowAuthModal]=useState(false);
  const [isSignUp,setIsSignUp]=useState(false);
  const [user,setUser]=useState(false);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [fullName,setFullName]=useState("");
  const [phone,setPhone]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("");

  const PopupContext = createContext();

  const showPopup = (product) => {
    setPopupData(product);
  };

  const hidePopup = () => {
    setPopupData(null);
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  useEffect(()=>{
    const storeUser =localStorage.getItem("currentUser");
    if (storeUser) setUser(JSON.parse(storeUser));
  },[]);

  
  useEffect(() => {
    fetch(
      "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
    )
      .then((response) => response.json())
      .then((data) => setProducts(data.slice(0, 8))) // Chỉ lấy 8 sản phẩm đầu tiên
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleAuth = (email, password, confirmPassword) => {
    if (!email || !password || (isSignUp && (!confirmPassword || !fullName || !phone))) {
      alert("Please fill in all fields");
      return;
    }
    if (isSignUp && password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (isSignUp) {
      if (users.find((user) => user.email === email)) {
        alert("Email already exists");
        return;
      }
      users.push({ fullName, phone, email, password  });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Sign up successful! Please log in.");
      setIsSignUp(false);
    } else {
      const user = users.find((user) => user.email === email && user.password === password);
      if (user) {
        setUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("Login successful!");
        setShowAuthModal(false);
      } else {
        alert("Invalid email or password");
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };
  
  function ProductPopup() {
    const { popupData, hidePopup } = useContext(PopupContext);
    const [isFullPopup, setIsFullPopup] = useState(false);
    
    if (!popupData) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
        <div
          className={`bg-white p-6 rounded-lg shadow-lg relative ${
            isFullPopup ? "w-full h-full max-w-full max-h-screen overflow-y-auto" : "w-full max-w-lg"
          }`}
        >
          <button
            className="absolute top-2 right-2 text-gray-500"
            onClick={hidePopup}
          >
            ✖
          </button>
  
          {/* Hình ảnh */}
          <img
            src={popupData.img1}
            alt={popupData.name}
            className={`w-full object-cover rounded-md ${
              isFullPopup ? "h-[70vh]" : "h-40"
            }`}
          />
  
          {/* Tên & Giá */}
          <h2 className="mt-4 text-xl font-bold">{popupData.name}</h2>
          <p className="text-lg text-indigo-600 font-semibold">
            {formatPrice(popupData.price)} VND
          </p>
  
          {/* Nội dung rút gọn */}
          <p className={`mt-2 text-gray-600 ${isFullPopup ? "text-[20px]" : "text-[12px]"}`}>
          {isFullPopup ? popupData.long_desc : popupData.short_desc}
        </p>
  
          {/* Nút View Detail / Close Full */}
          <button
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg"
            onClick={() => setIsFullPopup(!isFullPopup)}
          >
            {isFullPopup ? "Close Full View" : "View Detail"}
          </button>
        </div>
      </div>
    );
  }
  
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
            <a href="#" className="italic text-black" onClick={() => navigate("/shop")}>
              Shop
            </a>
          </nav>
          <h1 className="text-sm font-black italic text-[#625456]">BOUTIQUE</h1>
          <div className="text-sm text-gray-500">
            <span className="mr-4 cursor-pointer" onClick={() => navigate("/cart")}>🛒 Cart</span>
            {user ? (
            <span className="cursor-pointer" onClick={logout}>
              👤 {user.fullName} | Logout
            </span>
          ) : (
            <span className="cursor-pointer" onClick={() => setShowAuthModal(true)}>👤 Login</span>
          )}
        </div>
      </header>
        {showAuthModal && (
          
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">{isSignUp ? "Sign Up" : "Login"}</h2>
            {isSignUp && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-2 border mb-2"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Phone"
                  className="w-full p-2 border mb-2"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </>
            )}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border mb-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isSignUp && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-2 border mb-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
            <button className="w-full bg-indigo-600 text-white p-2 rounded" onClick={()=>handleAuth(email, password, confirmPassword)}>
              {isSignUp ? "Sign Up" : "Login"}
            </button>
            <p className="mt-2 text-center cursor-pointer" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign up"}
            </p>
           </div> 
          </div>
        )};
          
        <div className=" justify-center  items-center h-64 bg-gray-500 text-gray-500 italic banner ml-[120px] px-50">
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
          <h2 className="text-center text-gray-600 uppercase tracking-wide text-sm ">
            Carefully Created Collections
          </h2>
          <h1 className="text-center text-2xl font-semibold mt-2 uppercase">
            Browse Our Categories
          </h1>
          <div>
            <div onClick={() => navigate("/shop")} className="flex px-50 py-2">
              <img
                src="https://res.cloudinary.com/dv8e9h3o7/image/upload/v1740578097/product_1_sgcbfc.png"
                className=" inset-0 bg-black bg-opacity-50 backdrop-blur-md opacity-100 hover:opacity-50 transition duration-300"
              />
              <img
                className=" inset-0 bg-black bg-opacity-50 backdrop-blur-md opacity-100 hover:opacity-50 transition duration-300"
                src="https://res.cloudinary.com/dv8e9h3o7/image/upload/v1740578097/product_2_ozma14.png  "
              />
            </div>
            <div onClick={() => navigate("/shop")} className="flex px-50 py-2 ">
              <img
                src="https://res.cloudinary.com/dv8e9h3o7/image/upload/v1740578099/product_3_knwekp.png"
                className=" inset-0 bg-black bg-opacity-50 backdrop-blur-md opacity-100 hover:opacity-50 transition duration-300"
              />
              <img
                src="https://res.cloudinary.com/dv8e9h3o7/image/upload/v1740578098/product_4_pxiqbp.png"
                className=" inset-0 bg-black bg-opacity-50 backdrop-blur-md opacity-100 hover:opacity-50 transition duration-300"
              />
              <img
                src="https://res.cloudinary.com/dv8e9h3o7/image/upload/v1740578098/product_5_y0s1qp.png"
                className=" inset-0 bg-black bg-opacity-50 backdrop-blur-md opacity-100 hover:opacity-50 transition duration-300"
              />
            </div>
          </div>
        </div>
        
        
        
        
        

        <PopupContext.Provider value={{ popupData, showPopup, hidePopup }}>
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-semibold mb-4 text-center uppercase">Made the hard way</h2>
        <h2 className="text-2xl font-semibold mb-4 text-center uppercase">Top Trending Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
            key={product._id}
            className="bg-white p-4 rounded-lg shadow-lg text-center cursor-pointer hover:opacity-50 transition-opacity"
            onClick={() => showPopup(product)} // Đoạn này gọi hàm hiển thị popup
          >
            <img src={product.img1} alt={product.name} className="w-full h-auto object-contain rounded-md" />

            <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-1000">{product.short_desc}</p>
            <p className="mt-2 font-bold text-indigo-600">{formatPrice(product.price)} VND</p>
          </div>
          
          ))}
        </div>
      </div>
      {popupData && <ProductPopup />}
    </PopupContext.Provider>

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
              <h3 className="italic font-semibold"> LETS BE FRIENDS!</h3>
              <p className="text-gray-500 text-sm">
                Nisi nisi tempor consequat laboris nisi.
              </p>
            </div>

            <div className="mt-4 flex max-w-md">
              <input
                type="email"
                placeholder="Enter your email address"
                className="p-2 flex-grow border border-gray-300 rounded-l-md focus:outline-none w-3xs"
              />
              <button className="bg-gray-800 text-white px-4 py-2 rounded-r-md ]">
                Subscribe
              </button>
            </div>
          </div>
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
      </div>
  );
};

export default Homepage;

