import React, { Component } from "react";
import "./Uheader.scss";
import {
	Link
} from "react-router-dom";
import axios from "../axios/index";

class Not_available extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      bool: false,
      days: '0',
      hours: '00',
      minutes: '00',
      seconds: '00',
    }
  };

  componentDidMount() {
    this.start()
  };
  async start() {
    console.log(this.props);
    this.timer && clearInterval(this.timer) // 先清除一遍定时器，避免被调用多次
    // 发起任意一个服务器请求， 然后从headers 里获取服务器时间
    // let leftTime = await axios.get('/').then(response => {
    //   // return new Date(this.props.date).getTime() - new Date(response.headers.date).getTime() // 服务器与倒计时的 时间差
    //   return new Datee).getTime() // 服务器与倒计时的 时间差
    // }).catch(error => {
    //   console.log(error)
    //   return 0 // 这里发送的服务器请求失败 设为0
    // })
    let _this = this;
    let leftTime = 0;
    console.log(this.props);
    axios
    .post("user/json/getPersonalBond", {
      userId:_this.props.userId
    })
    .then(function(response) {
      console.log(response.data.resultObject);
      if (response.data.code == 10000) {
        console.log(response.data);
        leftTime = response.data.resultObject.surplusTime;
      } else {

      }
    })



    // let leftTime = new Date().getTime();
    // let leftTime = this.props.surplusTime;
    // let leftTime = 276603591;
    // 倒计时
    this.timer = setInterval(() => {
      console.log(this);
      leftTime = leftTime - 1000
      let { bool, days = '0', hours = '00', minutes = '00', seconds = '00' } = this.countdown(leftTime)
      if (bool) { // 结束倒计时
        clearInterval(this.timer);
        if(!this.props.available){
          _this.props.history.push(`/band_paid/${_this.props.userId}`);
        }
      }
      this.setState({
        bool,
        days,
        hours,
        minutes,
        seconds
      })
    }, 1000)
  };

  

   /**
   * 倒计时
   * @param leftTime 要倒计时的时间戳
   */

  countdown(leftTime) {
	  console.log(leftTime);
    let bool = false;
    if (leftTime <= 0) {
      bool = true;
      return { bool };
    }
    var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
    var hours = parseInt((leftTime / 1000 / 60 / 60) % 24, 10);
    if (hours < 10) {
      hours = "0" + hours;
    }
    var minutes = parseInt((leftTime / 1000 / 60) % 60, 10);
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    var seconds = parseInt((leftTime / 1000) % 60, 10);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return { bool, days, hours, minutes, seconds };
  };
  componentDidUpdate(prevProps){
 console.log(prevProps);
 if(prevProps.surplusTime){

 }
  };
  componentWillUnmount() {
    // 卸载异步操作设置状态  销毁
    clearInterval(this.timer);
  };

  render() {
    let { bool, days, hours, minutes, seconds } = this.state
    return (
      <div className="Lift">
        <div>
          {
            this.props.Unable ?(
             <p>{this.props.Unable}</p>
            ):(
              <p>无法使用发布功能</p>
            )
          }
          {
            this.props.available?(
              <p className="p_two">{this.props.available}</p>
            ):(
              <p>
                <img src={require('../assets/cf_time_normal.png')}/>
                {/* 剩余<span>3</span>天 <span>12</span> 小时<span>23</span>分解除限制 */}
                剩余<span> {days}</span>天 <span> {hours}</span> 小时<span>{minutes}</span>分<span> {seconds}</span>秒解除限制
              </p>
            )
          }
         
        </div>
      </div>
    );
  }
}
export default Not_available;
