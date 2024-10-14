import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import video1 from '../../assets/video/video1.mp4';
import { UserOutlined, GoldOutlined, DollarOutlined } from '@ant-design/icons';

import './DashBoard.css';
import PaymentCustomer from '../../components/Profile/Payment/paymentCustomer';
import CustomeProfile from '../../components/Profile/CustomeProfile/CustomeProfile';

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
        return <div>My Fish Koi Component</div>;
      case 'payment':
        return <div><PaymentCustomer/></div>;
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
        style={{ height: '125vh', overflow: 'auto', position: 'relative' }}
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
        <Content style={{ position: 'relative', padding: 0, flex: 1 }}>
          <video className="background-video" autoPlay loop muted>
            <source src={video1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="content-wrapper">
            {renderComponent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashBoardPage;
