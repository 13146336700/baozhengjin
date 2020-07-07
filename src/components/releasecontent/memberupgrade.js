import React, { Component } from "react";
import "./releasecontent.scss";
import jindou from "../assets/jindou.png";
import gongnneg from "../assets/gongnneg.png";
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
export default class memberupgrade extends React.Component {
  state = {
    interests: [
      {
        img: "http://image.ybk008.com/hy_ic_function%20coupon@2x1591426586720",
        name: "功能券使用权",
      },
      {
        img: "http://image.ybk008.com/hy_ic_jindou@2x1591426597801",
        name: "金豆购买9.8折",
      },
    ],
    myData: {
      grade: "白银",
      leftData: {},
      rightDate: {},
      Features: [],
      beans: "",
      mounyName:""
    },
  };
  componentWillMount(){
  document.title = "会员服务体系升级";
  };
  componentDidMount() {
    console.log(this.props.mystate);
    let myData = {
      grade: "白银",
      beans: "9.8",
      left: {
        img: "http://image.ybk008.com/authentication@2x1591426572144",
        name: "认证用户",
      },
      right: {
        img:
          "http://image.ybk008.com/me_icon_member_silver_big@2x@2x1591426643713",
        name: "白银会员",
      },
      Features: [],
      mounyName:""
    };

    /*
           this.state
          3 认证用户 - 白银会员
          4 白银会员 - 黄金会员
          5 黄金会员 - 钻石会员
          6 钻石会员 - 皇冠会员
          */

    switch (this.props.mystate) {
      case "3":
        myData.left.img =
          "http://image.ybk008.com/authentication@2x1591426572144";
        myData.left.name = "认证用户";
        myData.right.img =
          "http://image.ybk008.com/me_icon_member_silver_big@2x@2x1591426643713";
        myData.right.name = "白银会员";
        myData.grade = "白银";
        myData.Features = [
          "匿名5次、",
          "标题变色5次、",
          "闪买5次、",
          "闪卖5次",
        ];
        myData.beans = "9.8";
        myData.mounyName = "6个月";
        break;
      case "4":
        myData.left.img =
          "http://image.ybk008.com/me_icon_member_silver_big@2x@2x1591426643713";
        myData.left.name = "白银会员";
        myData.right.img =
          "http://image.ybk008.com/me_icon_member_gold_big@2x%20(1)@2x1591426628808";
        myData.right.name = "黄金会员";
        myData.grade = "黄金";
        myData.Features = [
          "匿名15次、",
          "标题变色15次、",
          "闪买15次、",
          "闪卖15次",
        ];
        myData.beans = "9.5";
        myData.mounyName = "1年";
        break;
      case "5":
        myData.left.img =
          "http://image.ybk008.com/me_icon_member_gold_big@2x%20(1)@2x1591426628808";
        myData.left.name = "黄金会员";
        myData.right.img =
          "http://image.ybk008.com/me_icon_member_diamond_big@2x%20(1)@2x1591442285697";
        myData.right.name = "钻石会员";
        myData.grade = "钻石";
        myData.Features = [
          "匿名30次、",
          "标题变色不限次、",
          "闪买30次、",
          "闪卖30次",
        ];
        myData.beans = "9.3";
        myData.mounyName = "1年";
        break;
      case "6":
        myData.left.img =
          "http://image.ybk008.com/me_icon_member_diamond_big@2x%20(1)@2x1591442285697";
        myData.left.name = "钻石会员";
        myData.right.img =
          "http://image.ybk008.com/ic_crown@2x%20(1)@2x1591426608920";
        myData.right.name = "皇冠会员";
        myData.grade = "皇冠";
        myData.Features = [
          "匿名不限次、",
          "标题变色不限次、",
          "闪买不限次、",
          "闪卖不限次",
        ];
        myData.beans = "8.8";
        myData.mounyName = "永久";
        break;
      default:
        myData.left.img =
          "http://image.ybk008.com/authentication@2x1591426572144";
        myData.left.name = "认证用户";
        myData.right.img =
          "http://image.ybk008.com/me_icon_member_silver_big@2x@2x1591426643713";
        myData.right.name = "白银会员";
        myData.grade = "白银";
        myData.Features = [
          "匿名5次、",
          "标题变色5次、",
          "闪买5次、",
          "闪卖5次",
        ];
        myData.beans = "9.8";
        myData.mounyName = "6个月";
        break;
    }
    const interests = [...this.state.interests]; //复制数组--浅拷贝
    this.setState({
      myData: {
        grade: myData.grade,
        leftData: {
          //免费 前面显示的
          img: myData.left.img,
          name: myData.left.name,
        },
        rightDate: {
          //免费 后面面显示的
          img: myData.right.img,
          name: myData.right.name,
        },
        Features: myData.Features,
        mounyName:myData.mounyName
      },
      interests: interests.map((item, key) =>
        key == 1 ? { ...item, name: `金豆购买${myData.beans}折` } : item
      ),
    });

    // interests: [
    //   {
    //     img: "http://image.ybk008.com/hy_ic_function%20coupon@2x1591426586720",
    //     name: "功能券使用权",
    //   },
    //   {
    //     img: "http://image.ybk008.com/hy_ic_jindou@2x1591426597801",
    //     name: `金豆购买${myData.beans}折`,
    //   },
    // ]
  }
  More = () => {
    //IOSNativenAlertConfirm 关闭（确定
    //IOSNativenAlertCancel 取消（
    if (isiOS) {
      try {
        window.webkit.messageHandlers.IOSNativenAlertConfirm.postMessage("");
      } catch (e) {
        console.log(e);
        console.log(this);
      }
    } else {
      try {
        window.app.androidReadMore();
      } catch (e) {
        //TODO handle the exception
        console.log(e);
      }
    }
  };
  Confirm = () => {
    //IOSNativenAlertConfirm 关闭（确定
    //IOSNativenAlertCancel 取消（
    if (isiOS) {
      try {
        window.webkit.messageHandlers.IOSNativenAlertCancel.postMessage("");
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        window.app.androidCloseDialog();
      } catch (e) {
        //TODO handle the exception
        console.log(e);
      }
    }
  };

  render() {
    return (
      <div className="memberupgradeHome">
        <div className="memberupgradeHome_top">
          <div className="memberupgradeHome_top_All">
            <div className="imgdiv">
            <img src={require("../assets/title.png")} alt="" className="title_top"/>
            <img src={require("../assets/line.png")} alt="" className="title_top"/>
            </div>
           
            <div className="concat">
              恭喜您！邮宝 <span>免费</span> 为您升级为{this.state.myData.grade}
    会员，{this.state.myData.mounyName}免费试用
            </div>
            <div className="menmer">
              <div className="menmer_left">
                <img src={this.state.myData.leftData.img} alt="" />
                <p>{this.state.myData.leftData.name}</p>
              </div>
              <div className="menmer_center">
                <img src={require("../assets/upgrade.png")} alt="" />
              </div>
              <div className="menmer_left">
                <img src={this.state.myData.rightDate.img} alt="" />
                <p>{this.state.myData.rightDate.name}</p>
              </div>
            </div>
            <div className="away">
              <span></span>
              赠送功能券礼包
            </div>
            {/* <p className="gongneng">匿名5次 标题变色5次 闪买5次 闪卖5次 </p> */}
            <p className="gongneng">
              {this.state.myData.Features.map((item, key) => (
                <span key={key + 100}>{item}</span>
              ))}
            </p>

            <div className="away Marginaway">
              <span></span>
              {this.state.myData.grade}会员尊享权益
            </div>
            <ul className="footer">
              {this.state.interests.map((item, key) => (
                <li key={key + 5}>
                  <img src={item.img} alt="" />
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <button onClick={() => this.More()}>了解更多</button>
          <img
            src={require("../assets/breack.png")}
            alt=""
            className="clano"
            onClick={() => this.Confirm()}
          />
        </div>
      </div>
    );
  }
}
