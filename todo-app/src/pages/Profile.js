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
  const [profile, setProfile] = useState([]);
  const userData = useSelector(state => state.setUser);
  const token = "Bearer " + localStorage.getItem("jwtToken");
  function getProfile() {
    axios
      .get(`http://localhost:3001/users/profile`, {
        headers: { Authorization: token }
      })
      .then(res => {
        console.log(res.data);
        setProfile(res.data);
      });
  }
  useEffect(() => {
    getProfile();
  }, []);

  console.log(profile);
  return (
    <div>
      <h1>{profile.name}</h1>
      <h1>{profile.email}</h1>
    </div>
  );
}
