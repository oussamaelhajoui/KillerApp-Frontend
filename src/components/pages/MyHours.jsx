import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class MyHours extends Component {
    render() {
        return (
            <div>
                <h1>this is my hours</h1>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(MyHours);