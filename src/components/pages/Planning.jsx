import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import Calendar from './fractions/myCalendar';
import $ from 'jquery';
import moment from 'moment';
import 'moment/locale/nl';

import '../../assets/css/planning.css';

import { getUsers } from '../../actions/getUsers';
import { getRoutes } from '../../actions/getRoutes';
import { getVoertuigen } from '../../actions/getVoertuigen';
import { insertPlanning } from '../../actions/insertPlanning';
import { getPlanningen } from '../../actions/getPlanningen';
import { resetInsert } from '../../actions/resetInsertPlanning';

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
        medewerkerFilter: ""
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


    }

    componentDidMount() {
        $('ul.tabs').tabs();


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
    }



    openModal(open, dateStart, dateEnd) {
    }

    ChangeTimeValue(props) {
        console.log(props);
    }

    handleChangeSelect = () => {
        console.log(this.refs.datumpicker.value);
        if (this.refs.voertuigselect.value !== "" && this.refs.medewerkerselect.value !== "" && this.refs.routeselect.value !== "" && this.refs.datumpicker.value !== "")
            this.setState({
                medewerker: JSON.parse(this.refs.medewerkerselect.value),
                route: JSON.parse(this.refs.routeselect.value),
                voertuig: JSON.parse(this.refs.voertuigselect.value),
                geselecteerdeDatum: this.refs.datumpicker.value
            });
    }

    handleChangeSelectFilter = () => {
        this.setState({
            medewerkerFilter: JSON.parse(this.refs.medewerkerselectFilter)
        })

        const data = {
            medewerker: this.state.medewerker.id
        }
        this.props.getPlanningFilter(data);
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



    }


    componentDidUpdate() {
        $('select').material_select();
        $(this.refs.medewerkerselect).material_select(this.handleChangeSelect);
        $(this.refs.routeselect).material_select(this.handleChangeSelect);
        $(this.refs.voertuigselect).material_select(this.handleChangeSelect);
        $(this.refs.medewerkerselectFilter).material_select(this.handleChangeSelectFilter);

        if (this.props.planning.successInsert === true) {
            Swal({
                position: 'center',
                type: 'success',
                title: 'Your work has been saved',
                showConfirmButton: true,
                timer: 1500
            });
            $('select').val('');
            $('#datum').val('');
            $('select').material_select();
            // this.props.getPlanningen({ token: this.props.user.token });
            this.props.resetInsert();

        }

        // console.log(this.props.planningen);
    }

    render() {
        const users = this.props.users.users && this.props.users.users.map((user, index) => (
            <option onClick={this.handleChangeSelect} key={user.id} value={JSON.stringify(user)}>{user.username}</option>
        ));
        const routes = this.props.routes.routes && this.props.routes.routes.map((route, index) => (
            <option onClick={this.handleChangeSelect} key={route.id} value={JSON.stringify(route)}>{route.routenummer}</option>
        ));

        const voertuigen = this.props.voertuigen.voertuigen && this.props.voertuigen.voertuigen.map((voertuig, index) => (
            <option onClick={this.handleChangeSelect} key={voertuig.id} value={JSON.stringify(voertuig)}>{voertuig.voertuigcode}</option>
        ));
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
                                    <div class="progress">
                                        <div class="indeterminate"></div>
                                    </div>
                                )}
                                voeg planning toe</a>
                            {this.props.planning.errorInsertMsg !== "" && <p>{this.props.planning.errorInsertMsg}</p>}
                            {this.state.error && <p>Niet alle gegevens zijn ingevoerd</p>}
                        </div>
                    </div>
                    <div id="planningBekijken" className="col s12">
                        {this.props.planningen && <Calendar planningen={this.props.planningen} openModalHandler={this.openModal.bind(this)} />}
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
                            {this.props.planningen && <Calendar planningen={this.props.planningen} openModalHandler={this.openModal.bind(this)} />}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    users: state.users,
    routes: state.routes,
    voertuigen: state.voertuigen,
    planning: state.planning,
    planningen: state.planningen
});

const mapDispatchToProps = {
    getUsers,
    getRoutes,
    getVoertuigen,
    insertPlanning,
    getPlanningen,
    resetInsert
}
export default connect(mapStateToProps, mapDispatchToProps)(Planning);
