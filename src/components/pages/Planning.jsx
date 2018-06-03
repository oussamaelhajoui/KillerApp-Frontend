import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

// import Calendar from './fractions/myCalendar';
import $ from 'jquery';
import moment from 'moment';
import 'moment/locale/nl';

import '../../assets/css/planning.css';

import { getUsers } from '../../actions/getUsers';
import { getRoutes } from '../../actions/getRoutes';
import { getVoertuigen } from '../../actions/getVoertuigen';
import { insertPlanning } from '../../actions/insertPlanning';

import { GetStringFromDate, GetTimeFromDate } from '../../logic/Libary';

class Planning extends Component {

    state = {
        dateStart: new Date(),
        dateEnd: new Date(),
        medewerker: "",
        voertuig: "",
        route: "",
        geselecteerdeDatum: ""
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
    }

    componentDidMount() {
        const modal = this.refs.modal;
        $(modal).modal({
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            opacity: .85, // Opacity of modal background
            inDuration: 300, // Transition in duration
            outDuration: 200, // Transition out duration
            startingTop: '4%', // Starting top style attribute
            endingTop: '10%', // Ending top style attribute
            ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
                console.log("Ready");
            },
            complete: function () { console.log('Closed'); } // Callback for Modal close
        });


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
        if (open) {
            this.setState({
                dateStart,
                dateEnd
            })

            const elem = this.refs.modal;
            const headerContent = this.refs.modalHeader;
            $(elem).modal('open');

            let datestart = GetStringFromDate(dateStart);
            let dateend = GetStringFromDate(dateEnd);

            let dayStart = new Date(dateStart).getDate();
            let dayEnd = new Date(dateEnd).getDate();


            if (dayStart === dayEnd) {
                headerContent.innerHTML = `${GetTimeFromDate(dateStart)} tot ${GetTimeFromDate(dateEnd)}`
            } else {
                headerContent.innerHTML = ` ${datestart} tot  ${dateend}`
            }

        }
    }

    ChangeTimeValue(props) {
        console.log(props);
    }

    handleChangeSelect = (p) => {
        if (this.refs.voertuigselect.value !== "" && this.refs.medewerkerselect.value !== "" && this.refs.voertuigselect.value !== "")
            this.setState({
                medewerker: JSON.parse(this.refs.medewerkerselect.value),
                route: JSON.parse(this.refs.routeselect.value),
                voertuig: JSON.parse(this.refs.voertuigselect.value),
                geselecteerdeDatum: this.refs.datumpicker.value
            });

        console.log(this.refs.datumpicker.value);

    }
    addPlanning = () => {
        const data = {

        }
        this.props.insertPlanning(data);

    }


    componentDidUpdate() {
        $('select').material_select();
        $(this.refs.medewerkerselect).material_select(this.handleChangeSelect);
        $(this.refs.routeselect).material_select(this.handleChangeSelect);
        $(this.refs.voertuigselect).material_select(this.handleChangeSelect);

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
                {/* {weekday} */}
                {/* {weekday.forEach(day => { console.log(day); return day; })} */}

                <p className="centerText">Selecteer hier de medewerker en de route dat gereden moet worden op de geselecteerde tijd.</p>
                <div className="row">
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
                    <div className="input-field col s12">
                        <div className="input-field">
                            <input type="text" name="datum" id="datum" ref="datumpicker" className="datepicker" onChange={this.handleChangeSelect} />
                            <label htmlFor="datum">Datum</label>
                        </div>
                    </div>
                    {this.state.voertuig !== "" && this.state.medewerker !== "" && this.state.route !== "" ?
                        <p>U heeft gekozen voor {this.state.medewerker.username} die de route {this.state.route.routenummer} rijdt met het voertuig {this.state.voertuig.voertuigcode} op de datum {this.state.geselecteerdeDatum} Die beginnen tussen de tijdzones {this.state.route.tijdstart} tot {this.state.route.tijdeind}</p>
                        : <p>voer alle gegevens in..</p>}
                    <a className="waves-effect waves-light btn" onClick={this.addPlanning}>voeg planning toe</a>
                </div>
                {/* <Calendar openModalHandler={this.openModal.bind(this)} /> */}

            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    users: state.users,
    routes: state.routes,
    voertuigen: state.voertuigen
});
export default connect(mapStateToProps, { getUsers, getRoutes, getVoertuigen, insertPlanning })(Planning);
