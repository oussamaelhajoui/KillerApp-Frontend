import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "./../../assets/css/Users.css";
import { connect } from "react-redux";

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

    this.FetchDataForUser();

  }

  componentDidMount() {
    $(".modal").modal();
    $("select").material_select();
  }

  FetchDataForUser = () => {
    let rdxActionDataUserTable = {
      pagcurrent: this.props.pagination.pagcurrent,
      tableamount: this.props.pagination.tableamount,
      token: this.props.user.token
    }
    this.props.populateUserTable(rdxActionDataUserTable);
  }

  render() {
    const users = this.props.users.users.map(user => (
      <tr key={user.id}>
        <td>{`${user.voornaam !== "" ? user.voornaam : "Onbekend"} ${user.achternaam}`}</td>
        <td>{user.username}</td>
        <td>{user.role.naam}</td>
        <td>
          <Link to={`/medewerkers/${user.id}`}> Go to profile </Link>
        </td>
      </tr>
    ));

    return (
      <Fragment>
        <div className="users container-fluid">
          <div className="row">
            <h1>Users overview</h1>

            <div className="col s12">
              <PaginationRow table="populateUserTable" />
              <div className="row table-container">
                <table className="striped">
                  <thead>
                    <tr>
                      <th>Naam</th>
                      <th>Gebruikersnaam</th>
                      <th>Rol</th>
                      <th>Bekijk profiel</th>
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

        <AddUserModal addedHandler={this.FetchDataForUser} />
      </Fragment>
    );
  }


  populateUserTable() {

    let rdxActionDataUserTable = {
      page: this.props.pagination.pagcurrent,
      amount: this.props.pagination.tableamount,
      token: this.props.user.token
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
