import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

class PlanningGebruiker extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Fragment>

            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});
export default connect(mapStateToProps, {})(PlanningGebruiker);
