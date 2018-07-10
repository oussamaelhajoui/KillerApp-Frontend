import React, { Component } from "react";
import { connect } from "react-redux";

import $ from "jquery";
import ReactDOM from "react-dom";

import Swal from 'sweetalert2';
import Restful from "../../../logic/Restful";

import { getVoertuigen } from '../../../actions/getVoertuigen';

class AddRouteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Routenummer: "",
            Tijdstart: "",
            Tijdeind: "",
            Vastevoertuig: "",
            voertuigen: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.props.getVoertuigen({ token: this.props.user.token })
            .then(result => {
                this.setState({ voertuigen: result });
            })
    }



    componentDidMount() {
        $("select").material_select();

        // To make the select work with materializecss
        $(ReactDOM.findDOMNode(this.refs.selectrole)).on("change", this.handleChange.bind(this));
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
            aftershow: function () { } //Function for after opening timepicker
        });

    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }


    handleSubmit(event) {
        event.preventDefault();



        let data = {
            routenummer: this.state.Routenummer,
            tijdstart: this.refs.starttijd.value,
            tijdeind: this.refs.eindtijd.value,
            vastevoertuig: this.refs.Vastevoertuig.value === "geen" ? 0 : this.refs.Vastevoertuig.value
        };
        console.log(data);
        Restful.Post("route/create", data, this.props.user.token)
            .then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse["success"] === true) {
                    // User added succesfully
                    Swal({
                        title: "De ingevoerde route is opgeslagen",
                        type: "success",
                        showConfirmButton: true,
                        timer: 1500
                    }).then(res => {
                        this.props.addedHandler();
                    })
                }
            })
            .catch(message => {
                return false;
            });
    }

    componentDidUpdate() {
        $("select").material_select();

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
            aftershow: function () { } //Function for after opening timepicker
        });

        console.log("this", this.state);
    }


    render() {
        const Voertuigen = this.state.voertuigen.map(voertuig =>
            <option key={voertuig.id} value={voertuig.id} data-id={"x"}>{voertuig.voertuigcode}</option>
        );

        return (
            <div id="AddRouteModal" className="modal">
                <form onSubmit={this.handleSubmit}>
                    <div className="modal-content">
                        <h4>Voeg Route toe</h4>

                        <div className="row">
                            <div className="col s12">
                                <div className="row modal-form-row">
                                    <div className="input-field col s12">
                                        <input
                                            name="Routenummer"
                                            type="number"
                                            value={this.state.Routenummer}
                                            onChange={this.handleChange}
                                            className="validate"
                                        />
                                        <label htmlFor="username">Routenummer</label>
                                    </div>
                                </div>
                                <div className="row modal-form-row">
                                    <div className="input-field col s6">
                                        <input
                                            type="text"
                                            className="timepicker"
                                            name="Tijdstart"
                                            value={this.state.Tijdstart}
                                            onChange={this.handleChange}
                                            placeholder="HH:MM"
                                            ref="starttijd"
                                        />
                                        <label htmlFor="firstname">Start tijd</label>
                                    </div>

                                    <div className="input-field col s6">
                                        <input
                                            name="Tijdeind"
                                            type="text"
                                            value={this.state.Tijdeind}
                                            onChange={this.handleChange}
                                            className="timepicker"
                                            placeholder="HH:MM"
                                            ref="eindtijd"
                                        />
                                        <label htmlFor="lastname">Eind tijd</label>
                                    </div>
                                </div>
                                <div className="row modal-form-row">
                                    <div className="input-field col s12">
                                        <select id="Vastevoertuig" name="Vastevoertuig" value={this.state.Vastevoertuig} onChange={this.handleChange} ref="Vastevoertuig">
                                            <option value="" disabled>
                                                Choose your option
                      </option>
                                            <option value={null} data-id={"asa"}>geen</option>
                                            {Voertuigen}
                                        </select>
                                        <label>Vaste voertuig</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="modal-action modal-close waves-effect waves-red btn-flat">
                            Close
            </button>
                        <button className="modal-action modal-close waves-effect waves-green btn-flat" type="submit" >
                            Create
            </button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    voertuigen: state.voertuigen
});

const mapDispatchToProps = {
    getVoertuigen
}
export default connect(mapStateToProps, mapDispatchToProps)(AddRouteModal);
