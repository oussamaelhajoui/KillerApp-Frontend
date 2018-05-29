import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import Calendar from './fractions/myCalendar';

class Planning extends Component {
    constructor(props) {
        super(props);


    }


    render() {
        var d = new Date();
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        var n = weekday[d.getDay()];

        console.log(weekday);
        console.log(n);
        return (
            <Fragment>
                {/* {weekday} */}
                {/* {weekday.forEach(day => { console.log(day); return day; })} */}
                <Calendar />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});
export default connect(mapStateToProps, {})(Planning);
