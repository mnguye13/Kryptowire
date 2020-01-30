import { createSlice } from "@reduxjs/toolkit";

export const authenticateSlice = createSlice({
  name: "autheticate",
  initialState: false,
  reducers: {
    setAuthenticate: state => (state = true),
    setUnAuthenticate: state => (state = false)
  }
});

export const userSlice = createSlice({
  name: "userData",
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    }
  }
});
