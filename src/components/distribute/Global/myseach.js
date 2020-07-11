import React, { Component } from "react";
import { List, Switch } from "antd-mobile";
import "./index.scss";
export default class myseach extends React.Component {
  state = {
    list: [
      {
        isCheck: true,
        name: "担保交易",
      },
      {
        isCheck: false,
        name: "线下交易",
      },
    ],
    checked: false,
  };
  Jump = () => {
    // _this.props.history.push("/good");

    this.props.history.push("/SaleReleaseSeach");
  };
  render() {
    // const { getFieldProps } = this.props.form;
    return (
      <div className="myseach">
        <div className="Useach" onClick={() => this.Jump()}>
          <img src={require("../../assets/usearch.png")} alt="" />
          <input type="text" placeholder="点击查找确认要发布的配好品类" />
        </div>
        <div className="transaction">
          
          {this.state.list.map((item, key) => (
            <div className="way" key={key + 10}>
              
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
