import logo from "../../../assets/logo.svg";
import './GuestHeader.css';
import { Link } from "react-router-dom";
import { Button } from 'antd';
import { HomeOutlined, FileTextOutlined, TrophyOutlined, PhoneOutlined, UserOutlined, UserAddOutlined } from '@ant-design/icons';

const GuestHeader = () => {
  return (
    <div className="guest-header">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="link">
        <ul className="ul_1">
          <li>
            <Button type="primary" icon={<HomeOutlined />}>
              <Link to={"/"}>Home</Link>
            </Button>
          </li>
          <li>
            <Button type="primary" icon={<FileTextOutlined />}>
              <Link to={"/news"}>News</Link>
            </Button>
          </li>
          <li>
            <Button type="primary" icon={<TrophyOutlined />}>
              <Link to={"/competition"}>Competition</Link>
            </Button>
          </li>
          <li>
            <Button type="primary" icon={<PhoneOutlined />}>
              <Link to={"/contact"}>Contact</Link>
            </Button>
          </li>
          <ul className="ul_2">
            <li>
              <Button type="primary" icon={<UserOutlined />}>
                <Link to={"/sign-in"}>Sign in</Link>
              </Button>
            </li>
            <li>
              <Button type="default" icon={<UserAddOutlined />}>
                <Link to={"/sign-up"}>Register</Link>
              </Button>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default GuestHeader;
