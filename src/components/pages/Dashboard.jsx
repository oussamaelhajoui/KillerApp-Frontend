import React, { Component } from 'react';
import Chart from "chart.js";

class Dashboard extends Component {
    componentDidMount() {
        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
                datasets: [{
                    label: 'Videos per uur beoordeeld',
                    data: [2, 1, 0, 0, 0, 1, 1, 3, 6, 12, 11, 15, 4, 17, 13, 12, 16, 15, 12, 9, 5, 3, 2, 2],
                }]
            }
        });
    }


    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col s4">
                        <div className="card card-stats">
                            <div className="card-header" data-background-color="orange">
                                <i className="material-icons">content_copy</i>
                            </div>
                            <div className="card-content">
                                <p className="category">Aantal videos beoordeeld</p>
                                <h4 className="title">666</h4>
                            </div>
                            <div className="card-footer">
                                <div className="stats">
                                    <i className="material-icons text-info">info</i>
                                    <a className="text-info" href="#pablo">Bekijk videos</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col s4">
                        <div className="card card-stats">
                            <div className="card-header" data-background-color="green">
                                <i className="material-icons">store</i>
                            </div>
                            <div className="card-content">
                                <p className="category">Aantal beoordelingen</p>
                                <h4 className="title">1998</h4>
                            </div>
                            <div className="card-footer">
                                <div className="stats">
                                    <i className="material-icons text-info">info</i>
                                    <a className="text-info" href="#pablo">Bekijk beoordelingen</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col s4">
                        <div className="card card-stats">
                            <div className="card-header" data-background-color="red">
                                <i className="material-icons">info_outline</i>
                            </div>
                            <div className="card-content">
                                <p className="category">Medewerkers</p>
                                <h4 className="title">49/50
                                    <small> Online</small>
                                </h4>
                            </div>
                            <div className="card-footer">
                                <div className="stats">
                                    <i className="material-icons text-info">info</i>
                                    <a className="text-info" href="#pablo">Bekijk medewerkers</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6">
                        <div className="card">
                            <div className="card-header" data-background-color="orange">
                                <h5 className="title">Slechtste medewerker</h5>
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
                                <h5 className="title">Slechtste videos</h5>
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
                                            <td>Video 1</td>
                                            <td>5%</td>
                                        </tr>
                                        <tr>
                                            <td>Video 2</td>
                                            <td>7%</td>
                                        </tr>
                                        <tr>
                                            <td>Video 3</td>
                                            <td>7.5%</td>
                                        </tr>
                                        <tr>
                                            <td>Video 4</td>
                                            <td>8.3%</td>
                                        </tr>
                                        <tr>
                                            <td>Video 5</td>
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
                                <h5 className="title">Aantal beoordeelde videos per uur</h5>
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

export default Dashboard;