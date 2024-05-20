import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import BreadCrumb from "../../components/Breadcrumb/BreadCrumb";
import Button from 'react-bootstrap/Button';

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

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('access_token'));
    if (!token) {
      navigate('/sign-in'); // Chuyển hướng đến trang đăng nhập nếu không có token
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/orders');
        setOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching orders', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const handleDelete = async (orderId) => {
    try {
      await axiosInstance.delete(`/orders/delete/${orderId}`);
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('Error deleting order', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (orders.length === 0) {
    return <div style={{ color: 'red', fontSize: '24px', paddingTop: '100px', paddingLeft: '50px' }}>There are no orders yet!</div>;
  }

  return (
    <div>
      <BreadCrumb
        title={"Our Shop Pages"}
        curPage={"Order History"}
      />
      <div className="container mt-4">
        <h3 className="mb-4">Order History</h3>
        <div className="list-group">
          {orders.map((order) => (
            <div key={order.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <div><strong>Order ID:</strong> {order.id}</div>
                <div><strong>Amount:</strong> ${order.amount}</div>
                {/* <div><strong>Payment Method:</strong> {order.payment_method}</div> */}
              </div>
              <div>
                <Link
                  to={`/order-details/${order.id}`}
                  state={{ 
                    orderId: order.id, 
                    amount: order.amount, 
                    paymentMethod: order.payment_method,
                    created_at: order.created_at  
                  }}
                  className="btn btn-primary mr-2"
                >
                  View Details
                </Link>
                <Button variant="danger" onClick={() => handleDelete(order.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
