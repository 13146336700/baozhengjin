import React, { Component } from "react";
import "./Popup.scss";
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

class spotGoods extends React.Component {
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
	  document.title = '现货发货说明';
    return (
      // <div className="Futures Popup">
        <div className="Futures Popup_home">
          <nav className="Popup_content">
            <h2>现货发货说明</h2>
            <div className="protocol">
				商品下单之后必须48小时内发货，逾期未发货视为违约，违约方所缴纳的保证金将赔付给对方。 
            </div>
          </nav>
        </div>
      // </div>
    );
  }
}
export default spotGoods;
