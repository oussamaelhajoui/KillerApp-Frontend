import React, { Component } from "react";
import { connect } from "react-redux";

import $ from "jquery";
import ReactDOM from "react-dom";

import Swal from 'sweetalert2';
import Restful from "../../../logic/Restful";

import { getVoertuigen } from '../../../actions/getVoertuigen';

class AddVoertuigModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voertuigcode: "",
            kenteken: "",
            kleur: "",
            voortuigsoort: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }



    componentDidMount() {
        $("select").material_select();

        // To make the select work with materializecss
        $(ReactDOM.findDOMNode(this.refs.voertuigsoort)).on("change", this.handleChange.bind(this));

    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }


    handleSubmit(event) {
        event.preventDefault();



        let data = {
            voertuigcode: this.state.voertuigcode,
            kenteken: this.state.kenteken,
            kleur: this.state.kleur,
            soort: 1
        };
        console.log(data);
        Restful.Post("car/create", data, this.props.user.token)
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
    }


    render() {
        return (
            <div id="AddVoertuigModal" className="modal">
                <form onSubmit={this.handleSubmit}>
                    <div className="modal-content">
                        <h4>Voeg een voertuig toe</h4>

                        <div className="row">
                            <div className="col s12">
                                <div className="row modal-form-row">
                                    <div className="input-field col s12">
                                        <input
                                            name="voertuigcode"
                                            type="text"
                                            value={this.state.voertuigcode}
                                            onChange={this.handleChange}
                                            className="validate"
                                        />
                                        <label htmlFor="username">Voertuig code</label>
                                    </div>
                                </div>
                                <div className="row modal-form-row">
                                    <div className="input-field col s12">
                                        <input
                                            name="kenteken"
                                            type="text"
                                            value={this.state.kenteken}
                                            onChange={this.handleChange}
                                            className="validate"
                                        />
                                        <label htmlFor="username">kenteken</label>
                                    </div>
                                </div>
                                <div className="row modal-form-row">
                                    <div className="input-field col s12">
                                        <input
                                            name="kleur"
                                            type="text"
                                            value={this.state.kleur}
                                            onChange={this.handleChange}
                                            className="validate"
                                        />
                                        <label htmlFor="username">kleur</label>
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
export default connect(mapStateToProps, mapDispatchToProps)(AddVoertuigModal);
