import React, { Component } from "react";
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
// import {
//   Toast} from "antd-mobile";

export default class Uheaders extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   selectValue:'startup'
    // };
    this.backClick = this.backClick.bind(this);
  };
  componentDidMount() {
    // funcitonName 是原生回调使用的方法名
    window["androidPhysicalBack"] = this.backClick;
  }
  componentWillMount() {

    console.log(this.props);
    if (this.props.match.path == "/goodsDistribute") {
      sessionStorage.setItem(
        `${this.props.match.path}Url`,
        this.props.location.search
      );
      // sessionStorage.setItem("/goodsDistributeUrl", this.props.location.search);
    } else if (this.props.match.path == "/distribute") {
      sessionStorage.setItem(
        `${this.props.match.path}Url`,
        this.props.location.search
      );
    }
    let _this = this;

  }
  static defaultProps = {
    useach: false,
  };
  getUrlParam = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = this.props.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    }
    return ""; //如果此处只写return;则返回的是undefined
  };
  Jonp = () => {
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (!userInfo || userInfo.userId === "") {
      if (isiOS) {
        window.webkit.messageHandlers.IOSNativeLogin.postMessage("");
      } else {
        window.app.login();
      }
      return false;
    }
    if (
      this.props.match.path == "/goodsDistribute" ||
      this.props.match.path == "/distribute"
    ) {
      let url;
      if (this.props.match.path == "/goodsDistribute") {
        url = "goodsDistribute";
      } else if (this.props.match.path == "/distribute") {
        url = "distribute";
      }
      console.log(`${this.props.match.path}Url`);
      sessionStorage.setItem(
        `${this.props.match.path}Url`,
        this.props.location.search
      );
      this.props.history.push(
        `/searchNumber?name=${this.getUrlParam(
          "name"
        )}&unitName=${this.getUrlParam(
          "unitName"
        )}&categoryName=${this.getUrlParam("categoryName")}&url=${url}`
      );
    } else {
      this.props.history.push(`/searchNumber`);
    }
  };
  backClick = () => {
    console.log(this.props);
    if (
      this.props.match.path == "/distribute" ||
      this.props.match.path == "/myDistribute"
    ) {
      if (isiOS) {
        try {
          window.webkit.messageHandlers.IOSNativeGotoBack.postMessage("");
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          window.app.androidNativeGotoBack();
        } catch (e) {
          console.log(e);
        }
      }

      //删除缓存数据
      sessionStorage.removeItem("SANZNANG_ARR");
      sessionStorage.removeItem("BIAOLIAN_ARR");
      sessionStorage.removeItem("SANLIAN_ARR");
      sessionStorage.removeItem("SANZHANG_ARR");
      sessionStorage.removeItem("BIAOLIAN_Ontable");
      sessionStorage.removeItem("market");
      sessionStorage.removeItem("newlistARR");
      sessionStorage.removeItem("checked");
    } else if (
      this.props.match.path == "/SaleRelease" ||
      this.props.match.path == "/BuyingRelease"
    ) {
      //发布页面
      let urls = sessionStorage.getItem(`/${this.getUrlParam("url")}Url`);
      console.log(urls);
      //因为有搜索 返回会回到搜索页面 所以单独处理
      if (this.getUrlParam("goodsId")) {
        //商品进入
        this.props.history.go(-1);
        return false;
      }
      if (this.getUrlParam("url")) {
        this.props.history.push(`${this.getUrlParam("url")}${urls}`);
      }
    } else if (this.props.match.path == "/searchNumber") {
      //配号搜索页面
      let urls = sessionStorage.getItem(`/${this.getUrlParam("url")}Url`);
      console.log(urls);
      this.props.history.push(`/${this.getUrlParam("url")}${urls}`);
    } else if (this.props.match.path == "/goodsDistribute") {
      //返回APP
      if (this.getUrlParam("appInfo")) {
        if (isiOS) {
          try {
            window.webkit.messageHandlers.IOSNativeGotoBack.postMessage("");
          } catch (e) {
            console.log(e);
          }
        } else {
          try {
            window.app.androidNativeGotoBack();
          } catch (e) {
            console.log(e);
          }
        }
        return false;
      }
      //首页 列表
      this.props.history.push(
        `/distribute?userId=${
          JSON.parse(sessionStorage.getItem("userInfo")).userId
        }&userType=${JSON.parse(sessionStorage.getItem("userInfo")).userType}`
      );
    } else if (this.props.match.path == "/myStock") {
      sessionStorage.removeItem("BIAOLIAN_Ontable");
      sessionStorage.removeItem("market");

      this.props.history.push(
        `/myDistribute?userId=${
          JSON.parse(sessionStorage.getItem("userInfo")).userId
        }`
      );
    } else if (this.props.match.path == "/SaleDetails") {
      if (sessionStorage.getItem("ReturnGo") == "1") {
        this.props.history.go(-1);
      } else {
        this.props.history.go(-2);
      }
    } else {
      this.props.history.go(-1);
    }
  };
  render() {
    return (
      <div className={isiOS ? "Uheaders IOSUheaders" : "Uheaders"}>
        <div className="Uheadershome">
          <ul className={isiOS ? "iosHeader" : null}>
            <li onClick={() => this.backClick()}>
              <img src={require("../assets/Goreturn.png")} /> 
            </li> 
            <li> {this.props.utitle} </li> 
            <li>
               
              {this.props.useach ? (
                <div onClick={() => this.Jonp()}>
                  <img src={require("../assets/distrsearch.png")} />
                  搜索 
                </div>
              ) : null} 
              {this.props.isBatch === 'delete' ? (
                <div onClick={() => this.props.batchDelete()}>
                  批量编辑 
                </div>
              ) : this.props.isBatch === 'cancel' ? (
                <div onClick={() => this.props.deleteCancel()}>
                  取消 
                </div>
              ) :null}
            </li> 
          </ul> 
        </div> 
      </div>
    );
  }
}
