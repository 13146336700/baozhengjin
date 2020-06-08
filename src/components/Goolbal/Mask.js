import React, { Component } from "react";
import "./Mask.scss";
export default class Mask extends React.Component {
  constructor(props) {
    super(props);
  };
  componentDidMount() {
    
  }
  render() {
    return (
      <div className="iosView Mask">
        {this.props.children}
      </div>
    );
  }
}
