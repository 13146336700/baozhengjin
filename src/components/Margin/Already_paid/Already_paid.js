import React, { Component } from "react";
import "./Already_paid.scss";
import Umargin from "../../Goolbal/Umargin";
import Uname from "../../Goolbal/Uname";
import Not_available from "../../Goolbal/Not_available";
import axios from "../../axios/index";
import Customer from "../../Goolbal/Customer";
class Already_paid extends React.Component {
  state = {
    resultObject: {},
    limitFunctionStr: "",
  };
  limit = (item) => {
    //  proxy/代理人，publish/发布，deal/交易，activity/活动，login/登录，,all/全部
    switch (item) {
      case "proxy":
        return "代理人";
        break;
      case "publish":
        return "发布";
        break;
      case "deal":
        return "交易";
        break;
      case "activity":
        return "活动";
        break;
      case "login":
        return "登录";
        break;
      case "all":
        return "全部";
        break;
      default:
        return "- -";
    }
  };
  Androidreturn = () => {
    return true;
  };
  componentDidMount() {
    /* 
		 生命周期请求接口
		 */
    const _this = this; //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
    // axios.get('https://5b5e71c98e9f160014b88cc9.mockapi.io/api/v1/lists')
    if (_this.props.match.params.userId) {
      axios
        .post("user/json/getPersonalBond", {
          userId: _this.props.match.params.userId,
        })
        .then(function (response) {
          console.log(response.data.resultObject);
          if (response.data.code == 10000) {
            _this.setState({
              resultObject: response.data.resultObject,
              isLoaded: true,
            });
            // debugger;
            var str = "";
            response.data.resultObject.limitFunction.map((item) => {
              str += _this.limit(item) + ",";
            });
            _this.setState({
              limitFunctionStr: str.substr(0,str.length-1),
            });
          } else {
            _this.setState({
              isLoaded: false,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
          _this.setState({
            isLoaded: false,
            error: error,
          });
        });
    }
  }
  render() {
    const { history, match } = this.props;
    return (
      <div className="Already_paid">
        <div className="Already_paid_zhanwei"> </div>{" "}
        <Umargin
          already={this.state.resultObject.totalPunishBalance}
          Remaining={this.state.resultObject.bondBalance}
        />
        <div className="Already_paid_home">
       
          <Not_available Unable={`无法使用${this.state.limitFunctionStr}功能`} available="已提前解除限制" />
          <Uname
            utitles="违规原因"
            ucontent={this.state.resultObject.punishReason}
            history={history}
            match={match}
            recording="true"
          />
          <Uname
            utitles="功能限制"
            ucontent={`无法使用${this.state.limitFunctionStr}功能`}
          />{" "}
          <Uname
            utitles="保证金缴纳原因"
            ucontent="如需提前解除功能限制，需缴纳2000元保证金作为信用保证，如再次违规则从中扣除相应金额作为处罚"
          />
        </div>{" "}
        <Customer />
      </div>
    );
  }
}
export default Already_paid;
