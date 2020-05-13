import React, { Component } from "react";
import "./Pay_band.scss";
import Umargin from "../../Goolbal/Umargin";
import Uname from "../../Goolbal/Uname";
import Customer from "../../Goolbal/Customer";
import Not_available from "../../Goolbal/Not_available";
import Popup from "../../Goolbal/Popup";
import axios from "../../axios/index";

class Pay_band extends React.Component {
  state = {
    resultObject: {},
    isLoaded: false,
    limitFunctionStr: ""
  };
  limit = item => {
    console.log(item);
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

  Pay_deposit = () => {
    this.refs.Customer_Show.dream("true"); //调用子组件的dream方法
    // this.props.
    // this.props.history.push("/Violation");
  };

  componentDidMount() {
    /* 
		 生命周期请求接口
		 */
    const _this = this; //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
    // axios.get('https://5b5e71c98e9f160014b88cc9.mockapi.io/api/v1/lists')
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

    console.log("我汇之星");
  }
  render() {
    const { history,match } = this.props;
    console.log(this.props);
    return (
      <div className="Pay_band">
        <div className="Pay_band_zhnwei"></div>
        {/* <Umargin already="40" Remaining="2345" payment="10" /> */}
        <Umargin
          already={this.state.resultObject.totalPunishBalance}
          Remaining={this.state.resultObject.bondBalance}
          payment={this.state.resultObject.punishBalance}
        />
        <div className="Pay_band_home">
          {/* <Not_available Unable="无法使用发布、交易、申请代理人、活动功能" /> */}
          <Not_available
            Unable={`无法使用${this.state.limitFunctionStr}功能`}
            surplusTime={this.state.resultObject.surplusTime}
            userId={this.props.match.params.userId}
            history = {history}
            match = {match}
          />
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
          />

          <Uname
            utitles="保证金缴纳原因"
            ucontent={this.state.resultObject.payReason}
          />
        </div>
        <button className="Pay_band_btn" onClick={this.Pay_deposit}>
          缴纳保证金
        </button>
        <Customer></Customer>
        <Popup
          ref="Customer_Show"
          punishBalance={this.state.resultObject.punishBalance}
        />
      </div>
    );
  }
}
export default Pay_band;
