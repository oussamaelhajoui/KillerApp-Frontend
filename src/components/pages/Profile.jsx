import React, { Component } from 'react';
import { connect } from "react-redux";
import { changePassword } from "../../actions/changePassword";
import swal from 'sweetalert2';

import "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";

import M from 'materialize-css';

class Profile extends Component {

    state = {
        password: '',
        showPassword: false
    }

    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }


    savePassword = (e) => {
        this.props.changePassword({ medewerker: this.props.user.dbResponse.id, wachtwoord: this.state.password, token: this.props.user.token })
            .then(response => {
                if (response === false) {
                    swal({
                        type: "false",
                        title: "sorry",
                        text: "sorry we couldnt process this, please try again later"
                    })
                } else {
                    swal({
                        type: "sucess",
                        title: "finished",
                        text: "we changed your password"
                    })
                }
            })
            .catch(response => {
                swal({
                    type: "false",
                    title: "sorry",
                    text: "sorry we couldnt process this, please try again later"
                })
            });

        console.log(e);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    render() {
        return (
            <div className="container">
                <div className="col s12">
                    <div className="row">
                        <h1 className="center">Welkom bij uw profiel</h1>
                        <h3 className="center">Verander hier uw wachtwoord</h3>
                    </div>
                    <div className="row">
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <input value={this.state.password} onChange={this.handleChange} name="password" id="first_name" type="text" className="validate" />
                                    <label htmlFor="first_name">Verander wachtwoord</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <a className="waves-effect waves-light btn" onClick={this.savePassword}><i className="material-icons right">cloud</i>Save password</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    user: state.user,
    pagination: state.pagination,
    loggedUser: state.user,
    userDetail: state.user.user,
    planningenUser: state.planningenUser,
    routes: state.routes
});

const mapDispatchToProps = {
    changePassword
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
