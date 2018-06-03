import React, { Component } from 'react';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/nl';

import "react-big-calendar/lib/css/react-big-calendar.css";
moment().locale('nl')
moment.locale('nl')
moment().format("dddd MMMM YYYY")
const myEventsList = [
    {
        id: 1,
        title: 'Route 3001',
        startDate: new Date(2018, 5, 1, 18, 13, 23, 43),
        endDate: new Date(2018, 5, 1, 20, 32, 23),
        desc: 'Pre-meeting meeting, to prepare for the meeting',
    },
    {
        id: 2,
        title: 'Route 3001',
        startDate: new Date(2018, 5, 1, 18, 13, 23, 43),
        endDate: new Date(2018, 5, 1, 20, 32, 23),
        desc: 'Pre-meeting meeting, to prepare for the meeting',
    },
    {
        id: 3,
        title: 'Route 3021',
        startDate: new Date(2018, 5, 1, 18, 13, 23, 43),
        endDate: new Date(2018, 5, 1, 20, 32, 23),
        desc: 'Pre-meeting meeting, to prepare for the meeting',
    },
    {
        id: 4,
        title: 'Route 3031',
        startDate: new Date(2018, 5, 1, 18, 13, 23, 43),
        endDate: new Date(2018, 5, 1, 20, 32, 23),
        desc: 'Pre-meeting meeting, to prepare for the meeting',
    },
    {
        id: 5,
        title: 'Meeting 2',
        startDate: new Date(2018, 5, 1, 6, 13, 23, 43),
        endDate: new Date(2018, 5, 1, 13, 32, 23),
        desc: 'Pre-meeting meeting, to prepare for the meeting 2',
    }
]

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);



const min = new Date();
min.setHours(6);
min.setMinutes(0, 0, 0);

const max = new Date();
max.setHours(20);
max.setMinutes(0, 0, 0);



class myCalendar extends Component {


    selecteventhandler = (props) => {
        console.log("checking", props);
    }

    selecthandler2 = (props) => {
        console.log("selected", props);
        this.props.openModalHandler(true, props.start, props.end);
    }

    selecthandler = (props) => {
        console.log("selecting", props);
    }

    render() {
        return (
            <div>
                <BigCalendar
                    formats={{
                        dateFormat: "dddd MMMM YYYY",
                        weekdayFormat: "dddd MMMM YYYY",
                        dayFormat: 'dddd DD MMMM',
                    }}
                    events={myEventsList}
                    startAccessor="startDate"
                    endAccessor="endDate"
                    defaultDate={new Date()}
                    defaultView={'agenda'}
                    views={['day', 'agenda', 'week']}
                    popupOffset={{ x: 30, y: 20 }}
                    selectable={false}
                    toolbar={true}
                    drilldownView="agenda"
                    onSelecting={this.selecthandler}
                    onSelectEvent={this.selecteventhandler}
                    onSelectSlot={this.selecthandler2}
                    popup={true}
                    culture="nl-NL"
                    step={15}
                    timeslots={1}
                    min={min}
                    max={max}
                />
            </div>
        );
    }
}

export default myCalendar;