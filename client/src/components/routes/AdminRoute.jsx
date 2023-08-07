import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProtectRoute from "./ProtectRoute";
import { currentAdmin } from "../functions/auth";

import { createSelector } from "@reduxjs/toolkit";

const selectUser = createSelector(
  (state) => state.user,
  (user) => user
);

const AdminRoute = ({ children }) => {
  const user = useSelector(selectUser);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          setOk(true);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return ok ? children : <ProtectRoute />;
};

export default AdminRoute;
