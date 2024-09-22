import logo from "../../../assets/logo.svg";
import "./GuestHeader.css";
import { Link } from "react-router-dom";
import { Button } from "antd";
import {
  HomeOutlined,
  FileTextOutlined,
  TrophyOutlined,
  PhoneOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const GuestHeader = () => {
  return (
    <div className="guest-header">
      <div className="logo">
        <Link to={"/"}>
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="link">
        <ul className="ul_1">
          <li>
            <Link to={"/"}>
              <Button type="primary" icon={<HomeOutlined />}>
                Home
              </Button>
            </Link>
          </li>
          <li>
            <Link to={"/news"}>
              <Button type="primary" icon={<FileTextOutlined />}>
                News
              </Button>
            </Link>
          </li>
          <li>
            <Link to={"/competition"}>
              <Button type="primary" icon={<TrophyOutlined />}>
                Competition
              </Button>
            </Link>
          </li>
          <li>
            <Link to={"/contact"}>
              <Button type="primary" icon={<PhoneOutlined />}>
                Contact
              </Button>
            </Link>
          </li>
          <ul className="ul_2">
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
                  icon={<UserAddOutlined />}
                >
                  Register
                </Button>
              </Link>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default GuestHeader;
