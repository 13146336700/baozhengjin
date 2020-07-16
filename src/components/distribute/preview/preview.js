import React from "react";
import "../index/index.scss";
import Uheader from "../../Goolbal/Uheader";

export default class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      down: true,
      height: document.documentElement.clientHeight,
      data: [1, 1, 1, 1],
    };
  };
  componentWillMount() {
    console.log(this.props.history.location.state);
  };
  render() {
    return (
      <div className="mystock" style={{ background: "#ffffff" }}>
        <Uheader utitle="出售预览 号码预览" {...this.props}></Uheader>
        <ul className="listBox stocklistBox">
          {this.props.history.location.state.scatteredJson.map((item, index) => (
            <li className="list" key={index}>
              <div className="nameBox">
          <p className="number">123456</p>
                <p className="unit">
          {item.tag}&nbsp;&nbsp;共<span>{item.dealCnt}</span>{item.unitName}
                </p>
              </div>
          <span className="price">￥{item.dealPrice}元</span>
              <span className="deal">操作</span>
            </li>
          ))}
        </ul>
        {/* <div className="shade">
        <div className="cont">
          <p>
            <label htmlFor="">号码</label>
            <input type="text" disabled value="1234567896"/>
          </p>
          <p>
            <label htmlFor="">价格</label>
            <input type="text"/>
          </p>
          <button>标为售出</button>
        </div>
      </div> */}
      </div>
    );
  }
}
