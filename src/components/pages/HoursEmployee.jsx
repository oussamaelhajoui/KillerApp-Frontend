import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class HoursEmployee extends Component {
    render() {
        return (
            <div>
                <h1>specific employee</h1>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(HoursEmployee);