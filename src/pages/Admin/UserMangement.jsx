import React, { useState, useEffect } from "react";
import { Table, Space, Button, Modal, Form, Input, Select } from "antd";
import "../../assets/css/admin.css";

const UserMangement = () => {
  const usersData = [
    {
      key: '1',
      id: 'U001',
      name: 'User 1',
      email: 'user1@example.com',
      password: 'password1',
    },
    {
      key: '2',
      id: 'U002',
      name: 'User 2',
      email: 'user2@example.com',
      password: 'password2',
    },
    {
      key: '3',
      id: 'U003',
      name: 'User 3',
      email: 'user3@example.com',
      password: 'password3',
    },
    {
      key: '4',
      id: 'U004',
      name: 'User 4',
      email: 'user4@example.com',
      password: 'password4',
    },
  ];
  const [filterCategory, setFilterCategory] = useState("");

  const [visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // thực hiện xóa người dùng tại đây
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [form] = Form.useForm();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" danger onClick={showModal}>
            Delete
          </Button>
          <Modal title="Confirm Delete" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>Are you sure you want to delete this user?</p>
          </Modal>
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

  const filteredProducts = usersData.filter(
    (product) =>
      filterCategory === "" || product.category === filterCategory
  );

  return (
    <div className="admin-page-product">
      <div className="container">
        <Button onClick={() => setVisible(true)}>Add Admin</Button>
        <Select
          style={{ width: 200, marginBottom: 16 }}
          placeholder="Filter by Category"
          onChange={handleCategoryChange}
          value={filterCategory}
        >
          <Select.Option value="">All</Select.Option>
          <Select.Option value="Category 1">User</Select.Option>
          <Select.Option value="Category 2">Admin</Select.Option>
        </Select>
        <Table columns={columns} dataSource={filteredProducts} />
        <Modal
          title="Add Admin"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form}>
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="User Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>

    </div>
  );
};

export default UserMangement;
