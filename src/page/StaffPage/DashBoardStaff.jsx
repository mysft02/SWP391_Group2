import  { useState } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, DollarOutlined} from '@ant-design/icons';



const { Sider, Content } = Layout;

function DashBoardStaff() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeComponent, setActiveComponent] = useState('profile');

  // Hàm render component
  const renderComponent = () => {
    switch (activeComponent) {
      case 'profile':
        return <div>profile</div>;
      case 'management-news':
        return <div>profile</div>;
      case 'bet':
        return <div>Bet Component</div>;
      default:
        return <div>profile</div>;
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
        <Menu.Item key="news" icon={<DollarOutlined />}>
            News
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
