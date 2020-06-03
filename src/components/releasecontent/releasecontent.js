import React, { Component } from "react";
import Mask from "../Goolbal/Mask.js";
import "./releasecontent.scss";
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

export default class releasecontent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showElem: "block",
        day:1
    };
  }
  componentWillMount() {
    //DOM之前执行

      /*
       1 发布弹框 day为天数，为小于0为确认弹框

      */
    
    if(this.props.match.params.num == 1){
      // console.log(Number(this.getUrlParam("day"))>1);
      this.setState({
        day:this.getUrlParam("day")
      })
    }
  }
  componentDidMount() {
    //DOM之后执行
    console.log(this.props);
  }
  getUrlParam = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = this.props.location.search.substr(1).match(reg);
    console.log(window.location);
    if (r != null) {
      return decodeURI(r[2]);
    }
    return ""; //如果此处只写return;则返回的是undefined
  };
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
          showElem: "none",
        });
      }
    } else {
      try {
        window.app.androidClickAction();
      } catch (e) {
        //TODO handle the exception
        console.log(e);
        this.setState({
          showElem: "none",
        });
      }
    }
  };
  render() {
    return (
      <div className="releasecontent" style={{ display: this.state.showElem }}>
        <Mask>
          <div className="releaseHome">
            <div className="releaseccontent">
              {this.state.day>=1?
               <header>
                您发布的商品有效期是<span>{this.state.day}</span>天
              </header>:
              <p className="zhanwei"></p>}
              <ul></ul>
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
        </Mask>
      </div>
    );
  }
}
