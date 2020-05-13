import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Uheader.scss";
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
// function Customer(props) {
//   return (
//     <div className="Customer" onClick={this.Customer_service}>联系客服</div>
//   );
// }
// export default Customer;
class Customer extends React.Component {
  Customer_service = () => {

    // if (isAndroid) {
    //   try {
    //     app.callPhone("");
    //   } catch (e) {
    //     //TODO handle the exception
    //     console.log(e);
    //   }
    // }
    if (isiOS) {
      try {
        window.webkit.messageHandlers.IOSNativePhone.postMessage("");
      } catch (e) {
        //TODO handle the exception
        console.log(e);
      }
    }else{
     
      try {
            // window.app.callPhone();
            window.app.callPhone();
          } catch (e) {
            //TODO handle the exception
            console.log(e);
          }
    }
  };
  render() {
    return (
      <div className="Customer" onClick={this.Customer_service}>
        联系客服
      </div>
    );
  }
}
export default Customer;
