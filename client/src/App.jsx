import "./App.css";
import { Routes, Route } from "react-router-dom";

//pages
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
import Home from "./components/pages/Home";

//admin pages
import AdminHome from "./components/pages/admin/Home";

//user pages
import UserHome from "./components/pages/user/Home";

//layouts
import Navbar from "./components/layouts/Navbar";

//routes
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";

import { currentUser } from "./components/functions/auth";

import { useDispatch } from "react-redux";

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
          path="/admin/index"
          element={
            <AdminRoute>
              <AdminHome />
            </AdminRoute>
          }
        />
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
