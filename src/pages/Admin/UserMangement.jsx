import { useState, useEffect } from "react";
import {
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Tag,
} from "antd";
import "../../assets/css/admin.css";
import usersApi from "../../services/users";

const UserMangement = () => {
  const [usersData, setUsersData] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");

  const [visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUsertId, setSelectedUserId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await usersApi.getListUsers();
      setUsersData(response.data.data);
    } catch (error) {
      message.error(error);
      if (error.response.message === "Unauthorized") {
        message.error(
          "You are not authorized to view this page! Please login again"
        );
      } else {
        message.error("An error occurred while fetching products");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showModal = (record) => {
    setIsModalVisible(true);
    setSelectedUserId(record);
  };

  const handleOkDelete = async (id) => {
    try {
      await usersApi.deleteUsers(id);
      message.success("Delete user successfully!");
      setIsModalVisible(false);
      fetchData();
    } catch (error) {
      message.error("Delete user failed!");
    }
  };

  const handleCancelDelete = () => {
    console.log("Clicked cancel button");
    setIsModalVisible(false);
  };
  const handleOk = async () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const [form] = Form.useForm();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (record) =>
        record === "admin" ? (
          <Tag color="volcano">ADMIN</Tag>
        ) : (
          <Tag color="blue">USER</Tag>
        ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (record) => record !== "/0" && <div>{record}</div>,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (record) => <div>{new Date(record).toLocaleString()}</div>,
    },
    {
      title: "Action",
      key: "id",
      render: (record) => (
        <Space size="middle">
          {record.role === "admin" ? null : (
            <>
              <Button type="primary" danger onClick={() => showModal(record)}>
                Delete
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  const handleCategoryChange = (value) => {
    setFilterCategory(value);
  };

  const filteredUser = usersData.filter(
    (user) => filterCategory === "" || user.role === filterCategory
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
          <Select.Option value="user">User</Select.Option>
          <Select.Option value="admin">Admin</Select.Option>
        </Select>
        <Table
          className="custom-table"
          columns={columns}
          dataSource={filteredUser}
          pagination={{ pageSize: 8 }}
        />
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
        <Modal
          title="Confirm Delete"
          visible={isModalVisible}
          onOk={() => handleOkDelete(selectedUsertId.id)}
          onCancel={handleCancelDelete}
        >
          <p>
            Are you sure you want to delete this user?
            <div>{selectedUsertId?.username}</div>
          </p>
        </Modal>
      </div>
    </div>
  );
};

export default UserMangement;
