import React, { Component } from "react";
import { connect } from 'react-redux';

import ReactDOM from "react-dom";
import $ from "jquery";

import { changeTableAmount } from './../../../actions/changeTableAmount';
import { changePaginationByArrow, changePaginationByNumber } from './../../../actions/changePagination';
import { populateUserTable } from './../../../actions/populateUserTable';
import { populateRouteTable } from './../../../actions/populateRouteTable';


class PaginationRow extends Component {
  constructor(props) {
    super(props);

    this.pagination = this.pagination.bind(this);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    // console.log(event.target.value);
    this.props.changeTableAmount({ tableamount: event.target.value })
    let rdxActionDataTable = {
      pagcurrent: this.props.pagination.pagcurrent,
      tableamount: this.props.pagination.tableamount,
      token: this.props.user.token,
    }
    this.props[this.props.table](rdxActionDataTable);
  }


  componentDidMount() {
    $(ReactDOM.findDOMNode(this.refs.selectamount)).on(
      "change",
      this.handleChange.bind(this)
    );
  }

  pagination = () => {
    return this.props.pagination.pagli
      .filter(pag =>
        pag === (this.props.pagination.pagcurrent - 2) ||
        pag === (this.props.pagination.pagcurrent - 1) ||
        pag === this.props.pagination.pagcurrent ||
        pag === (this.props.pagination.pagcurrent + 1) ||
        pag === (this.props.pagination.pagcurrent + 2) ||
        pag === this.props.pagination.pagli[this.props.pagination.pagli.length - 1])
      .map(pag => (
        <li
          key={pag}
          className={this.props.pagination.pagcurrent === pag ? "active" : "waves-effect"}
        >
          <a
            onClick={e => {
              this.props.changePaginationByNumber(e);
              let rdxActionDataTable = {
                pagcurrent: parseInt(e.target.text, 10),
                tableamount: this.props.pagination.tableamount,
                token: this.props.user.token,
              }
              this.props[this.props.table](rdxActionDataTable)
            }}
          >
            {pag}
          </a>
        </li>
      ));
  }

  render() {
    return (
      <div className="row filterholder">
        <div className="input-field">
          <select ref="selectamount" name="tableamount" value={this.props.pagination.tableamount} onChange={this.handleChange}>
            <option defaultValue="1" >1</option>
            <option defaultValue="10">10</option>
            <option defaultValue="25">25</option>
            <option defaultValue="50" defaultValue> 50</option>
          </select>
          <label>Count</label>
        </div>

        <ul className="pagination">
          <li
            onClick={e => {
              this.props.changePaginationByArrow({ direction: "previous", pagcurrent: this.props.pagination.pagcurrent, pagli: this.props.pagination.pagli });
              if (this.props.pagination.pagcurrent !== 1) {
                let rdxActionDataTable = {
                  pagcurrent: this.props.pagination.pagcurrent - 1,
                  tableamount: this.props.pagination.tableamount,
                  token: this.props.user.token,
                }
                this.props[this.props.table](rdxActionDataTable)
              }
            }}
            className={
              this.props.pagination.pagcurrent === 1 ? "disabled" : "waves-effect"
            }
          >
            <a>
              <i className="material-icons">chevron_left</i>
            </a>
          </li>
          {this.pagination()}
          <li
            onClick={e => {
              console.log("first", this.props.pagination.pagcurrent);
              this.props.changePaginationByArrow({ direction: "next", pagcurrent: this.props.pagination.pagcurrent, pagli: this.props.pagination.pagli });
              console.log("second", this.props.pagination.pagcurrent);

              if (this.props.pagination.pagcurrent !== this.props.pagination.pagcount) {
                let rdxActionDataTable = {
                  pagcurrent: this.props.pagination.pagcurrent + 1,
                  tableamount: this.props.pagination.tableamount,
                  token: this.props.user.token
                }
                this.props[this.props.table](rdxActionDataTable)
              }

            }}
            className={
              this.props.pagination.pagcurrent === this.props.pagination.pagli.length
                ? "disabled"
                : "waves-effect"
            }
          >
            <a>
              <i className="material-icons">chevron_right</i>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  pagination: state.pagination,
  video: state.video
});

const mapDispatchToProps = {
  changeTableAmount,
  changePaginationByArrow,
  changePaginationByNumber,
  populateUserTable,
  populateRouteTable
}
export default connect(mapStateToProps, mapDispatchToProps)(PaginationRow);