import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Calendar from './fractions/myCalendar'
import { getPlanningenOnUser } from '../../actions/getPlanningenOnUser'

class MijnPlanning extends Component {

    componentWillMount() {
        console.log(this.props.user);
        const data = {
            id: this.props.user.dbResponse.id,
            token: this.props.user.token
        }
        this.props.getPlanningenOnUser(data);
    }
    render() {
        return (
            <Fragment>
                <div className="row">
                    {<Calendar planningen={this.props.planningenUser} />}
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    planningenUser: state.planningenUser


});

const mapDispatchToProps = {
    getPlanningenOnUser
}
export default connect(mapStateToProps, mapDispatchToProps)(MijnPlanning);
