import React from "react";
import { useSelector } from "react-redux";
import ProtectRoute from "./ProtectRoute";

const UserRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? children : <ProtectRoute />;
};

export default UserRoute;
