import React, { useState,useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios
import Rating from "../../components/Rating/Rating";

const defaultDescription = "Energistia can deliver tactical metrics after visionary Appropriating transition enterpris an sources applications emerging psd template.";
const axiosInstance = axios.create({
  baseURL: 'https://ecommercebackend-953d.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json'
  }
});


// Thiết lập một interceptor để thêm Bearer Token vào mỗi yêu cầu
axiosInstance.interceptors.request.use(config => {
  const token = JSON.parse(localStorage.getItem('access_token'));
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});


const ProductDisplay = ({ item, token }) => {
  console.log(item)
  const { id, img, price, name, seller, quantity, description } = item;
  const [prequantity, setQuantity] = useState(1);
  const [coupon, setCoupon] = useState("");
  const [size, setSize] = useState("Select Size");
  const [color, setColor] = useState("Select Color");
  const soluong = useRef(1)

  const handleDecrease = () => {
    if (prequantity > 1) {
      setQuantity(prequantity - 1);
      soluong.current--;
    }
  };

  const handleIncrease = () => {
    setQuantity(prequantity + 1);
    soluong.current++
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

 

    try {
      const a= await axiosInstance.post(`/carts/add/${id}?quantity=${soluong.current}`);
      console.log(`/carts/add/${id}?quantity=${soluong.current}`)
      console.log('tu server ',a)
      // Xử lý phản hồi nếu cần
      // Ví dụ: Hiển thị thông báo thành công cho người dùng
      setSize("Select Size");
      setColor("Select Color");
      setCoupon("");
    } catch (error) {
      console.log(`/carts/add/${id}?quantity=${soluong.current}`)
      console.error('Error adding item to cart:', error.message);
      // Xử lý lỗi nếu cần
      // Ví dụ: Hiển thị thông báo lỗi cho người dùng
    }
  };

  return (
    <div>
      <div>
        <h4>{name}</h4>
        <p className="rating">
          <Rating />
          (4 reviews)
        </p>
        <h4>${price}</h4>
        <h6>{seller}</h6>
        <p>{description || defaultDescription}</p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="cart-plus-minus">
            <div onClick={handleDecrease} className="dec qtybutton">
              -
            </div>
            <input
              className="cart-plus-minus-box"
              type="text"
              name="qtybutton"
              value={prequantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            />
            <div className="inc qtybutton" onClick={handleIncrease}>
              +
            </div>
          </div>
          <div className="select-product size">
            <select value={size} onChange={handleSizeChange}>
              <option>Select Size</option>
              <option>Size 36</option>
              <option>Size 37</option>
              <option>Size 38</option>
              <option>Size 39</option>
              <option>Size 40</option>
              <option>Size 41</option>
              <option>Size 42</option>
              <option>Size 43</option>
              <option>Size 44</option>
              <option>Size 45</option>
            </select>
          </div>
          <button type="submit" className="lab-btn">
            <span>Add To Cart</span>
          </button>
          {/* Thay thế Link bằng button để tránh chuyển hướng */}
          <button className="lab-btn bg-primary" onClick={() => window.location.href="/cart-page"}>
            <span>Check Out</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDisplay;