import React, { Component } from "react";
import { connect } from "react-redux";

import $ from "jquery";
import ReactDOM from "react-dom";

import Swal from 'sweetalert2';
import Restful from "../../../logic/Restful";

class AddUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      straat: "",
      huisnummer: 0,
      postcode: "",
      stad: "",
      role: "",
      roles: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.fetchRoles();
  }

  componentDidMount() {
    $("select").material_select();

    // To make the select work with materializecss
    $(ReactDOM.findDOMNode(this.refs.selectrole)).on("change", this.handleChange.bind(this));
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    let data = {
      username: this.state.username,
      voornaam: this.state.firstname,
      achternaam: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      roleid: this.state.role,
      straat: this.state.straat,
      stad: this.state.stad,
      huisnummer: this.state.huisnummer,
      postcode: this.state.postcode
    };

    Restful.Post("user/register", data, this.props.user.token)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse["success"] === true) {
          // User added succesfully
          Swal({
            title: "De ingevoerde medewerker is opgeslagen",
            type: "success",
            showConfirmButton: true,
            timer: 1500
          }).then(res => {
            this.props.addedHandler();
          })
        }
      })
      .catch(message => {
        return false;
      });
  }

  fetchRoles() {
    this.setState({ roles: [] }, () => {
      Restful.Get("user/Roles", this.props.user.token)
        .then(response => response.json())
        .then(jsonResponse => {
          if (jsonResponse["rollen"].length > 0) {
            this.setState({ roles: jsonResponse["rollen"] }, () => {
              $("select").material_select();
            });
          }
        })
        .catch(message => {
          console.log(message);
        });
    });
  }

  render() {
    const roles = this.state.roles.map(role =>
      <option key={role.id} value={role.id}>{role.naam}</option>
    );

    return (
      <div id="AddUserModal" className="modal">
        <form onSubmit={this.handleSubmit}>
          <div className="modal-content">
            <h4>Voeg een nieuwe route toe</h4>

            <div className="row">
              <div className="col s12">
                <div className="row modal-form-row">
                  <div className="input-field col s12">
                    <input
                      name="username"
                      type="text"
                      value={this.state.username}
                      onChange={this.handleChange}
                      className="validate"
                    />
                    <label htmlFor="username">Username</label>
                  </div>
                </div>
                <div className="row modal-form-row">
                  <div className="input-field col s6">
                    <input
                      name="firstname"
                      type="text"
                      value={this.state.firstname}
                      onChange={this.handleChange}
                      className="validate"
                    />
                    <label htmlFor="firstname">First name</label>
                  </div>
                  <div className="input-field col s6">
                    <input
                      name="lastname"
                      type="text"
                      value={this.state.lastname}
                      onChange={this.handleChange}
                      className="validate"
                    />
                    <label htmlFor="lastname">Last name</label>
                  </div>
                </div>
                <div className="row modal-form-row">
                  <div className="input-field col s12">
                    <input
                      name="email"
                      type="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      className="validate"
                    />
                    <label htmlFor="email">E-mail</label>
                  </div>
                </div>
                <div className="row modal-form-row">
                  <div className="input-field col s12">
                    <input
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      className="validate"
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                </div>
                <div className="row modal-form-row">
                  <div className="input-field col s4">
                    <input
                      name="stad"
                      type="text"
                      value={this.state.stad}
                      onChange={this.handleChange}
                      className="validate"
                    />
                    <label htmlFor="straat">Stad</label>
                  </div>
                  <div className="input-field col s4">
                    <input
                      name="straat"
                      type="text"
                      value={this.state.straat}
                      onChange={this.handleChange}
                      className="validate"
                    />
                    <label htmlFor="straat">Straat</label>
                  </div>
                  <div className="input-field col s2">
                    <input
                      name="huisnummer"
                      type="text"
                      value={this.state.huisnummer}
                      onChange={this.handleChange}
                      className="validate"
                    />
                    <label htmlFor="huisnummer">Huisnummer</label>
                  </div>
                  <div className="input-field col s2">
                    <input
                      name="postcode"
                      type="text"
                      value={this.state.postcode}
                      onChange={this.handleChange}
                      className="validate"
                    />
                    <label htmlFor="postcode">Postcode</label>
                  </div>
                </div>
                <div className="row modal-form-row">
                  <div className="input-field col s12">
                    <select ref="selectrole" name="role" value={this.state.role} onChange={this.handleChange}>
                      <option value="" disabled>
                        Choose your option
                      </option>
                      {this.props.user.userRole === 0 && <option value="0">Administrator</option>}
                      {roles}
                    </select>
                    <label>Role</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="modal-action modal-close waves-effect waves-red btn-flat">
              Close
            </button>
            <button className="modal-action modal-close waves-effect waves-green btn-flat" type="submit" >
              Create
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps, {})(AddUserModal);
