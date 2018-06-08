import React, { Component } from 'react';
import Chart from "chart.js";
import { Link } from 'react-router-dom';
import { getPlanningen } from '../../actions/getPlanningen';
import { getUsers } from '../../actions/getUsers';
import { getRoutes } from '../../actions/getRoutes';
import { connect } from 'react-redux';





class Dashboard extends Component {

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
        Chart: null,
        userAmount: 0,
        routeAmount: 0
    }

    componentDidMount() {
        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"],
                datasets: [{
                    label: 'Routes per dag',
                    data: [0, 0, 0, 0, 0, 0, 0],
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

        this.setState({ Chart: myChart }, () => {
            this.initData();
        })
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
        this.props.getPlanningen({ token: this.props.loggedUser.token })
            .then(planningen => {
                if (this.props.planningen.planningen.length > 0) {
                    let planningCurrentWeek = this.props.planningen.planningen.filter(planning => {
                        let tmpDate = new Date(planning.datum)
                        let Maandag = this.getMonday(new Date());
                        let Zondag = this.getSunday(new Date());
                        if (tmpDate >= Maandag && tmpDate <= Zondag) {
                            return true
                        } else {
                            return false;
                        }
                    })

                    this.setState({ planningCurrentWeek })
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

                        for (let i = 0; i < 100; i++) {
                            this.state.Chart.data.datasets[0].data.pop();
                        }

                        this.state.Chart.data.datasets[0].data.push(this.state.planningValues.Monday);
                        this.state.Chart.data.datasets[0].data.push(this.state.planningValues.Tuesday);
                        this.state.Chart.data.datasets[0].data.push(this.state.planningValues.Wednesday);
                        this.state.Chart.data.datasets[0].data.push(this.state.planningValues.Thursday);
                        this.state.Chart.data.datasets[0].data.push(this.state.planningValues.Friday);
                        this.state.Chart.data.datasets[0].data.push(this.state.planningValues.Saturday);
                        this.state.Chart.data.datasets[0].data.push(this.state.planningValues.Sunday);
                        this.state.Chart.update();
                    });

                }
            });

        this.props.getUsers({ token: this.props.loggedUser.token })
            .then(users => {
                console.log("users", users);
                this.setState({ userAmount: users.length })
            });

        this.props.getRoutes({ token: this.props.loggedUser.token })
            .then(routes => {
                console.log("routes", routes);
                this.setState({ routeAmount: routes.length })
            });

    }




    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col s6">
                        <div className="card card-stats">
                            <div className="card-header" data-background-color="orange">
                                <i className="material-icons">content_copy</i>
                            </div>
                            <div className="card-content">
                                <p className="category">Aantal routes</p>
                                <h4 className="title">{this.state.routeAmount}</h4>
                            </div>
                            <div className="card-footer">
                                <div className="stats">
                                    <i className="material-icons text-info">info</i>
                                    <Link to="/routes"><span className="text-info" href="#pablo">Bekijk routes</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col s6">
                        <div className="card card-stats">
                            <div className="card-header" data-background-color="red">
                                <i className="material-icons">info_outline</i>
                            </div>
                            <div className="card-content">
                                <p className="category">Medewerkers</p>
                                <h4 className="title">{this.state.userAmount}</h4>
                            </div>
                            <div className="card-footer">
                                <div className="stats">
                                    <i className="material-icons text-info">info</i>
                                    <Link to="/medewerkers"><span className="text-info" href="#pablo">Bekijk medewerkers</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6">
                        <div className="card">
                            <div className="card-header" data-background-color="orange">
                                <h5 className="title">Tegenvallende medewerkers</h5>
                            </div>
                            <div className="card-content table-responsive">
                                <table className="table table-hover">
                                    <thead className="text-warning">
                                        <tr>
                                            <th>Naam</th>
                                            <th>Percentage overeenkomsten</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Oussama EL-Hajoui</td>
                                            <td>5%</td>
                                        </tr>
                                        <tr>
                                            <td>Oussama EL-Hajoui</td>
                                            <td>7%</td>
                                        </tr>
                                        <tr>
                                            <td>Oussama EL-Hajoui</td>
                                            <td>7.5%</td>
                                        </tr>
                                        <tr>
                                            <td>Oussama EL-Hajoui</td>
                                            <td>8.3%</td>
                                        </tr>
                                        <tr>
                                            <td>Oussama EL-Hajoui</td>
                                            <td>9%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col s6">
                        <div className="card">
                            <div className="card-header" data-background-color="orange">
                                <h5 className="title">Slechtste routes</h5>
                            </div>
                            <div className="card-content table-responsive">
                                <table className="table table-hover">
                                    <thead className="text-warning">
                                        <tr>
                                            <th>Naam</th>
                                            <th>Percentage overeenkomsten</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Route 1</td>
                                            <td>5%</td>
                                        </tr>
                                        <tr>
                                            <td>Route 2</td>
                                            <td>7%</td>
                                        </tr>
                                        <tr>
                                            <td>Route 3</td>
                                            <td>7.5%</td>
                                        </tr>
                                        <tr>
                                            <td>Route 4</td>
                                            <td>8.3%</td>
                                        </tr>
                                        <tr>
                                            <td>Route 5</td>
                                            <td>9%</td>
                                        </tr>
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

            </div>
        )
    }
}

const mapStateToProps = state => ({
    planningen: state.planningen,
    loggedUser: state.user
});

const mapDispatchToProps = {
    getPlanningen,
    getUsers,
    getRoutes
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
