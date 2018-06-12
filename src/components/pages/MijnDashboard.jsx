import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import Chart from 'chart.js'

import { getPlanningenOnUser } from '../../actions/getPlanningenOnUser'

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
        rawValuesDashboard: []
    }

    componentWillMount() {
        this.initData();
    }

    loadChart = () => {
        var ctx = document.getElementById("myChart");
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"],
                datasets: [{
                    label: 'Routes per dag',
                    data: this.state.rawValuesDashboard,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        });
    }

    componentDidUpdate() {
        console.log("ai", this.state.planningCurrentWeek);
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
                console.log(planningen)
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
                        console.log("x")
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
                            planningCurrentWeek.forEach(element2 => {
                                if (element1.datum === element2.datum) {
                                    let tmpDate = new Date(element1.datum);
                                    let day = weekday[tmpDate.getDay()];
                                    if (day in arr) {
                                        arr[day] = arr[day] + 1;
                                    } else {
                                        arr[day] = 1;
                                    }
                                }
                            })
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

    render() {
        const Planningen = this.state.planningCurrentWeek.map(planning => {
            return (
                <tr key={planning.idplanning}>
                    <td>{planning.idplanning}</td>
                    <td>{planning.datum.split("T")[0]}</td>
                    <td>{planning.route.routenummer}</td>
                    <td>{planning.voertuig.voertuigcode}</td>
                    <td>{`${planning.route.tijdstart} - ${planning.route.tijdeind}`}</td>
                    {/* <td>{planning.gezien ? "Gezien" : <button> Accepteer </button>}</td> */}
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
                                <p className="category">Nieuwe planningen</p>
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
                                <table className="table table-hover">
                                    <thead className="text-warning">
                                        <tr><th>ID</th>
                                            <th>Datum</th>
                                            <th>Route</th>
                                            <th>Voertuig</th>
                                            <th>tijd</th>
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
