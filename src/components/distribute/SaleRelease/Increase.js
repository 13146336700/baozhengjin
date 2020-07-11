import React, { Component } from "react";
import Uheader from "../../Goolbal/Uheader";
import LooseSale from "../Global/LooseSale";
import Serial from "../Global/Serial";
import Scattered from "../Global/Scattered";
import Address from "../Global/address";
import "./SaleRelease.scss";
export default class Increase extends React.Component {
  render() {
    return (
      <div className="SaleRelease">
        <Uheader {...this.props} utitle="增加出售库存"></Uheader>
        <p className="header_border_bottom"></p>
        <div className="zhanwei"></div>
        <div className="Increase_title"><span>抗疫邮票大版</span> </div>
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
