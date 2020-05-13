import React, { Component } from "react";
import "./Violation.scss";
import Uheader from "../Goolbal/Uheader";
import { Link } from "react-router-dom";
import axios from "../axios/index";


class Violation extends React.Component {
  state = {
    isLoaded: false,
    error: "",
    users: "",
	dataList: [],
	list:[]
  };
  Jump = item => {
    console.log(item);
    // item.name = "123";

    this.setState({
      list: [
        {
          name: "123",
          time: "2019-12-10 12:12",
          status: "缴纳保证金"
        },
        {
          name: "违规类型",
          time: "2019-12-10 12:12",
          status: "缴纳保证金"
        }
      ]
    });

	console.log(this);
	// this.props.history.push(`/penaltiesDetails/${JSON.stringify(item)}`)
    this.props.history.push({
      pathname: `/penaltiesDetails`,
      query: {
        item: item
      }
    });
  };

  componentDidMount() {
    /* 
		 生命周期请求接口
		 */
    console.log(this);
    const _this = this; //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
    // axios.get('https://5b5e71c98e9f160014b88cc9.mockapi.io/api/v1/lists')
    axios.post("user/json/getBondRecord", {
        userId:_this.props.match.params.userId,
        pageSize: 100,
        pageIndex: 1
      })
      .then(function(response) {
        console.log(response.data.dataList);
        if (response.data.code == 10000) {
          _this.setState({
            dataList: response.data.resultObject.dataList,
            isLoaded: true
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
  };

  render() {
    // console.log(this.props.match.params.status);
    console.log(this.props.location);
    return (
      <div className="Violation_home">
        <div className="Record_img">
          <img src={require("../assets/jnjl_image.png")} />
        </div>
        <section className="ViolationList">
          <ul>
            <li> 违规类型 </li> <li> 时间 </li> <li> 处罚方式 </li>
          </ul>
          {this.state.dataList.map((item, key) => (
            <ul key={key + 5} onClick={() => this.Jump(item)}>
              <li> {item.ruleId} </li> <li> {item.createTime} </li>
              <li> {item.punishType} </li>
            </ul>
          ))}
        </section>
      </div>
    );
  }
}
export default Violation;
