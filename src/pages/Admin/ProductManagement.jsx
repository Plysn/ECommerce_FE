import React, { useState, useEffect } from "react";
import { Table, Space, Button, Modal, Form, Input, Upload, Select, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import "../../assets/css/admin.css";
import { message } from "antd";
import productApi from "../../services/product";
import categoryApi from "../../services/category";
import { CloseCircleFilled, PlusOutlined } from '@ant-design/icons';

const ProductAdminPage = () => {
  const [filterCategory, setFilterCategory] = useState("");

  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [form] = Form.useForm();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    try {
      const response = await productApi.getListProducts();
      setProducts(response.data.data);
      const categoryResponse = await categoryApi.getAdminCategories();
      setCategories(categoryResponse.data.data); // assuming you have a state variable 'categories'
    } catch (error) {
      message.error(error);
    }
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
      dataIndex: ["category", "name"],
      key: "category",
    },
    {
      title: "Quantity",
      dataIndex: "stock",
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


  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setVisibleEdit(true);
  };

  const handleDelete = async (id) => {
    // try {
    //   await axios.delete(`your_api_url/products/${id}`);
    //   fetchData();
    // } catch (error) {
    //   console.error("Error deleting product:", error);
    // }
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    const imgs = values.image.fileList?.map((img) => { return img.originFileObj.name });
    console.log(imgs);
    try {
      const response = await productApi.postProduct(imgs);

      // setVisible(false);
      // fetchData();
    } catch (error) {
      if (error.response.data.message === "image is not allowed") {
        message.error("Vui lòng chọn ảnh sản phẩm")
      }
    }
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

  const filteredProducts = products.filter(
    (product) =>
      filterCategory === "" || product.category.name === filterCategory
  );

  const openAddForm = () => {
    const maxId = Math.max(...products.map(product => product.id));
    form.setFieldsValue({
      id: maxId + 1,
      name: '',
      price: '',
      quantity: '',
      image: [],
      description: ''
    });
    setVisible(true);
  };

  const handleRender = (__, img, _, action) => {
    let imgUploadUrl;
    if (!img.url) {
      imgUploadUrl = URL.createObjectURL(img.originFileObj);
    }

    return (
      <div className="img-item">
        <Image
          rootClassName="modal-preview-img"
          className="img"
          src={img?.thumb?.url || img?.url || imgUploadUrl}
          preview={{
            src: img?.url,
          }}
          alt={img?.name}
        />
      </div>
    );
  };

  return (
    <div className="admin-page-product">
      <div className="container">
        <Button onClick={() => openAddForm()}>Add Product</Button>
        <Select
          style={{ width: 200, marginBottom: 16 }}
          placeholder="Filter by Category"
          onChange={handleCategoryChange}
          value={filterCategory}
        >
          <Select.Option value="">All</Select.Option>
          {categories.map((category) => (<Select.Option value={category.name}>{category.name}</Select.Option>))}
        </Select>
        <Table columns={columns} dataSource={filteredProducts} />
        <Modal
          title="Add Product"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form}>
            <Form.Item label="ID" name="categoryId">
              <Input />
              {/* <Select
                style={{ width: 200, marginBottom: 16 }}
                placeholder="Filter by Category"
                onChange={handleCategoryChange}
                value={filterCategory}
              /> */}
            </Form.Item>
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Price" name="price">
              <Input />
            </Form.Item>
            <Form.Item label="Seller" name="seller">
              <Input />
            </Form.Item>
            <Form.Item label="Quantity" name="ratings">
              <Input />
            </Form.Item>
            <Form.Item label="Image" name="image">
              <Upload
                beforeUpload={() => false}
                name={`child_${name}`}
                className="upload"
                listType="picture-card"
                itemRender={handleRender}
                accept="image/png, image/jpeg"
                multiple
                onChange={({ fileList }) => {
                  // Get the url of each file
                  const imageUrls = fileList.map(file => file.response.url);
                  // Now you can set the imageUrls to your form or state
                  form.setFieldsValue({ image: imageUrls });
                }}
              ><div className="btn-upload">
                  <PlusOutlined className="fz-25" />
                  <span className="btn-text fz-11 sub-color-text">
                    Upload
                  </span>

                </div>
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
            <Form.Item label="Quantity" name="stock">
              <Input />
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

    </div >
  );
};

export default ProductAdminPage;
