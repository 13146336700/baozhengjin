import React, { Component } from "react";
import "./Popup.scss";
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

class Futures extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  state = {
    Show: "none"
  };
  dream = dat => {
    console.log("111", dat);
    this.setState({
      Show: "block"
    });
  };
  Hide = () => {
    this.setState({
      Show: "none"
    });
  };

  render() {
	  document.title = '期货发货说明';
    return (
      // <div className="Futures Popup">
        <div className="Futures Popup_home">
          <nav className="Popup_content">
            <h2>期货发货说明</h2>
            <div className="protocol">
				交易方在最晚发货时间前48小时之内下单，发货最晚时间为规定最晚发货时间。在最晚发货时间前48小时之外下单的，最晚发货时间为下单时间加48小时。
            </div>
			<div className="protocol">
				例如：发帖人设置最晚发货时间为2021-01-20号，交易人去交易下单时间在2021-01-18号之前下单的，最晚发货时间就是2021-01-20号，如果交易人去交易下单时间在2021-01-18号之后下单的，那么最晚发货时间就是下单时间再加48小时。超过最晚发货时间的视为违约，违约方所缴纳的保证金将赔付给对方。
			</div>
          </nav>
        </div>
      // </div>
    );
  }
}
export default Futures;
