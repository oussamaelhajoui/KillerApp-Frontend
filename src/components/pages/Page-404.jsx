import React, { Component } from 'react';
import "../../assets/css/404.css";
import SideBarBG from "./../../assets/img/nothing_found.png";


class Page404 extends Component {
    render() {
        return (
            <div className="center-align">
                <img src={SideBarBG} alt="404" className="image404" style={{ width: '50%' }} />
                <h3>Oeps! er is iets mis gegaan waarschijnlijk</h3>
            </div>
        );
    }
}

export default Page404;