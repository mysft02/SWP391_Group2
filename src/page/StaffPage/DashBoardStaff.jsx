import  { useState } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, DollarOutlined} from '@ant-design/icons';
import StaffProfile from '../../components/Staff-page/Staff-body/StaffProfile/StaffProfile';
import ManagementKoiRegis from '../../components/Staff-page/Staff-body/ManagementKoiRegis/ManagementKoiRegis';



const { Sider, Content } = Layout;

function DashBoardStaff() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeComponent, setActiveComponent] = useState('profile');

  // Hàm render component
  const renderComponent = () => {
    switch (activeComponent) {
      case 'profile':
        return <StaffProfile/>;
      case 'koiRegis':
        return <ManagementKoiRegis/>;
      default:
        return <StaffProfile/>;
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
        <Menu.Item key="profile" icon={<DollarOutlined />}>
           Profile
        </Menu.Item>

        <Menu.Item key="koiRegis" icon={<DollarOutlined />}>
            Koi Registration 
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

export default DashBoardStaff;
