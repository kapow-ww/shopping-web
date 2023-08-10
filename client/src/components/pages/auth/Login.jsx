// import React, { useState } from "react";
// import { login } from "../../functions/auth";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";

// import { Button, Checkbox, Form, Input, Card, Spin } from "antd";
// import { toast } from "react-toastify";

// import { LockOutlined, UserOutlined, LoadingOutlined } from "@ant-design/icons";

// import { Typography } from "antd";
// const { Title } = Typography;

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [loading, setLoading] = useState(false);

//   // const [value, setValue] = useState({
//   //   username: "",
//   //   password: "",
//   // });

//   const roleBaseRedirect = (role) => {
//     if (role === "admin") {
//       navigate("/admin/index");
//     } else {
//       navigate("/user/index");
//     }
//   };

//   const handleChange = (e) => {
//     setValue({ ...value, [e.target.name]: e.target.value });
//   };

//   const onFinish = (values) => {
//     setLoading(true);
//     login(values)
//       .then((res) => {
//         setLoading(false);
//         dispatch({
//           type: "LOGIN",
//           payload: {
//             token: res.data.token,
//             username: res.data.payload.user.username,
//             role: res.data.payload.user.role,
//           },
//         });

//         localStorage.setItem("token", res.data.token);

//         roleBaseRedirect(res.data.payload.user.role);
//         toast.success("เข้าสู่ระบบสำเร็จ");
//       })
//       .catch((err) => {
//         setLoading(false);
//         toast.error(err.response.data);
//       });
//   };

//   return (
//     <Spin spinning={loading} indicator={<LoadingOutlined />}>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           marginTop: "5%",
//         }}
//       >
//         <Card style={{ width: "60%" }}>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//             }}
//           >
//             <Title level={2}>เข้าสู่ระบบ</Title>
//           </div>

//           <Form onFinish={onFinish} initialValues={{ remember: true }}>
//             <Form.Item
//               name="username"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please input your username",
//                 },
//               ]}
//             >
//               <Input
//                 prefix={<UserOutlined />}
//                 placeholder="ชื่อผู้ใช้งาน"
//                 size="large"
//               />
//             </Form.Item>

//             <Form.Item
//               name="password"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please input your password!",
//                 },
//               ]}
//             >
//               <Input.Password
//                 prefix={<LockOutlined />}
//                 placeholder="รหัสผ่าน"
//                 size="large"
//               />
//             </Form.Item>

//             <Form.Item>
//               <Form.Item name="remember" valuePropName="checked" noStyle>
//                 <Checkbox>Remember me</Checkbox>
//               </Form.Item>
//             </Form.Item>

//             <Form.Item>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 style={{ width: "100%" }}
//               >
//                 เข้าสู่ระบบ
//               </Button>
//               {/* Don't have an account <Link to="/register">sign up</Link> */}
//               <div style={{ margin: "10px 0 10px 0", textAlign: "center" }}>
//                 Don't have an account? <Link to="/register">Sign up</Link>
//               </div>
//             </Form.Item>
//           </Form>
//         </Card>
//       </div>
//     </Spin>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { login } from "../../functions/auth";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState({
    username: "",
    password: "",
  });

  const roleBaseRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin/index");
    } else {
      navigate("/user/index");
    }
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    login(value)
      .then((res) => {
        setLoading(false);
        dispatch({
          type: "LOGIN",
          payload: {
            token: res.data.token,
            username: res.data.payload.user.username,
            role: res.data.payload.user.role,
          },
        });
        localStorage.setItem("token", res.data.token);
        roleBaseRedirect(res.data.payload.user.role);
        alert("เข้าสู่ระบบสำเร็จ");
      })
      .catch((err) => {
        setLoading(false);
        alert(err.response.data);
      });
  };
  console.log(value);

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" name="username" onChange={handleChange}></input>
        <label>Password</label>
        <input type="text" name="password" onChange={handleChange}></input>
        <button type="submit">เข้าสู่ระบบ</button>

        <span>
          Don't have account? <Link to="/register">Sign up</Link>
        </span>
      </form>
    </>
  );
};

export default Login;
