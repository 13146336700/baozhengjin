import React, { Component } from "react";
import "./help.scss";
export default class promotion extends React.Component {
  render() {
    return (
      <div className="promotion">
        <div className="zhanwei"></div>
        <div className="help_HeaDer">
          <div className="help_HeaDer_home">
            <div>位置</div>
            <div>
              <span>APP搜索</span>
              <span>行情页</span>
              <img src={require("../assets/icon_right.png")} alt="" />
            </div>
          </div>
        </div>
        <div className="userType">
          <p className="xingshi">广告形式</p>
          <p className="miaoshu">图文</p>
          <img
            src={require("../assets/background.png")}
            alt=""
            className="user_img"
          />
          <p className="Claim">需提供资料及要求</p>
          <p className="Claim_size">图片尺寸：750*1334像素   <span>图片大小：不超过1M</span></p>
        </div>
       
        <div className="zhanwei"></div>
        <div className="zhanwei"></div>
        <div className="zhanwei"></div>
        <div className="zhanwei"></div>
        <div className="zhanwei"></div>
      </div>
    )
  }
}
