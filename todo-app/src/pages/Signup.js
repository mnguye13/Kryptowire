import React, { useState } from "react";
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
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const history = useHistory();

  function register() {
    try {
      axios
        .post("http://localhost:3001/users/register", {
          name: name,
          email: username,
          password: password,
          password2: password2
        })
        .then(res => history.push("/users"));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div style={{ marginLeft: "25%", width: "50%" }}>
      <h1> Registration Portal</h1>
      <FormGroup>
        <Label className="bp3-label">
          Full Name
          <InputGroup
            className="bp3-input"
            id="user-input"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Label>
        <Label className="bp3-label">
          Email Address
          <InputGroup
            className="bp3-input"
            id="user-input"
            type="text"
            placeholder="Email Address"
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

        <Label className="bp3-label">
          Confirm Password
          <InputGroup
            className="bp3-input"
            id="password-input"
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
          />
        </Label>

        <Button className="login-btn" onClick={() => register()}>
          Sign Up
        </Button>
      </FormGroup>
    </div>
  );
}
