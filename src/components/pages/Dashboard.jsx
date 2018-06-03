import React, { Component } from 'react';
import Chart from "chart.js";

class Dashboard extends Component {
    componentDidMount() {
        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"],
                datasets: [{
                    label: 'Routes per dag',
                    data: [4, 2, 3, 5, 2, 4, 2],
                }]
            }
        });
        console.log(myChart);
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
                                <h4 className="title">666</h4>
                            </div>
                            <div className="card-footer">
                                <div className="stats">
                                    <i className="material-icons text-info">info</i>
                                    <a className="text-info" href="#pablo">Bekijk routes</a>
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
                                <h5 className="title">Aantal routes per dag</h5>
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