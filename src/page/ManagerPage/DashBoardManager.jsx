import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, GoldOutlined, DollarOutlined, AppstoreOutlined } from '@ant-design/icons';
import ManagerProfile from '../../components/Manager-page/Manager-body/ManagerProfile/ManagerProfile';
import Category from '../../components/Manager-page/Manager-body/Competition/Category';
import KoiStandard from '../../components/Manager-page/Manager-body/Competition/KoiStandard';
import ManagerCompetition from '../../components/Manager-page/Manager-body/Competition/ManagerCompetition';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

function DashBoardManager() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeComponent, setActiveComponent] = useState('profile');

  // Hàm render component
  const renderComponent = () => {
    switch (activeComponent) {
      case 'profile':
        return <ManagerProfile />;
      case 'competition':
        return <ManagerCompetition/>;
      case 'competition-category':
        return <Category />;
      case 'competition-standard':
        return <KoiStandard />;
      case 'bet':
        return <div>Bet Component</div>;
      default:
        return <ManagerProfile />;
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

          <SubMenu key="competition" icon={<GoldOutlined />} title="Competition">
          <Menu.Item key="competition">Competition</Menu.Item>
            <Menu.Item key="competition-category">Category</Menu.Item>
            <Menu.Item key="competition-standard">Koi Standard</Menu.Item>
          </SubMenu>

          <Menu.Item key="bet" icon={<DollarOutlined />}>
            Bet
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Content style={{ position: 'relative', padding: 0, flex: 1 }}>
          <div className="content-wrapper">{renderComponent()}</div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashBoardManager;
