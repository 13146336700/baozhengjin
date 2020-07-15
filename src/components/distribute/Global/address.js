import React, { Component } from "react";
import "./index.scss";
import { Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
import axios from "../../axios/index";
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

export default class address extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // selectValue:'startup'
      dealWay: "北京交割",
      todolist: [
        { dealWay: "北京交割", code: "beijing" },
        { dealWay: "上海交割", code: "shanghai" },
        { dealWay: "广州交割", code: "guangzhou" },
        { dealWay: "其他交割", code: "other" },
      ],
    };
  }
  state = {
    name: "- -",
    phone: "- -",
    address: "- -",
  };
  componentDidMount() {
    // funcitonName 是原生回调使用的方法名
    window["IOSSelectAddressUpload"] = this.IOSSelectAddressUpload;
    this.getDealPattern();
  }
  getDealPattern = () => {
    axios
      .post("payment/json/getDealPattern", {
        userId: "4028808361926f8a0161db4c492304e2",
        type: this.props.type,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.code == "10000") {
          this.setState({
            name: response.data.resultList[0].receiveName,
            phone: response.data.resultList[0].receivePhone,
            address: response.data.resultList[0].receiveAddress,
          });
        } else {
          Toast.info(response.data.message, 1);
        }
      })
      .catch((error) => {});
  };
  IOSSelectAddressUpload = (val) => {
    if (isiOS) {
      let JsonObj = JSON.parse(val);
      this.setState({
        name: JsonObj.name,
        phone: JsonObj.phone,
        address: JsonObj.address,
      });
    } else {
      this.setState({
        name: val.name,
        phone: val.phone,
        address: val.address,
      });
    }
  };
  selectChange = (ev) => {
    //选择 交割地点
    console.log(ev.target.value);

    this.setState({
      dealWay: ev.target.value,
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
        window.app.androidNativeSelectAddress();
      } catch (e) {
        console.log(e);
      }
    }
  };
  render() {
    return (
      <div className="address">
        <div className="addressHome">
          <div className="userDelivery select-area">
            <div>
              <span>交割地点：</span>
              <span>{this.state.dealWay}</span>
            </div>
            <div>
              <img src={require("../../assets/right.png")} alt="" />
            </div>
            <select
              onChange={(e) => this.selectChange(e)}
              value={this.state.dealWay}
            >
              {this.state.todolist.map((item1, key) => (
                <option value={item1.dealWay} key={item1.code}>
                  {item1.dealWay}
                </option>
              ))}
            </select>
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
