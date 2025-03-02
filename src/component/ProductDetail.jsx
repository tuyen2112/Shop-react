import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL =
  "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74";

export default function ProductDetail() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🔎 ID từ URL:", id); // ✅ Kiểm tra ID trên URL

    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 Dữ liệu từ API:", data); // ✅ Kiểm tra dữ liệu API
        setProducts(data);

        if (id) {
          const foundProduct = data.find((item) => item._id?.$oid === id);
          console.log("✅ Sản phẩm tìm được:", foundProduct); // ✅ Debug sản phẩm tìm thấy

          if (!foundProduct) {
            console.error("❌ Không tìm thấy sản phẩm!");
          }
          setProduct(foundProduct || null);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("⚠️ Lỗi tải dữ liệu:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>⏳ Loading...</p>;

  if (!product) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-red-500 text-xl">❌ Không tìm thấy sản phẩm!</p>
        <button onClick={() => navigate("/")} className="text-blue-500 mt-4">
          ← Quay lại trang chủ
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-500">
        ← Quay lại
      </button>
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <img src={product.img1} alt={product.name} className="w-64 h-64 object-cover" />
      <p className="text-red-500 text-xl">{Number(product.price).toLocaleString()} VND</p>
      <p className="mt-4">{product.short_desc}</p>

      <div className="mt-4">
        <label className="mr-2">Quantity:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border p-2 w-16"
        />
      </div>

      <button
        onClick={() => alert(`🛒 Đã thêm ${quantity} sản phẩm vào giỏ hàng!`)}
        className="bg-blue-500 text-white px-4 py-2 mt-4"
      >
        Add to Cart
      </button>

      <h2 className="text-xl font-bold mt-6">🛍 Related Products</h2>
      <div className="grid grid-cols-3 gap-4">
        {products
          .filter((p) => p.category === product.category && p._id?.$oid !== id)
          .slice(0, 3)
          .map((p) => (
            <div
              key={p._id.$oid}
              className="border p-4 cursor-pointer hover:shadow-lg"
              onClick={() => navigate(`/product/${p._id.$oid}`)}
            >
              <img src={p.img1} alt={p.name} className="w-full h-48 object-cover" />
              <h2 className="text-lg font-semibold mt-2">{p.name}</h2>
              <p className="text-red-500">{Number(p.price).toLocaleString()} VND</p>
            </div>
          ))}
      </div>
    </div>
  );
}
