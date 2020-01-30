import { setUser } from "../actions";
import { createReducer } from "@reduxjs/toolkit";

const userReducer = createReducer(
  {},
  {
    [setUser]: (state, action) => {
      return { ...state, ...action.payload };
    }
  }
);

export default userReducer;
