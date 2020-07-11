import React, { Component } from "react";
import "./index.scss";
export default class Loose extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showElem: "none",
      dotolist: [{ name: "123" }, { name: "456" }, { name: "789" }],
    };
    this.selectChange = this.selectChange.bind(this);
  }
  state = {};
  componentWillMount() {
    console.log(this.props);
  }
  selectChange = (ev) => {};
  changeDOM = (value = "startup") => {
    //DOM改变
  };
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    // this.setState({

    //     role: nextProps.OPT_ROLE_CODE
    // })
  }
  cancel = () => {
    this.props.setParentState();
  };
  chuandi = () => {
    // this.props.parent.getChildrenMsg(this,item);
    console.log("123")
  };
  render() {
    return (
      <div className={
        this.props.showElems == "none"
          ? "transformRightHomeNone transformRightHome"
          : "transformRightHomeRight transformRightHome"
      }>
          <div className="mask" style={{display:this.props.showElems}}></div>
        <div
          className={
            this.props.showElems == "none"
              ? "u_right myRightHome"
              : "u_left myRightHome"
          }
        >
          <div className="myRightHome_title">
            <span>纪念币</span>
            <button onClick={() => this.cancel()}>取消</button>
          </div>
          <ul>
            {this.state.dotolist.map((item, key) => (
              <li key={key + 50}  onClick={() => this.chuandi()}>{item.name}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
