import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { connect } from "react-redux";
import AddUserModal from "./fractions/AddUserModal";
import PaginationRow from "./fractions/PaginationRow";

import { populateRouteTable } from '../../actions/populateRouteTable';
import { populatePagination } from '../../actions/populatePagination';
import { resetPagination } from '../../actions/resetPagination';

class RoutesPage extends Component {
    constructor(props) {
        super(props);

        this.props.resetPagination();


        let rdxActionDataUserTable = {
            pagcurrent: this.props.pagination.pagcurrent,
            tableamount: this.props.pagination.tableamount,
            token: this.props.user.token
        }
        this.props.populateRouteTable(rdxActionDataUserTable);
    }

    componentDidMount() {
        $(".modal").modal();
        $("select").material_select();
    }

    render() {
        const users = this.props.routes.routes.map(routes => (
            <tr key={routes.id}>
                <td>{routes.routenummer}</td>
                <td>{routes.tijdstart}</td>
                <td>{routes.tijdeind}</td>
                <td>{routes.vastevoertuig !== null ? routes.vastevoertuig.voertuigcode : "Geen"}</td>
                <td>
                    <Link to={`/users/${routes.id}`}> Go to profile </Link>
                </td>
            </tr>
        ));
        return (
            <Fragment>
                <div className="users container-fluid">
                    <div className="row">
                        <h1>Route overview</h1>

                        <div className="col s12">
                            <PaginationRow table="populateRouteTable" />
                            <div className="row table-container">
                                <table className="striped">
                                    <thead>
                                        <tr>
                                            <th>Routenummer</th>
                                            <th>Tijd start</th>
                                            <th>Tijd eind</th>
                                            <th>Vaste voertuig</th>
                                            <th>Bekijk route</th>
                                        </tr>
                                    </thead>
                                    <tbody>{users}</tbody>
                                </table>

                                <div className={this.props.routes.loadingroutes === true ? "preloader-wrapper big active" : "preloader-wrapper big"}>
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
}

const mapStateToProps = state => ({
    user: state.user,
    pagination: state.pagination,
    users: state.users,
    routes: state.routes
});

const mapDispatchToProps = {
    populateRouteTable,
    populatePagination,
    resetPagination
}
export default connect(mapStateToProps, mapDispatchToProps)(RoutesPage);
