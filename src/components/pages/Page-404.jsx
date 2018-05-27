import React, { Component } from 'react';
import "../../assets/css/404.css";
import SideBarBG from "./../../assets/img/404.jpg";


class Page404 extends Component {
    render() {
        return (
            <div className="center-align">
                <img src={SideBarBG} alt="404" className="image404" />
                <h3>STOP! This way is not found!</h3>
            </div>
        );
    }
}

export default Page404;