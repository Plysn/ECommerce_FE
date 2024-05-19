import React from 'react';
import { Layout, Menu } from 'antd';
import {
  ProductOutlined,
  UserOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import ProductAdminPage from './ProductManagement';
import UserMangement from './UserMangement';
import OrderManagement from './OderManagement';

const { Header, Sider, Content } = Layout;

const Admin = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [selectedKey, setSelectedKey] = React.useState('1');

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = e => {
    setSelectedKey(e.key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }} className="admin-page">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu theme="light" mode="inline" defaultSelectedKeys='products' onClick={handleMenuClick} className="side-menu">
          <Menu.Item key="products" icon={<ProductOutlined />}>Products
          </Menu.Item>
          <Menu.Item key="order" icon={<ShoppingCartOutlined />}>
            Order
          </Menu.Item>
          <Menu.Item key="user" icon={<UserOutlined />}>
            User
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content
          className="site-layout-content"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {selectedKey === 'products' && <ProductAdminPage />}
          {selectedKey === 'order' && <OrderManagement />}
          {selectedKey === 'user' && <UserMangement />}
        </Content>
      </Layout>
    </Layout >
  );
};

export default Admin;