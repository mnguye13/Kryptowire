import React, { useState } from "react";
import logo from "./logo.svg";
import companylogo from "./kryptowire.png";
import "./App.css";
import moment from "moment";
import { Button, Menu, MenuItem, Popover } from "@blueprintjs/core";
import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Reminder from "./pages/Reminder";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Infos from "./pages/Infos";
import SignUp from "./pages/Signup";
import PrivateRoute from "./PrivateRoute";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function App(props) {
  return (
    <Router>
      <nav className="bp3-navbar bp3-dark">
        <div className="bp3-navbar-group bp3-align-left">
          <div className="bp3-navbar-heading">Kryptowire</div>
        </div>
        <div className="bp3-navbar-group bp3-align-right">
          <Link to="/">
            <button className="bp3-button bp3-minimal bp3-icon-home">
              Home
            </button>
          </Link>
          <span className="bp3-navbar-divider"></span>
          <Link to="/users">
            <button className="bp3-button bp3-minimal bp3-icon-user"></button>
          </Link>
          <Link to="/reminder">
            <button className="bp3-button bp3-minimal bp3-icon-notifications"></button>
          </Link>
          <Link to="/settings">
            <button className="bp3-button bp3-minimal bp3-icon-cog"></button>
          </Link>
        </div>
      </nav>
      <footer></footer>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/users" component={Login} />
        <Route path="/reminder" component={Reminder} />
        <Route path="/settings" component={Settings} />
        <Route path="/infos" component={Infos} />
        <Route path="/signup" component={SignUp} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </Router>
  );
}

export default App;
