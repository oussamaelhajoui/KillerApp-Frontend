import React, { Component } from 'react';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import "react-big-calendar/lib/css/react-big-calendar.css";
moment().locale('nl')
moment.locale('nl')
moment().format("MMMM dddd YYYY")
const myEventsList = [
    {
        id: 1,
        title: 'Meeting',
        startDate: new Date(2018, 4, 30, 22, 13, 23, 43),
        endDate: new Date(2018, 4, 30, 23, 32, 23),
        desc: 'Pre-meeting meeting, to prepare for the meeting',
    },
    {
        id: 2,
        title: 'Meeting 2',
        startDate: new Date(2018, 4, 30, 22, 13, 23, 43),
        endDate: new Date(2018, 4, 30, 23, 32, 23),
        desc: 'Pre-meeting meeting, to prepare for the meeting 2',
    }
]

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

const selecthandler = (props) => {
    console.log("1", props);
}
const selecthandler2 = (props) => {
    console.log("3", props);
}
const selecteventhandler = (props) => {
    console.log("2", props);
}

export default props => (
    <div>
        <BigCalendar
            events={myEventsList}
            startAccessor="startDate"
            endAccessor="endDate"
            defaultDate={new Date()}
            defaultView={'agenda'}
            views={['day', 'agenda', 'week']}
            popupOffset={{ x: 30, y: 20 }}
            selectable={true}
            toolbar={true}
            drilldownView="agenda"
            onSelecting={selecthandler}
            onSelectEvent={selecteventhandler}
            onSelectSlot={selecthandler2}
            popup={true}
        />
    </div>
);