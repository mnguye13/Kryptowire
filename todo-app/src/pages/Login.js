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

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  var users = { user: "admin", pass: "admin" };

  const isAuthenticated = useSelector(state => state.isAuthenticate);
  if (isAuthenticated) history.push("/reminder");

  function handleSubmit(event, props) {
    if (!username || !password) {
      alert("invalid input");
    } else {
      event.preventDefault();
      try {
        axios
          .post("http://localhost:3001/users/login", {
            email: username,
            password: password
          })
          .then(res => {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            //Decode token to get user data
            const decoded = jwt_decode(token);
            console.log(decoded);
            dispatch(userSlice.actions.setUser(decoded));
            dispatch(authenticateSlice.actions.setAuthenticate());
            setIsError(false);
            history.push("/");
            //Set current user

            /*
          if (res.data.success == true) {
            dispatch(authenticateSlice.actions.setAuthenticate());
            setIsError(false);
            dispatch(
              userSlice.actions.setUser({
                username: username
              })
            );
          } else {
            setIsError(true);
            console.log(isError);
          }*/
          });
      } catch (e) {
        alert(e.message);
      }
    }
  }

  return (
    <Router>
      <div className="login">
        <img src={companylogo} className="company-logo" alt="companylogo" />
        <h1 className="bp3-heading"> Kryptowire Employee Portal</h1>
        <FormGroup>
          <Label className="bp3-label">
            Username
            <InputGroup
              className="bp3-input"
              id="user-input"
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </Label>

          <Label className="bp3-label">
            Password
            <InputGroup
              className="bp3-input"
              id="password-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Label>

          <Button className="login-btn" onClick={e => handleSubmit(e)}>
            Sign In
          </Button>
          {isError && <Error>Invalid Username/Password</Error>}
          {isAuthenticated && <Success>Success</Success>}
        </FormGroup>
      </div>
    </Router>
  );
}

export default Login;
