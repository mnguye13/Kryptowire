import { setAuthenticate, setUnAuthenticate } from "../actions";
import { createReducer } from "@reduxjs/toolkit";

const authenticatedReducer = createReducer(false, {
  [setAuthenticate]: state => true,
  [setUnAuthenticate]: state => false
});

export default authenticatedReducer;
