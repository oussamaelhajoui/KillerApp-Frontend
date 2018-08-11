import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { getUser } from '../../actions/getUser';
import $ from 'jquery';
import { populatePagination } from '../../actions/populatePagination';
import { resetPagination } from '../../actions/resetPagination';
import { getPlanningenOnUser } from '../../actions/getPlanningenOnUser';

// import PaginationRow from "./fractions/PaginationRow";

class User extends Component {
    constructor(props) {
        super(props);

        this.userid = props.match.params.idmedewerker;
    }

    componentWillMount() {
        this.props.getUser({ id: this.userid, token: this.props.loggedUser.token });
        this.props.getPlanningenOnUser({ id: this.userid, token: this.props.loggedUser.token });
    }

    componentDidUpdate() {
        $('.tooltipped').tooltip({ delay: 50 });
    }


    render() {
        const planningen = this.props.planningenUser.planningen.map(planning => {
            return (
                <tr key={planning.idplanning}
                    style={(planning.route.tijdstart !== planning.echtestarttijd || planning.route.tijdeind !== planning.echteeindtijd) ?
                        (planning.echtestarttijd !== "00:00:00") ? { backgroundColor: "#FF4136" } : { backgroundColor: "#DDD" } :
                        { backgroundColor: "#01FF70" }}
                    class={(planning.route.tijdstart !== planning.echtestarttijd || planning.route.tijdeind !== planning.echteeindtijd) ? (planning.echtestarttijd !== "00:00:00") ? "tooltipped" : "" : ""}
                    data-position="bottom" data-delay="50"
                    data-tooltip={(planning.route.tijdstart !== planning.echtestarttijd || planning.route.tijdeind !== planning.echteeindtijd) ? planning.reden : ""}
                >
                    <td>{planning.idplanning}</td>
                    <td>{planning.datum.split("T")[0]}</td>
                    <td>{planning.route.routenummer}</td>
                    <td>{planning.voertuig.voertuigcode}</td>
                    <td>{planning.echtestarttijd}</td>
                    <td>{planning.echteeindtijd}</td>
                    <td>{planning.route.tijdstart}</td>
                    <td>{planning.route.tijdeind}</td>
                    <td>{planning.gezien ? "Ja" : "Nee"}</td>
                </tr>
            )
        })
        return (
            <Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <h1> Informatie over {this.props.userDetail.voornaam} </h1>
                        <div className="col s12">
                            <div className="row table-container">
                                <table className="bordered centered">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Gebruikersnaam</th>
                                            <th>Naam</th>
                                            <th>Adres</th>
                                            <th>Stad</th>
                                            <th>Postcode</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{this.props.userDetail.id}</td>
                                            <td>{this.props.userDetail.username}</td>
                                            <td>{`${this.props.userDetail.voornaam !== "" ? this.props.userDetail.voornaam : "Onbekend"} ${this.props.userDetail.achternaam} `}</td>
                                            <td>{`${this.props.userDetail.straat} ${this.props.userDetail.huisnummer}`}</td>
                                            <td>{this.props.userDetail.stad}</td>
                                            <td>{this.props.userDetail.postcode}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col l12 m12">
                            <h3 className="center">Planning</h3>
                            {/* <PaginationRow table="populateRatingTable" /> */}
                            <div className="col s12">
                                <div className="row table-container">
                                    <table className="striped responsive-table">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>datum</th>
                                                <th>route</th>
                                                <th>voertuig</th>
                                                <th>start tijd</th>
                                                <th>eind tijd</th>
                                                <th>route tijd start</th>
                                                <th>route tijd eind</th>
                                                <th>gezien</th>
                                            </tr>
                                        </thead>
                                        <tbody>{planningen}</tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="row">
                                <a className="waves-effect waves-light btn red">Zet op non-actief</a>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    pagination: state.pagination,
    loggedUser: state.user,
    userDetail: state.user.user,
    planningenUser: state.planningenUser
});

const mapDispatchToProps = {
    populatePagination,
    resetPagination,
    getUser,
    getPlanningenOnUser
}
export default connect(mapStateToProps, mapDispatchToProps)(User);
