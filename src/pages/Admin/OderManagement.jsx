import { useState, useEffect } from "react";
import { Table, Space, Button, Select, message, Modal, Tag } from "antd";
import "../../assets/css/admin.css";
import orderApi from "../../services/oder";

const OrderManagement = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [isModalVisibleDeliver, setIsModalVisibleDeliver] = useState(false);
  const [isModalVisibleDelete, setIsModalVisibleDelete] = useState(false);
  const [orderIdSelected, setOrderIdSelected] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);

  const fetchData = async () => {
    try {
      const response = await orderApi.getOrders();
      setOrdersData(response.data.data);
    } catch (error) {
      if (error.response.message === "Unauthorized") {
        message.error("You are not authorized to view this page! Please login again");

      }
      else {
        message.error("An error occurred while fetching products");
      }
    }
  };

  const handleGetDataDetails = async (id) => {
    try {
      const response = await orderApi.getDetailOrder(id);
      setOrderDetails(response.data.data);
    } catch (error) {
      console.log(error);
      if (error.response.message === "Unauthorized") {
        message.error("You are not authorized to view this page! Please login again");

      }
      else {
        message.error("An error occurred while fetching products");
      }
    }
  };

  const handleViewDetails = (record) => {
    setIsModalVisible(true);
    handleGetDataDetails(record);
  };
  const handleOkDetails = () => {
    setIsModalVisible(false);
  };

  const handleCancelDetails = () => {
    setIsModalVisible(false);
  };

  // Delivered order
  const handleDeliver = (record) => {
    handleGetDataDetails(record.id);
    setIsModalVisibleDeliver(true);
    setOrderIdSelected(record.id);
  };

  const handleOkDeliver = async (id) => {
    try {
      const status = "shipping";
      await orderApi.updateStatusOrder(`${id}?status=${status}`);
      message.success("Deliver order successfully!");
      setIsModalVisibleDeliver(false);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancelDeliver = () => {
    setIsModalVisibleDeliver(false);
  };

  // Delete order
  const handleDelete = async (record) => {
    handleGetDataDetails(record.id);
    setIsModalVisibleDelete(true);
    setOrderIdSelected(record.id);
  };

  const handleOkDelete = async (id) => {
    try {
      await orderApi.deleteOrder(id);
      message.success("Delete order successfully!");
      setIsModalVisibleDelete(false);
      fetchData();
    } catch (error) {
      console.log(error);
      message.error("Delete order failed!");
    }
  };

  const handleCancelDelete = () => {
    setIsModalVisibleDelete(false);
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
      render: (record) => {
        console.log(record);
        return (<div
          style={{ color: "#1677ff", cursor: "pointer" }}
          onClick={() => {
            handleViewDetails(record);
          }}
        >
          See more
        </div>)
      }
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
      render: (record) => (
        <>
          {record === "created" && <Tag color="volcano">CREATED</Tag>}
          {record === "shipping" && <Tag color="blue">SHIPPING</Tag>}
          {record === "shipped" && <Tag color="green">SHIPPED</Tag>}
        </>
      )
    },
    {
      title: "Oder by",
      dataIndex: ["ordered_by", "username"],
      key: "oder_by",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "id",
      render: (text, record) => (
        <Space size="middle">
          {record.status !== "shipped" && record.status !== "shipping" && (
            <>
              <Button type="primary" onClick={() => handleDeliver(record)}>
                Deliver
              </Button>
              <Button onClick={() => handleDelete(record)} danger>
                Cancel Order
              </Button>
            </>
          )}
          {record.status === "shipped" && (
            <div>The order has been delivered</div>
          )}
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
      <Modal
        title="Deliver Order"
        visible={isModalVisibleDeliver}
        onOk={() => handleOkDeliver(orderIdSelected)}
        onCancel={handleCancelDeliver}
      >
        <Table columns={columnsOrderDetail} dataSource={orderDetails} />
      </Modal>
      <Modal
        title="Delete Order"
        subject="Are you sure you want to delete this order?"
        visible={isModalVisibleDelete}
        onOk={() => handleOkDelete(orderIdSelected)}
        onCancel={handleCancelDelete}
      >
        <Table columns={columnsOrderDetail} dataSource={orderDetails} />
      </Modal>
    </div>
  );
};

export default OrderManagement;
