import React, { useState, useEffect } from "react";
import { Table, Space, Button, Modal, Form, Input, Upload, Select, Checkbox } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import "../../assets/css/admin.css";
import Data from "../../data/products.json";
import SideMenu from "../../components/Side Menu/SideMenu";

const ProductAdminPage = () => {
  const [filterCategory, setFilterCategory] = useState("");

  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
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
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.id)} danger>
            Delete
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
    setVisibleEdit(true);
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
  const handleOkEdit = (record) => { setVisibleEdit(false) }
  const handleCancelEdit = () => { setVisibleEdit(false) }

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

  const filteredProducts = Data.filter(
    (product) =>
      filterCategory === "" || product.category === filterCategory
  );

  return (
    <div className="admin-page-product">
      <div className="container">
        <Button onClick={() => setVisible(true)}>Add Product</Button>
        <Select
          style={{ width: 200, marginBottom: 16 }}
          placeholder="Filter by Category"
          onChange={handleCategoryChange}
          value={filterCategory}
        >
          <Select.Option value="">All</Select.Option>
          <Select.Option value="Category 1">Category 1</Select.Option>
          <Select.Option value="Category 2">Category 2</Select.Option>
          <Select.Option value="Category 3">Category 3</Select.Option>
        </Select>
        <Table columns={columns} dataSource={filteredProducts} />
        <Modal
          title="Add Product"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form}>
            <Form.Item label="ID" name="id">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Price" name="price">
              <Input />
            </Form.Item>
            <Form.Item label="Quantity" name="quantity">
              <Input />
            </Form.Item>
            <Form.Item label="Color" name="color">
              <Checkbox.Group>
                <Checkbox value="Red">Red</Checkbox>
                <Checkbox value="Blue">Blue</Checkbox>
                <Checkbox value="Green">Green</Checkbox>
                <Checkbox value="Yellow">Yellow</Checkbox>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item label="Image" name="image">
              <Upload beforeUpload={handleUpload} accept="image/*" multiple={true} maxCount={20}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Edit Product"
          visible={visibleEdit}
          onOk={handleEdit}
          onCancel={handleCancelEdit}
        >
          <Form form={form}>
            <Form.Item label="ID" name="id">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Price" name="price">
              <Input />
            </Form.Item>
            <Form.Item label="Quantity" name="quantity">
              <Input />
            </Form.Item>
            <Form.Item label="Color" name="color">
              <Checkbox.Group>
                <Checkbox value="Red">Red</Checkbox>
                <Checkbox value="Blue">Blue</Checkbox>
                <Checkbox value="Green">Green</Checkbox>
                <Checkbox value="Yellow">Yellow</Checkbox>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item label="Image" name="image">
              <Upload beforeUpload={handleUpload} accept="image/*" multiple={true} maxCount={20}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Modal>
      </div>

    </div>
  );
};

export default ProductAdminPage;
