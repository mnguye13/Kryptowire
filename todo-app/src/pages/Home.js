import React, { useState } from "react";
import logo from "../logo.svg";
import companylogo from "../kryptowire.png";
import "../App.css";
import moment from "moment";
import {
  Button,
  Menu,
  MenuItem,
  Popover,
  Radio,
  RadioGroup
} from "@blueprintjs/core";
import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Login from "./Login";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authenticateSlice } from "../slice/setSlice";
import Weather from "../components/Weather";
import { useTranslation, Trans } from "react-i18next";
//import i18n from "../localization/i18n";

function Home(props) {
  const isAuthenticated = useSelector(state => state.isAuthenticate);
  const userData = useSelector(state => state.setUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const [language, setLanguage] = useState("en");
  const { t, i18n } = useTranslation();

  function signout() {
    dispatch(authenticateSlice.actions.setUnAuthenticate());
  }
  function Welcome(props) {
    if (isAuthenticated)
      return (
        <div>
          <h1>Welcome, {userData.username}</h1>
          <Button
            onClick={e => {
              signout();
            }}
          >
            Sign out
          </Button>
          <Button onClick={() => history.push("/reminder")}>
            Go to Reminder
          </Button>
        </div>
      );
    return (
      <Button
        onClick={() => {
          history.push("/users");
        }}
      >
        Sign In
      </Button>
    );
  }

  function handleLanguageChange(event) {
    let newLang = event.target.value;
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  }
  return (
    <div className="home">
      <nav>
        <RadioGroup
          inline
          label="Select Language"
          onChange={e => {
            handleLanguageChange(e);
          }}
          selectedValue={language}
        >
          <Radio label="English" value="en" />
          <Radio label="Spanish" value="spn" />
          <Radio label="French" value="fre" />
          <Radio label="Chinese" value="chn" />
          <Radio label="Japenese" value="jap" />
          <Radio label="Vietnamese" value="vnm" />
        </RadioGroup>
      </nav>
      <Trans>
        <h1>{t("HomePage")}</h1>
      </Trans>
      <Welcome />
      <Weather />
    </div>
  );
}

export default Home;
