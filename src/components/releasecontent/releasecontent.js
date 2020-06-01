import React, { Component } from "react";
// import Mask from "../Goolbal/Mask.js";
import "./releasecontent.scss";
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

export default class releasecontent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showElem: "block",
    };
  }
  componentDidMount() {
    console.log(this.props);
  }
  Confirm = () => {
    //IOSNativenAlertConfirm 关闭（确定
    //IOSNativenAlertCancel 取消（
    if (isiOS) {
      try {
        window.webkit.messageHandlers.IOSNativenAlertConfirm.postMessage("");
      } catch (e) {
        console.log(e);
        console.log(this);
     
        this.setState({
          showElem: "none"
        });
      }
    } else {
      try {
        window.app.androidBuyMembership("");
        // this.setState({
        //   Show: "none"
        // });
      } catch (e) {
        //TODO handle the exception
        console.log(e);
        this.setState({
          showElem: "none"
        });
      }
    }
  };
  render() {
    return (
      <div className="releasecontent" style={{ display: this.state.showElem }}>
        <div className="releaseHome">
          <div className="releaseccontent">
            <header>
              您设置的有效期是<span>{this.props.match.params.num}</span>天
            </header>

            <img
              src={require("../assets/zhuangshi.png")}
              alt=""
              className="img_shili"
            />
            <div className="mycontent">
              在设置的有效期内，若有成交、务必诚信交易，不可因价格涨跌原因取消订单。因此，请慎重设置有效期。若有违反，处罚措施如下：
              <br />
              1.如因恶意原因取消订单达到5次，平台严肃封号处理 <br />
              2.如有不诚信交易行为，平台封号，并上报央行征信系统 <br />
              3.如有欺诈交易行为，平台封号，并将证据交由司法机关处理
            </div>
            <div className="know" onClick={() => this.Confirm()}>
              我知道了
            </div>
          </div>
        </div>
      </div>
    );
  }
}
