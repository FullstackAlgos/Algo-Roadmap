import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import history from "./history";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("app")
);
