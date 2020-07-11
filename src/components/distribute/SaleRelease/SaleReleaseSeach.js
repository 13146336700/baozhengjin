import React, { Component } from "react";
import Uheader from "../../Goolbal/Uheader";
import "../Global/index.scss";
import MyRight from "../Global/myRight";
export default class SaleReleaseSeach extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Tab: "tab-1",
      Contents: [
        { name: "泰山邮币卡" },
        { name: "目录11" },
        { name: "目录22" },
      ],
      detailed: [
        { name: "藏品目录333" },
        { name: "藏品目录11" },
        { name: "藏品目录222" },
      ],
      showElems: "none",
    };
  }
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
    open: true,
  };
  tabClick = (num) => {
    console.log(num);
    this.setState({
      Tab: `tab-${num}`,
    });
  };
  onOpenChange = (...args) => {
    console.log(args);
    this.setState({ open: !this.state.open });
  };
  mytable = (item) => {
    this.setState({
      showElems: "block",
    });
  };
  setSelfState = (val) => {
      console.log("123")
      console.log(val)
      this.setState({
        showElems: "none"
      })
  };
  render() {
    return (
      <div className="SaleReleaseSeach">
        <Uheader utitle="发布藏品搜索" {...this.props}></Uheader>
        {/* 
        右拉入
        */}
        {/* <div className="myRight" style={{ display: this.state.showElems }}>
      
        </div> */}
        <MyRight
            {...this.props}
            showElems={this.state.showElems}
            setParentState={this.setSelfState}
          ></MyRight>

        <div className="Useach">
          <div className="Useachhome">
            <img src={require("../../assets/usearch.png")} alt="" />
            <div className="hot_word">
              <input type="text" placeholder="输入要查找的名称" />
              <ul>
                <li>迪丽热巴123</li>
                <li>迪丽热巴456</li>
                <li>迪丽热巴789</li>
              </ul>
            </div>
          </div>
        </div>

        <ul className="tab_">
          <li
            className={this.state.Tab == "tab-1" ? "active" : null}
            onClick={() => this.tabClick(1)}
          >
            钱币
          </li>
          <li
            className={this.state.Tab == "tab-2" ? "active" : null}
            onClick={() => this.tabClick(2)}
          >
            邮票
          </li>
        </ul>
        <div className="Contents">
          <div className="Contents_title">热门藏品</div>
          <ul>
            {this.state.Contents.map((item, key) => (
              <li key={key + 5}>{item.name}</li>
            ))}
          </ul>
        </div>
        <div className="Contents">
          <div className="Contents_title">藏品目录</div>
          <ul>
            {this.state.detailed.map((item, key) => (
              <li key={key + 10} onClick={() => this.mytable(item)}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
