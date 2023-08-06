import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";

//pages
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
import Home from "./components/pages/Home";

//admin component
import MenuBar from "./components/layouts/MenuBar";

//admin pages
import AdminHome from "./components/pages/admin/Home";
import ManageAdmin from "./components/pages/admin/ManageAdmin";

//user pages
import UserHome from "./components/pages/user/Home";

//layouts
import Navbar from "./components/layouts/Navbar";

//routes
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";

import { currentUser } from "./components/functions/auth";

import { useDispatch } from "react-redux";

function AdminLayout() {
  const adminMenu = [
    { name: "หน้าแรก", link: "index" },
    { name: "แดชบอร์ด", link: "dashboard" },
    { name: "จัดการผู้ใช้งาน", link: "manage-admin" },
  ];
  return (
    <div>
      <MenuBar menus={adminMenu} />
      <Outlet />
    </div>
  );
}

function App() {
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
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="index" element={<AdminHome />} />
          <Route path="dashboard" element={<h1>Dashboard</h1>} />
          <Route path="manage-admin" element={<ManageAdmin />} />
        </Route>

        <Route
          path="/user/index"
          element={
            <UserRoute>
              <UserHome />
            </UserRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
