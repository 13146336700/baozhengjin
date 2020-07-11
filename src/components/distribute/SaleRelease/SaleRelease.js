import React, { Component } from "react";
import Uheader from "../../Goolbal/Uheader";
import Myseach from "../Global/myseach";
import Loose from "../Global/Loose";
import Serial from "../Global/Serial";
import Scattered from "../Global/Scattered";
import Address from "../Global/address";
import { Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
import "./SaleRelease.scss";

var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

export default class SaleRelease extends React.Component {
 
  PhotoImageUpload = () => {
    this.props.history.push("/SaleDetails");

 
  };
  render() {
    return (
      <div className="SaleRelease">
        <Uheader {...this.props} utitle="配号求购发布" useach="true"></Uheader>
        <p className="header_border_bottom"></p>
        <Myseach {...this.props}></Myseach>
        <Address {...this.props}></Address>
        <div className="zhanwei"></div>
        <Loose {...this.props} uname="散张求购"></Loose>
        <div className="zhanwei"></div>
        <Serial {...this.props} utitle="求购"></Serial>
        <div className="zhanwei"></div>
        <Scattered ustatus="1" {...this.props}></Scattered>
        <div className="zhanwei"></div>
        <div className="zhanwei"></div>
        <button className="adddelte" onClick={() => this.PhotoImageUpload()}>
          增加详情
        </button>
        <div className="zhanwei"></div>
      </div>
    );
  }
}
