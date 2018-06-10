import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import NavMenu from "./pages/fractions/NavMenu";

import "./../assets/css/main.css";
import { connect } from "react-redux";

import { logOut } from "../actions/logoutAction";
import { checkLogin } from "../actions/checkLogin";

class Layout extends Component {
  constructor(props) {
    super(props);

    this.layoutVal = (
      <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
      </div>
    );

    this.props.checkLogin();
  }

  render() {
    return (
      <Fragment>
        <div>
          {this.props.user.loggedIn ? (
            <NavMenu logOutHandler={this.props.logOut} userRdx={this.props.user} />
          ) : (
              ""
            )}
          {this.props.user.loggedIn ? this.layoutVal : ""}

          <div className={this.props.location.pathname === "/login" ? "login-panel-background" : "main-panel"}>{this.props.children}</div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
export default withRouter(
  connect(mapStateToProps, { logOut, checkLogin })(Layout)
);
