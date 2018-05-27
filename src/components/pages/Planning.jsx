import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

class Planning extends Component {
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
export default connect(mapStateToProps, {})(Planning);
