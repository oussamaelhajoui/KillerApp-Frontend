import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { getUser } from '../../actions/getUser';
import { populatePagination } from '../../actions/populatePagination';
import { resetPagination } from '../../actions/resetPagination';
import { getPlanningenOnUser } from '../../actions/getPlanningenOnUser';

import $ from 'jquery';

// import PaginationRow from "./fractions/PaginationRow";

class HoursEmployee extends Component {
    constructor(props) {
        super(props);

        this.userid = props.match.params.idmedewerker;
    }

    componentWillMount() {
        this.props.getUser({ id: this.userid, token: this.props.loggedUser.token });
        this.props.getPlanningenOnUser({ id: this.userid, token: this.props.loggedUser.token });
    }

    componentDidUpdate() {
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year,
            today: 'Today',
            clear: 'Clear',
            close: 'Ok',
            closeOnSelect: true, // Close upon selecting a date,
            container: 'body', // ex. 'body' will append picker to body
        });

    }



    render() {
        // const planningen = this.props.planningenUser.planningen.map(planning => {
        //     return (
        //         <tr key={planning.idplanning}
        //             style={(planning.route.tijdstart !== planning.echtestarttijd || planning.route.tijdeind !== planning.echteeindtijd) ?
        //                 (planning.echtestarttijd !== "00:00:00") ? { backgroundColor: "#FF4136" } : { backgroundColor: "#DDD" } :
        //                 { backgroundColor: "#01FF70" }}
        //             class={(planning.route.tijdstart !== planning.echtestarttijd || planning.route.tijdeind !== planning.echteeindtijd) ? (planning.echtestarttijd !== "00:00:00") ? "tooltipped" : "" : ""}
        //             data-position="bottom" data-delay="50"
        //             data-tooltip={(planning.route.tijdstart !== planning.echtestarttijd || planning.route.tijdeind !== planning.echteeindtijd) ? planning.reden : ""}
        //         >
        //             <td>{planning.idplanning}</td>
        //             <td>{planning.datum.split("T")[0]}</td>
        //             <td>{planning.route.routenummer}</td>
        //             <td>{planning.voertuig.voertuigcode}</td>
        //             <td>{planning.echtestarttijd}</td>
        //             <td>{planning.echteeindtijd}</td>
        //             <td>{planning.route.tijdstart}</td>
        //             <td>{planning.route.tijdeind}</td>
        //             <td>{planning.gezien ? "Ja" : "Nee"}</td>
        //         </tr>
        //     )
        // })

        const ListHours = this.props.planningenUser.planningen.map(planning => {
            if (planning.echtestarttijd === "00:00:00")
                return null;
            let startDate = planning.echtestarttijd.split(":");
            let endDate = planning.echteeindtijd.split(":");
            var reservStart = new Date(2018, 1, 1, startDate[0], startDate[1], startDate[2]);
            var reservEnd = new Date(2018, 1, 1, endDate[0], endDate[1], endDate[2]);

            var d = new Date();
            d.setHours(reservEnd.getHours() - reservStart.getHours());
            d.setMinutes(reservEnd.getMinutes() - reservStart.getMinutes());
            d.setSeconds(reservEnd.getSeconds() - reservStart.getSeconds());

            // let hours = reservEnd.getTime() - reservStart.getTime();
            return (<p>{planning.datum.split("T")[0]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{d.toLocaleTimeString()} </p>);

        }

        )
        return (
            <Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <h1> Hours Informatie about {this.props.userDetail.voornaam} </h1>
                        <div className="col s8">
                            <div className="row">
                                <h5 className="">Select date range</h5>
                                <div className="input-field col s5">
                                    <div className="input-field">
                                        <input type="text" name="datumTill" id="datumTill" ref="datumpicker" className="datepicker" onChange={this.handleChangeSelect} />
                                        <label htmlFor="datumTill">From</label>
                                    </div>
                                </div>
                                <div className="col s1"></div>
                                <div className="input-field col s5">
                                    <div className="input-field">
                                        <input type="text" name="datumFrom" id="datumFrom" ref="datumpicker" className="datepicker" onChange={this.handleChangeSelect} />
                                        <label htmlFor="datumFrom">Till</label>
                                    </div>
                                </div>
                                <div className="input-field col s1"> <a class="waves-effect waves-light btn">Generate</a> </div>
                            </div>
                        </div>
                        <div className="col l12 m12">
                            <h3 className="">Hours</h3>
                            {/* <PaginationRow table="populateRatingTable" /> */}
                            <div className="col s12">
                                <div className="row">
                                    {ListHours}
                                </div>
                                {/* <div className="row table-container">
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
                                </div> */}
                            </div>
                            <div className="row">
                                {/* <a className="waves-effect waves-light btn red">Zet op non-actief</a> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(HoursEmployee);
