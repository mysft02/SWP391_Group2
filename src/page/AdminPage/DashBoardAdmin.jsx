import  { useState } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, DollarOutlined} from '@ant-design/icons';
import UserManagement from '../../components/Admin-page/Admin-body/DashBoard/UserManagement';
import AdminProfile from '../../components/Admin-page/Admin-body/AdminProfile.jsx/AdminProfile';


const { Sider, Content } = Layout;
const { SubMenu } = Menu;

function DashBoardAdmin() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeComponent, setActiveComponent] = useState('profile');

  // Hàm render component
  const renderComponent = () => {
    switch (activeComponent) {
      case 'profile':
        return <AdminProfile />;
      case 'management-user':
        return <UserManagement/>;
      case 'bet':
        return <div>Bet Component</div>;
      default:
        return <AdminProfile />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed) => setCollapsed(collapsed)}
        collapsedWidth={60}
        style={{ height: '120vh', overflow: 'auto', position: 'relative', color: "#333" }}
        
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={['profile']}
          mode="inline"
          onClick={(e) => setActiveComponent(e.key)}
        >

          <SubMenu key="user" icon={<UserOutlined />} title="User">
          <Menu.Item key="profile">Profile</Menu.Item>
            <Menu.Item key="management-user">Manager User</Menu.Item>
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

export default DashBoardAdmin;
