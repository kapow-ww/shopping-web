import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu, Typography, Dropdown, Space, Button } from "antd";

import {
  ShoppingCartOutlined,
  UserOutlined,
  LoginOutlined,
} from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { selectUser } from "../reducers";

const AdminDropDown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = [
    {
      label: (
        <a
          onClick={() => {
            dispatch({ type: "LOGOUT", payload: null });
            navigate("/");
          }}
        >
          ออกจากระบบ
        </a>
      ),
      key: "0",
    },
  ];
  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      placement="bottomRight"
      arrow
    >
      <Link className="text-link">
        <div className="user-info" style={{ display: "flex", gap: "10px" }}>
          <UserOutlined />
          <Typography>admin</Typography>
        </div>
      </Link>
    </Dropdown>
  );
};

const UserDropDown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = [
    {
      label: (
        <a
          onClick={() => {
            dispatch({ type: "LOGOUT", payload: null });
            navigate("/");
          }}
        >
          ออกจากระบบ
        </a>
      ),
      key: "0",
    },
  ];
  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      placement="bottomRight"
      arrow
    >
      <Link className="text-link">
        <div className="user-info" style={{ display: "flex", gap: "10px" }}>
          <UserOutlined />
          <Typography>user</Typography>
        </div>
      </Link>
    </Dropdown>
  );
};

const NonLogin = () => {
  const items = [
    { label: <Link to="/login">เข้าสู่ระบบ</Link>, key: "0" },
    { label: <Link to="/register">สมัครสมาชิก</Link>, key: "1" },
  ];
  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      placement="bottomRight"
      arrow
    >
      <Link className="text-link">
        <div className="user-info" style={{ display: "flex", gap: "10px" }}>
          <UserOutlined />
        </div>
      </Link>
    </Dropdown>
  );
};

const Navbar = () => {
  const user = useSelector(selectUser);

  return (
    <div className="navbar">
      <ul className="links left">
        <li>
          <Link className="text-link texts">home</Link>
        </li>
        <li>
          <Link className="text-link texts">product</Link>
        </li>
        <li>
          <Link className="text-link texts">about</Link>
        </li>
      </ul>
      <p className="title">Shop</p>
      <ul className="links right">
        <li>
          <Link className="text-link">
            <ShoppingCartOutlined />
          </Link>
        </li>
        <li>
          {user ? (
            user.role === "admin" ? (
              <AdminDropDown />
            ) : (
              <UserDropDown />
            )
          ) : (
            <NonLogin />
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
