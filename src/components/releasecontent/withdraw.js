import React, { Component } from "react";
import "./releasecontent.scss";
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

export default class withdraw extends React.Component {
  determine = () => {
    if (isiOS) {
      try {
        window.webkit.messageHandlers.IOSNativenAlertConfirm.postMessage("");
      } catch (e) {
       
        console.log(e);
      }
    } else {
      try {
        window.app.androidClickAction();
      } catch (e) {
        //TODO handle the exception
        console.log(e);
  
      }
    }
  };
  state = {
    rule: [
      {
        name: "提现手续费：",
        value: "0.70%",
      },
      {
        name: "提现手续费最低：",
        value: "￥ 2",
      },
      {
        name: "单次提现金额最低：",
        value: "￥ 50",
      },
      {
        name: "单次提现金额最高：",
        value: "￥ 50,000",
      },
    ],
  };
  render() {
    return (
      <div className="withdraw">
        <h1>提现规则</h1>

        <ul className="withdrawHome">
          {this.state.rule.map((item, key) => (
            <li ke={key + 10}>
              <p>{item.name}</p>
              <p>{item.value}</p>
            </li>
          ))}
          <li key="14">
            注：手续费系微信,支付宝官方收取,邮宝不收取任何相关费用
          </li>
        </ul>

        <button onClick={() => this.determine()}>确定</button>
      </div>
    );
  }
}
