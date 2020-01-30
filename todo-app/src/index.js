import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { render } from "@testing-library/react";
import { createStore } from "redux";
import appReducers from "./reducers";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import { ApolloProvider } from "@apollo/react-hooks";
import i18n from "./localization/i18n";
import { client } from "./pages/Settings";

const store = createStore(
  appReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </I18nextProvider>
    </Provider>
  </Router>,
  document.querySelector("#root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
