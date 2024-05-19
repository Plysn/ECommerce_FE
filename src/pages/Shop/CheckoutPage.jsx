import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

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

const CheckoutPage = (props) => {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState("visa"); // Initial active tab

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // order confirmation and redirect to home page
  const navigate = useNavigate();


  const handleOrderConfirm = async (e) => {
    const paymentMethod = activeTab === "visa" ? "visa" : "paypal";
    try {
      const response = await axiosInstance.post(`/orders/create`, {
        amount: props.amount, // Include the amount in the request body
        paymentMethod: paymentMethod // Include the payment method in the request body
      });
      console.log('Order created: ', response.data);
      const orderId = response.data.data.id;
      console.log(orderId)
      setShow(false);
      navigate(`/order-details/${orderId}`, { state: {
        orderId: response.data.data.id,
        amount: response.data.data.amount,
        paymentMethod: response.data.data.payment_method
    } });
    } catch (error) {
      console.error('Error creating order', error.response?.data || error.message);
    }
  };

  return (
    <div className="modalCard">
      <Button variant="primary" onClick={handleShow} className="py-2">
        Proceed to Checkout
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="modal fade"
        centered
      >
        <div className="modal-dialog">
          <h5 className="px-3 mb-3">Select Your Payment Method</h5>
          <div className="modal-content">
            <div className="modal-body">
              <div className="tabs mt-3">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <a
                      className={`nav-link ${activeTab === "visa" ? "active" : ""}`}
                      id="visa-tab"
                      data-toggle="tab"
                      href="#visa"
                      role="tab"
                      aria-controls="visa"
                      aria-selected={activeTab === "visa"}
                      onClick={() => handleTabChange("visa")}
                    >
                      <img src="https://i.imgur.com/sB4jftM.png" width="80" />
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      className={`nav-link ${activeTab === "paypal" ? "active" : ""}`}
                      id="paypal-tab"
                      data-toggle="tab"
                      href="#paypal"
                      role="tab"
                      aria-controls="paypal"
                      aria-selected={activeTab === "paypal"}
                      onClick={() => handleTabChange("paypal")}
                    >
                      <img src="https://i.imgur.com/yK7EDD1.png" width="80" />
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  {/* visa content */}
                  <div
                    className={`tab-pane fade ${activeTab === "visa" ? "show active" : ""}`}
                    id="visa"
                    role="tabpanel"
                    aria-labelledby="visa-tab"
                  >
                    {/* Visa tab content */}
                    {/* <div className="mt-4 mx-4">
                      <div className="text-center">
                        <h5>Credit card</h5>
                      </div>
                      <div className="form mt-3">
                        <div className="inputbox">
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            required="required"
                          />
                          <span>Cardholder Name</span>
                        </div>
                        <div className="inputbox">
                          <input
                            type="text"
                            name="name"
                            min="1"
                            max="999"
                            className="form-control"
                            required="required"
                          />
                          <span>Card Number</span> <i className="fa fa-eye"></i>
                        </div>
                        <div className="d-flex flex-row">
                          <div className="inputbox">
                            <input
                              type="text"
                              name="name"
                              min="1"
                              max="999"
                              className="form-control"
                              required="required"
                            />
                            <span>Expiration Date</span>
                          </div>
                          <div className="inputbox">
                            <input
                              type="text"
                              name="name"
                              min="1"
                              max="999"
                              className="form-control"
                              required="required"
                            />
                            <span>CVV</span>
                          </div>
                        </div>
                        <div className="px-5 pay">
                          <button
                            className="btn btn-success btn-block"
                            onClick={handleOrderConfirm}
                          >
                            Add card
                          </button>
                        </div>
                      </div>
                    </div> */}
                    <div>
  {/* Cardholder Name */}
                      <div className="inputbox">
                        <span>Cardholder Name</span>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          required="required"
                          placeholder="Phil Foden"
                        />
                        
                      </div>

                      {/* Card Number */}
                      <div className="inputbox">
                        <span>Card Number</span> <i className="fa fa-eye"></i>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          required="required"
                          placeholder="1604 2004 2810 2003"
                        />
                        
                      </div>

                      {/* Exp Date and CVV */}
                      <div className="d-flex flex-row">

                        <div className="inputbox">
                          <span>Exp Date</span>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            required="required"
                            placeholder="08/26"
                          />
                          
                        </div>
                        <div className="inputbox">
                          <span>CVV</span>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            required="required"
                            placeholder="219"
                          />
                          
                        </div>
                      </div>
                      <div className="px-5 pay">
                          <button
                            className="btn btn-success btn-block"
                            onClick={handleOrderConfirm}
                          >
                            Add card
                          </button>
                      </div>
                    </div>

                  </div>
                  {/* paypal content */}

                  <div
                    className={`tab-pane fade ${activeTab === "paypal" ? "show active" : ""}`}
                    id="paypal"
                    role="tabpanel"
                    aria-labelledby="paypal-tab"
                  >
                    {/* Paypal tab content */}
                    <div>
                      {/* Name */}
                      <div className="inputbox">
                        <span>Name</span>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          required="required"
                          placeholder="Phil Foden"
                        />
                        
                      </div>

                      {/* Email */}
                      <div className="inputbox">
                        <span>Email</span>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          required="required"
                          // pattern="[a-z0-9._%+-]+@gmail.com"
                          placeholder="cartshopweb@gmail.com"
                        />
                        
                      </div>

                      {/* Password */}
                      <div className="inputbox">
                        <span>Password</span>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          required="required"
                          minLength="8"
                          // placeholder="********"
                        />
                        
                      </div>
                    </div>
                    <div className="px-5 pay">
                      <button
                        className="btn btn-success btn-block"
                        onClick={handleOrderConfirm}
                      >
                        Add paypal
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* payment disclaimer */}
              <p className="mt-3 px-4 p-Disclaimer">
                <em>Payment Disclaimer:</em> In no event shall payment or
                partial payment by Owner for any material or service
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CheckoutPage;
