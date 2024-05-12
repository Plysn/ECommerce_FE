import React, { useState, useEffect } from "react";
import { Table, Space, Button, Modal, Form, Input, Upload, Select, Checkbox } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import "../../assets/css/admin.css";
import SideMenu from "../../components/Side Menu/SideMenu";

const OrderManagement = () => {
  const fakeData = [
    {
      key: '1',
      id: 'OD001',
      name: 'Product 1',
      price: '1000',
      status: 'Đang chờ xử lý',
    },
    {
      key: '2',
      id: 'OD002',
      name: 'Product 2',
      price: '2000',
      status: 'Đã xử lý',
    },
    {
      key: '3',
      id: 'OD003',
      name: 'Product 3',
      price: '3000',
      status: 'Đơn hàng đã hủy',
    },
    {
      key: '4',
      id: 'OD004',
      name: 'Product 4',
      price: '4000',
      status: 'Đã giao hàng',
    },
  ];
  const [filterCategory, setFilterCategory] = useState("");

  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>Giao hàng</Button>
          <Button onClick={() => handleDelete(record.id)} danger>
            Hủy đơn hàng
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    // try {
    //   const response = await axios.get("your_api_url/products");
    //   setProducts(response.data);
    // } catch (error) {
    //   console.error("Error fetching products:", error);
    // }
  };

  const handleEdit = (record) => {
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


  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // Perform preview logic here
      const previewImage = reader.result;
      console.log(previewImage);
    };
  };

  const handleCategoryChange = (value) => {
    setFilterCategory(value);
  };

  const filteredProducts = fakeData.filter(
    (product) =>
      filterCategory === "" || product.status === filterCategory
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
          <Select.Option value="Category 3">Đã hủy</Select.Option>
          <Select.Option value="Category 1">Đang chờ xử lý</Select.Option>
          <Select.Option value="Category 2">Đã giao</Select.Option>
        </Select>
        <Table columns={columns} dataSource={filteredProducts} />
      </div>

    </div>
  );
};

export default OrderManagement;
