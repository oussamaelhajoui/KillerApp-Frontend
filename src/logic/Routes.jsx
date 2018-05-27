import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Layout from "../components/Layout";

import Dashboard from "./../components/pages/Dashboard";
import MijnDashboard from "./../components/pages/MijnDashboard";
import Login from "./../components/pages/Login";
import Medewerkers from "./../components/pages/Medewerkers";
import Medewerker from "./../components/pages/Medewerker";
import Routes from "./../components/pages/Routes";
import Route from "./../components/pages/Route";
import Planning from "./../components/pages/Planning";
import PlanningGebruiker from "./../components/pages/PlanningGebruiker";
import MijnPlanning from "./../components/pages/MijnPlanning";

import Page404 from "./../components/pages/Page-404";

import { PrivateRoute } from "./Libary";

import { connect } from "react-redux";
import { logIn } from "../actions/loginAction";
import { checkLogin } from "../actions/checkLogin";

class Routes extends Component {
  state = {
    loggedIn: false
  };

  constructor(props) {
    super(props);

    this.ChangeLoginState.bind(this);
  }


  ChangeLoginState(loggedInVal) {
    this.setState({ loggedIn: loggedInVal });
  }

  render() {
    return (
      <Layout>

        <Switch>
          {!this.props.user.loggedIn && <PrivateRoute exact path="/" component={Login} user={this.props.user} />}
          {(this.props.user.userRole === 1) ? <PrivateRoute exact path="/" component={Dashboard} user={this.props.user} /> : ""}
          {(this.props.user.userRole === 2) ? <PrivateRoute exact path="/" component={MijnDashboard} user={this.props.user} /> : ""}
          {(this.props.user.userRole === 1) ? <PrivateRoute exact path="Medewerkers" component={Medewerkers} user={this.props.user} /> : ""}
          {(this.props.user.userRole === 1) ? <PrivateRoute exact path="/Medewerkers/:idmedewerker" component={Medewerker} user={this.props.user} /> : ""}
          {(this.props.user.userRole === 1) ? <PrivateRoute exact path="Routes" component={Routes} user={this.props.user} /> : ""}
          {(this.props.user.userRole === 1) ? <PrivateRoute exact path="Routes/:idroute" component={Route} user={this.props.user} /> : ""}
          {(this.props.user.userRole === 1) ? <PrivateRoute exact path="Planning" component={Planning} user={this.props.user} /> : ""}
          {(this.props.user.userRole === 1) ? <PrivateRoute exact path="Planning/idplanning" component={PlanningGebruiker} user={this.props.user} /> : ""}
          {(this.props.user.userRole === 2) ? <PrivateRoute exact path="Planning" component={MijnPlanning} user={this.props.user} /> : ""}
          <Route
            path="/login"
            render={(...n) => (
              <Login
                {...n}
              />
            )}
          />
          <Route component={Page404} />
        </Switch>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
export default withRouter(
  connect(mapStateToProps, { logIn, checkLogin })(Routes)
);
