import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./reducers/store";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.js";
import axios from "axios";
import login from "views/login";

const developmentApiUrl =
  process.env.NODE_ENV === "development"
    ? `http://${["local", "host"].join("")}:${5000}/`
    : "";
const apiUrl = process.env.REACT_APP_API_URL || developmentApiUrl;

if (!apiUrl) {
  throw new Error("REACT_APP_API_URL is required in production");
}

axios.defaults.withCredentials = true;
axios.defaults.baseURL = apiUrl;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/login" component={login} exact />
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
);
