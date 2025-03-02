import { useEffect, useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const API_URL =
  "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74";

const ProductContext = createContext();
export const useProductContext = () => useContext(ProductContext);


export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error("Lỗi tải dữ liệu:", error));
  }, []);

  useEffect(() => {
    let filtered = products;
    if (searchTerm) {
      filtered = products.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (category !== "All") {
      filtered = products.filter((item) =>
        item.name.toLowerCase().includes(category.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  }, [category, searchTerm, products]);

  const handleSignup = (email, password) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((user) => user.email === email)) {
      alert("Email đã tồn tại!");
      return;
    }
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Đăng ký thành công! Hãy đăng nhập.");
  };

  const handleLogin = (email, password) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (foundUser) {
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      setUser(foundUser);
    } else {
      alert("Sai email hoặc mật khẩu!");
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  function ProductCard({ product }) {
    const navigate = useNavigate();
  
    return (
      <div
        className="border p-4 cursor-pointer hover:shadow-lg"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        <img src={product.img1} alt={product.name} className="w-full h-48 object-cover" />
        <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
        <p className="text-red-500">{Number(product.price).toLocaleString()} VND</p>
      </div>
    );
  }

  return (
    <ProductContext.Provider value={{ setCategory, setSearchTerm }}>
      <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">SHOP</h1>
        <div className="grid grid-cols-4 gap-4">
          <Sidebar />
          <div className="col-span-3">
            <div className="grid grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProductContext.Provider>
  );
}

function Header({  user, onSignup, onLogin, onLogout }) {
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-center py-10 px-10 bg-white w-[900px] mx-auto">
      <nav className="text-sm">
      <a href="#" className="text-[#e8d0a8]" onClick={() => navigate("/")}>
          Home
        </a>
        <span className="mx-2"></span>
        <a href="#" className="italic text-black">Shop</a>
      </nav>
      <h1 className="text-sm font-black italic text-[#625456]">BOUTIQUE</h1>
      <div className="text-sm text-gray-500">
        <span className="mr-4 cursor-pointer" onClick={()=>navigate("/cart")}>🛒 Cart</span>
        {user ? (
          <>
            <span className="mr-4">👤 {user.fullName}</span>
            <span className="cursor-pointer" onClick={onLogout}>Logout</span>
          </>
        ) : (
          <>
            <span className="cursor-pointer mr-4" onClick={onSignup}>Sign Up</span>
            <span className="cursor-pointer" onClick={onLogin}>Login</span>
          </>
        )}
      </div>
    </header>
  );
}

function Sidebar() {
  const { setCategory, setSearchTerm } = useProductContext();

  const categories = [
    "All","iPhone", "iMac", "Macbook", "Wireless", "Airpod", "Watch", "Mouse", "Keyboard", "Other"
  ];

  return (
    <div className="border p-4">
      <h2 className="font-bold mb-2">CATEGORIES</h2>
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 mb-2 border"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <h2>Iphone&Mac</h2>
      
      {categories.map((cat) => (
        <button
          key={cat}
          className="block w-full text-left p-2 hover:bg-gray-200"
          onClick={() => setCategory(cat)}
        >
          {cat}
        </button>
      ))}
      
    </div>
    
  );
}

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="border p-4 cursor-pointer hover:shadow-lg"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <img
        src={product.img1}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <p className="text-red-500">{Number(product.price).toLocaleString()} VND</p>
    </div>
  );
}
