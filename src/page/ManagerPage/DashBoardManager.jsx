import  { useState } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, GoldOutlined, DollarOutlined} from '@ant-design/icons';
import ManagerProfile from '../../components/Manager-page/Manager-body/ManagerProfile/ManagerProfile';
import Category from '../../components/Manager-page/Manager-body/Competition/Category';
import KoiStandard from '../../components/Manager-page/Manager-body/Competition/KoiStandard';
import ManagerCompetition from '../../components/Manager-page/Manager-body/Competition/ManagerCompetition';
import ManagementFishKoi from '../../components/Manager-page/Manager-body/FishKoi/ManagementFishKoi';

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
      case 'fishkoi':
          return <ManagementFishKoi/>;
      case 'bet':
        return <div>Bet Component</div>;
      case 'award':
          return <div>Award</div>;
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
        style={{ height: '120vh', overflow: 'auto', position: 'relative', color: "#333" }}
        
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
          <SubMenu key="bet" icon={<DollarOutlined />} title="Bet">
          <Menu.Item key="bet">Bet</Menu.Item>
            <Menu.Item key="award">Award</Menu.Item>

          </SubMenu>
          <Menu.Item key="fishkoi" icon={<DollarOutlined />}>
            Fish Koi 
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
