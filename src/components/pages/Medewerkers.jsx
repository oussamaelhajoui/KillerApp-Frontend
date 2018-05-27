import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "./../../assets/css/Users.css";
import { connect } from "react-redux";

import SearchRow from "./fractions/SearchRow";
import AddUserModal from "./fractions/AddUserModal";
import PaginationRow from "./fractions/PaginationRow";

import { populateUserTable } from '../../actions/populateUserTable';
import { populatePagination } from '../../actions/populatePagination';
import { resetPagination } from '../../actions/resetPagination';

class Users extends Component {

  constructor(props) {
    super(props);

    this.props.resetPagination();

    this.populateUserTable = this.populateUserTable.bind(this);

    let rdxActionDataUserTable = {
      pagcurrent: this.props.pagination.pagcurrent,
      tableamount: this.props.pagination.tableamount,
      token: this.props.user.token,
      query: ""
    }
    this.props.populateUserTable(rdxActionDataUserTable);
  }

  componentDidMount() {
    $(".modal").modal();
    $("select").material_select();
  }

  render() {
    const users = this.props.users.users.map(user => (
      <tr key={user.id}>
        <td>{user.firstname + " " + user.lastname}</td>
        <td>{user.role === 1 ? "Admin" : "Freelancer"}</td>
        <td>17</td>
        <td>4:20</td>
        <td>
          <Link to={`/users/${user.id}`}> Go to profile </Link>
        </td>
      </tr>
    ));

    return (
      <Fragment>
        <div className="users container-fluid">
          <div className="row">
            <h1>Users overview</h1>

            <div className="col s12">
              <SearchRow table="populateUserTable" />
              <PaginationRow table="populateUserTable" />
              <div className="row table-container">
                <table className="striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Categorised videos</th>
                      <th>Average duration</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>{users}</tbody>
                </table>

                <div className={this.props.users.loadingUsers === true ? "preloader-wrapper big active" : "preloader-wrapper big"}>
                  <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                      <div className="circle" />
                    </div>
                    <div className="gap-patch">
                      <div className="circle" />
                    </div>
                    <div className="circle-clipper right">
                      <div className="circle" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="fixed-action-btn">
                <a href="#AddUserModal" className="btn-floating btn-large waves-effect waves-light modal-trigger">
                  <i className="material-icons">add</i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <AddUserModal />
      </Fragment>
    );
  }


  populateUserTable() {

    let rdxActionDataUserTable = {
      page: this.props.pagination.pagcurrent,
      amount: this.props.pagination.tableamount,
      token: this.props.user.token,
      query: ""
    }
    this.props.populateUserTable(rdxActionDataUserTable)

  }


}

const mapStateToProps = state => ({
  user: state.user,
  pagination: state.pagination,
  users: state.users
});

const mapDispatchToProps = {
  populateUserTable,
  populatePagination,
  resetPagination
}
export default connect(mapStateToProps, mapDispatchToProps)(Users);
