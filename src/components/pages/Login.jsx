import React, { Component, Fragment } from "react";
import "../../assets/css/Login.css";
import { connect } from "react-redux";
import { logIn } from "../../actions/loginAction";

class Login extends Component {
  state = {
    username: "",
    password: "",
    LoggedIn: false
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentWillUpdate(nextProp) {
    if (nextProp.user.loggedIn) {
      this.props[0].history.push("/");
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.logIn({ ...this.state, refs: this.refs });
  }

  componentWillMount() {
    if (this.props.user.loggedIn) {
      if (this.props.user.userRole === 1) {
        this.props[0].history.push("/");
      } else {
        this.props[0].history.push("/ratevideos");
      }
    }
  }

  render() {
    return (
      <Fragment>
        <div className="Loginwrapper">
          <div className="Loginbox">
            <h2 className="center-align">Log in</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="input-field row">
                <input
                  name="username"
                  type="text"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <label htmlFor="username">
                  <b>Username</b>
                </label>
              </div>

              <div className="input-field row">
                <input
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <label htmlFor="password">
                  <b>Password</b>{" "}
                </label>
              </div>

              {
                this.props.user.loading && (
                  <div className="progress">
                    <div className="indeterminate"></div>
                  </div>
                )
              }

              <div className="center-align">
                <button
                  type="submit"
                  ref="loginBtn"
                  className="waves-effect waves-light btn"
                >
                  {this.props.user.loading ? "Loading" : "Login"}
                </button>
                <p>{this.props.user.errorMsg}</p>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps, { logIn })(Login);
