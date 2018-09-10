import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import LiNavLink from "../../../logic/LiNavLink";

import SideBarBG from "./../../../assets/img/sidebar-1.jpg";

import "../../../assets/css/nav.css";
import { withRouter } from 'react-router-dom';


class NavMenu extends Component {
  constructor(props) {
    super(props);

    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    this.props.logOutHandler();
    this.props.history.push("/login");
  }

  render() {
    return (
      <div className="sidebar" data-color="purple" data-image={SideBarBG}>
        {/* <!--
            Tip 1: You can change the color of the sidebar using: data-color="purple | blue | green | orange | red"

            Tip 2: you can also add an image using data-image tag
        --> */}
        <div className="logo">
          <NavLink to={"/"} className="simple-text">
            Eow planning
          </NavLink>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {(this.props.userRdx.userRole === 1) ?
              <LiNavLink activeClassName="active" exact={true} strict to="/">
                <i className="material-icons">dashboard</i>
                <p>Dashboard</p>
              </LiNavLink>
              : ""}
            {(this.props.userRdx.userRole === 2) ?
              <LiNavLink activeClassName="active" exact={true} strict to="/">
                <i className="material-icons">dashboard</i>
                <p>Mijn Dashboard</p>
              </LiNavLink>
              : ""}
            {(this.props.userRdx.userRole === 1) ?
              <LiNavLink activeClassName="active" exact={false} strict to="/medewerkers">
                <i className="material-icons">people</i>
                <p>Medewerkers</p>
              </LiNavLink>
              : ""}
            {(this.props.userRdx.userRole === 1) ?
              <LiNavLink
                activeClassName="active"
                exact={false}
                strict
                to="/routes"
              >
                <i className="material-icons">featured_play_list</i>
                <p>Routes</p>
              </LiNavLink>
              : ""}
            {(this.props.userRdx.userRole === 1) ?
              <LiNavLink activeClassName="active" exact={false} strict to="/planning" >
                <i className="material-icons">schedule</i>
                <p>Planning</p>
              </LiNavLink>
              : ""}

            {(this.props.userRdx.userRole === 2) ?
              <LiNavLink activeClassName="active" exact={false} strict to="/planning" >
                <i className="material-icons">schedule</i>
                <p>Mijn Planning</p>
              </LiNavLink>
              : ""}
            {(this.props.userRdx.userRole === 1) ?
              <LiNavLink
                activeClassName="active"
                exact={true}
                strict
                to="/voertuigen"
              >
                <i className="material-icons">directions_car</i>
                <p>Auto's</p>
              </LiNavLink>
              : ""}
            {(this.props.userRdx.userRole === 1) ?
              <LiNavLink
                activeClassName="active"
                exact={true}
                strict
                to="/hours"
              >
                <i className="material-icons">av_timer</i>
                <p>Hours</p>
              </LiNavLink>
              : ""}
            {(this.props.userRdx.userRole === 2) ?
              <LiNavLink
                activeClassName="active"
                exact={true}
                strict
                to="/myhours"
              >
                <i className="material-icons">av_timer</i>
                <p>My hours</p>
              </LiNavLink>
              : ""}
            {(this.props.userRdx.userRole === 2) ?
              <LiNavLink
                activeClassName="active"
                exact={true}
                strict
                to="/profiel"
              >
                <i className="material-icons">people</i>
                <p>My profile</p>
              </LiNavLink>
              : ""}
          </ul>

          <ul className="nav nav-mutated">
            <li className="clickable-btn" onClick={this.signOut}>
              <a>
                <i className="material-icons">exit_to_app</i>
                <p>Log out</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(NavMenu);
