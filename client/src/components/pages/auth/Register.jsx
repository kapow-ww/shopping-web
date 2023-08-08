import React, { useState } from "react";
import { register } from "../../functions/auth";

import { Button, Checkbox, Form, Input, Card } from "antd";
import { toast } from "react-toastify";

import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { Typography } from "antd";
const { Title } = Typography;

import { Link } from "react-router-dom";
const Register = () => {
  // const [value, setValue] = useState({
  //   username: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  // const handleChange = (e) => {
  //   // console.log(e.target.name);
  //   // console.log(e.target.value);
  //   setValue({ ...value, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // console.log(value);
  //   if (value.password !== value.confirmPassword) {
  //     alert("password not match");
  //   } else {
  //     // alert("ok");
  //     register(value)
  //       .then((res) => {
  //         console.log(res.data);
  //         alert(res);
  //       })
  //       .catch((err) => {
  //         // console.log(err.response.data);
  //         alert(err.response.data);
  //       });
  //   }
  // };

  const onFinish = (values) => {
    // console.log(value);
    if (values.password !== values.confirmPassword) {
      // alert("password not match");
      toast.error("รหัสผ่านไม่ตรงกัน");
    } else {
      // alert("ok");
      register(values)
        .then((res) => {
          console.log(res.data);
          // alert(res);
          toast.success("สมัครสมาชิกสำเร็จ");
        })
        .catch((err) => {
          // console.log(err.response.data);
          // alert(err.response.data);
          toast.error(err.response.data);
        });
    }
  };

  // console.log(value);

  return (
    // <div>
    //   <h1>Register page</h1>
    //   <form onSubmit={handleSubmit}>
    //     <label>Username</label>
    //     <input type="text" name="username" onChange={handleChange} />

    //     <label>Password</label>
    //     <input type="text" name="password" onChange={handleChange} />

    //     <label>Confirm Password</label>
    //     <input type="text" name="confirmPassword" onChange={handleChange} />

    //     <button>Submit</button>
    //   </form>
    // </div>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "5%",
      }}
    >
      <Card style={{ width: "60%" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Title level={2}>สมัครสมาชิก</Title>
        </div>
        <Form onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="ชื่อผู้ใช้งาน"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="รหัสผ่าน"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please input your confirm password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="ยืนยันรหัสผ่าน"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              สมัครสมาชิก
            </Button>
            <div style={{ margin: "10px 0 10px 0", textAlign: "center" }}>
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
