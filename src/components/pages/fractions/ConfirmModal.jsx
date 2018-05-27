import React, { Component } from "react";
import { connect } from "react-redux";


class ConfirmModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            validated: false
        };


        this.confirm = this.confirm.bind(this);
    }

    confirm(e) {
        e.preventDefault();
        this.props.confirmAction(true)
    }

    render() {
        return (
            <div id="ConfirmModal" className="modal">


                <div className="modal-content">
                    <h4>Please confirm your action</h4>

                    <div className="row">

                    </div>
                </div>
                <div className="modal-footer">
                    <a className="modal-action modal-close waves-effect waves-red btn-flat">Close</a>
                    <button className="modal-action modal-close waves-effect waves-green btn-flat" onClick={this.confirm}>confirm</button>
                </div>

            </div>

        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});
export default connect(mapStateToProps, {})(ConfirmModal);
