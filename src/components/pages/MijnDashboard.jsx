import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

class MijnDashboard extends Component {

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
export default connect(mapStateToProps, {})(MijnDashboard);
