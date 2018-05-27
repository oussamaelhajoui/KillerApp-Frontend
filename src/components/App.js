import React, { Component } from "react";
import "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../logic/Routes";

import { Provider } from "react-redux";
import store from "../store";
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Routes />
        </Router>
      </Provider>
    );
  }
}

export default App;
