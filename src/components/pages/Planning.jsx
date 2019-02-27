import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import Calendar from './fractions/myCalendar';
import $ from 'jquery';
import moment from 'moment';
import 'moment/locale/nl';

import '../../assets/css/planning.css';
import Restful from '../../logic/Restful';

import { getUsers } from '../../actions/getUsers';
import { getRoutes } from '../../actions/getRoutes';
import { getVoertuigen } from '../../actions/getVoertuigen';
import { insertPlanning } from '../../actions/insertPlanning';
import { getPlanningen } from '../../actions/getPlanningen';
import { resetInsert } from '../../actions/resetInsertPlanning';
import { getPlanningenOnUser } from '../../actions/getPlanningenOnUser';


// import { GetStringFromDate, GetTimeFromDate } from '../../logic/Libary';

import Swal from 'sweetalert2'

class Planning extends Component {

    state = {
        dateStart: new Date(),
        dateEnd: new Date(),
        medewerker: "",
        voertuig: "",
        route: "",
        geselecteerdeDatum: "",
        error: false,
        medewerkerFilter: "",
        planningCurrentWeek: [],
        planningToday: [],
        showFull: false
    }


    constructor(props) {
        super(props);
        moment().locale('nl')
        moment.locale('nl')
        moment().format("dddd MMMM YYYY");

        this.openModal = this.openModal.bind(this);
        this.ChangeTimeValue = this.ChangeTimeValue.bind(this);

        this.props.getUsers({ token: this.props.user.token });
        this.props.getRoutes({ token: this.props.user.token });
        this.props.getVoertuigen({ token: this.props.user.token });
        this.props.getPlanningen({ token: this.props.user.token });
        this.initData();
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
        this.props.getPlanningen({ id: this.props.user.dbResponse.id, token: this.props.user.token })
            .then(planningen => {
                if (planningen.length > 0) {
                    let planningCurrentWeek = planningen.filter(planning => {
                        let tmpDate = new Date(planning.datum)
                        let Maandag = this.getMonday(new Date()).setHours(0,0,0,0);
                        console.log("ma",Maandag);
                        let Zondag = this.getSunday(new Date()).setHours(23,59,59,59);
                        if (tmpDate >= Maandag && tmpDate <= Zondag) {
                            return true
                        } else {
                            console.log("tmpF",tmpDate)
                            return false;
                        }
                    })
                    this.setState({ planningCurrentWeek });
                
                    let planningToday = planningen.filter(planning => {
                        let tmpDate = new Date(planning.datum).getDate();
                        if(tmpDate == new Date().getDate()){
                            return true;
                        } else{ return false;}
                    })

                    this.setState({planningToday})
                }
            });
    }

    componentDidMount() {
        $('ul.tabs').tabs();

        $('.tooltipped').tooltip({ delay: 50 });
        $("select").material_select();


        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year,
            today: 'Today',
            clear: 'Clear',
            close: 'Ok',
            closeOnSelect: true, // Close upon selecting a date,
            container: 'body', // ex. 'body' will append picker to body
        });


        $('.timepicker').pickatime({
            default: 'now', // Set default time: 'now', '1:30AM', '16:30'
            fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
            twelvehour: false, // Use AM/PM or 24-hour format
            donetext: 'OK', // text for done-button
            cleartext: 'Clear', // text for clear-button
            canceltext: 'Cancel', // Text for cancel-button,
            container: 'body', // ex. 'body' will append picker to body
            autoclose: true, // automatic close timepicker
            ampmclickable: true, // make AM PM clickable
            aftershow: function () { } //Function for after opening timepicker
        });
        $('.modal').modal();
    }



    openModal(open, dateStart, dateEnd) {
    }

    ChangeTimeValue(props) {
        console.log(props);
    }

    handleChangeSelect = () => {
        if (this.refs.voertuigselect.value !== "" && this.refs.medewerkerselect.value !== "" && this.refs.routeselect.value !== "" && this.refs.datumpicker.value !== "")
            this.setState({
                medewerker: JSON.parse(this.refs.medewerkerselect.value),
                route: JSON.parse(this.refs.routeselect.value),
                voertuig: JSON.parse(this.refs.voertuigselect.value),
                geselecteerdeDatum: this.refs.datumpicker.value
            });
    }

    handleChangeSelectFilter = () => {
        if (this.refs.medewerkerselectFilter.value !== "") {
            this.setState({
                medewerkerFilter: JSON.parse(this.refs.medewerkerselectFilter.value)
            })

            const data = {
                id: this.state.medewerkerFilter.id,
                token: this.props.user.token
            }
            this.props.getPlanningenOnUser(data);
        }
    }

    addPlanning = () => {
        if (this.refs.voertuigselect.value !== "" || this.refs.medewerkerselect.value !== "" || this.refs.routeselect.value !== "" || this.refs.datumpicker.value !== "") {
            this.setState({
                medewerker: JSON.parse(this.refs.medewerkerselect.value),
                route: JSON.parse(this.refs.routeselect.value),
                voertuig: JSON.parse(this.refs.voertuigselect.value),
                geselecteerdeDatum: this.refs.datumpicker.value,
                error: false
            });

            const data = {
                medewerker: this.state.medewerker.id,
                route: this.state.route.id,
                voertuig: this.state.voertuig.id,
                datum: this.state.geselecteerdeDatum,
                token: this.props.user.token
            }
            this.props.insertPlanning(data);
        } else {
            this.setState({
                error: true
            })
        }

        this.initData();

    }


    componentDidUpdate() {
        $('.tooltipped').tooltip({ delay: 50 });
        $('select').material_select();
        $(this.refs.medewerkerselect).material_select(this.handleChangeSelect);
        $(this.refs.routeselect).material_select(this.handleChangeSelect);
        $(this.refs.voertuigselect).material_select(this.handleChangeSelect);
        $(this.refs.medewerkerselectFilter).material_select(this.handleChangeSelectFilter);

        if (this.props.planning.successInsert === true) {
            Swal({
                position: 'center',
                type: 'success',
                title: 'De planning is opgeslagen!',
                showConfirmButton: true,
                timer: 1500
            });
            $('select').val('');
            $('#datum').val('');
            $('select').material_select();
            this.props.resetInsert();

        }

    }

    deletePlanning = (id) => {
        Restful.Get("schedule/delete/" + id, this.props.user.token)
            .then(res => res.json())
            .then(response => {
                this.initData()
                Swal({
                    title: "Done",
                    type: "info",
                    text: "we updated the schedule"

                })
            })
    }

    CopyPlanning = () => {
        Restful.Post("schedule/copyscheduleweek/", { DatumVan: this.getMonday(new Date()), DatumTot: this.getSunday(new Date()) }, this.props.user.token)
            .then(res => res.json())
            .then(response => {
                this.initData()
                Swal({
                    title: "Done",
                    type: "info",
                    text: "we updated the schedule"

                })
            })
    }

    render() {

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const users = this.props.users.users && this.props.users.users.map((user, index) => (
            <option onClick={this.handleChangeSelect} key={user.id} value={JSON.stringify(user)}>{user.username}</option>
        ));
        const routes = this.props.routes.routes && this.props.routes.routes.map((route, index) => (
            <option onClick={this.handleChangeSelect} key={route.id} value={JSON.stringify(route)}>{route.routenummer}</option>
        ));

        const voertuigen = this.props.voertuigen.voertuigen && this.props.voertuigen.voertuigen.map((voertuig, index) => (
            <option onClick={this.handleChangeSelect} key={voertuig.id} value={JSON.stringify(voertuig)}>{voertuig.voertuigcode}</option>
        ));
        let Planningen;
       if(this.state.showFull){
         Planningen = this.state.planningCurrentWeek.map(planning => {
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
                    <td>{new Date(planning.datum).toLocaleDateString('nl-NL', options)}</td>
                    <td>{(planning.gebruiker.voornaam !== null) ? `${planning.gebruiker.voornaam} ${planning.gebruiker.achternaam}` : planning.gebruiker.username}</td>
                    <td>{planning.route.routenummer}</td>
                    <td>{planning.voertuig.voertuigcode}</td>
                    <td>{`${planning.route.tijdstart} - ${planning.route.tijdeind}`}</td>
                    <td>{(planning.gezien) ? `${planning.echtestarttijd} - ${planning.echteeindtijd}` : `N.V.T.`}</td>
                    <td>
                        <a className="btn-floating waves-effect waves-light red" onClick={() => { this.deletePlanning(planning.idplanning) }}><i className="material-icons">delete</i></a>
                    </td>
                    {/* <td>{planning.gezien ? "Gezien" : <button> Accepteer </button>}</td> */}
                </tr>)
        })
       }else{
         Planningen = this.state.planningToday.map(planning => {
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
                    <td>{new Date(planning.datum).toLocaleDateString('nl-NL', options)}</td>
                    <td>{(planning.gebruiker.voornaam !== null) ? `${planning.gebruiker.voornaam} ${planning.gebruiker.achternaam}` : planning.gebruiker.username}</td>
                    <td>{planning.route.routenummer}</td>
                    <td>{planning.voertuig.voertuigcode}</td>
                    <td>{`${planning.route.tijdstart} - ${planning.route.tijdeind}`}</td>
                    <td>{(planning.gezien) ? `${planning.echtestarttijd} - ${planning.echteeindtijd}` : `N.V.T.`}</td>
                    <td>
                        <a className="btn-floating waves-effect waves-light red" onClick={() => { this.deletePlanning(planning.idplanning) }}><i className="material-icons">delete</i></a>
                    </td>
                    {/* <td>{planning.gezien ? "Gezien" : <button> Accepteer </button>}</td> */}
                </tr>)
        })
       }
        return (
            <Fragment>
                <div className="row">
                    <div className="col s12">
                        <ul className="tabs">
                            <li className="tab col s4"><a className="active" href="#planningToevoegen">Nieuwe planning</a></li>
                            <li className="tab col s4" onClick={(e) => this.props.getPlanningen({ token: this.props.user.token })}><a href="#planningBekijken">Bekijk planning</a></li>
                            <li className="tab col s4"><a href="#planningBekijkenMedewerker">Medewerker</a></li>
                        </ul>
                    </div>
                    <div id="planningToevoegen" className="col s12">
                        <p className="centerText">Selecteer hier de medewerker en de route dat gereden moet worden op de geselecteerde tijd.</p>
                        <div className="row">
                            <div className="input-field col s12">
                                <div className="input-field">
                                    <input type="text" name="datum" id="datum" ref="datumpicker" className="datepicker" onChange={this.handleChangeSelect} />
                                    <label htmlFor="datum">Datum</label>
                                </div>
                            </div>
                            <div className="input-field col s12">
                                <select onChange={this.handleChangeSelect} ref="medewerkerselect">
                                    <option value="" disabled selected>Kies de chauffeur</option>
                                    {users}
                                </select>
                                <label>Selecteer Medewerker</label>
                            </div>
                            <div className="input-field col s12">
                                <select onChange={this.handleChangeSelect} ref="routeselect">
                                    <option value="" disabled selected>Kies de route</option>
                                    {routes}
                                </select>
                                <label>Selecteer Route</label>
                            </div>
                            <div className="input-field col s12">
                                <select onChange={this.handleChangeSelect} ref="voertuigselect">
                                    <option value="" disabled selected>kies het voertuig</option>
                                    {voertuigen}
                                </select>
                                <label>Selecteer Voertuig</label>
                            </div>
                            {this.state.voertuig !== "" && this.state.medewerker !== "" && this.state.route !== "" ?
                                <p>U heeft gekozen voor {this.state.medewerker.username} die de route {this.state.route.routenummer} rijdt met het voertuig {this.state.voertuig.voertuigcode} op de datum {this.state.geselecteerdeDatum} Die beginnen tussen de tijdzones {this.state.route.tijdstart} tot {this.state.route.tijdeind}</p>
                                : <p>voer alle gegevens in..</p>}
                            <a className={this.props.planning.loadingInsertPlanning ? "waves-effect waves-light btn disabled" : "waves-effect waves-light btn"} onClick={this.addPlanning}>
                                {this.props.planning.loadingInsertPlanning && (
                                    <div className="progress">
                                        <div className="indeterminate"></div>
                                    </div>
                                )}
                                voeg planning toe</a>
                            <a className={this.props.planning.loadingInsertPlanning ? "waves-effect waves-light btn purple disabled right " : "waves-effect waves-light purple btn right  modal-trigger"} href="#modal1">
                                {this.props.planning.loadingInsertPlanning && (
                                    <div className="progress">
                                        <div className="indeterminate"></div>
                                    </div>
                                )}
                                Kopieer planning naar de volgende week</a>
                        </div>
                    </div>
                    <div id="planningBekijken" className="col s12">

                        <div className="row" style={{ marginTop: 25 }}>
                            <div className="col s12">
                                <div className="card">
                                    <div className="card-header card-header-warning blackwhitecolor" data-background-color="blue" >
                                        <h4 className="card-title">Planning deze week</h4>
                                        <p className="card-category">Dit zijn de routes die je moet reden voor de gehele week<br />Vandaag is het {new Date().toLocaleDateString('nl-NL', options)}</p>
                                        {this.state.showFull ? <div>
                                            <p style={{display:"block", color:"green", fontWeight: "700", textShadow:"0 0 0 #000"}}>Volledige week</p>
                                            <p style={{display:"block", color:"gray", textShadow:"0 0 0 #000", cursor: "pointer"}} onClick={()=>{this.setState({showFull:!this.state.showFull})}}>Alleen vandaag</p>
                                            </div>: <div>
                                            <p style={{display:"block", color:"gray", textShadow:"0 0 0 #000", cursor: "pointer"}} onClick={()=>{this.setState({showFull:!this.state.showFull})}}>Volledige week</p>
                                            <p style={{display:"block", color:"green", textShadow:"0 0 0 #000", fontWeight: "700"}}>Alleen vandaag</p>
                                            </div>}
                                    </div>
                                    <div className="card-body table-responsive">
                                        <table className="table table-hover">
                                            <thead className="text-warning">
                                                <tr><th>ID</th>
                                                    <th>Datum</th>
                                                    <th>Medewerker</th>
                                                    <th>Route</th>
                                                    <th>Voertuig</th>
                                                    <th>tijd</th>
                                                    <th>gewerkte tijd</th>
                                                    <th>Wijzig</th>
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
                                {this.props.planningen && <Calendar planningen={this.props.planningen} openModalHandler={this.openModal.bind(this)} />}
                            </div>
                        </div>
                    </div>
                    <div id="planningBekijkenMedewerker" className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <select onChange={this.handleChangeSelect} ref="medewerkerselectFilter">
                                    <option value="" disabled selected>Kies de chauffeur</option>
                                    {users}
                                </select>
                                <label>Selecteer Medewerker</label>
                            </div>
                        </div>
                        <div className="row">
                            {this.props.planningen && <Calendar planningen={this.props.planningenUser} openModalHandler={this.openModal.bind(this)} />}
                        </div>
                    </div>
                </div>

                <div id="modal1" className="modal bottom-sheet">
                    <div className="modal-content">
                        {/* {console.log()} */}
                        <h4>U kopieert de planning van vorige week naar deze week</h4>
                        <p>De kopie zal gaan over de datums tussen {this.getMonday(new Date()).toLocaleDateString('nl-NL', options)} en {this.getSunday(new Date()).toLocaleDateString('nl-NL', options)}</p>
                        <p>De planning wordt 7 dagen opgeschoven naar {this.getMonday(new Date(new Date().setDate(new Date().getDate() + 7))).toLocaleDateString('nl-NL', options)} en {this.getSunday(new Date(new Date().setDate(new Date().getDate() + 7))).toLocaleDateString('nl-NL', options)}</p>
                        <a className={this.props.planning.loadingInsertPlanning ? "waves-effect waves-light btn purple disabled  " : "waves-effect waves-light purple btn "} onClick={this.CopyPlanning}>
                            {this.props.planning.loadingInsertPlanning && (
                                <div className="progress">
                                    <div className="indeterminate"></div>
                                </div>
                            )}
                            kopieer</a>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">sluit</a>
                    </div>
                </div>

            </Fragment >
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    users: state.users,
    routes: state.routes,
    voertuigen: state.voertuigen,
    planning: state.planning,
    planningen: state.planningen,
    planningenUser: state.planningenUser
});

const mapDispatchToProps = {
    getUsers,
    getRoutes,
    getVoertuigen,
    insertPlanning,
    getPlanningen,
    resetInsert,
    getPlanningenOnUser
}
export default connect(mapStateToProps, mapDispatchToProps)(Planning);
