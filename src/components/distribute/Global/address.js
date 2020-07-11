import React, { Component } from "react";
import "./index.scss";
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

export default class address extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   selectValue:'startup'
    // };
  };
  state = {
    name: "- -",
    phone: "- -",
    address: "- -",
  };
  componentDidMount() {
    // funcitonName 是原生回调使用的方法名
    window["IOSSelectAddressUpload"] = this.IOSSelectAddressUpload;
  }
  IOSSelectAddressUpload = (val) => {
    Toast.success(`${val}`, 1);
    console.log(val);
    let JsonObj = JSON.parse(val);
    this.setState({
      name: JsonObj.name,
      phone: JsonObj.phone,
      address: JsonObj.address,
    });
  };
  APPios = () => {
    if (isiOS) {
      try {
        window.webkit.messageHandlers.IOSNativeSelectAddress.postMessage("");
        // window.webkit.messageHandlers.IOSNativePayBond.postMessage(50);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        window.app.androidNativeSelectAddress("");
      } catch (e) {
        console.log(e);
      }
    }
  };
  render() {
    return (
      <div className="address">
        <div className="addressHome">
          <div className="userDelivery">
            <div>
              <span>交割地点：</span>
              <span>北京交割</span>
            </div>
            <div>
              <img src={require("../../assets/right.png")} alt="" />
            </div>
          </div>
        </div>
        <div className="zhanwei"></div>
        <div className="user_information" onClick={() => this.APPios()}>
          <div>
            <div>
              <span>{this.state.name}</span>
              <span>{this.state.phone}</span>
            </div>

            <img src={require("../../assets/right.png")} alt="" />
          </div>
          <p>{this.state.address}</p>
        </div>
        <div className="zhanwei"></div>
      </div>
    );
  }
}
