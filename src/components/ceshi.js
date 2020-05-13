import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ceshi.scss";

import Uheader from "./Goolbal/Uheader";

class App1 extends React.Component {
  state = {
    myArr: [
      { name: "小强", id: 1 },
      { name: "小红", id: 2 },
      { name: "小王", id: 3 },
      { name: "小王", id: "6" }
    ],
    time: 60,
     tabs: "tab-1"
  };
  daishan = () => {
    this.Interval = setInterval(() => {
      this.state.time--;
      this.setState({ time: this.state.time });
      if (this.state.time == 0 || this.state.time < 0) {
        clearInterval(this.Interval);
      }
    }, 1000);
  };
  hanChange = ev => {
    console.log(ev.target.value);
  };
  componentWillUnmount() {
    clearInterval(this.Interval);
    
  }
  tab = num => {
    console.log(num);
    this.setState({
      tabs: `tab-${num}`
    });

  };
  componentDidMount() {
    this.daishan();
  }
  render() {
    return (
      <div className="App123">
        <Uheader utitle="保证金缴纳详情" subtitle="" />
        <Link to="/rule">测试跳转</Link>
        <span>我来60秒倒计时{this.state.time}</span>
        <input type="text" onChange={ev => this.hanChange(ev)} />
        <ul className="ul_tab">
          <li
            onClick={() => this.tab(1)}
            className={this.state.tabs == "tab-1" ? "active" : ""}
          >
            tabs1
          </li>
          <li
            onClick={() => this.tab(2)}
            className={this.state.tabs == "tab-2" ? "active" : ""}
          >
            tab2    
          </li>
          <li
            onClick={() => this.tab(3)}
            className={this.state.tabs == "tab-3" ? "active" : ""}
          >
            tab3
          </li>
        </ul>
        <div style={{ display: this.state.tabs == "tab-1" ? "block" : "none" }}>
          1111
        </div>
        <div style={{ display: this.state.tabs == "tab-2" ? "block" : "none" }}>
          222
        </div>
        <input type="text" />
      </div>
    );
  }
}
export default App1;
