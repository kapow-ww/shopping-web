import React, { useState } from "react";
import { register } from "../../functions/auth";

import { Button, Form, Input, Card, Spin } from "antd";
import { toast } from "react-toastify";

import { LockOutlined, UserOutlined, LoadingOutlined } from "@ant-design/icons";

import { Typography } from "antd";
const { Title } = Typography;

import { Link } from "react-router-dom";
const Register = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    if (values.password !== values.confirmPassword) {
      toast.error("รหัสผ่านไม่ตรงกัน");
    } else {
      register(values)
        .then((res) => {
          setLoading(false);
          console.log(res.data);
          toast.success("สมัครสมาชิกสำเร็จ");
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data);
        });
    }
  };

  return (
    <Spin spinning={loading} indicator={<LoadingOutlined />}>
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
                  message: "กรุณากรอกชื่อผู้ใช้งาน",
                },
              ]}
              hasFeedback
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
                  message: "กรุณากรอกรหัสผ่าน",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="รหัสผ่าน"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกยืนยันรหัสผ่าน",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("รหัสผ่านไม่ตรงกัน"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="ยืนยันรหัสผ่าน"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                สมัครสมาชิก
              </Button>
              <div style={{ margin: "10px 0 10px 0", textAlign: "center" }}>
                Already have an account? <Link to="/login">Login</Link>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Spin>
  );
};

export default Register;
