import  { useState } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, DollarOutlined, TrophyOutlined, DashboardOutlined} from '@ant-design/icons';
import UserManagement from '../../components/Admin-page/Admin-body/DashBoard/UserManagement';
import AdminProfile from '../../components/Admin-page/Admin-body/AdminProfile.jsx/AdminProfile';
import AdminBet from '../../components/Admin-page/Admin-body/AdminBet/AdminBet';
import AdminCompetition from '../../components/Admin-page/Admin-body/AdminCompetition/AdminCompetition';
import StaticsBet from '../../components/Admin-page/Admin-body/AdminDashBoard/StaticsBet';
import StaticsUser from '../../components/Admin-page/Admin-body/AdminDashBoard/StaticsUser';
import StaticsCompetition from '../../components/Admin-page/Admin-body/AdminDashBoard/StaticsCompetition';


const { Sider, Content } = Layout;
const { SubMenu } = Menu;

function DashBoardAdmin() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeComponent, setActiveComponent] = useState('profile');

  // Hàm render component
  const renderComponent = () => {
    switch (activeComponent) {
      case 'StatisticsUser':
        return <StaticsUser/>;
      case 'StatisticsCompetition':
          return <StaticsCompetition/>;
      case 'StatisticsBet':
        return <StaticsBet/>;
      case 'profile':
        return <AdminProfile />;
      case 'management-user':
        return <UserManagement/>;
      case 'competition':
          return <AdminCompetition/>;
      case 'bet':
        return <AdminBet/>;
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
          <SubMenu key="dashboard" icon={<UserOutlined />} title="DashBoard">
            <Menu.Item key="StatisticsUser">Statistics User</Menu.Item>
            <Menu.Item key="StatisticsCompetition">Statistics Competition</Menu.Item>
            <Menu.Item key="StatisticsBet">Statistics Bet</Menu.Item>
          </SubMenu>
          <SubMenu key="user" icon={<UserOutlined />} title="User">
            <Menu.Item key="profile">Profile</Menu.Item>
            <Menu.Item key="management-user">Manager User</Menu.Item>
          </SubMenu>
          <Menu.Item key="competition" icon={<TrophyOutlined  />}>
            Competition
          </Menu.Item>
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
