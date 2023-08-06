import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = [
    {
      label: <Link to="/login">Login</Link>,
      icon: <MailOutlined />,
      key: "login",
    },
    {
      label: <Link to="/register">Register</Link>,
      key: "register",
      icon: <AppstoreOutlined />,
    },
    {
      label: "Logout",
      key: "logout",
      icon: <SettingOutlined />,
      onClick: () => {
        dispatch({ type: "LOGOUT", payload: null });
        navigate("/");
      },
    },
  ];

  const [current, setCurrent] = useState("login");
  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Navbar;
