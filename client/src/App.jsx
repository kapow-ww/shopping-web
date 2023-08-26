import React, { useState } from "react";
import "./App.css";
//auth
import { currentUser } from "./components/functions/auth";

//redux
import { useDispatch } from "react-redux";

//toast
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//ant design
import { ConfigProvider } from "antd";

//router
import { Outlet, Routes, Route } from "react-router-dom";

//layouts
import Navbar from "./components/layouts/Navbar";
import MenuBar from "./components/layouts/MenuBar";
import TopNavbar from "./components/layouts/TopNavbar";

//general page
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import SingleProduct from "./components/pages/product/SingleProduct";

//admin pages
import HomeAdmin from "./components/pages/admin/Home";
import ManageAdmin from "./components/pages/admin/ManageAdmin";
import CreateCategory from "./components/pages/admin/category/CreateCategory";
import UpdateCategory from "./components/pages/admin/category/UpdateCategory";
import CreateProduct from "./components/pages/admin/product/CreateProduct";
import UpdateProduct from "./components/pages/admin/product/UpdateProduct";

//protect route
import AdminRoute from "./components/routes/AdminRoute";

//styled
import { Container } from "./components/styles/Global.styled";
import { themeConfig } from "./theme";

import { Layout, Space } from "antd";
const { Header, Footer, Sider, Content } = Layout;

const Layouts = () => {
  return (
    <Layout>
      <Header>
        <Navbar />
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer>asd</Footer>
    </Layout>
  );
};

const AdminLayout = () => {
  return (
    <Layout>
      <Header>
        <Navbar />
        <MenuBar
          menus={[
            { name: "Home", url: "/admin/index" },
            { name: "Dashboard", url: "/admin/dashboard" },
            { name: "Manage Account", url: "/admin/manage-admin" },
            { name: "Manage Category", url: "/admin/create-category" },
            { name: "Manage Product", url: "/admin/create-product" },
          ]}
        />
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer>asd</Footer>
    </Layout>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const idToken = localStorage.token;

  if (idToken) {
    currentUser(idToken)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: "LOGIN",
          payload: {
            token: idToken,
            username: res.data.username,
            role: res.data.role,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <ConfigProvider>
      {/* <ConfigProvider theme={themeConfig}> */}
      <ToastContainer
        position="bottom-right"
        // theme="dark"
        autoClose={2000}
        hideProgressBar
        transition={Slide}
      />

      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
        <Route path="/" element={<Layouts />}>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="product/:id" element={<SingleProduct />} />
          <Route path="cart" element={<div>cart</div>} />
          <Route path="deal" element={<div>deals</div>} />
          <Route path="what-new" element={<div>what-new</div>} />
        </Route>

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="index" element={<HomeAdmin />} />
          <Route path="dashboard" element={<div>Home dashboard</div>} />
          <Route path="manage-admin" element={<ManageAdmin />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="update-category/:id" element={<UpdateCategory />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="update-product/:id" element={<UpdateProduct />} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
};

export default App;
