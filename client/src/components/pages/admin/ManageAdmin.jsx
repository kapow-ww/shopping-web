import React, { useState, useEffect } from "react";

//functions
import {
  listUsers,
  changeStatus,
  changeRole,
  removeUser,
  resetPassword,
} from "../../functions/users";

import { Table, Switch, Select, Button, Space, Modal } from "antd";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import moment from "moment/min/moment-with-locales";

import { selectUser } from "../../reducers";
import { useSelector } from "react-redux";

const roleOptions = [
  {
    value: "admin",
    label: "แอดมิน",
  },
  {
    value: "user",
    label: "ผู้ใช้งาน",
  },
];

const ManageAdmin = () => {
  const user = useSelector(selectUser);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [values, setValues] = useState({
    id: "",
    password: "",
  });

  const handleChangePassword = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const showModal = (_id) => {
    setValues({ ...values, id: _id });
    setIsModalOpen(true);
  };

  const handleModalOK = () => {
    resetPassword(user.token, values.id, values)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setIsModalOpen(false);
  };

  const handleChangeStatus = (e, _id) => {
    //Update switch state
    const newData = [...data];
    const updateChecked = newData.find((user) => user._id === _id);
    updateChecked.enabled = e;
    setData(newData);

    const value = {
      id: _id,
      enabled: e,
    };
    changeStatus(user.token, value)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleChangeRole = (e, _id) => {
    const value = {
      id: _id,
      role: e,
    };
    changeRole(user.token, value)
      .then((res) => {
        console.log(res);
        loadData(user.token);
      })
      .catch((err) => console.log(err));
  };

  const handleRemoveUser = (_id, username) => {
    if (window.confirm(`คุณต้องการลบผู้ใช้งาน ${username} หรือไม่`)) {
      removeUser(user.token, _id)
        .then(() => {
          loadData(user.token);
        })
        .catch((err) => console.log(err));
    }
  };

  const columns = [
    { title: "ชื่อผู้ใช้งาน", dataIndex: "username", key: "username" },
    {
      title: "บทบาท",
      dataIndex: "role",
      key: "role",
      render: (_, { _id, role }) => (
        <Select
          value={role}
          style={{
            width: "100%",
          }}
          onChange={(e) => handleChangeRole(e, _id)}
          options={roleOptions}
        />
      ),
    },
    {
      title: "สถานะการเปิดใช้งาน",
      dataIndex: "enabled",
      key: "enabled",
      render: (_, { _id, enabled }) => {
        return (
          <Switch
            checked={enabled}
            onChange={(e) => {
              handleChangeStatus(e, _id);
            }}
          />
        );
      },
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, { createdAt }) => {
        return <>{moment(createdAt).locale("th").format("lll")}</>;
      },
    },
    {
      title: "updatedAt",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (_, { updatedAt }) => {
        return (
          <>{moment(updatedAt).locale("th").startOf(updatedAt).fromNow()}</>
        );
      },
    },
    {
      render: (_, { _id, username }) => {
        return (
          <Space wrap>
            <Button
              icon={<EditOutlined />}
              type="primary"
              onClick={() => showModal(_id)}
            >
              แก้ไข
            </Button>

            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleRemoveUser(_id, username)}
            >
              ลบ
            </Button>
          </Space>
        );
      },
    },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    loadData(user.token);
  }, []);

  const loadData = (authtoken) => {
    listUsers(authtoken)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>ManageAdmin Page</h1>
      <div style={{ width: "100%" }}>
        <Table columns={columns} dataSource={data} rowKey="_id"></Table>
      </div>
      <Modal
        title="เปลี่ยนรหัสผ่าน"
        open={isModalOpen}
        onOk={handleModalOK}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>New Password</p>
        <input type="text" name="password" onChange={handleChangePassword} />
      </Modal>
    </div>
  );
};

export default ManageAdmin;
