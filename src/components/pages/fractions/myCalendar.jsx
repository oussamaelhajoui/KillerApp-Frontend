import React, { Component } from 'react';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/nl';
import $ from "jquery";

import Swal from 'sweetalert2';

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
        },
        date: new Date()
    }

    componentDidMount() {
        $("select").material_select();
    }

    componentDidUpdate() {
        $("select").material_select();
    }

    selecteventhandler = (props) => {
        const data = JSON.parse(props.desc);
        Swal({
            title: props.title,
            html: `
                    Route: ${data.route.routenummer}<br/>
                    Datum: ${data.datum.split("T")[0]}<br/>
                    Tijd: ${data.route.tijdstart} - ${data.route.tijdeind} <br/>
                    Voertuig: ${data.voertuig.voertuigcode} - ${data.voertuig.soort.soort}
                    <div className="input-field col s12">
                        <select onChange={this.handleChangeSelect} id="swal-input1" ref="routeselect">
                            <option value="" disabled selected>Kies de route</option>
                            <option key={1} value={"xx"}>xxx</option>
                        </select>
                        <label>Selecteer Route</label>
                    </div>
                `,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value
                ]
            },
            type: 'info',
            focusConfirm: false,

        }).then((...x) => console.log("xx", x))
        $("select").material_select();


    }

    selecthandler2 = (props) => {
        console.log("selected", props);
        this.props.openModalHandler(true, props.start, props.end);
    }

    selecthandler = (props) => {
        console.log("selecting", props);
    }


    componentDidUpdate() {
        if (this.props.planningen !== this.state.planningen) {
            this.setState({
                planningen: this.props.planningen
            })
        }

    }

    render() {
        let events = [{}];
        if (this.state.planningen.planningen.length > 0) {
            events = this.state.planningen.planningen.map(planning => {
                let datum = planning.datum.split("T")[0];
                let tijdStart = planning.route.tijdstart;
                let tijdEind = planning.route.tijdeind;
                const dateStart = new Date(`${datum.replace(new RegExp("-", "g"), "/")} ${tijdStart}`);
                const dateEind = new Date(`${datum.replace(new RegExp("-", "g"), "/")} ${tijdEind}`);
                // console.group("data");
                // console.log("startdate",dateStart);
                // console.log("end",dateEind);
                // console.groupEnd();
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

        return (
            <div>
                <BigCalendar
                    formats={{
                        dateFormat: "dddd MMMM YYYY",
                        weekdayFormat: "dddd MMMM YYYY",
                        dayFormat: 'dddd DD MMMM',
                    }}
                    events={events}
                    startAccessor="startDate"
                    endAccessor="endDate"
                    defaultDate={new Date(new Date().setHours(0))}
                    defaultView={'week'}
                    views={['day', 'agenda', 'week', 'month']}
                    popupOffset={{ x: 30, y: 20 }}
                    selectable={false}
                    toolbar={true}
                    drilldownView={null}
                    onSelecting={this.selecthandler}
                    onSelectEvent={this.selecteventhandler}
                    onSelectSlot={this.selecthandler2}
                    onView={(view) => {
                        console.log("xxxx", view)
                    }}
                    onNavigate={(...v) => {
                        if (!(v === undefined)) {
                            console.log(...v);
                            this.props.getDate(...v);
                        }

                    }}
                    popup={true}
                    culture="nl-NL"
                    step={15}
                    timeslots={2}
                    min={min}
                    max={max}
                />
            </div>
        );
    }
}

export default myCalendar;