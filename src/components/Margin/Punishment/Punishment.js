import React, { Component } from "react";
import "./Punishment.scss";
import Umargin from "../../Goolbal/Umargin";
import Uname from "../../Goolbal/Uname";
import axios from "../../axios/index";
import Customer from "../../Goolbal/Customer";
class Punishment extends React.Component {
  state = {
    resultObject: {},
    limitFunctionStr: ""
  };
  componentDidMount() {
    /* 
		 生命周期请求接口
		 */
    const _this = this; //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
    axios
      .post("user/json/getPersonalBond", {
         userId:_this.props.match.params.userId
      })
      .then(function(response) {
        console.log(response.data.resultObject);
        if (response.data.code == 10000) {
          _this.setState({
            resultObject: response.data.resultObject,
            isLoaded: true
          });
          var str = "";
          response.data.resultObject.limitFunction.map(item => {
            str += _this.limit(item);
            _this.setState({
              limitFunctionStr: str
            });
          });
        } else {
          _this.setState({
            isLoaded: false
          });
        }
      })
      .catch(function(error) {
        console.log(error);
        _this.setState({
          isLoaded: false,
          error: error
        });
      });
  }

  render() {
    const { history,match } = this.props;
    return (
      <div className="Punishment_home">
        <div className="Punishment_home_zhanwei"></div>
        <Umargin
          already={this.state.resultObject.totalPunishBalance}
          Remaining={this.state.resultObject.bondBalance}
        />
        <Uname
          utitles="违规原因"
          ucontent={this.state.resultObject.punishReason}
          history={history}
          match={match}
          recording="true"
        />
        <div className="Amount">
          <div className="Amount_img">
            <div className="Amount_img_right">
              <p>处罚金额</p>
              <p>
                已扣除 <span>{this.state.resultObject.punishBalance}</span>元
              </p>
            </div>
          </div>
          <Uname
            utitles="处罚原因"
            ucontent={this.state.resultObject.payReason}
            utimes={this.state.resultObject.punishTime}
          />
        </div>

        <Customer/>
      </div>
    );
  }
}
export default Punishment;
