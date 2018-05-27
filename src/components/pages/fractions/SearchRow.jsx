import React, { Component } from "react";
import { connect } from "react-redux";

import $ from "jquery";
import ReactDOM from "react-dom";
import Restful from "../../../logic/Restful";
import { populateUserTable } from '../../../actions/populateUserTable';

class SearchRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      role: "",
      roles: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    let rdxActionDataTable = {
      pagcurrent: 1,
      tableamount: this.props.pagination.tableamount,
      token: this.props.user.token,
      query: this.state.query
    }
    this.props[this.props.table](rdxActionDataTable);
  }

  componentDidMount() {
    $("select").material_select();

    // To make the select work with materializecss
    $(ReactDOM.findDOMNode(this.refs.selectrole)).on("change", this.handleChange.bind(this));
  }

  componentWillMount() {
    this.fetchRoles();
  }

  fetchRoles() {
    this.setState({ roles: [] }, () => {
      Restful.Get("role/get", this.props.user.token)
        .then(response => response.json())
        .then(jsonResponse => {
          if (jsonResponse.length > 0) {
            this.setState({ roles: jsonResponse }, () => {
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
      <option key={role.id} value={role.id}>{role.name}</option>
    );
    return (
      <div>
        <div className="row">
          <div className={this.props.table === "populateVideoTable" ? "input-field col s12" : "input-field col s6"}>
            <input id="query" name="query" type="text" value={this.state.query} onChange={this.handleChange} />
            <label htmlFor="query">
              <b>Query</b>
            </label>
          </div>
          {this.props.table === "populateVideoTable" ? "" : (
            <div className="input-field col s6">
              <select ref="selectrole" name="role" value={this.state.role} onChange={this.handleChange}>
                <option value="-1">Choose your option</option>
                <option value="0">Administrator</option>
                {roles}
              </select>
              <label>Role</label>
            </div>
          )}
          <button className="waves-effect waves-light btn col s2 purple" onClick={this.handleSubmit}>
            Reset
          </button>
          <button className="waves-effect waves-light btn col s2 right" onClick={this.handleSubmit}>
            Search
          </button>
        </div>
        <div className="divider"></div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  pagination: state.pagination
});

const mapDispatchToProps = {
  populateUserTable
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchRow);