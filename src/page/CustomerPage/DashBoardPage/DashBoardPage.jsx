import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, GoldOutlined, DollarOutlined } from '@ant-design/icons';
import './DashBoard.css';
import CustomerFish from '../../../components/Customer-Page/Customer-Body/CustomerFish/CustomerFish';
import CustomeProfile from '../../../components/Customer-Page/Customer-Body/CustomeProfile/CustomeProfile';
import PaymentCustomer from '../../../components/Customer-Page/Customer-Body/Payment/paymentCustomer';

const { Sider, Content } = Layout;

function DashBoardPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeComponent, setActiveComponent] = useState('profile');

  // Hàm render component
  const renderComponent = () => {
    switch (activeComponent) {
      case 'profile':
        return <CustomeProfile />;
      case 'fishKoi':
        return <CustomerFish />;
      case 'payment':
        return <PaymentCustomer />;
      default:
        return <CustomeProfile />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed) => setCollapsed(collapsed)}
        collapsedWidth={60}
        style={{ height: '100vh', overflow: 'auto', position: 'relative' }}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={['profile']}
          mode="inline"
          onClick={(e) => setActiveComponent(e.key)}
        >
          <Menu.Item key="profile" icon={<UserOutlined />}>
            My Profile
          </Menu.Item>
          <Menu.Item key="fishKoi" icon={<GoldOutlined />}>
            My Fish Koi
          </Menu.Item>
          <Menu.Item key="payment" icon={<DollarOutlined />}>
            My Payment
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Content style={{ padding: 0, flex: 1 }}>
          <div className="content-wrapper">
            {renderComponent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashBoardPage;
