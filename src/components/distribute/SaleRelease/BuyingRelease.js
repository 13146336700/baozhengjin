import React, { Component } from "react";
import Uheader from "../../Goolbal/Uheader";
import Myseach from "../Global/myseach";
import LooseSale from "../Global/LooseSale";
import Serial from "../Global/Serial";
import Scattered from "../Global/Scattered";
import Address from "../Global/address";
import "./SaleRelease.scss";
export default class BuyingRelease extends React.Component {
  render() {
    return (
      <div className="SaleRelease">
        <Uheader {...this.props} utitle="配号出售发布" useach="true"></Uheader>
        <p className="header_border_bottom"></p>
        <Myseach {...this.props}></Myseach>
        <div className="zhanwei"></div>
        <LooseSale {...this.props} uname="散张出售"></LooseSale>
        <div className="zhanwei"></div>
        <Serial {...this.props} utitle="整售"></Serial>
        <div className="zhanwei"></div>
        <Scattered ustatus="2" {...this.props}></Scattered>
        <div className="zhanwei"></div>
        <div className="zhanwei"></div>
        <button className="adddelte">预览检查</button>
        <div className="zhanwei"></div>
      </div>
    );
  }
}
