import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { getUser } from '../../actions/getUser';
import LoadJS from 'loadjs';

import { secondsToTimeString } from "../../logic/Libary"
import { capitalizeFirstLetter } from '../../logic/Libary';
import { populateRatingTable } from '../../actions/populateRatingTable';
import { populatePagination } from '../../actions/populatePagination';
import { resetPagination } from '../../actions/resetPagination';
import PaginationRow from "./fractions/PaginationRow";

class User extends Component {
    constructor(props) {
        super(props);

        this.userid = props.match.params.userid;

        let rdxActionDataRatingTable = {
            pagcurrent: this.props.pagination.pagcurrent,
            tableamount: this.props.pagination.tableamount,
            token: this.props.userRdx.token,
            media_id: this.userid,
            type: "user"
        }
        this.props.populateRatingTable(rdxActionDataRatingTable);
    }

    componentWillMount() {
        this.props.getUser({ id: this.userid, token: this.props.loggedUser.token });
    }

    componentDidUpdate() {
        LoadJS("https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js", () => {
            window.Materialize.updateTextFields();
        });
    }

    render() {
        const ratings = this.props.ratings.ratings.map((rating, i) => (
            <tr key={i}>
                <td>{rating.video_id}</td>
                <td>{rating.iab}</td>
                <td>{rating.pleasure}</td>
                <td>{rating.arousal}</td>
                <td>{rating.dominance}</td>
                <td>{secondsToTimeString(rating.duration)}</td>
            </tr>
        ));
        return (
            <Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <h1> Video's that {capitalizeFirstLetter(this.props.userDetail.firstname)} has rated </h1>
                        <div className="col s8">
                            <PaginationRow table="populateRatingTable" />
                            <div className="row table-container">
                                <table className="striped">
                                    <thead>
                                        <tr>
                                            <th>Video ID</th>
                                            <th>Category</th>
                                            <th>Pleasure</th>
                                            <th>Arousal</th>
                                            <th>Dominance</th>
                                            <th>Duration</th>
                                        </tr>
                                    </thead>
                                    <tbody>{ratings}</tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col l4 m12">
                            <div className="row">
                                <form className="col s12">
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <input value={this.props.userDetail.firstname ? this.props.userDetail.firstname : ""} id="first_name" type="text" className="validate" />
                                            <label htmlFor="first_name">First Name</label>
                                        </div>
                                        <div className="input-field col s6">
                                            <input value={this.props.userDetail.lastname ? this.props.userDetail.lastname : ""} id="last_name" type="text" className="validate" />
                                            <label htmlFor="last_name">Last Name</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input placeholder="Enter new password" id="password" type="password" className="validate" />
                                            <label htmlFor="password">Password</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input value={this.props.userDetail.email ? this.props.userDetail.email : ""} id="email" type="email" className="validate" />
                                            <label htmlFor="email">Email</label>
                                        </div>
                                    </div>
                                    <a className="waves-effect waves-light btn red">Remove</a>
                                    <a className="waves-effect waves-light btn purple right">Save</a>
                                </form>
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
    ratings: state.ratings,
    loggedUser: state.user,
    userDetail: state.user.user
});

const mapDispatchToProps = {
    populateRatingTable,
    populatePagination,
    resetPagination,
    getUser
}
export default connect(mapStateToProps, mapDispatchToProps)(User);
