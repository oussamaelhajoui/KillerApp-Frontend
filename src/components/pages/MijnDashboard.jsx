import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import $ from 'jquery';

import Chart from 'chart.js'

import { getPlanningenOnUser } from '../../actions/getPlanningenOnUser'

import Swal from 'sweetalert2';
import Restful from '../../logic/Restful';

class MijnDashboard extends Component {
    state = {
        planningCurrentWeek: [],
        planningValues: {
            Monday: 0,
            Tuesday: 0,
            Wednesday: 0,
            Thursday: 0,
            Friday: 0,
            Saturday: 0,
            Sunday: 0

        },
        rawValuesDashboard: [],
        clickedTimes: {
            id: -1,
            startTime: "00:00:00",
            endTime: "00:00:00"
        }
    }



    componentWillMount() {
        this.initData();
    }

    componentDidMount() {
        $('.modal').modal();

        $('.timepicker').pickatime({
            default: 'now', // Set default time: 'now', '1:30AM', '16:30'
            fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
            twelvehour: false, // Use AM/PM or 24-hour format
            donetext: 'OK', // text for done-button
            cleartext: 'Clear', // text for clear-button
            canceltext: 'Cancel', // Text for cancel-button,
            container: undefined, // ex. 'body' will append picker to body
            autoclose: false, // automatic close timepicker
            ampmclickable: true, // make AM PM clickable
            aftershow: function (e) { console.log(e) } //Function for after opening timepicker
        });

    }

    loadChart = () => {
        var ctx = document.getElementById("myChart");
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"],
                datasets: [{
                    label: 'Routes per dag',
                    data: this.state.rawValuesDashboard,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.45)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1,
                }]
            }
        });
    }

    componentDidUpdate() {
        // console.log("ai", this.state.planningCurrentWeek);

        $('.timepicker').pickatime({
            default: 'now', // Set default time: 'now', '1:30AM', '16:30'
            fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
            twelvehour: false, // Use AM/PM or 24-hour format
            donetext: 'OK', // text for done-button
            cleartext: 'Clear', // text for clear-button
            canceltext: 'Cancel', // Text for cancel-button,
            container: undefined, // ex. 'body' will append picker to body
            autoclose: false, // automatic close timepicker
            ampmclickable: true, // make AM PM clickable
            aftershow: function (e) { console.log("nieuw") } //Function for after opening timepicker
        });

    }

    getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

    getSunday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + 7;
        return new Date(d.setDate(diff));
    }

    countInArray(array, what) {
        var count = 0;
        for (var i = 0; i < array.length; i++) {
            if (array[i] === what) {
                count++;
            }
        }
        return count;
    }



    initData = () => {
        this.props.getPlanningenOnUser({ id: this.props.user.dbResponse.id, token: this.props.user.token })
            .then(planningen => {
                if (planningen.length > 0) {
                    let planningCurrentWeek = planningen.filter(planning => {
                        let tmpDate = new Date(planning.datum)
                        let Maandag = this.getMonday(new Date());
                        let Zondag = this.getSunday(new Date());
                        if (tmpDate >= Maandag && tmpDate <= Zondag) {
                            return true
                        } else {
                            return false;
                        }
                    })

                    this.setState({ planningCurrentWeek }, () => {
                        let arr = {};
                        var weekday = new Array(7);
                        weekday[0] = "Sunday";
                        weekday[1] = "Monday";
                        weekday[2] = "Tuesday";
                        weekday[3] = "Wednesday";
                        weekday[4] = "Thursday";
                        weekday[5] = "Friday";
                        weekday[6] = "Saturday";
                        planningCurrentWeek.forEach(element1 => {
                            let tmpDate = new Date(element1.datum);
                            let day = weekday[tmpDate.getDay()];

                            if ((day in arr) === false) {
                                arr[day] = 1;
                            } else {
                                arr[day] = arr[day] + 1;
                            }
                        });
                        this.setState({ planningValues: { ...this.state.planningValues, ...arr } }, () => {
                            let tmpArr = [this.state.planningValues.Monday, this.state.planningValues.Tuesday, this.state.planningValues.Wednesday, this.state.planningValues.Thursday, this.state.planningValues.Friday, this.state.planningValues.Saturday, this.state.planningValues.Sunday];
                            this.setState({ rawValuesDashboard: tmpArr }, () => {
                                this.loadChart();
                            });
                        });
                    })


                }
            });

    }

    ChangedTimesInState = (id, startTime, endTime) => {
        let clickedTimes = {
            id,
            startTime,
            endTime
        }
        this.setState({ clickedTimes }, () => {
            $('#textarea1').val('');
            $('#textarea1').trigger('autoresize');
            if (!$('#reasonArea').hasClass("hide"))
                $('#reasonArea').addClass("hide");
            $('#modal6543').modal('open');

        });
    }

    FillScheduleInDb(id, startTime, endTime, reason) {
        let data = {
            idPlanning: id,
            gezien: 1,
            echtestarttijd: startTime,
            echteeindtijd: endTime,
            reden: reason
        }
        Restful.Post("schedule/fill/", data, this.props.user.token)
            .then(res => res.json())
            .then(response => {
                console.log(response);
                this.initData()
                Swal({
                    title: "Done",
                    type: "info",
                    text: "we updated your times"

                })
            })
    }

    confirmCheckout = () => {
        let startTime = this.state.clickedTimes.startTime.substring(0, 5);
        let endTime = this.state.clickedTimes.endTime.substring(0, 5);
        console.group("states");
        console.log(startTime);
        console.log(endTime);
        console.groupEnd();


        console.group("inputs");
        console.log(this.refs.timeStartInput.value);
        console.log(this.refs.timeEndInput.value);
        console.groupEnd();


        if (startTime !== this.refs.timeStartInput.value || endTime !== this.refs.timeEndInput.value) {
            if ($('#textarea1').val() !== "") {
                $('#textarea1').trigger('autoresize');
                $("#modal6543").modal('close');
                this.FillScheduleInDb(this.state.clickedTimes.id, this.state.clickedTimes.startTime, this.state.clickedTimes.endTime, $('#textarea1').val())
                Swal({
                    title: "Done",
                    type: "info",
                    text: "Your modified times are saved, You succesfully clocked out"
                })
            } else {
                $('#textarea1').trigger('autoresize');
                let reasonArea = document.querySelector("#reasonArea");
                reasonArea.classList.remove("hide");
            }
        } else {
            $('#textarea1').trigger('autoresize');
            $("#modal6543").modal('close');
            Swal({
                title: "Done",
                type: "info",
                text: "Your times are saved, You succesfully clocked out"
            })
            this.FillScheduleInDb(this.state.clickedTimes.id, this.state.clickedTimes.startTime, this.state.clickedTimes.endTime, '')
        }
    }

    render() {

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const Planningen = this.state.planningCurrentWeek.map(planning => {
            return (
                <tr key={planning.idplanning}>
                    <td>{planning.idplanning}</td>
                    <td>{new Date(planning.datum.split("T")[0]).toLocaleDateString('nl-NL', options)}</td>
                    <td>{planning.route.routenummer}</td>
                    <td>{planning.voertuig.voertuigcode}</td>
                    <td>{`${planning.route.tijdstart} - ${planning.route.tijdeind}`}</td>
                    <td>
                        <a className={(new Date(`${planning.datum.split("T")[0]} ${planning.route.tijdeind}`) > new Date()) ? "waves-effect waves-light btn purple disabled  " : "waves-effect waves-light purple btn "} onClick={() => { this.ChangedTimesInState(planning.idplanning, planning.route.tijdstart, planning.route.tijdeind) }}>
                            Check-out
                        </a>
                    </td>
                </tr>)
        })
        return (
            <Fragment>
                <div className="row">
                    <div className="col s12 m6">
                        <div className="card card-stats">
                            <div className="card-header" data-background-color="green">
                                <i className="material-icons">person</i>
                            </div>
                            <div className="card-content">
                                <p className="category">ingelogd als</p>
                                <h4 className="title">{this.props.user.dbResponse.username}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m6">
                        <div className="card card-stats">
                            <div className="card-header" data-background-color="purple">
                                <i className="material-icons">info_outline</i>
                            </div>
                            <div className="card-content">
                                <p className="category">Aantal keer ingepland deze week</p>
                                <h4 className="title">{this.state.planningCurrentWeek.length}</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col s12">
                        <div className="card">
                            <div className="card-header card-header-warning blackwhitecolor" data-background-color="blue" >
                                <h4 className="card-title">Planning deze week</h4>
                                <p className="card-category">Dit zijn de routes die je moet reden voor de gehele week</p>
                            </div>
                            <div className="card-body table-responsive">
                                <table className="table table-hover responsive-table">
                                    <thead className="text-warning">
                                        <tr><th>ID</th>
                                            <th>Datum</th>
                                            <th>Route</th>
                                            <th>Voertuig</th>
                                            <th>tijd</th>
                                            <th>Acties</th>
                                            {/* <th>gezien</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Planningen}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col s12">
                        <div className="card">
                            <div className="card-header" data-background-color="orange">
                                <h5 className="title">Aantal routes per dag deze week</h5>
                            </div>
                            <div className="card-content table-responsive">
                                <canvas id="myChart" height="250" className="col s12" ></canvas>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="modal6543" className="modal bottom-sheet" style={{ textAlign: "center" }}>
                    <div className="modal-content">
                        <h4>Check out ~ Gewerkte tijd</h4>
                        <p>Check out your worked hours, please check if the times you worked resemble the time of your schedule. If the times do not resemble change them occordenly</p>
                        <div className="container">
                            <div className="row">
                                <div className="col-s6" style={{ textAlign: "left" }}>
                                    <label htmlFor="timestartinput">Start time</label>
                                    <input ref="timeStartInput" type="text" className="timepicker" id="timestartinput" value={this.state.clickedTimes.startTime.substring(0, 5)} />
                                </div>
                                <div className="col-s6" style={{ textAlign: "left" }}>
                                    <label htmlFor="timeendinput">End time</label>
                                    <input ref="timeEndInput" type="text" className="timepicker" id="timeendinput" value={this.state.clickedTimes.endTime.substring(0, 5)} />
                                </div>
                            </div>
                            <div className="row hide" id="reasonArea">
                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea"></textarea>
                                    <label htmlFor="textarea1">Reason for not having to complemented times</label>
                                </div>
                            </div>
                        </div>
                        <a className="waves-effect waves-light purple btn " onClick={this.confirmCheckout}>
                            Check Out
                        </a>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">sluit</a>
                    </div>
                </div>

            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    planningen: state.planningenUser
});

const mapDispatchToProps = {
    getPlanningenOnUser
}
export default connect(mapStateToProps, mapDispatchToProps)(MijnDashboard);
