import React, { Component } from "react";
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

export default class Uheaders extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   selectValue:'startup'
    // };
    this.backClick = this.backClick.bind(this);
  }
  componentWillMount() {

  };
  static defaultProps = {
    useach: false,
  };
  backClick = ()=>{
    console.log(this.props)
  
    if(this.props.match.path == "/SaleRelease"){
      if (isiOS) {
        try {
          window.webkit.messageHandlers.IOSNativeGotoBack.postMessage("");
          // window.webkit.messageHandlers.IOSNativePayBond.postMessage(50);
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          window.app.androidNativeGotoBack ("");
        } catch (e) {
          console.log(e);
        }
      }
    }else{
      this.props.history.go(-1);
    }
  };
  render() {
    return (
      <div className="Uheaders">
        <div className="Uheadershome">
          <ul className={isiOS ? "iosHeader" : null}>
            <li onClick={()=>this.backClick()}>
              <img src={require("../assets/Goreturn.png")} />
            </li>
            <li>{this.props.utitle}</li>
            <li>
              {this.props.useach ? (
                <img src={require("../assets/seach.png")} />
              ) : null}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
