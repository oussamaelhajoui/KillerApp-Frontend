import { Component } from "react";
import { connect } from "react-redux";
// import { Auth } from "./Libary";

class Restful extends Component {
  constructor(props) {
    super(props);

    this.Post = this.Post.bind(this);
    this.Get = this.Get.bind(this);
  }
  static url = "http://localhost:80/api/";
  // static url = "http://eow-portal.azurewebsites.net/api/";


  static Post(endpoint, data, token) {
    return fetch(this.url + endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
  }

  static Get(endpoint, token) {
    return fetch(this.url + endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps, {})(Restful);
