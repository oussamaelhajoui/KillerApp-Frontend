import React, { Component, Fragment } from "react";
// import { Link } from "react-router-dom";
import $ from "jquery";
import { connect } from "react-redux";
import AddVoertuigModal from "./fractions/AddVoertuigModal";
// import PaginationRow from "./fractions/PaginationRow";

import { populateVoertuigTable } from '../../actions/populateVoertuigTable';
import { populatePagination } from '../../actions/populatePagination';
import { resetPagination } from '../../actions/resetPagination';

class Voertuigen extends Component {
    constructor(props) {
        super(props);

        this.props.resetPagination();

        this.getVoertuigen();

    }

    componentDidMount() {
        $(".modal").modal();
        $("select").material_select();
    }

    getVoertuigen = () => {
        let rdxActionDataUserTable = {
            pagcurrent: this.props.pagination.pagcurrent,
            tableamount: this.props.pagination.tableamount,
            token: this.props.user.token
        }
        this.props.populateVoertuigTable(rdxActionDataUserTable);
    }

    render() {
        const cars = this.props.voertuigen.voertuigen.map(car => (
            <tr key={car.id}>
                <td>{car.voertuigcode}</td>
                <td>{car.kenteken}</td>
                <td>{car.kleur}</td>
                <td>{car.soort.soort}</td>
                <td>
                    {/* <Link to={`/voertuigen/${car.id}`}> Go to profile </Link> */}
                </td>
            </tr>
        ));
        return (
            <Fragment>
                <div className="users container-fluid">
                    <div className="row">
                        <h1 className="titlePopOut">Voertuigen overview</h1>

                        <div className="col s12">
                            {/* <PaginationRow table="populateRouteTable" /> */}
                            <div className="row table-container">
                                <table className="striped">
                                    <thead>
                                        <tr>
                                            <th>Voertuigcode</th>
                                            <th>Kenteken</th>
                                            <th>Kleur</th>
                                            <th>Model</th>
                                            {/* <th>Bekijk route</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>{cars}</tbody>
                                </table>

                                <div className={this.props.voertuigen.loadingVoertuigen === true ? "preloader-wrapper big active" : "preloader-wrapper big"}>
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
                                <a href="#AddVoertuigModal" className="btn-floating btn-large waves-effect waves-light modal-trigger">
                                    <i className="material-icons">add</i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <AddVoertuigModal addedHandler={this.getVoertuigen} />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    pagination: state.pagination,
    users: state.users,
    voertuigen: state.voertuigen
});

const mapDispatchToProps = {
    populateVoertuigTable,
    populatePagination,
    resetPagination
}
export default connect(mapStateToProps, mapDispatchToProps)(Voertuigen);
