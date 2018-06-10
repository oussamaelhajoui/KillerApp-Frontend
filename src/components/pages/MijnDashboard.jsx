import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

class MijnDashboard extends Component {

    render() {
        return (
            <Fragment>
                hoi
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});
export default connect(mapStateToProps, {})(MijnDashboard);
