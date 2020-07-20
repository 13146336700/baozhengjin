import React, { Component } from "react";
import { Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
import "./index.scss";
export default class LooseSale extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   selectValue:'startup'
    // };
  }
  state = {
    LooseArr: [
      {
        number: "", //号码
        dealPrice: "", //单价
      },
    ],
  };
  componentDidMount() {
    // funcitonName 是原生回调使用的方法名
    // window["ActivityVerificationDownload"] = this.ActivityVerificationDownload;
    if (sessionStorage.getItem("SANZNANG_ARR")) {
      //有值 回显
      this.setState({
        LooseArr: JSON.parse(sessionStorage.getItem("SANZNANG_ARR")),
      });
    }
  }
  getUrlParam = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = this.props.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    }
    return ""; //如果此处只写return;则返回的是undefined
  };
  setBuyingNumber = (ischeck) => {
    if (
      ischeck.length < 3 ||
      ischeck.length > 20 ||
      /[\u4E00-\u9FA5]/i.test(ischeck)
    ) {
      return false;
    } else {
      return true;
    }
  };
  add() {
    var priceReg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
    let LooseObj = this.state.LooseArr[this.state.LooseArr.length - 1];
    for (let key in LooseObj) {
      if (!LooseObj[key]) {
        Toast.info("请输入完整的散张出售信息", 2);
        return;
      }
    }
    if (!priceReg.test(LooseObj.dealPrice) || Number(LooseObj.dealPrice) <= 0) {
      Toast.info("请输入散张出售正确的单价", 2);
      return;
    }
    if (!this.setBuyingNumber(LooseObj.number)) {
      Toast.info("请输入散张出售正确出售号码", 2);
      return;
    }
    // }

    let LooseArr = this.state.LooseArr;
    LooseArr.push({
      number: "",
      dealPrice: "",
    });
    this.setState({
      LooseArr: LooseArr,
    });
  };

  hanChange = (ev, index) => {
    console.log(ev.target.value);
    const LooseArr = [...this.state.LooseArr]; //浅拷贝一下

    LooseArr.map((item, key) => {
      if (key == index) {
        item.dealPrice = ev.target.value;
      }
    });
    this.setState({
      LooseArr: LooseArr,
    });
    // this.setState({
    //   LooseArr: LooseArr.map((item, key) =>
    //     key == index ? { ...item, dealPrice: ev.target.value } : item
    //   ),
    // });
    sessionStorage.setItem("SANZNANG_ARR", JSON.stringify(LooseArr));
  };
  hanNumChange = (ev, index) => {
    console.log(ev.target.value);
    const LooseArr = [...this.state.LooseArr]; //浅拷贝一下
    LooseArr.map((item, key) => {
      if (key == index) {
        item.number = ev.target.value;
      }
    });
    this.setState({
      LooseArr: LooseArr,
    });
    // this.setState({
    //   LooseArr: LooseArr.map((item, key) =>
    //     key == index ? { ...item, number: ev.target.value } : item
    //   ),
    // });
    sessionStorage.setItem("SANZNANG_ARR", JSON.stringify(LooseArr));
  };
  delte = (item, key) => {
    var LooseArr = [...this.state.LooseArr];
    //删除元素
    LooseArr.splice(key, 1);
    this.setState({
      LooseArr: LooseArr,
    });
    sessionStorage.setItem("SANZNANG_ARR", JSON.stringify(LooseArr));
  };
  render() {
    return (
      <div className="Loose">
        <div className="Loose_title">{/* <p> {this.props.uname} </p> */}</div>
        <div className="Loose_body">
          {this.state.LooseArr.map((item, key) => (
            <ul key={key}>
              <div className="title_num_del">
                <div className="sanlain">
                  <span> </span> <span> 散张 {key + 1} </span>
                </div>
                {key > 0 ? (
                  <div onClick={() => this.delte(item, key)} className="deltes">
                    <img src={require("../../assets/delete.png")} alt="" />
                  </div>
                ) : null}
              </div>
              <li>
                <div> 出售号码 </div>
                <input
                  value={item.number}
                  type="text"
                  pattern="\d"
                  onChange={(ev) => this.hanNumChange(ev, key)}
                  placeholder="请输入出售的号码"
                />
              </li>
              <li>
                <div> 单价（ 元 / {this.getUrlParam("unitName")?this.getUrlParam("unitName"):'张'}） </div>
                <input
                  type="tel"
                  value={item.dealPrice}
                  onChange={(ev) => this.hanChange(ev, key)}
                  placeholder="请输入单张价格"
                />
              </li>
            </ul>
          ))}
          <button className="add" onClick={() => this.add()}>
            <img src={require("../../assets/looseadd.png")} alt="增加一条" />
            增加一条
          </button>
        </div>
      </div>
    );
  }
}
