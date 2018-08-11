import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class Hours extends Component {
    render() {
        return (
            <div>
                <h1>hours</h1>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Hours);