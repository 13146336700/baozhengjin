import React, { Component } from "react";
import "./member.scss";
import { Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
import Uheader from "../Goolbal/Uheader";
import jindou from "../assets/jindou.png";
import gongnneg from "../assets/gongnneg.png";
import axios from "../axios";

var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
console.log(u);

class member extends React.Component {
  state = {
    Package: [
      {
        time: "1个月",
        code: "1",
        newQuantity: "12",
        unit: "元",
        oldQuantity: "16",
      },
      {
        time: "3个月",
        code: "3",
        newQuantity: "30",
        unit: "元",
        oldQuantity: "68",
        word: "推荐",
      },
      {
        time: "6个月",
        code: "6",
        newQuantity: "66",
        unit: "元",
        oldQuantity: "76",
        word: "超值优惠",
      },
      {
        time: "12个月",
        code: "12",
        newQuantity: "112",
        unit: "元",
        oldQuantity: "118",
      },
    ],
    privilege: [
      {
        time: "1个月",
        content: "匿名1次、标题变色1次、闪买1次、闪卖1次、置顶1次",
      },
      {
        time: "6个月",
        content: "匿名1次、标题变色1次、闪买1次",
      },
      {
        time: "1年",
        content: "匿名券 标题变色 闪买  闪卖各1次",
      },
    ],
    footList: [
      {
        Amount:"累计充值金额",
        grade:"会员等级",
        discount:"金豆购买折扣"
      },
      {
        Amount:"0~299元",
        grade:"白银",
        discount:"9.8折"
      },
      {
        Amount:"300~499元",
        grade:"黄金",
        discount:"9.8折"
      },
      {
        Amount:"500~999元",
        grade:"钻石",
        discount:"9.8折"
      },
      {
        Amount:"1000元以上",
        grade:"皇冠",
        discount:"9.8折"
      }
    ],
    assets: [
      //资产
      {
        img: jindou,
        title: "金豆",
        content: "剩余：12567",
        btn: "购买金豆",
      },
      {
        img: gongnneg,
        title: "功能券",
        content: "匿名、标题变色、闪买、闪卖、置顶等会员专享功能",
        btn: "我的功能券",
      },
    ],
    MemberPackage: {},
    tab: "", //选中颜色高亮
    Mymember: true, //是否是会员
    resultObject: {}, //接口信息哦
  };
  Discoloration = (item, key) => {
    console.log(item, key);
    this.setState({
      tab: `tab-${key}`,
      MemberPackage: item,
    });
  };

  MymemberClick = () => {
    //  console.log(u)
    var arr = Object.keys(this.state.MemberPackage);
    if (!arr.length) {
      // return;
      Toast.fail("请选择套餐内容", 2);
      return;
    }

    if (this.state.Mymember == true) {
      console.log("会员");
      let obj = {
        code: this.state.MemberPackage.code,
        Quantity: this.state.MemberPackage.newQuantity,
        beanCount: `${this.state.resultObject.beanCount}`,
        beanPrice: `${this.state.resultObject.beanPrice}`,
      };
      let MYdata = JSON.stringify(obj);
      if (isiOS) {
        try {
          window.webkit.messageHandlers.IOSNativeBuyMember.postMessage(obj);
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          window.app.androidBuyMembership(
            `${this.state.MemberPackage.code}`,
            `${this.state.MemberPackage.newQuantity}`,
            `${this.state.resultObject.beanCount}`,
            `${this.state.resultObject.beanPrice}`
          );
          // this.setState({
          //   Show: "none"
          // });
        } catch (e) {
          //TODO handle the exception
          console.log(e);
        }
      }
    } else {
      console.log("不是会员");
      let obj = {
        code: this.state.MemberPackage.code,
        Quantity: this.state.MemberPackage.newQuantity,
        beanCount: `${this.state.resultObject.beanCount}`,
        beanPrice: `${this.state.resultObject.beanPrice}`,
      };
      console.log(obj);
      // let MYdata = JSON.stringify(obj);
      if (isiOS) {
        try {
          window.webkit.messageHandlers.IOSNativeBuyMember.postMessage(obj);
          // window.webkit.messageHandlers.IOSNativePayBond.postMessage(50);
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          window.app.androidBuyMembership(
            `${this.state.MemberPackage.code}`,
            `${this.state.MemberPackage.newQuantity}`,
            `${this.state.resultObject.beanCount}`,
            `${this.state.resultObject.beanPrice}`
          );
        } catch (e) {
          console.log(e);
        }
      }
    }
  };
  BuyGoldBean = (item, key) => {
    console.log(item, key);
    if (key == 0) {
      //购买金豆
      if (isiOS) {
        try {
          window.webkit.messageHandlers.IOSNativeBuyGoldBean.postMessage("");
          // window.webkit.messageHandlers.IOSNativePayBond.postMessage(50);
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          window.app.androidBuyGoldBean("");
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      //我的功能卷
      if (isiOS) {
        try {
          window.webkit.messageHandlers.IOSNativeBuyFunctionBond.postMessage(
            ""
          );
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          window.app.androidGotoFunctionTicket("");
        } catch (e) {
          console.log(e);
        }
      }
    }
  };
  onClose = () => {};
  componentWillMount() {
    // Toast.loading('正在加载，请稍后...', 0);
    console.log("我是错误的");
    // Toast.loading('正在加载，请稍后...', 0,this.onClose,false);
  }
  componentDidMount() {


    //DOM加载完执行 类似于mounted
    const _this = this;
    axios
      .post("/user/json/getMemberInfor", {
        userId: _this.props.match.params.userId,
      })
      .then(function (response) {
        if (response.data.code == 10000) {
          // userType 2- 已经认证,未开通会员     1-注册 3-白银4-黄金5-钻石

          let userType;
          if (
            response.data.resultObject.userType == "1" ||
            response.data.resultObject.userType == "2"
          ) {
            userType = false; //不是会员
          } else {
            userType = true; //会员
          }

          _this.setState({
            resultObject: response.data.resultObject,
            assets: [
              //资产
              {
                img: jindou,
                title: "金豆",
                content: `剩余：${response.data.resultObject.beanCount}`,
                btn: "购买金豆",
              },
              {
                img: gongnneg,
                title: "功能券",
                content: "匿名、标题变色、闪买、闪卖、置顶等会员专享功能",
                btn: "我的功能券",
              },
            ],
            Mymember: userType,
          });
        } else {
          _this.setState({
            isLoaded: false,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="mymember">
        {/* <Uheader utitle="会员信息"></Uheader> */}
        <header>
          <div className="header_home">
            <div className="header_left">
              <img
                src={
                  this.state.resultObject.portrait ||
                  "http://image.ybk008.com/2442e653c60be98c37a2945b6015e941571110502565"
                }
                className="userAvatar"
              />
              <ul>
                <li>
                  <h1>
                    {this.state.resultObject.nickName}
                    {this.state.Mymember ? (
                      <img src={require("../assets/medal.png")} alt="" />
                    ) : null}
                  </h1>
                  {this.state.Mymember ? (
                    <span className="Grand">累计充值金额</span>
                  ) : null}
                </li>
                <li>
                  <p>{this.state.resultObject.timeStr}</p>
                  {this.state.Mymember ? (
                    <p className="Amount">
                      ￥<span>{this.state.resultObject.price}</span>
                    </p>
                  ) : null}
                </li>
              </ul>
            </div>
          </div>
        </header>
        <main>
          <div className="Membership">
            <p className="Membership_title">会员优惠套餐</p>
            <ul>
              {this.state.Package.map((item, key) => (
                <li
                  key={key + 150}
                  className={this.state.tab == `tab-${key}` ? "active" : null}
                  onClick={() => this.Discoloration(item, key)}
                >
                  <p>{item.time}</p>
                  <p>
                    <span>{item.newQuantity}</span>
                    <span>{item.unit}</span>
                  </p>
                  <p>
                    {item.oldQuantity}
                    {item.unit}
                  </p>
                  {item.word ? (
                    <div className="beijing">{item.word}</div>
                  ) : null}
                </li>
              ))}
            </ul>
            <button onClick={() => this.MymemberClick()}>
              {this.state.Mymember ? "续费会员" : "开通会员"}
            </button>
          </div>
          {this.state.Mymember ? (
            <div className="grade">
              <p className="grade_title">会员等级</p>
              <footer>
              <ul>
                {this.state.footList.map((item, key) => (
                    <li key={key + 1000} className={Number(this.state.resultObject.userType)>=3? (this.state.resultObject.userType== key+2?"on_":null):null}>
                        <p>{item.Amount}</p>
                        <p>{item.grade}</p>
                        <p>{item.discount}</p>
                      </li>  
                ))}
              </ul>
              </footer>
            </div>
          ) : null}
          {this.state.Mymember ? (
            <div className="user_assets">
              <p className="user_assets_title">我的资产</p>
              <ul>
                {this.state.assets.map((item, key) => (
                  <li key={key + 11105}>
                    <div className="user_left">
                      <img src={item.img} alt="" />
                      <div>
                        <p>{item.title}</p>
                        <p>{item.content}</p>
                      </div>
                    </div>
                    <div className="user_right">
                      <button onClick={() => this.BuyGoldBean(item, key)}>
                        {item.btn}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="privilege">
            <p className="privilege_title">会员特权</p>
            <p className="privilege_content">
              充值会员即送海量功能券，购买金豆最高可享受：<span>6折</span>
            </p>
            <ul>
              {this.state.privilege.map((item, key) => (
                <li key={key + 100}>
                  <p>{item.time}</p>
                  <div>{item.content}</div>
                </li>
              ))}
            </ul>
          </div>
          <footer>
          <ul>
          {this.state.footList.map((item, key) => (
                    <li key={key + 100010}>
                        <p>{item.Amount}</p>
                        <p>{item.grade}</p>
                        <p>{item.discount}</p>
                      </li>  
                ))}
                </ul>
          </footer>
        </main>
        <div className="zhanwei"></div>
      </div>
    );
  }
}
export default member;
