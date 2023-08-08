import { combineReducers } from "redux";
import { userReducer } from "./userReducer";

import { createSelector } from "@reduxjs/toolkit";

export const selectUser = createSelector(
  (state) => state.user,
  (user) => user
);

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
