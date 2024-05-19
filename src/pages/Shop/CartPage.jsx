import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/Breadcrumb/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import delImgUrl from "../../assets/images/shop/del.png";
import CheckoutPage from "./CheckoutPage";
import axios from 'axios';
import './CartPage.css'; // Import the CSS file

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [shippingFee, setShippingFee] = useState(0);
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  // Tạo một instance của axios
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

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('access_token'));
    if (!token) {
      navigate('/sign-in'); // Chuyển hướng đến trang đăng nhập nếu không có token
      return;
    }

    fetchCartItems();
  }, [navigate]);

  const fetchCartItems = async () => {
    try {
      const response = await axiosInstance.get('/carts');
      setCartItems(response.data.data);
      console.log(response)
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  // Calculate the total price for each item in the cart
  const calculateTotalPrice = (item) => {
    return parseFloat(item.price) * item.quantity;
  };

  // Handle quantity increase
  const handleIncrease = (item) => {
    item.quantity += 1;
    setCartItems([...cartItems]);
    // Update local storage with the new cart items
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  // Handle quantity decrease
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
      setCartItems([...cartItems]);
      // Update local storage with the new cart items
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  };

  const handleRemoveItem = async (item) => {
    try {
      // Gửi yêu cầu DELETE đến API để xóa sản phẩm khỏi giỏ hàng
     const a = await axiosInstance.delete(`/carts/delete/${item.product.id}`);
      console.log('day la a: ',a,item)
      // Filter out the item to be removed
      const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);

      // Update the state with the new cart
      setCartItems(updatedCart);

      // Update local storage with the updated cart
      updateLocalStorage(updatedCart);

      console.log('Item successfully deleted from cart');
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };

  // Update local storage with the cart items
  const updateLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  // Calculate the cart subtotal
  const cartSubtotal = cartItems.reduce((total, item) => {
    return total + calculateTotalPrice(item);
  }, 0);

  // Calculate the shipping fee
  useEffect(() => {
    const specialCities = ['Cần Thơ', 'Đà Nẵng', 'Hà Nội', 'Hải Phòng', 'TP Hồ Chí Minh'];
    if (specialCities.includes(city)) {
      setShippingFee(2);
    } else {
      setShippingFee(5);
    }
  }, [city]);

  // Calculate the order total
  const orderTotal = cartSubtotal + shippingFee;

  return (
    <div>
      <BreadCrumb title={"Shop Cart"} curPage={<Link to="/cart-page">Cart</Link>} />
      <div className="shop-cart padding-tb">
        <div className="container">
          <div className="section-wrapper">
            {/* cart top */}
            <div className="cart-top">
              <table>
                <thead>
                  <tr>
                    <th className="cat-product">Product</th>
                    <th className="cat-price">Price</th>
                    <th className="cat-quantity">Quantity</th>
                    <th className="cat-toprice">Total</th>
                    <th className="cat-edit">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, indx) => (
                    <tr key={indx}>
                      <td className="product-item cat-product">
                        <div className="p-thumb">
                          <Link to={`/shop-single/${item.product.id}`}>
                            <img src={item.product.img} alt={item.product.name} />
                          </Link>
                        </div>
                        <div className="p-content">
                          <Link to={`/shop-single/${item.product.id}`}>{item.product.name}</Link>
                        </div>
                      </td>
                      <td className="cat-price">${item.price}</td>
                      <td className="cat-quantity">
                        <div className="cart-plus-minus">
                          <div
                            className="dec qtybutton"
                            onClick={() => handleDecrease(item)}
                          >
                            -
                          </div>
                          <input
                            className="cart-plus-minus-box"
                            type="text"
                            name="qtybutton"
                            value={item.quantity}
                            readOnly
                          />
                          <div
                            className="inc qtybutton"
                            onClick={() => handleIncrease(item)}
                          >
                            +
                          </div>
                        </div>
                      </td>
                      <td className="cat-toprice">
                        ${calculateTotalPrice(item).toFixed(2)}
                      </td>
                      <td className="cat-edit">
                        <a href="#" onClick={() => handleRemoveItem(item)}>
                          <img src={delImgUrl} alt="Delete" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* cart bottom */}
            <div className="cart-bottom">
              <div className="cart-container">
                {/* shipping information */}
                <div className="shipping-information">
                  <h3>Shipping Information</h3>
                  <div className="form-group">
                    <label htmlFor="city">Select City:</label>
                    <select id="city" value={city} onChange={(e) => setCity(e.target.value)}>
                      <option value="">Select City</option>
                      <option value="An Giang">An Giang</option>
                      <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
                      <option value="Bắc Giang">Bắc Giang</option>
                      <option value="Bắc Kạn">Bắc Kạn</option>
                      <option value="Bạc Liêu">Bạc Liêu</option>
                      <option value="Bắc Ninh">Bắc Ninh</option>
                      <option value="Bến Tre">Bến Tre</option>
                      <option value="Bình Dương">Bình Dương</option>
                      <option value="Bình Định">Bình Định</option>
                      <option value="Bình Phước">Bình Phước</option>
                      <option value="Bình Thuận">Bình Thuận</option>
                      <option value="Cà Mau">Cà Mau</option>
                      <option value="Cao Bằng">Cao Bằng</option>
                      <option value="Cần Thơ">Cần Thơ</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                      <option value="Đắk Lắk">Đắk Lắk</option>
                      <option value="Đắk Nông">Đắk Nông</option>
                      <option value="Điện Biên">Điện Biên</option>
                      <option value="Đồng Nai">Đồng Nai</option>
                      <option value="Đồng Tháp">Đồng Tháp</option>
                      <option value="Gia Lai">Gia Lai</option>
                      <option value="Hà Giang">Hà Giang</option>
                      <option value="Hà Nam">Hà Nam</option>
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="Hà Tĩnh">Hà Tĩnh</option>
                      <option value="Hải Dương">Hải Dương</option>
                      <option value="Hải Phòng">Hải Phòng</option>
                      <option value="Hậu Giang">Hậu Giang</option>
                      <option value="Hòa Bình">Hòa Bình</option>
                      <option value="Hưng Yên">Hưng Yên</option>
                      <option value="Khánh Hòa">Khánh Hòa</option>
                      <option value="Kiên Giang">Kiên Giang</option>
                      <option value="Kon Tum">Kon Tum</option>
                      <option value="Lai Châu">Lai Châu</option>
                      <option value="Lâm Đồng">Lâm Đồng</option>
                      <option value="Lạng Sơn">Lạng Sơn</option>
                      <option value="Lào Cai">Lào Cai</option>
                      <option value="Long An">Long An</option>
                      <option value="Nam Định">Nam Định</option>
                      <option value="Nghệ An">Nghệ An</option>
                      <option value="Ninh Bình">Ninh Bình</option>
                      <option value="Ninh Thuận">Ninh Thuận</option>
                      <option value="Phú Thọ">Phú Thọ</option>
                      <option value="Phú Yên">Phú Yên</option>
                      <option value="Quảng Bình">Quảng Bình</option>
                      <option value="Quảng Nam">Quảng Nam</option>
                      <option value="Quảng Ngãi">Quảng Ngãi</option>
                      <option value="Quảng Ninh">Quảng Ninh</option>
                      <option value="Quảng Trị">Quảng Trị</option>
                      <option value="Sóc Trăng">Sóc Trăng</option>
                      <option value="Sơn La">Sơn La</option>
                      <option value="Tây Ninh">Tây Ninh</option>
                      <option value="Thái Bình">Thái Bình</option>
                      <option value="Thái Nguyên">Thái Nguyên</option>
                      <option value="Thanh Hóa">Thanh Hóa</option>
                      <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
                      <option value="Tiền Giang">Tiền Giang</option>
                      <option value="TP Hồ Chí Minh">TP Hồ Chí Minh</option>
                      <option value="Trà Vinh">Trà Vinh</option>
                      <option value="Tuyên Quang">Tuyên Quang</option>
                      <option value="Vĩnh Long">Vĩnh Long</option>
                      <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                      <option value="Yên Bái">Yên Bái</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Shipping Address:</label>
                    <input
                      type="text"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your shipping address"
                    />
                  </div>
                </div>

                {/* cart totals */}
                <div className="cart-overview">
                  <h3>Cart Totals</h3>
                  <ul className="lab-ul">
                    <li>
                      <span className="pull-left">Cart Subtotal</span>
                      <p className="pull-right">${cartSubtotal.toFixed(2)}</p>
                    </li>
                    <li>
                      <span className="pull-left">Shipping and Handling</span>
                      <p className="pull-right">${shippingFee.toFixed(2)}</p>
                    </li>
                    <li>
                      <span className="pull-left">Order Total</span>
                      <p className="pull-right">${orderTotal.toFixed(2)}</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* other shopping actions */}
              {/* <div className="row">
                <div className="col-md-6 col-12">
                  <div className="shipping-actions">
                    <Link to="/shop" className="btn btn-alt">Continue Shopping</Link>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="cart-actions">
                    <button type="button" className="btn btn-main">Update Cart</button>
                  </div>
                </div>
              </div> */}

              {/* checkout box */}
              <div className="cart-checkout-box">
                <form className="cart-checkout" action="/">
                  <div>
                    <CheckoutPage amount={orderTotal} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
