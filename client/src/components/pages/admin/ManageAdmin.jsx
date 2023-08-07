import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

//functions
import { listUsers, changeStatus } from "../../functions/users";

import { createSelector } from "@reduxjs/toolkit";

//grid

import { Table, Switch, Tag } from "antd";

const selectUser = createSelector(
  (state) => state.user,
  (user) => user
);

const ManageAdmin = () => {
  const user = useSelector(selectUser);

  const handleOnChange = (e, _id) => {
    const value = {
      id: _id,
      enabled: e,
    };
    changeStatus(user.token, value)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const columns = [
    { title: "ชื่อผู้ใช้งาน", dataIndex: "username", key: "username" },
    {
      title: "บทบาท",
      dataIndex: "role",
      key: "role",
      render: (_, { role }) => (
        <Tag color={role === "admin" ? "volcano" : "green"}>
          {role === "admin" ? "แอดมิน" : "ผู้ใช้งาน"}
        </Tag>
      ),
    },
    {
      title: "สถานะการเปิดใช้งาน",
      dataIndex: "enabled",
      key: "enabled",
      render: (_, { _id, enabled }) => {
        return (
          <Switch checked={enabled} onChange={(e) => handleOnChange(e, _id)} />
        );
      },
    },
    { title: "createdAt", dataIndex: "createdAt", key: "createdAt" },
    { title: "updatedAt", dataIndex: "updatedAt", key: "updatedAt" },
  ];

  const [data, setData] = useState([]);
  useEffect(() => {
    loadData(user.token);
  }, []);

  const loadData = (authtoken) => {
    listUsers(authtoken)
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(data);

  return (
    <div>
      <h1>ManageAdmin</h1>
      <div style={{ width: "100%" }}>
        <Table columns={columns} dataSource={data} rowKey="_id"></Table>
      </div>
    </div>
  );
};

export default ManageAdmin;
