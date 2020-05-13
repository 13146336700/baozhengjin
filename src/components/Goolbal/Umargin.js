import React, { Component } from "react";
import "./Umargin.scss";

// function Uheaders(props) {
//   console.log(props);
//   return (
//     <div className="Umargin">
//       <div className="Umargin_left">
//         <img src={require("../assets/cf_ic_bond.png")} />
//         <span>23458</span>
//       </div>
//       <div className="Umargin_right">
//         <p>
//           已缴纳<span>40</span>元
//         </p>

//         <p>
//           待缴纳<span>400</span>元
//         </p>
//       </div>
//     </div>
//   );
// }
// export default Uheaders;

class Uheaders extends React.Component {
  render() {
    return (
      <div className="Umargin">
        <div className="Umargin_zhanwei"></div>
        <div className="Umargin_left">
          {this.props.uimgs ? (
            <img src={require("../assets/bzj_ic_xinyonglianghao.png")} />
          ) : (
            <img src={require("../assets/cf_ic_bond.png")} />
          )}
          {this.props.Remaining ? <span>{this.props.Remaining}</span> : null}
        </div>
        <div className="Umargin_right">
          {this.props.already ? (
            <p>
              已缴纳<span>{this.props.already}</span>元
            </p>
          ) : null}
          {this.props.payment ? (
            <p>
              待缴纳<span>{this.props.payment}</span>元
            </p>
          ) : null}
          {this.props.uname ? <p>{this.props.uname}</p> : null}
        </div>
      </div>
    );
  }
}
export default Uheaders;
