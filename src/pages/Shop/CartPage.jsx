import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/Breadcrumb/BreadCrumb";
import { Link } from "react-router-dom";
import delImgUrl from "../../assets/images/shop/del.png";
import CheckoutPage from "./CheckoutPage";
import axios from 'axios';


const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);


  // Tạo một instance của axios
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


  useEffect(() => {
    fetchCartItems();
  }, []);


  const fetchCartItems = async () => {
    try {
      const response = await axiosInstance.get('/carts');
      setCartItems(response.data.data);
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
     const a= await axiosInstance.delete(`/carts/delete/${item.product.id}`);
      console.log('day la a: ',a,item )
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


  // Calculate the order total
  const orderTotal = cartSubtotal;


  return (
    <div>
      <BreadCrumb title={"Shop Cart"} curPage={"Cart Page"} />
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
              {/* checkout box */}
              <div className="cart-checkout-box">
                <form className="coupon" action="/">
                  <input
                    type="text"
                    name="coupon"
                    placeholder="Coupon Code..."
                    className="cart-page-input-text"
                  />
                  <input type="submit" value="Apply Coupon" />
                </form>
                <form className="cart-checkout" action="/">
                  <input type="submit" value="Update Cart" />
                  {/* <Link to="/check-out"><input type="submit" value="Proceed to Checkout" /></Link> */}
                  <div>
                    <CheckoutPage />
                  </div>
                </form>
              </div>


              {/* shopping box */}
              <div className="shiping-box">
                <div className="row">
                  {/* shipping  */}
                  <div className="col-md-6 col-12">
                    <div className="calculate-shiping">
                      <h3>Calculate Shipping</h3>
                      <div className="outline-select">
                        <select>
                          <option value="volvo">United Kingdom (UK)</option>
                          <option value="saab">Bangladesh</option>
                          <option value="saab">Pakisthan</option>
                          <option value="saab">India</option>
                          <option value="saab">Nepal</option>
                        </select>
                        <span className="select-icon">
                          <i className="icofont-rounded-down"></i>
                        </span>
                      </div>
                      <div className="outline-select shipping-select">
                        <select>
                          <option value="volvo">State/Country</option>
                          <option value="saab">Dhaka</option>
                          <option value="saab">Benkok</option>
                          <option value="saab">Kolkata</option>
                          <option value="saab">Kapasia</option>
                        </select>
                        <span className="select-icon">
                          <i className="icofont-rounded-down"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        name="coupon"
                        placeholder="Postcode/ZIP"
                        className="cart-page-input-text"
                      />
                      <button type="submit">Update Total</button>
                    </div>
                  </div>


                  {/* cart total */}
                  <div className="col-md-6 col-12">
                    <div className="cart-overview">
                      <h3>Cart Totals</h3>
                      <ul className="lab-ul">
                        <li>
                          <span className="pull-left">Cart Subtotal</span>
                          <p className="pull-right">$ {cartSubtotal.toFixed(2)}</p>
                        </li>
                        <li>
                          <span className="pull-left">
                            Shipping and Handling
                          </span>
                          <p className="pull-right">Free Shipping</p>
                        </li>
                        <li>
                          <span className="pull-left">Order Total</span>
                          <p className="pull-right">
                            $ {orderTotal.toFixed(2)}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CartPage;