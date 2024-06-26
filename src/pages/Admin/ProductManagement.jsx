import { useState, useEffect } from "react";
import {
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  Select,
  Image,
  InputNumber,
  Tag,
} from "antd";
import "../../assets/css/admin.css";
import { message } from "antd";
import productApi from "../../services/product";
import categoryApi from "../../services/category";
import { CloseCircleFilled, PlusOutlined } from "@ant-design/icons";

const ProductAdminPage = () => {
  const [filterCategory, setFilterCategory] = useState("");
  const [filterCategoryForAction, setFilterCategoryForAction] = useState("");

  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [form] = Form.useForm();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [productImg, setProductImg] = useState("");
  const [fileList, setFileList] = useState([]);

  // get data product and category
  const fetchData = async () => {
    try {
      const response = await productApi.getListProducts();
      setProducts(response.data.data);
      const categoryResponse = await categoryApi.getAdminCategories();
      setCategories(categoryResponse.data.data);
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
      render: (record) => (
        <span>{record ? record : <Tag color="volcano">SOLD</Tag>}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => showModalDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // Delete product
  const showModalDelete = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await productApi.deleteProduct(id);
      setIsModalVisible(false);
      fetchData();
      message.success("Product deleted successfully");
    } catch (error) {
      message.error("Product cannot be deleted!");
    }
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

  // Add product
  const openAddForm = () => {
    const maxId = Math.max(...products.map((product) => product.id));
    form.setFieldsValue({
      id: maxId + 1,
      name: "",
      price: "",
      quantity: 0,
      img: "",
      description: "",
    });
    setVisible(true);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    if (fileList.length > 0) {
      values.img = fileList[0].originFileObj;
    }
    try {
      await productApi.postProduct(values);
      setVisible(false);
      fetchData();
      message.success("Product added successfully");
    } catch (error) {
      if (error.response.data.message === "image is not allowed") {
        message.error("Please select product image");
      }
      message.error("Product cannot be added!");
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  // Edit product
  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setVisibleEdit(true);
    setSelectedProductId(record.id);
    setProductImg(record.image);
  };

  const handleOkEdit = async (id) => {
    const values = await form.validateFields();
    if (fileList.length > 0) {
      values.img = fileList[0].originFileObj;
    }
    console.log(values);
    try {
      await productApi.updateProduct(id, values);
      setVisibleEdit(false);
      fetchData();
      message.success("Product updated successfully");
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "image is not allowed") {
        message.error("Please select product image");
      }
      message.error("Product cannot be updated!");
    }
  };

  const handleCancelEdit = () => {
    setVisibleEdit(false);
  };

  const handleCategoryChange = (value) => {
    setFilterCategory(value);
  };

  const handleCategoryChangeForAction = (value) => {
    setFilterCategoryForAction(value);
  };

  const filteredProducts = products.filter(
    (product) =>
      filterCategory === "" || product.category.name === filterCategory
  );

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleRemoveImage = async (img, action) => {
    action.remove(img);
  };

  const handleRender = (__, img) => {
    let imgUploadUrl;
    if (!img.url) {
      imgUploadUrl = URL.createObjectURL(img.originFileObj);
    }

    return (
      <div className="img-item">
        <CloseCircleFilled
          className="remove-icon fz-16"
          onClick={() => handleRemoveImage(img)}
        />
        <div className="image-container">
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
          {categories.map((category) => (
            <Select.Option value={category.name} key={category.id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
        <Table
          columns={columns}
          dataSource={filteredProducts}
          pagination={{ pageSize: 8 }}
        />
        <Modal
          title="Add Product"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form}>
            <Form.Item label="ID Category" name="categoryId">
              <Select
                style={{ width: 200, marginBottom: 16 }}
                placeholder="Select Category"
                onChange={handleCategoryChangeForAction}
                value={filterCategoryForAction}
              >
                {categories.map((category) => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
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
            <Form.Item label="Quantity" name="stock">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Image" name="img">
              <Upload
                beforeUpload={() => false}
                name={`child_${name}`}
                className="upload"
                listType="picture-card"
                itemRender={handleRender}
                accept="image/png, image/jpeg"
                fileList={fileList}
                onChange={(fileList) => handleFileChange(fileList)}
              >
                <div className="btn-upload">
                  <PlusOutlined />
                  <span className="btn-text">Upload</span>
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
          onOk={() => handleOkEdit(selectedProductId)}
          onCancel={handleCancelEdit}
        >
          <Form form={form}>
            <Form.Item label="ID Category" name="categoryId">
              <Select
                style={{ width: 200, marginBottom: 16 }}
                placeholder="Select Category"
                onChange={handleCategoryChangeForAction}
                value={filterCategoryForAction}
              >
                {categories.map((category) => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
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
            <Form.Item label="Quantity" name="stock">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Image" name="img">
              <Upload
                beforeUpload={() => false}
                name={`child_${name}`}
                className="upload"
                listType="picture-card"
                itemRender={handleRender}
                accept="image/png, image/jpeg"
                fileList={fileList}
                onChange={(fileList) => handleFileChange(fileList)}
              >
                <div className="btn-upload">
                  <PlusOutlined />
                  <span className="btn-text">Upload</span>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Confirm Delete"
          visible={isModalVisible}
          onOk={() => handleDelete(selectedRecord.id)}
          onCancel={() => handleCancelDelete()}
        >
          <p>
            Are you sure you want to delete this product:
            <div>{selectedRecord?.name}?</div>
          </p>
        </Modal>
      </div>
    </div>
  );
};

export default ProductAdminPage;
