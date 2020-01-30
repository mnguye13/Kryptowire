import authenticatedReducer from "./setAuthenticate";
import userReducer from "./setUser";
import { combineReducers } from "redux";
import { authenticateSlice, userSlice } from "../slice/setSlice";
const appReducers = combineReducers({
  isAuthenticate: authenticateSlice.reducer,
  setUser: userSlice.reducer
});

export default appReducers;
