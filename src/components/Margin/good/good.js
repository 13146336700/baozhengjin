import React, { Component } from "react";
import "./good.scss";
import Uheader from "../../Goolbal/Uheader";
import Umargin from "../../Goolbal/Umargin";
import Uname from "../../Goolbal/Uname";
import Not_available from "../../Goolbal/Not_available";
class good extends React.Component {
  render() {
    return (
      <div className="good">

        <Umargin uimgs="true" utitle="保证金" uname="信用良好，无需缴纳保证金" />
      </div>
    );
  }
}
export default good;
