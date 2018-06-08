import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

class RoutePage extends Component {


    render() {
        return (
            <Fragment>
                route
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});
export default connect(mapStateToProps, {})(RoutePage);
