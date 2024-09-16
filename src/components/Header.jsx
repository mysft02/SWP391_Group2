import React from "react";
import logo from "../assets/logo.svg";
import "../styles/Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="link">
        <ul className="ul_1">
          <li><Link to={"/"}>Home</Link></li>
          <li><Link to={"/news"}>News</Link></li>
          <li><Link to={"/competition"}>Competition</Link></li>
          <li><Link to={"/contact"}>Contact</Link></li>
          <ul className="ul_2">
            <li><Link to={"/sign-in"}>Sign in</Link></li>
            <span>/</span>
            <li><Link to={"/sign-up"}>Sign up</Link></li>
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default Header;
