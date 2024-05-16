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
          <Modal
            title="Confirm Delete"
            visible={isModalVisible}
            onOk={() => handleDelete(selectedRecord.id)}
            onCancel={() => handleCancelDelete()}
          >
            <p>
              Are you sure you want to delete this product:
              {selectedRecord?.name}?
            </p>
          </Modal>
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
      quantity: "",
      image: [],
      description: "",
    });
    setVisible(true);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    let imgs = [];
    if (values.image) {
      imgs = values.image.fileList?.map((img) => {
        return img.originFileObj.name;
      });
    }
    values.image = imgs;
    console.log(values);

    try {
      await productApi.postProduct(values);

      // setVisible(false);
      // fetchData();
    } catch (error) {
      if (error.response.data.message === "image is not allowed") {
        message.error("Vui lòng chọn ảnh sản phẩm");
      }
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
  };

  const handleOkEdit = async (id) => {
    console.log(id);
    const values = await form.validateFields();
    const imgs = values?.image?.fileList?.map((img) => {
      return img.originFileObj.name;
    });
    values.image = imgs || [];
    console.log(values);

    try {
      await productApi.updateProduct(id, { ...values });
      message.success("Product updated successfully");
      setVisibleEdit(false);
      fetchData();
    } catch (error) {
      if (error.response.data.message === "image is not allowed") {
        message.error("Vui lòng chọn ảnh sản phẩm");
      }
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

  // Upload image
  const handleRemoveImage = async (img, action) => {
    // if (img.id) {
    //   try {
    //     const thumbsListWithImg = initialFileList.filter(
    //       (file) =>
    //         file?.attachment_type === "before" &&
    //         file?.type === "image_thumbnail" &&
    //         file?.parent_id === img?.id
    //     );
    //     const res = await contructItemApi.removeImageContruct(constructId, {
    //       file_id: img?.id,
    //     });
    //     if (!res.is_result) return;
    //     action.remove();
    //     thumbsListWithImg.forEach(handleRemoveThumb);
    //     initialFileList = initialFileList.filter((file) => file.id !== img.id);
    //     setFileList(initialFileList);
    //   } catch (error) {
    //     message.error(
    //       error?.response?.data?.message || t("message.error_system"),
    //       3
    //     );
    //   }
    // } else {
    //   action.remove();
    // }
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
          onClick={() => handleRemoveImage(img, action)}
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
        <Table columns={columns} dataSource={filteredProducts} />
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
            <Form.Item label="Quantity" name="ratings">
              <Input />
            </Form.Item>
            <Form.Item label="Image">
              <Upload
                beforeUpload={() => false}
                name={`child_${name}`}
                className="upload"
                listType="picture-card"
                itemRender={handleRender}
                accept="image/png, image/jpeg"
                multiple
                onChange={({ fileList }) => {
                  console.log(fileList); // Check the value of fileList
                  const imageUrls = fileList?.map((file) => {
                    console.log(file.response.url); // Check the value of file.response.url
                    return file?.response?.url;
                  });
                  console.log(imageUrls); // Check the value of imageUrls
                  form.setFieldsValue({ image: imageUrls });
                }}
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
            <Form.Item label="Quantity" name="stock">
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
                  const imageUrls = fileList.map((file) => file.response.url);
                  // Now you can set the imageUrls to your form or state
                  form.setFieldsValue({ image: imageUrls });
                }}
              >
                <div className="btn-upload">
                  <PlusOutlined className="fz-25" />
                  <span className="btn-text fz-11 sub-color-text">Upload</span>
                </div>
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
