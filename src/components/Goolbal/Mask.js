import React, { Component } from "react";
import "./Mask.scss";
export default class Mask extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className="Mask">
      {this.props.children}
      </div>;
  }
}
