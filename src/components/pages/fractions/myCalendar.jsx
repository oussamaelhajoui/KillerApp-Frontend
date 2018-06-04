import React, { Component } from 'react';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/nl';

// import Swal from 'sweetalert2';

import "react-big-calendar/lib/css/react-big-calendar.css";
moment().locale('nl')
moment.locale('nl')
moment().format("dddd MMMM YYYY")




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

    state = {
        planningen: {
            loadingPlanningen: false,
            planningen: []
        }
    }



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


    componentDidUpdate() {
        console.log(this.props);
        if (this.props.planningen !== this.state.planningen) {
            this.setState({
                planningen: this.props.planningen
            })
        }
        console.log(this.state);

    }

    render() {
        let events = "";
        if (this.state.planningen.planningen.length > 0) {
            events = this.state.planningen.planningen.map(planning => {
                console.log(planning);
                let datum = planning.datum.split("T")[0];
                let tijdStart = planning.route.tijdstart;
                let tijdEind = planning.route.tijdeind;
                const dateStart = new Date(`${datum} ${tijdStart}`);
                const dateEind = new Date(`${datum} ${tijdEind}`);

                return (
                    {
                        id: planning.idplanning,
                        title: `${planning.gebruiker.username} op ${planning.route.routenummer} met de auto ${planning.voertuig.voertuigcode}`,
                        startDate: dateStart,
                        endDate: dateEind,
                        desc: JSON.stringify(planning)
                    }
                )
            });
            events = [...events];
        } else { events = [{}] }

        // console.log("events trig", this.state.planningen);
        console.log("events", events);
        return (
            <div>
                {/* {this.state.planningen.planningen.length} */}
                {/* {this.props.planningen.planningen.length > 0 ? "found something" : { ...this.props.planningen }} */}
                {/* {this.state.planningen.map(planning => <p>found me</p>)} */}
                <BigCalendar
                    formats={{
                        dateFormat: "dddd MMMM YYYY",
                        weekdayFormat: "dddd MMMM YYYY",
                        dayFormat: 'dddd DD MMMM',
                    }}
                    events={events}
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