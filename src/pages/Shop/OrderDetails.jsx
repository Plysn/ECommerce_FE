import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import BreadCrumb from "../../components/Breadcrumb/BreadCrumb";
import { Link } from 'react-router-dom';
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

const OrderDetails = () => {
  const location = useLocation();
  const { orderId, amount, paymentMethod, created_at } = location.state || {};
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axiosInstance.get(`/orders/${orderId}`);
        setOrderDetails(response.data);
      } catch (error) {
        console.error('Error fetching order details', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <BreadCrumb
            title={"Our Shop Pages"}
            curPage={"Order Details"}
        />
        <div className="" style={{ paddingTop:'0px', paddingLeft:'50px' , width: '30rem' }}>
        <p>● Order ID: {orderId}</p>
        <p>● Amount: ${amount}</p>   
        <p>● Payment Method: {paymentMethod}</p>
        <p>● Time: {created_at}</p>
        </div>
    </div>
  );
};

export default OrderDetails;