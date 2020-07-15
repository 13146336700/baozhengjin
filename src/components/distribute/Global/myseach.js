import React, { Component } from "react";
import { List, Switch } from "antd-mobile";
import "./index.scss";
export default class myseach extends React.Component {
  state = {
    list: [
      {
        isCheck: true,
        name: "担保交易",
        dealPattern:'2',
      },
      {
        isCheck: false,
        name: "线下交易",
        dealPattern:'3',
      },
    ],
    checked: false,
    name: "", //文本框输入值
  };
  componentWillMount() {
    if (this.getUrlParam("name")) {
      this.setState({
        name: this.getUrlParam("name"),
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
  hanInput = (ev) => {
    console.log(ev);
    console.log(ev.targe.value);
  };
  Jump = () => {
    let goodsId = "";
    if (this.getUrlParam("goodsId")) {
      goodsId = this.getUrlParam("goodsId");
    } else {
      goodsId = "";
    }
    // _this.props.history.push("/good");
    // this.props.history.push(`/SaleReleaseSeach/${this.props.ustate}/${this.getUrlParam('url')}`);
    this.props.history.push({
      pathname:`/SaleReleaseSeach/${this.props.ustate}`,
      search: `url=${this.getUrlParam('url')}&goodsId=${goodsId}`,
    });
  };
  render() {
    // const { getFieldProps } = this.props.form;
    return (
      <div className="myseach">
        <div className="Useach" onClick={() => this.Jump()}>
          <img src={require("../../assets/usearch.png")} alt="" />
          <input
            type="text"
            value={this.state.name}
            onChange={(ev) => this.hanInput(ev)}
            placeholder="点击查找确认要发布的配好品类"
          />
        </div>
        <div className="transaction">
          {this.state.list.map((item, key, arr) => (
            <div
              className="way"
              key={key + 10}
              onClick={() => {
                const newlist = [...arr]; //浅拷贝一下
                this.setState({
                  list: newlist.map((item1, index) =>
                    index == key
                      ? { ...item1, isCheck: !item.isCheck }
                      : { ...item1, isCheck: false }
                  ),
                });
              }}
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
          </div>
        </div>
      </div>
    );
  }
}
