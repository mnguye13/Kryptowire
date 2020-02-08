import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
//import { setUser } from "../actions";
import {
  Button,
  Menu,
  MenuItem,
  Popover,
  FormGroup,
  InputGroup,
  Label,
  setHotkeysDialogProps
} from "@blueprintjs/core";
import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { authenticateSlice, userSlice } from "../slice/setSlice";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect
} from "react-router-dom";
import "./Login.css";
import companylogo from "../kryptowire.png";
import { Card, Logo, Form, Input, Error, Success } from "../AuthForms";
import { useHistory } from "react-router-dom";
import setAuthToken from "../authentication/setAuthToken";
import jwt_decode from "jwt-decode";

export default function Profile() {
  const userData = useSelector(state => state.setUser);
  const [user, setUser] = useState([]);
  function getProfile() {
    axios
      .get(`http://localhost:3001/users/${userData.id}`)
      .then(res => setUser(res.data));
  }
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <h2>{user.name}</h2>
      <h3>{user.email}</h3>
    </div>
  );
}
