import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios

const defaultDescription = "Energistia can deliver tactical metrics after visionary Appropriating transition enterpris an sources applications emerging psd template.";
const axiosInstance = axios.create({
  baseURL: 'https://ecommercebackend-production-4f03.up.railway.app/api',
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
  const { id, img, price, name, seller, quantity, description } = item;
  const [prequantity, setQuantity] = useState(quantity);
  const [coupon, setCoupon] = useState("");
  const [size, setSize] = useState("Select Size");
  const [color, setColor] = useState("Select Color");

  const handleDecrease = () => {
    if (prequantity > 1) {
      setQuantity(prequantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(prequantity + 1);
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
      const a= await axiosInstance.post(`/carts/add/${id}`);
        console.log('tu server ',a)
      // Xử lý phản hồi nếu cần
      // Ví dụ: Hiển thị thông báo thành công cho người dùng

      setQuantity(1);
      setSize("Select Size");
      setColor("Select Color");
      setCoupon("");
    } catch (error) {
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
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          (3 review)
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
              <option>37</option>
              <option>38</option>
              <option>39</option>
              <option>40</option>
              <option>41</option>
              <option>42</option>
            </select>
            <i className="icofont-rounded-down"></i>
          </div>
          <div className="select-product color">
            <select value={color} onChange={handleColorChange}>
              <option>Select Color</option>
              <option>Red</option>
              <option>Blue</option>
              <option>Green</option>
              <option>Black</option>
              <option>White</option>
            </select>
            <i className="icofont-rounded-down"></i>
          </div>
          <div className="coupon-field">
            <input
              type="text"
              placeholder="Coupon Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
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
