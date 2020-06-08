import React, { Component } from "react";
import Mask from "../Goolbal/Mask.js";
import "./releasecontent.scss";
import Memberupgrade from "./memberupgrade";
import Release from "./release";
import Withdraw from "./withdraw";
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

export default class releasecontent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mystate:1
    };
  };
   getUrlParam = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = this.props.location.search.substr(1).match(reg);
    console.log(window.location);
    if (r != null) {
      return decodeURI(r[2]);
    }
    return ""; //如果此处只写return;则返回的是undefined
  };
  componentWillMount() {
    //DOM之前执行

    /*
       1 发布弹框 day为天数，为小于0为确认弹框

      */

    if (this.props.match.params.num == 3) {
      // console.log(Number(this.getUrlParam("day"))>1);
      // state
      this.setState({
        mystate: this.getUrlParam("state"),
      });
    }
  }
  render() {
    return (
      <div className="tankuangAll">
        <Mask>
          {
            this.props.match.params.num == 1?
             <Release {...this.props}></Release>:
             this.props.match.params.num == 2?
             <Withdraw {...this.props}></Withdraw>:
             this.props.match.params.num == 3?
             <Memberupgrade
             {...this.props}
             mystate={this.state.mystate}
             ></Memberupgrade>
             :null
          }
        
        </Mask>
      </div>
    );
  }
}
