import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { getUsersOnRoute } from '../../actions/getUsersOnRoute';
import { getRoutes } from '../../actions/getRoutes';

import { populatePagination } from '../../actions/populatePagination';
import { resetPagination } from '../../actions/resetPagination';


class RoutePage extends Component {

    state = {
        response: {
            totalpages: 1,
            data: [],
            success: false
        },
        route: {

        }

    }

    constructor(props) {
        super(props);

        this.routeid = props.match.params.idroute;
    }
    token = this.props.loggedUser.token;

    componentWillMount() {

        this.props.getUsersOnRoute({ id: this.routeid, token: this.token })
            .then(resolve => {
                console.log(resolve);
                this.setState({
                    response: { ...resolve }
                })
                this.setState({
                    route: { ...resolve["data"][0]["route"] }
                })
            });

    }


    render() {
        const planningen = this.state.response.data.map(data => {
            return (
                <tr>
                    <td>{data.user.id}</td>
                    <td>{data.user.username}</td>
                    <td>{`${data.user.voornaam} ${data.user.achternaam}`}</td>
                    <td>{data.datum.split("T")[0]}</td>
                    <td>{data.voertuigCode}</td>
                    <td>{"null"}</td>
                    <td>{"null"}</td>
                </tr>
            )
        })
        return (
            <Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <h1> Informatie over {this.state.route.routenummer} </h1>
                        <div className="col s12">
                            <div className="row table-container">
                                <table className="bordered centered">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>routenummer</th>
                                            <th>Tijd start</th>
                                            <th>Tijd Eind</th>
                                            <th>Vaste voertuig</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{this.state.route.id}</td>
                                            <td>{this.state.route.routenummer}</td>
                                            <td>{this.state.route.tijdstart}</td>
                                            <td>{this.state.route.tijdeind}</td>
                                            <td>{this.state.route.vastevoertuig !== undefined ? String(this.state.route.vastevoertuig.voertuigcode) : "Geen"}</td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col l12 m12">
                            <h3 className="center" style={{ marginTop: 120 }}>Gebruikers die de route gereden hebben </h3>
                            <div className="col s12">
                                <div className="row table-container">
                                    <table className="striped responsive-table">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Gebruikersnaam</th>
                                                <th>Naam</th>
                                                <th>Datum</th>
                                                <th>Voertuigcode</th>
                                                <th>tijd begin</th>
                                                <th>tijd eind</th>
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
            </Fragment >
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    pagination: state.pagination,
    loggedUser: state.user,
    userDetail: state.user.user,
    planningenUser: state.planningenUser,
    routes: state.routes
});

const mapDispatchToProps = {
    populatePagination,
    resetPagination,
    getUsersOnRoute,
    getRoutes
}
export default connect(mapStateToProps, mapDispatchToProps)(RoutePage);
