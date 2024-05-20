import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://ecommercebackend-953d.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Setup an interceptor to add Bearer Token to each request
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
  const [activeTab, setActiveTab] = useState("visa");

  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paypalName, setPaypalName] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [paypalPassword, setPaypalPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});


  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    if (activeTab === "visa") {
      if (!cardholderName) errors.cardholderName = "Cardholder Name is required.";
      if (!cardNumber) errors.cardNumber = "Card Number is required.";
      if (!expDate) errors.expDate = "Exp Date is required.";
      if (!cvv) errors.cvv = "CVV is required.";
    } else if (activeTab === "paypal") {
      if (!paypalName) errors.paypalName = "Name is required.";
      if (!paypalEmail) errors.paypalEmail = "Email is required.";
      if (!paypalPassword) errors.paypalPassword = "Password is required.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOrderConfirm = async (e) => {
    if (!validateForm()) return;

    const paymentMethod = activeTab === "visa" ? "visa" : "paypal";
    try {
      const response = await axiosInstance.post(`/orders/create`, {
        amount: props.amount,
        paymentMethod: paymentMethod
      });
      console.log('Order created: ', response.data);
      const orderId = response.data.data.id;
      setShow(false);
      navigate(`/order-details/${orderId}`, {
        state: {
          orderId: response.data.data.id,
          amount: response.data.data.amount,
          paymentMethod: response.data.data.payment_method,
          created_at: response.data.data.created_at
        }
      });
    } catch (error) {
      console.error('Error creating order', error.response?.data || error.message);
    }
  };
  

  return (
    <div className="modalCard">
      <Button variant="primary" onClick={handleShow} className="py-2">
        Proceed to Checkout
      </Button>

      <Modal show={show} onHide={handleClose} animation={false} centered>
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
                      <img src="https://i.imgur.com/sB4jftM.png" width="80" alt="Visa"/>
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
                      <img src="https://i.imgur.com/yK7EDD1.png" width="80" alt="PayPal"/>
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  {/* Visa content */}
                  <div
                    className={`tab-pane fade ${activeTab === "visa" ? "show active" : ""}`}
                    id="visa"
                    role="tabpanel"
                    aria-labelledby="visa-tab"
                  >
                    <div>
                      <div className="inputbox">
                        <span>Cardholder Name</span>
                        <input
                          type="text"
                          name="cardholderName"
                          className="form-control"
                          placeholder="Phil Foden"
                          value={cardholderName}
                          onChange={(e) => setCardholderName(e.target.value)}
                          required
                        />
                        {formErrors.cardholderName && <div style={{ color: 'red' }}>{formErrors.cardholderName}</div>}
                      </div>
                      <div className="inputbox">
                        <span>Card Number</span> <i className="fa fa-eye"></i>
                        <input
                          type="text"
                          name="cardNumber"
                          className="form-control"
                          placeholder="1604 2004 2810 2003"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          required
                        />
                        {formErrors.cardNumber && <div style={{ color: 'red' }}>{formErrors.cardNumber}</div>}
                      </div>
                      <div className="d-flex flex-row">
                        <div className="inputbox">
                          <span>Exp Date</span>
                          <input
                            type="text"
                            name="expDate"
                            className="form-control"
                            placeholder="08/26"
                            value={expDate}
                            onChange={(e) => setExpDate(e.target.value)}
                            required
                          />
                          {formErrors.expDate && <div style={{ color: 'red' }}>{formErrors.expDate}</div>}
                        </div>
                        <div className="inputbox">
                          <span>CVV</span>
                          <input
                            type="text"
                            name="cvv"
                            className="form-control"
                            placeholder="219"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            required
                          />
                          {formErrors.cvv && <div style={{ color: 'red' }}>{formErrors.cvv}</div>}
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
                  {/* Paypal content */}
                  <div
                    className={`tab-pane fade ${activeTab === "paypal" ? "show active" : ""}`}
                    id="paypal"
                    role="tabpanel"
                    aria-labelledby="paypal-tab"
                  >
                    <div>
                      <div className="inputbox">
                        <span>Name</span>
                        <input
                          type="text"
                          name="paypalName"
                          className="form-control"
                          placeholder="Phil Foden"
                          value={paypalName}
                          onChange={(e) => setPaypalName(e.target.value)}
                          required
                        />
                        {formErrors.paypalName && <div style={{ color: 'red' }}>{formErrors.paypalName}</div>}
                      </div>
                      <div className="inputbox">
                        <span>Email</span>
                        <input
                          type="email"
                          name="paypalEmail"
                          className="form-control"
                          placeholder="cartshopweb@gmail.com"
                          value={paypalEmail}
                          onChange={(e) => setPaypalEmail(e.target.value)}
                          required
                        />
                        {formErrors.paypalEmail && <div style={{ color: 'red' }}>{formErrors.paypalEmail}</div>}
                      </div>
                      <div className="inputbox">
                        <span>Password</span>
                        <input
                          type="password"
                          name="paypalPassword"
                          className="form-control"
                          value={paypalPassword}
                          onChange={(e) => setPaypalPassword(e.target.value)}
                          required
                        />
                        {formErrors.paypalPassword && <div style={{ color: 'red' }}>{formErrors.paypalPassword}</div>}
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
              <p className="mt-3 px-4 p-Disclaimer">
                <em>Payment Disclaimer:</em> In no event shall payment or partial payment by Owner for any material or service...
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CheckoutPage;
