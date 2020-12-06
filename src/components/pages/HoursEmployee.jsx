import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { getUser } from '../../actions/getUser';
import { populatePagination } from '../../actions/populatePagination';
import { resetPagination } from '../../actions/resetPagination';
import { getPlanningenOnUser } from '../../actions/getPlanningenOnUser';
import '../../assets/css/HoursEmployee.css';

import $ from 'jquery';

import jsPDF from 'jspdf';

// import PaginationRow from "./fractions/PaginationRow";

class HoursEmployee extends Component {
    constructor(props) {
        super(props);

        this.userid = props.match.params.idmedewerker;
        this.GeneratePdf = this.GeneratePdf.bind(this);
        this.state = {
            genDateStart: new Date(),
            genDateEnd: new Date(new Date() + 7),
            showFull: true,
            gebruiker: ''
        }


    }

    componentWillMount() {
        this.props.getUser({ id: this.userid, token: this.props.loggedUser.token });
        this.props.getPlanningenOnUser({ id: this.userid, token: this.props.loggedUser.token })
            .then(schedule => {
                schedule.map( p => {
                    if(this.state.gebruiker.length > 0)
                        return;
                    else
                        this.setState({gebruiker: p.gebruiker.username})

                })
            })
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
            onSet: (a) => {
                this.setState({ genDateStart: new Date(a.select) })
            }
        });
        $('.datepickerEnd').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year,
            today: 'Today',
            clear: 'Clear',
            close: 'Ok',
            closeOnSelect: true, // Close upon selecting a date,
            container: 'body', // ex. 'body' will append picker to body
            onSet: (a) => {
                this.setState({ genDateEnd: new Date(a.select) })
            }
        });



    }

    GeneratePdf() {
        var doc = new jsPDF()
        let arr = this.hoursList();
        doc.setFontSize(24);
        doc.text(`medewerker ${this.props.user.username}`, 10, 15)
        doc.setFontSize(12);
        let x = 30;
        arr.forEach(element => {

            if (element !== null) {

                doc.text(`${element} `, 20, x)
                x += 10;
            }
        });
        doc.save('a1.pdf')

    }

    hoursList = () => {
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

            // let Uren = reservEnd.getTime() - reservStart.getTime();
            return (`${new Date(planning.datum).toLocaleDateString()}    -    ${d.toLocaleTimeString()} uur`);
        });
        return ListHours
    }


    handleChangeSelect = (x) => {
        console.log(x);
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

        let ListHours = this.props.planningenUser.planningen.sort( (a, b) => {
            return a < b;
        }).map(planning => {
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
            // let Uren = reservEnd.getTime() - reservStart.getTime();
            console.log('planning',planning);
            return (
                <tr>
                    <td>{new Date(planning.datum).toLocaleDateString('nl-NL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                    <td>{planning.route.routenummer}</td>
                    <td>{d.toLocaleTimeString().split(" AM")[0]} uur</td>
                    <td>{planning.voertuig.voertuigcode}</td>
                </tr>
                // <p>{new Date(planning.datum).toLocaleDateString('nl-NL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{planning.route.routenummer}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{d.toLocaleTimeString().split(" AM")[0]} uur </p>
            );
        });

        const timeConvert = (sec) => {
            var hrs = Math.floor(sec / 3600);
            var min = Math.floor((sec - (hrs * 3600)) / 60);
            var seconds = sec - (hrs * 3600) - (min * 60);
            seconds = Math.round(seconds * 100) / 100

            var result = (hrs < 10 ? "0" + hrs : hrs);
            result += ":" + (min < 10 ? "0" + min : min);
            result += ":" + (seconds < 10 ? "0" + seconds : seconds);
            return result;
        }

        const TotalHours = this.props.planningenUser.planningen.reduce((accumulator, planning) => {
            if(planning.gezien){
                let startDate = planning.echtestarttijd.split(":");
                let endDate = planning.echteeindtijd.split(":");
                var reservStart = new Date(2019, 1, 1, startDate[0], startDate[1], startDate[2]);
                var reservEnd = new Date(2019, 1, 1, endDate[0], endDate[1], endDate[2]);
                var d = new Date();
                d.setHours(reservEnd.getHours() - reservStart.getHours());
                d.setMinutes(reservEnd.getMinutes() - reservStart.getMinutes());
                d.setSeconds(reservEnd.getSeconds() - reservStart.getSeconds());

                let hours = d.toLocaleTimeString();

                var a = hours.split(':'); // split it at the colons

                // minutes are worth 60 seconds. Hours are worth 60 minutes.
                var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2].split(" ")[0]);
                // console.log("uuren "+ planning+":", timeConvert(seconds));
                return accumulator + seconds;
            }
            return accumulator;
        }, 0);

        const TotalHoursEXPERIMENTALEIGEN = this.props.planningenUser.planningen.reduce((accumulator, planning) => {
            if(planning.gezien && planning.voertuig.voertuigcode === "EIGENVERVOER"){
                let startDate = planning.echtestarttijd.split(":");
                let endDate = planning.echteeindtijd.split(":");
                var reservStart = new Date(2019, 1, 1, startDate[0], startDate[1], startDate[2]);
                var reservEnd = new Date(2019, 1, 1, endDate[0], endDate[1], endDate[2]);
                var d = new Date();
                d.setHours(reservEnd.getHours() - reservStart.getHours());
                d.setMinutes(reservEnd.getMinutes() - reservStart.getMinutes());
                d.setSeconds(reservEnd.getSeconds() - reservStart.getSeconds());

                let hours = d.toLocaleTimeString();

                var a = hours.split(':'); // split it at the colons

                // minutes are worth 60 seconds. Hours are worth 60 minutes.
                var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2].split(" ")[0]);
                // console.log("uuren "+ planning+":", timeConvert(seconds));
                return accumulator + seconds;
            }
            return accumulator;
        }, 0);

        const TotalHoursEXPERIMENTALEOW = this.props.planningenUser.planningen.reduce((accumulator, planning) => {
            if(planning.gezien && planning.voertuig.voertuigcode !== "EIGENVERVOER"){
                let startDate = planning.echtestarttijd.split(":");
                let endDate = planning.echteeindtijd.split(":");
                var reservStart = new Date(2019, 1, 1, startDate[0], startDate[1], startDate[2]);
                var reservEnd = new Date(2019, 1, 1, endDate[0], endDate[1], endDate[2]);
                var d = new Date();
                d.setHours(reservEnd.getHours() - reservStart.getHours());
                d.setMinutes(reservEnd.getMinutes() - reservStart.getMinutes());
                d.setSeconds(reservEnd.getSeconds() - reservStart.getSeconds());

                let hours = d.toLocaleTimeString();

                var a = hours.split(':'); // split it at the colons

                // minutes are worth 60 seconds. Hours are worth 60 minutes.
                var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2].split(" ")[0]);
                // console.log("uuren "+ planning+":", timeConvert(seconds));
                return accumulator + seconds;
            }
            return accumulator;
        }, 0);

        var a = [1, 1, 2];

        const alldays = this.props.planningenUser.planningen.map( p => {
            if(p.gezien){
                return p.datum
            }
        });

        let xior = [... new Set(alldays)];
        xior = xior.filter( x => {
            if(x !== undefined)
                return x
        });

        const TotalDays = xior.length;

        const allDaysSelect = this.props.planningenUser.planningen
            .filter(planning => { return new Date(planning.datum) >= new Date(this.state.genDateStart) && new Date(planning.datum) <= new Date(this.state.genDateEnd) }).map(p => {
                if(p.gezien){
                    return p.datum
                }
            });
        let xior2 = [... new Set(allDaysSelect)];
        xior2 = xior2.filter( x => {
            if(x !== undefined){
                return x
            }
        });
        const TotalDaysSelect = xior2.length;


        const TotalHours3 = this.props.planningenUser.planningen
            .filter(planning => { return new Date(planning.datum) >= new Date(this.state.genDateStart) && new Date(planning.datum) <= new Date(this.state.genDateEnd) })
            .reduce((accumulator, planning) => {
                if(planning.gezien){
                    let startDate = planning.echtestarttijd.split(":");
                    let endDate = planning.echteeindtijd.split(":");
                    var reservStart = new Date(2018, 1, 1, startDate[0], startDate[1], startDate[2]);
                    var reservEnd = new Date(2018, 1, 1, endDate[0], endDate[1], endDate[2]);

                    var d = new Date();
                    d.setHours(reservEnd.getHours() - reservStart.getHours());
                    d.setMinutes(reservEnd.getMinutes() - reservStart.getMinutes());
                    d.setSeconds(reservEnd.getSeconds() - reservStart.getSeconds());

                    let hours = d.toLocaleTimeString();

                    var a = hours.split(':'); // split it at the colons

                    // minutes are worth 60 seconds. Hours are worth 60 minutes.
                    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2].split(" ")[0]);
                    return accumulator + seconds;
                }
                return accumulator;

            }, 0);

        const TotalHours3EXPERIMENTALEIGEN = this.props.planningenUser.planningen
            .filter(planning => { return new Date(planning.datum) >= new Date(this.state.genDateStart) && new Date(planning.datum) <= new Date(this.state.genDateEnd) })
            .reduce((accumulator, planning) => {
                if(planning.gezien && planning.voertuig.voertuigcode === "EIGENVERVOER"){
                    let startDate = planning.echtestarttijd.split(":");
                    let endDate = planning.echteeindtijd.split(":");
                    var reservStart = new Date(2018, 1, 1, startDate[0], startDate[1], startDate[2]);
                    var reservEnd = new Date(2018, 1, 1, endDate[0], endDate[1], endDate[2]);

                    var d = new Date();
                    d.setHours(reservEnd.getHours() - reservStart.getHours());
                    d.setMinutes(reservEnd.getMinutes() - reservStart.getMinutes());
                    d.setSeconds(reservEnd.getSeconds() - reservStart.getSeconds());

                    let hours = d.toLocaleTimeString();

                    var a = hours.split(':'); // split it at the colons

                    // minutes are worth 60 seconds. Hours are worth 60 minutes.
                    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2].split(" ")[0]);
                    return accumulator + seconds;
                }
                return accumulator;

            }, 0);

        const TotalHours3EXPERIMENTALEOW = this.props.planningenUser.planningen
            .filter(planning => { return new Date(planning.datum) >= new Date(this.state.genDateStart) && new Date(planning.datum) <= new Date(this.state.genDateEnd) })
            .reduce((accumulator, planning) => {
                if(planning.gezien && planning.voertuig.voertuigcode !== "EIGENVERVOER"){
                    let startDate = planning.echtestarttijd.split(":");
                    let endDate = planning.echteeindtijd.split(":");
                    var reservStart = new Date(2018, 1, 1, startDate[0], startDate[1], startDate[2]);
                    var reservEnd = new Date(2018, 1, 1, endDate[0], endDate[1], endDate[2]);

                    var d = new Date();
                    d.setHours(reservEnd.getHours() - reservStart.getHours());
                    d.setMinutes(reservEnd.getMinutes() - reservStart.getMinutes());
                    d.setSeconds(reservEnd.getSeconds() - reservStart.getSeconds());

                    let hours = d.toLocaleTimeString();

                    var a = hours.split(':'); // split it at the colons

                    // minutes are worth 60 seconds. Hours are worth 60 minutes.
                    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2].split(" ")[0]);
                    return accumulator + seconds;
                }
                return accumulator;

            }, 0);

        const secsToTime = (secs) => {
            var sec_num = parseInt(secs, 10)
            var hours = Math.floor(sec_num / 3600) % 24
            var minutes = Math.floor(sec_num / 60) % 60
            var seconds = sec_num % 60
            return [hours, minutes, seconds]
                .map(v => v < 10 ? "0" + v : v)
                .filter((v, i) => v !== "00" || i > 0)
                .join(":")
        }

        const ListHours3 = this.props.planningenUser.planningen
            .filter(planning => { return new Date(planning.datum) >= new Date(this.state.genDateStart) && new Date(planning.datum) <= new Date(this.state.genDateEnd) })
            .map(planning => {
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
                // let Uren = reservEnd.getTime() - reservStart.getTime();

                return (

                    <tr>
                        <td>{new Date(planning.datum).toLocaleDateString('nl-NL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                        <td>{planning.route.routenummer}</td>
                        <td>{d.toLocaleTimeString().split(" AM")[0]} uur</td>
                        <td>{planning.voertuig.voertuigcode}</td>
                    </tr>
                    // <p>{new Date(planning.datum).toLocaleDateString('nl-NL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{planning.route.routenummer}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{d.toLocaleTimeString().split(" AM")[0]} uur </p>
                );
            });


        const genDate = () => {
            this.setState({ showFull: false }, () => {
                const ListHours3 = this.props.planningenUser.planningen
                    .filter(planning => { return new Date(planning.datum) >= new Date(this.state.genDateStart) && new Date(planning.datum) <= new Date(this.state.genDateEnd) })
                    .map(planning => {
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
                        // let Uren = reservEnd.getTime() - reservStart.getTime();
                        return (<p>{new Date(planning.datum).toLocaleDateString('nl-NL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{planning.route.routenummer}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{d.toLocaleTimeString().split(" AM")[0]} uur </p>);
                    });
            });

        }
        return (
            <Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <h1> Uren Informatie van {this.state.gebruiker} </h1>
                        <div className="col s8">
                            <div className="row">
                                <h5 className="">Select date range</h5>
                                <div className="input-field col s5">
                                    <div className="input-field">
                                        <input type="text" name="datumTill" id="datumTill" ref="datumpicker" className="datepicker" onChange={this.handleChangeSelect} />
                                        <label htmlFor="datumTill">Van</label>
                                    </div>
                                </div>
                                <div className="col s1"></div>
                                <div className="input-field col s5">
                                    <div className="input-field">
                                        <input type="text" name="datumFrom" id="datumFrom" ref="datumpicker" className="datepickerEnd" onChange={this.handleChangeSelect} />
                                        <label htmlFor="datumFrom">Tot</label>
                                    </div>
                                </div>
                                <div className="input-field col s1"> <a className="waves-effect waves-light btn" onClick={() => { genDate() }}>Genereer</a> </div>
                            </div>
                        </div>
                        <div className="col l12 m12">
                            {/* <PaginationRow table="populateRatingTable" /> */}
                            <div className="col s12 l6 bgwhite">
                                <h5 className="">Uren</h5>
                                <div className="row">
                                    {this.state.showFull ? ListHours : ListHours3}
                                </div>
                                <div className="row">
                                    Dagen: {this.state.showFull ? TotalDays : TotalDaysSelect}

                                </div>
                                <hr />
                                <div className="row">
                                    Totale uren - {this.state.showFull ? timeConvert(TotalHours) : timeConvert(TotalHours3)}
                                    &nbsp; - &nbsp; UREN EIGENVERVOER - {this.state.showFull ? timeConvert(TotalHoursEXPERIMENTALEIGEN): timeConvert(TotalHours3EXPERIMENTALEIGEN)}
                                    &nbsp; - &nbsp; EOW VERVOER - {this.state.showFull ? timeConvert(TotalHoursEXPERIMENTALEOW) : timeConvert(TotalHours3EXPERIMENTALEOW)}
                                </div>
                            </div>
                            <div className="col s12 l6 ">
                                <h5>Exporteer sectie</h5>
                                <div className="row">
                                    <a className="waves-effect waves-light btn" onClick={() => { return this.GeneratePdf() }}>PDF</a>
                                </div>
                                <div className="row">
                                    <a className="waves-effect waves-light btn">Excel</a>
                                </div>
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
