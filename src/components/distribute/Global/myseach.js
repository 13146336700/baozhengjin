import React, { Component } from "react";
import { List, Switch } from "antd-mobile";
import "./index.scss";
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

export default class myseach extends React.Component {
  state = {
    list: [
      {
        isCheck: true,
        name: "担保交易",
        dealPattern: "2",
      },
      {
        isCheck: false,
        name: "线下交易",
        dealPattern: "3",
      },
    ],
    checked: false,
    name: "", //文本框输入值
    dealPattern: "", // 2担保 3线下
  };
  componentDidMount() {
    if (sessionStorage.getItem("newlistARR")) {
      //有值 回显
      this.setState({
        list: JSON.parse(sessionStorage.getItem("newlistARR")),
      });
    }
  }
  componentWillMount() {
    if (this.getUrlParam("name")) {
      this.setState({
        name: this.getUrlParam("name"),
      });
    }
    if (this.getUrlParam("checked")) {
      let checked;
      if (this.getUrlParam("checked") == "true") {
        checked = true;
      } else {
        checked = false;
      }
      this.setState({
        checked: checked,
      });
    }
  }
  getUrlParam = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = this.props.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    }
    return ""; //如果此处只写return;则返回的是undefined
  };
  setParent = (item, key) => {
    //点击查询按钮，将值传给父组件
    this.props.setKeyWorld(item.name);
    console.log(this.props);

    let newlist = [...this.state.list]; //浅拷贝一下
    // this.setState({
    //   list: newlist.map((item1, index) =>{
    //     console.log(item1)
    //     if(item1.isCheck == true){
    //       item1.isCheck = true;
    //     }else{
    //       item1.isCheck = false;
    //     }
    //   }),
    // });
    newlist.map((item1, index) => {
      if (item1.isCheck == true) {
        item1.isCheck = false;
      } else {
        item1.isCheck = true;
      }
    });
    //  var objes = newlist.find((item)=>{
    //    return item.isCheck = true;
    //  })

    this.setState({ list: newlist });
    sessionStorage.setItem("newlistARR", JSON.stringify(newlist));
    // this.setState({
    //   list: newlist.map((item1, index) =>
    //     index == key
    //       ? { ...item1, isCheck: !item.isCheck }
    //       : { ...item1, isCheck: false }
    //   ),
    // });
  };
  hanInput = (ev) => {
    console.log(ev);
    console.log(ev.targe.value);
  };

  NewQuotes = () => {
    let market = JSON.parse(sessionStorage.getItem("market"));
    console.log(market);
    if (isiOS) {
      try {
        window.webkit.messageHandlers.IOSNativeMarket.postMessage({
          oid: market.sid,
          code: market.code,
          tag: market.tag,
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        window.app.androidNativeMarket(
          JSON.stringify({
            oid: market.sid,
            code: market.code,
            tag: market.tag,
          })
        );
      } catch (e) {
        console.log(e);
      }
    }
  };
  Jump = (num) => {
    let goodsId = "";
    let _this = this;
    if (this.getUrlParam("goodsId")) {
      goodsId = this.getUrlParam("goodsId");
    } else {
      goodsId = "";
    }
    // _this.props.history.push("/good");
    // this.props.history.push(`/SaleReleaseSeach/${this.props.ustate}/${this.getUrlParam('url')}`);
    if (num == 1) {
      this.props.history.push({
        pathname: `/SaleReleaseSeach/${this.props.ustate}`,
        search: `url=${this.getUrlParam("url")}&goodsId=${goodsId}&checked=${
          this.state.checked
        }`,
      });
    } else {
      let marketFrom = {
        url: this.getUrlParam("url"),
        market: _this.props.ustate,
      };
      sessionStorage.setItem("marketFrom", JSON.stringify(marketFrom));
      this.props.history.push({
        pathname: `/catalogue`,
      });
    }
  };
  render() {
    // const { getFieldProps } = this.props.form;
    return (
      <div className="myseach">
        <div className="Useach_homes">
          <span>藏品名称:</span>
          <div className="Useach" onClick={() => this.Jump("1")}>
            {this.props.ustate == "BuyingRelease" ? (
              <img src={require("../../assets/mai.png")} alt="" />
            ) : (
              <img src={require("../../assets/mai_.png")} alt="" />
            )}
            <input
              type="text"
              value={this.state.name}
              onChange={(ev) => this.hanInput(ev)}
              placeholder="点击确认名称"
            />
          </div>
          <div className="Contents" onClick={() => this.Jump("2")}>
            前往目录选择
          </div>
        </div>

        <div className="transaction">
          {this.state.list.map((item, key, arr) => (
            <div
              className="way"
              key={key + 10}
              onClick={() => this.setParent(item, key)}
            >
              {item.isCheck ? (
                <img src={require("../../assets/Selected.png")} alt="" />
              ) : (
                <img src={require("../../assets/Unselected.png")} alt="" />
              )}
              <span> {item.name} </span>
            </div>
          ))}
          <div className="mySwitch">
            {this.props.ustate == "BuyingRelease" ? (
              <List.Item
                extra={
                  <Switch
                    color="#EB3318"
                    checked={this.state.checked}
                    onChange={() => {
                      this.setState({
                        checked: !this.state.checked,
                      });
                    }}
                  />
                }
              >
                包邮
              </List.Item>
            ) : null}
          </div>
          {sessionStorage.getItem("market") ? (
            <div className="Latest" onClick={() => this.NewQuotes()}>
              最新市场行情
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
