import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

class MijnPlanning extends Component {


    render() {
        return (
            <Fragment>
                hoi2
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});
export default connect(mapStateToProps, {})(MijnPlanning);
