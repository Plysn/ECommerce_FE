import { useState, useEffect } from "react";
import { Table, Space, Button, Form, Select, message, Modal } from "antd";
import "../../assets/css/admin.css";
import orderApi from "../../services/oder";

const OrderManagement = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");

  const [visible, setVisible] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);

  const [form] = Form.useForm();

  const fetchData = async () => {
    try {
      const response = await orderApi.getOrders();
      setOrdersData(response.data.data);
    } catch (error) {
      message.error(error);
    }
  };

  const handleViewDetails = async (id) => {
    try {
      const response = await orderApi.getDetailOrder(id);
      console.log(response.data);
      setOrderDetails(response.data.data);
      setIsModalVisible(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOkDetails = () => {
    setIsModalVisible(false);
  };

  const handleCancelDetails = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product Name",
      dataIndex: "id",
      key: "id",
      render: (record) => (
        <div
          style={{ color: "#1677ff", cursor: "pointer" }}
          onClick={() => {
            handleViewDetails(record);
          }}
        >
          See more
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "amount",
      key: "amount",
    },

    {
      title: "Payment",
      dataIndex: "payment_method",
      key: "payment_method",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Oder by",
      dataIndex: ["ordered_by", "username"],
      key: "oder_by",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {record.status !== "shipped" && record.status !== "shipping" && (
            <Button type="primary" onClick={() => handleDeliver(record)}>
              Deliver
            </Button>
          )}
          {record.status !== "shipped" && (
            <Button onClick={() => handleDelete(record.id)} danger>
              Cancel Order
            </Button>
          )}
          {record.status === "shipped" && <div>Don hang da duoc giao</div>}
        </Space>
      ),
    },
  ];

  const columnsOrderDetail = [
    {
      title: "ID Order",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product Name",
      dataIndex: ["product", "name"],
      key: "id",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Seller",
      dataIndex: ["product", "seller"],
      key: "seller",
    },
  ];

  const handleDeliver = (record) => {
    form.setFieldsValue(record);
    setVisible(true);
  };

  const handleDelete = async (id) => {
    // try {
    //   await axios.delete(`your_api_url/products/${id}`);
    //   fetchProducts();
    // } catch (error) {
    //   console.error("Error deleting product:", error);
    // }
  };

  const handleOk = async () => {
    // try {
    //   const values = await form.validateFields();
    //   await axios.put(`your_api_url/products/${values.id}`, values);
    //   setVisible(false);
    //   fetchProducts();
    // } catch (error) {
    //   console.error("Error updating product:", error);
    // }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCategoryChange = (value) => {
    setFilterCategory(value);
  };

  const filteredProducts = ordersData.filter(
    (product) => filterCategory === "" || product.status === filterCategory
  );

  return (
    <div className="admin-page-product">
      <div className="container">
        <Select
          style={{ width: 200, marginBottom: 16 }}
          placeholder="Filter by Category"
          onChange={handleCategoryChange}
          value={filterCategory}
        >
          <Select.Option value="">All</Select.Option>
          <Select.Option value="processing">Processing</Select.Option>
          <Select.Option value="created">Created</Select.Option>
          <Select.Option value="shipping">Shipping</Select.Option>
          <Select.Option value="shipped">Shipped</Select.Option>
        </Select>
        <Table columns={columns} dataSource={filteredProducts} />
      </div>
      <Modal
        title="Order Details"
        visible={isModalVisible}
        onOk={handleOkDetails}
        onCancel={handleCancelDetails}
      >
        <Table columns={columnsOrderDetail} dataSource={orderDetails} />
      </Modal>
    </div>
  );
};

export default OrderManagement;
