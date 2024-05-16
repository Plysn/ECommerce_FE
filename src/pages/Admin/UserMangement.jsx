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
} from "antd";
import "../../assets/css/admin.css";
import usersApi from "../../services/users";

const UserMangement = () => {
  const [usersData, setUsersData] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");

  const [visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchData = async () => {
    try {
      const response = await usersApi.getListUsers();
      setUsersData(response.data.data);
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
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
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (record) => <p>{new Date(record).toLocaleString()}</p>,
    },
    {
      title: "Action",
      key: "id",
      render: (record) => (
        <Space size="middle">
          {record.role === "admin" ? null : (
            <>
              <Button type="primary" danger onClick={showModal}>
                Delete
              </Button>
              <Modal
                title="Confirm Delete"
                visible={isModalVisible}
                onOk={() => handleOkDelete(record.id)}
                onCancel={() => handleCancelDelete}
              >
                <p>Are you sure you want to delete this user?</p>
              </Modal>
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
      </div>
    </div>
  );
};

export default UserMangement;
