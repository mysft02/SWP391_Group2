import logo from "../../../assets/logo.svg";
import "./CustomerHeader.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Dropdown } from "antd";
import {
  HomeOutlined,
  FileTextOutlined,
  TrophyOutlined,
  PhoneOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import ToggleTheme from "./ToggleTheme/ToggleTheme";
import { useUser } from "../../../data/UserContext"; // Hook lấy user từ context
import { DashboardOutlined, CreditCardOutlined, LogoutOutlined } from '@ant-design/icons';
const CustomerHeader = () => {
  const { user, logOut } = useUser(); // Sử dụng logOut từ UserContext
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut(); // Gọi hàm logOut từ UserContext để đăng xuất khỏi Google và Firebase
      navigate("/"); // Điều hướng người dùng về trang chủ hoặc trang đăng nhập
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const menuItems = [
    {
      key: "dashboard",
      label: (
        <Link to="/member/dashboard">
          <DashboardOutlined style={{ marginRight: 8 }} /> Dashboard
        </Link>
      ),
    },
    {
      key: "payment",
      label: (
        <Link to="/member/payment">
          <CreditCardOutlined style={{ marginRight: 8 }} /> Payment
        </Link>
      ),
    },
    {
      key: "logout",
      label: (
        <span onClick={handleLogout}>
          <LogoutOutlined style={{ marginRight: 8 }} /> Logout
        </span>
      ),
    },
  ];

  return (
    <div className="Customer-header">
      <div className="logo">
        <Link to={"/member"}>
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="link">
        <ul className="ul_1">
          <li>
            <Link to={"/member"}>
              <Button type="primary" icon={<HomeOutlined />}>
                Home
              </Button>
            </Link>
          </li>
          <li>
            <Link to={"/member/news"}>
              <Button type="primary" icon={<FileTextOutlined />}>
                News
              </Button>
            </Link>
          </li>
          <li>
            <Link to={"/member/competition"}>
              <Button type="primary" icon={<TrophyOutlined />}>
                Competition
              </Button>
            </Link>
          </li>
          <li>
            <Link to={"/member/contact"}>
              <Button type="primary" icon={<PhoneOutlined />}>
                Contact
              </Button>
            </Link>
          </li>
          <ul className="account-customer">
            {user ? (
              // Hiển thị dropdown nếu user đã đăng nhập
              <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                <Button type="default">
                  <UserOutlined /> Account <DownOutlined />
                </Button>
              </Dropdown>
            ) : (
              // Nếu chưa đăng nhập, hiển thị link đăng nhập/đăng ký
              <>
                <li>
                  <Link to={"/sign-in"}>
                    <Button type="primary" icon={<UserOutlined />}>
                      Sign in
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to={"/sign-up"}>
                    <Button
                      type="default"
                      htmlType="button"
                      icon={<UserOutlined />}
                    >
                      Register
                    </Button>
                  </Link>
                </li>
              </>
            )}
            <ToggleTheme />
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default CustomerHeader;
