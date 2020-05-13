import React, { Component } from "react";
import axios from "./axios/index";
import { Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
import "./ceshi.scss";
function onClose() {}

class Page extends Component {
  componentDidMount() {
    /* 
		 生命周期请求接口
		 */
    const _this = this; //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
    Toast.loading("加载中", 1000, onClose, false);
    axios
      .post("user/json/getPersonalBond", {
        userId: _this.props.match.params.userId
      })
      .then(function(response) {
        console.log(response.data.resultObject);
        if (response.data.code == 10000) {

          switch (response.data.resultObject.userStatus) {
            case "1":
              _this.props.history.push("/good");
              break;
            case "2":
              _this.props.history.push(
                `/Pay_band/${_this.props.match.params.userId}`
              );
              break;
            case "3":
              _this.props.history.push(
                `/permanent/${_this.props.match.params.userId}`
              );
              break;
            case "4":
              _this.props.history.push(
                `/Already_paid/${_this.props.match.params.userId}`
              );
              break;
            case "5":
              _this.props.history.push(
                `/Punishment/${_this.props.match.params.userId}`
              );
              break;
            case "6":
              _this.props.history.push(
                `/band_paid/${_this.props.match.params.userId}`
              );
              break;
            default:
              _this.props.history.push("/good");
              break;
          }
          Toast.hide();
        } else {
          _this.setState({
            isLoaded: false
          });
        }
      })
      .catch(function(error) {
        console.log(error);
        _this.setState({
          isLoaded: false,
          error: error
        });
      });

    console.log("我汇之星");
  }
  render() {
    const { user } = this.props;
    return <div></div>;
  }
}

export default Page;
