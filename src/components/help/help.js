import React, { Component } from "react";
import Promotion from "./promotion";
import Member from "./member";
import "./help.scss";
export default class help extends React.Component {
  render() {
    return (
     <div className="Allhelp">
       {
       this.props.match.params.type == "member"||this.props.match.params.type == "1"?
       <Member/>:this.props.match.params.type == "promotion"||this.props.match.params.type == "2"?
      <Promotion {...this.props}></Promotion>:null
    }
     </div>

    )
  }
}
