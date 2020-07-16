import React from "react";
import "../index/index.scss";
import axios from "../../axios/index";
import Uheader from "../../Goolbal/Uheader";
import { Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";

export default class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      down: true,
      height: document.documentElement.clientHeight,
      data: [1, 1, 1, 1],
      scatteredJson: [],
      otherConsecutiveJson: [],
      standardConsecutiveJson: [],
    };
  }
  state = {
    showShadeFlag: false, //修改弹窗显示
    number: "",
    mynum: "",
    myindex: "",
    dealPrice: "",
  };
  componentWillMount() {
    let son = this.props.history.location.state;
    console.log(son);
    if (son) {
      this.setState({
        scatteredJson: JSON.parse(son.scatteredJson),
        otherConsecutiveJson: JSON.parse(son.otherConsecutiveJson),
        standardConsecutiveJson: JSON.parse(son.standardConsecutiveJson),
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
  MychangeNum(ev) {
    this.setState({
      number: ev.target.value,
    });
  }

  changePrice(ev) {
    this.setState({
      dealPrice: ev.target.value,
    });
  }

  changeData(item, num, myindex) {
    this.setState({
      myindex: myindex, //要修改的东西
      mynum: num, //要修改的东西
      showShadeFlag: true,
      dealPrice: item.dealPrice,
      number: item.number,
    });
  }

  changeList() {
    console.log(this.state.myindex);
    console.log(this.state.mynum);
    const myindex = this.state.myindex;
    const dealPrice = this.state.dealPrice;
    const number = this.state.number;
    const scatteredJson = [...this.state.scatteredJson]; //浅拷贝一下
    const otherConsecutiveJson = [...this.state.otherConsecutiveJson]; //浅拷贝一下
    const standardConsecutiveJson = [...this.state.standardConsecutiveJson]; //浅拷贝一下

    if (this.state.mynum == 1) {
      this.setState({
        scatteredJson: scatteredJson.map((item, key) =>
          key == myindex
            ? { ...item, dealPrice: dealPrice, number: number }
            : item
        ),
      });
    } else if (this.state.mynum == 2) {
      this.setState({
        otherConsecutiveJson: otherConsecutiveJson.map((item, key) =>
          key == myindex
            ? { ...item, dealPrice: dealPrice, number: number }
            : item
        ),
      });
    } else if (this.state.mynum == 3) {
      this.setState({
        standardConsecutiveJson: standardConsecutiveJson.map((item, key) =>
          key == myindex
            ? { ...item, dealPrice: dealPrice, number: number }
            : item
        ),
      });
    }

    this.setState({
      showShadeFlag: false,
      dealPrice: "",
      number: "",
    });
  }
  setexamination = () => {
    if (this.getUrlParam("goodsId")) {
      axios
        .post("subject/json/addNumberFormat", {
          goodsId: this.getUrlParam("goodsId"),
          scatteredJson: JSON.stringify(this.state.scatteredJson),
          standardConsecutiveJson: JSON.stringify(
            this.state.standardConsecutiveJson
          ),
          otherConsecutiveJson: JSON.stringify(this.state.otherConsecutiveJson),
        })
        .then((response) => {
          if (response.data.code == "10000") {
            //成功到库存页面
            // this.props.history.push("/");
            this.props.history.push({
              pathname: "/myStock",
              search: `userId=4028808361926f8a0161db4c492304e2&name=${this.getUrlParam(
                "name"
              )}&type=2`,
            });
          } else {
            Toast.info(response.data.message, 1);
          }
        })
        .catch((error) => {});
    } else {
      let son = this.props.history.location.state;
      this.props.history.push({
        pathname: "/SaleDetails",
        state: {
          goodsId: son.goodsId, //商品id
          pubUserid: son.pubUserid, //用户id
          type: son.type, //1 求购，2 出售
          categoryName: son.categoryName, //商品分类
          name: son.name, //搜索框的名字
          dealPattern: son.dealPattern, //担保 2，线下 3
          isPostage: son.isPostage, //默认N 不包邮，Y 包邮。买没有包邮，固定填N
          scatteredJson: JSON.stringify(this.state.scatteredJson),
          standardConsecutiveJson: JSON.stringify(
            this.state.standardConsecutiveJson
          ),
          otherConsecutiveJson: JSON.stringify(this.state.otherConsecutiveJson),
          address: son.address,
          dealWay: son.dealWay,
          personPhone: son.personPhone,
          personName: son.personName,
        },
        search: `goodsId=${this.getUrlParam("goodsId")}`,
      });
    }
  };

  render() {
    return (
      <div className="mystock" style={{ background: "#ffffff" }}>
        <Uheader {...this.props} utitle="出售号码预览"></Uheader>
        <ul className="listBox stocklistBox">
          {this.state.scatteredJson.map((item, index) => (
            <li className="list" key={index}>
              <div className="nameBox">
                <p className="number">{item.number}</p>
                <p className="unit">
                  {item.tag}&nbsp;&nbsp;共<span> {item.dealCnt}</span>
                  {item.unitName}
                </p>
              </div>
              <span className="price">￥{item.dealPrice}元</span>
              <span
                className="deal"
                onClick={() => this.changeData(item, 1, index)}
              >
                操作
              </span>
            </li>
          ))}
          {this.state.otherConsecutiveJson.map((item, index) => (
            <li className="list" key={index}>
              <div className="nameBox">
                <p className="number">{item.number}</p>
                <p className="unit">
                  {item.tag}&nbsp;&nbsp;共<span> {item.dealCnt}</span>
                  {item.unitName}
                </p>
              </div>
              <span className="price">￥{item.dealPrice}元</span>
              <span
                className="deal"
                onClick={() => this.changeData(item, 2, index)}
              >
                操作
              </span>
            </li>
          ))}
          {this.state.standardConsecutiveJson.map((item, index) => (
            <li className="list" key={index}>
              <div className="nameBox">
                <p className="number">{item.number}</p>
                <p className="unit">
                  {item.tag}&nbsp;&nbsp;共<span> {item.dealCnt}</span>
                  {item.unitName}
                </p>
              </div>
              <span className="price">￥{item.dealPrice}元</span>
              <span
                className="deal"
                onClick={() => this.changeData(item, 3, index)}
              >
                操作
              </span>
            </li>
          ))}
        </ul>
        {this.state.showShadeFlag ? (
          <div className="shade">
            <div className="cont">
              <p>
                <label htmlFor="">号码</label>
                <input
                  type="text"
                  value={this.state.number}
                  onChange={(ev) => this.MychangeNum(ev)}
                />
              </p>
              <p>
                <label htmlFor="">价格</label>
                <input
                  type="text"
                  value={this.state.dealPrice}
                  onChange={(ev) => this.changePrice(ev)}
                />
              </p>
              <button onClick={this.changeList.bind(this)}>确认修改</button>
            </div>
          </div>
        ) : null}
        <button className="adddelte" onClick={() => this.setexamination()}>
          {this.getUrlParam("goodsId") ? "确认增加" : "下一步"}
        </button>
      </div>
    );
  }
}
