import React, { Component } from "react";
import "./penaltiesDetails.scss";
import Umargin from "../../Goolbal/Umargin";
import Uname from "../../Goolbal/Uname";
import Popup from "../../Goolbal/Popup";
import Not_available from "../../Goolbal/Not_available";
class penaltiesDetails extends React.Component {
  render() {
    console.log(this.props.location.query.item);
    return (
      <div className="penaltiesDetails">
        {/* <Popup/> */}
        <div className="penaltiesDetails_home">
          <p className="penaltiesDetails_home_time">处罚时间：{this.props.location.query.item.createTime}</p>
          <Uname
            utitles="违规原因"
            ucontent={this.props.location.query.item.payReason}
          />
          <Uname
            utitles="处罚方式"
            ucontent={this.props.location.query.item.punishType}
          />
          <Uname
            utitles="功能限制"
            ucontent={this.props.location.query.item.limitFunction}
          />
        </div>
      </div>
    );
  }
}
export default penaltiesDetails;
