import React, { Component } from "react";
import {
	Link
} from "react-router-dom";
import "./Umargin.scss";

// function Uname(props) {
//   console.log(props);
//   return (
//     <div className="Uname">
//       <div className="Uname_title">
//         <div className="Uname_names">
//           <span></span>
//           <span>{props.utitle}</span>
//         </div>
//         <div className="weigui">
//           <img src={require("../assets/bzj_ic_violation record.png")} />
//           <span>违规记录</span>
//         </div>
//       </div>
//       <div className="Uname_bottom">您违反了本平台保证金规则中1.1.1商品页面违规行为
// </div>
//     </div>
//   );
// }
// export default Uname;
// let props =
class Uname extends Component {
  Jumps = () =>{
    console.log(this);
    this.props.history.push(`/Violation/${this.props.match.params.userId}`);
  };
  render() {
    return (
      <div className="Uname">
        <div className="Uname_title">
          <div className="Uname_names">
            <span></span>
            <span>{this.props.utitles}</span>
          </div>
          {
            this.props.recording ?(
              <div className="weigui" onClick={this.Jumps}>
              <img src={require("../assets/bzj_ic_violation record.png")} />
              <span>违规记录</span>
            </div>
            ):null
          }

        </div>
        <div className="Uname_bottom">{this.props.ucontent}</div>
        {
          this.props.utimes ?(
            <div className="Times">处罚时间：{this.props.utimes}</div>
          ):null
        }
      </div>
    );
  }
}
export default Uname;
