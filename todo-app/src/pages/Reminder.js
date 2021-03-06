import React, { useState, useEffect } from "react";
import logo from "../logo.svg";
import companylogo from "../kryptowire.png";
import "../App.css";
import moment from "moment";
import axios from "axios";
import {
  Button,
  Menu,
  MenuItem,
  Popover,
  FormGroup,
  InputGroup
} from "@blueprintjs/core";
import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Login from "./Login";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setAuthenticate, setUnAuthenticate, setUser } from "../actions";
import { authenticateSlice, userSlice } from "../slice/setSlice";
import { set } from "mongoose";
import setAuthToken from "../authentication/setAuthToken";

function Reminder() {
  const [names, setNames] = useState("Minh Nguyen");
  const [time, setTime] = useState(new Date());
  const [data, setData] = useState([]);
  const [id, setID] = useState(0);
  const [fullname, setFullName] = useState();
  const [email, setEmail] = useState();
  const [idToDelete, setIdToDelete] = useState();
  const [idToUpdate, setIdToUpdate] = useState();
  const [object, setObjectToUpdate] = useState();
  const [intervalIsSet, setIntervalIsSet] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showUpdate, setShowUpdateForm] = useState(false);
  const isAuthenticated = useSelector(state => state.isAuthenticate);
  const userData = useSelector(state => state.setUser);

  const history = useHistory();
  const dispatch = useDispatch();
  //if(!isAuthenticated2) history.push('/users');

  const [todos, setTodos] = useState([
    {
      content: "Learn React",
      isCompleted: false
    },
    {
      content: "Learn GraphQL",
      isCompleted: false
    },
    {
      content: "Build ToDo app",
      isCompleted: false
    },
    {
      content: "Report to Brian",
      isCompleted: false
    }
  ]);

  useEffect(() => {
    setInterval(tick, 1000);

    getDataFromDB();
    if (!intervalIsSet) {
      let interval = setInterval(getDataFromDB, 3000);
      setIntervalIsSet(interval);
    }
    return function cleanUp() {
      if (intervalIsSet) {
        clearInterval(intervalIsSet);
        setIntervalIsSet(null);
      }
    };
  }, []);
  //Funtion show create form

  function showCreateForm() {
    setID("");
    setFullName("");
    setEmail("");
    setShowForm(true);
    setShowUpdateForm(false);
  }

  //Funtion show update form

  function showUpdateForm(id, fullname, email) {
    setID(id);
    setFullName(fullname);
    setEmail(email);
    setShowUpdateForm(true);
    setShowForm(false);
  }

  function cancelForm() {
    setShowUpdateForm(false);
    setShowForm(false);
  }

  //Function to fecth data from db
  function getDataFromDB() {
    fetch("http://localhost:3001/infos")
      .then(data => data.json())
      .then(res => setData(res));
  }

  //Function to create data to db
  function createDataToDB(fullname, email) {
    if (!fullname || !email) {
      alert("invalid input");
    } else {
      let currentIds = data.map(data => data.id);
      let idToBeAdded = 0;
      while (currentIds.includes(idToBeAdded)) {
        ++idToBeAdded;
      }
      axios.post("http://localhost:3001/infos", {
        id: idToBeAdded,
        fullname: fullname,
        email: email
      });
    }

    setFullName("");
    setEmail("");
    setShowForm(false);
  }
  //Function to remove data from db

  function deleteFromDB(idToDelete) {
    parseInt(idToDelete);
    console.log(idToDelete);
    let objIdToDelete = null;
    data.forEach(dat => {
      if (dat.id == idToDelete) {
        objIdToDelete = dat._id;
      }
    });
    axios.delete(`http://localhost:3001/infos/${objIdToDelete}`);

    console.log(objIdToDelete);
  }

  //Funtion to update data from db

  function updateDB(idToUpdate, updatedFullName, updadatedEmail) {
    console.log(idToUpdate, updatedFullName, updadatedEmail);
    if (!idToUpdate || !updatedFullName || !updadatedEmail) {
      alert("invalid input");
    } else {
      let objIdToUpdate = null;
      parseInt(idToUpdate);
      data.forEach(dat => {
        if (dat.id == idToUpdate) {
          objIdToUpdate = dat._id;
        }
      });
      console.log(objIdToUpdate);

      axios
        .patch(`http://localhost:3001/infos/${objIdToUpdate}`, {
          fullname: updatedFullName,
          email: updadatedEmail
        })
        .then(response => console.log(response));
    }
    setShowUpdateForm(false);
  }

  function redirectInfo(id) {
    history.push(`/infos/${id}`);
  }
  function handleKeyDown(event, index) {
    if (event.key === "Enter") {
      createTodoAtIndex(event, index);
    }
    if (event.key === "Backspace" && todos[index].content === "") {
      event.preventDefault();
      return removeTodoAtIndex(index);
    }
  }

  function createTodoAtIndex(event, index) {
    const newToDos = [...todos];
    newToDos.splice(index + 1, 0, {
      content: "",
      isCompleted: false
    });
    setTodos(newToDos);
    setTimeout(() => {
      document.forms[0].elements[index + 1].focus();
      //document.querySelector('todo-list').focus();
    }, 0);
  }

  function updateTodoAtIndex(event, index) {
    const newToDos = [...todos];
    newToDos[index].content = event.target.value;
    setTodos(newToDos);
  }

  function removeTodoAtIndex(index) {
    if (index === 0 && todos.length === 1) return;
    setTodos(todos.filter((_, index1) => index1 !== index));
    setTimeout(() => {
      document.forms[0].elements[index - 1].focus();
      //document.querySelector('todo-list');
    }, 0);
  }

  function toggleTodoCompleteAtIndex(index) {
    const temporaryTodos = [...todos];
    temporaryTodos[index].isCompleted = !temporaryTodos[index].isCompleted;
    setTodos(temporaryTodos);
  }

  function updateName(event) {
    var newName = [...names];
    newName = event.target.value;
    setNames(newName);
  }

  function printLists() {
    window.print();
  }

  function completeTasks() {
    var counter = 0;
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].isCompleted) {
        counter += 1;
      }
    }
    return counter;
  }

  function incompleteTasks() {
    var counter = todos.length;
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].isCompleted) {
        counter -= 1;
      }
    }
    return counter;
  }

  function timer() {
    var clock = moment().format("hh:mm:ss A");
    return clock;
  }

  function signout() {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(authenticateSlice.actions.setUnAuthenticate());
    dispatch(
      userSlice.actions.setUser({ id: null, name: null, iat: null, exp: null })
    );
  }

  async function tick() {
    setTime(new Date());
  }

  var complete = completeTasks();
  var incomplete = incompleteTasks();
  var progress = (completeTasks() / todos.length) * 100;
  var clock = timer();

  console.log(data);

  return (
    <div className="app">
      <h1>Status: {isAuthenticated ? "Logged in" : 0}</h1>
      <div className="header">
        <img src={companylogo} className="logo1" alt="companylogo" />
        <h2 className="bp3-heading">
          Hello <a className="nameField">{userData.name}</a>
        </h2>

        {/*<input
          className="nameField "
          type="text"
          value={names}
          onChange={e => updateName(e)}
        />*/}

        <h3 className="bp3-heading">
          Today's date is {moment().format("MM/DD/YYYY")}
        </h3>
        <h3 className="bp3-heading">
          Current time is {time.toLocaleTimeString()}{" "}
        </h3>
      </div>

      <form className="todo-list">
        <div>
          <p>
            You have completed {complete} tasks, {incomplete} remaining{" "}
          </p>
        </div>
        <div
          className="bp3-progress-bar bp3-intent-primary .modifier"
          style={{ width: "10%" }}
        >
          <div
            className="bp3-progress-meter"
            style={{ width: progress + "%" }}
          ></div>
        </div>
        <p>{progress}%</p>
        <ul>
          {todos.map((todo, i) => (
            <div className={`todo ${todo.isCompleted && "todo-is-completed"}`}>
              <div
                className={"checkbox"}
                onClick={() => toggleTodoCompleteAtIndex(i)}
              >
                {todo.isCompleted && <span>&#x2714;</span>}
              </div>
              <input
                className="tasks"
                type="text"
                value={todo.content}
                onKeyDown={e => handleKeyDown(e, i)}
                onChange={e => updateTodoAtIndex(e, i)}
              />
            </div>
          ))}
        </ul>
        <h3>Info List</h3>
        <Button text="Create Info" onClick={() => showCreateForm()} />
        <ul>
          {data.length <= 0
            ? " NO DB ENTRIES"
            : data.map(dat => (
                <li style={{ padding: "10px" }} key={data._id}>
                  <span style={{ color: "gray" }}> Full name: </span>{" "}
                  {dat.fullname} <br />
                  <span style={{ color: "gray" }}> Email: </span> {dat.email}{" "}
                  <br />
                  <Button
                    intent="success"
                    text="View"
                    onClick={() => redirectInfo(dat._id)}
                  />
                  <Button
                    intent="warning"
                    text="Update Email"
                    onClick={() =>
                      showUpdateForm(dat.id, dat.fullname, dat.email)
                    }
                  />
                  <Button
                    intent="danger"
                    text="Delete"
                    onClick={() => deleteFromDB(dat.id)}
                  />
                </li>
              ))}
        </ul>
        <ul>
          {showForm && (
            <div>
              <FormGroup
                label="Full name"
                labelFor="text-input"
                labelInfo="(required)"
              >
                <InputGroup
                  id="text-input"
                  placeholder="Enter Full Name"
                  value={fullname}
                  onChange={e => setFullName(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                label="Email Address"
                labelFor="text-input"
                labelInfo="(required)"
              >
                <InputGroup
                  id="text-input"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </FormGroup>
              <Button
                intent="primary"
                text="Submit Data"
                onClick={() => createDataToDB(fullname, email)}
              />
              <Button
                intent="none"
                text="Cancel"
                onClick={() => cancelForm()}
              />
            </div>
          )}
        </ul>
        <ul>
          {showUpdate && (
            <div>
              <FormGroup label="Full name" labelFor="text-input">
                <InputGroup
                  id="text-input"
                  disabled
                  placeholder="Enter Full Name"
                  value={fullname}
                  onChange={e => setFullName(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                label="Email Address"
                labelFor="text-input"
                labelInfo="(required)"
                helperText="Change email address"
              >
                <InputGroup
                  id="text-input"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </FormGroup>
              <Button
                intent="primary"
                text="Save Changes"
                onClick={() => updateDB(id, fullname, email)}
              />
              <Button
                intent="none"
                text="Cancel"
                onClick={() => cancelForm()}
              />
            </div>
          )}
        </ul>

        <Button intent="success" text="Print" onClick={() => printLists()} />
        <Button
          text="Sign Out"
          onClick={() => {
            signout();
          }}
        />
      </form>
    </div>
  );
}

export default Reminder;
