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
    dealPriceShow: false, //总价显示
    signlePrice: "", //总价
  };
 
  
  componentWillMount() {
    let son = this.props.history.location.state;
    console.log(JSON.parse(son.scatteredJson));
    console.log(JSON.parse(son.otherConsecutiveJson));
    console.log(JSON.parse(son.standardConsecutiveJson));
    console.log(son);
    if (son) {
      this.setState({
        scatteredJson: JSON.parse(son.scatteredJson),
        otherConsecutiveJson: JSON.parse(son.otherConsecutiveJson),
        standardConsecutiveJson: JSON.parse(son.standardConsecutiveJson),
      });
    }
  };

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
  changesignlePrice(ev) {
    this.setState({
      signlePrice: ev.target.value,
    });
  }
  changeData(item, num, myindex) {
    console.log(item);
    let signlePrice;
    try {
      signlePrice = item.signlePrice;
      // if (num == 2) {

      // }
    } catch (error) {
      signlePrice = "";
    }
    this.setState({
      dealPriceShow: item.signlePrice ? true : false,
    });
    this.setState({
      myindex: myindex, //要修改的东西
      mynum: num, //要修改的东西
      showShadeFlag: true,
      dealPrice: item.dealPrice,
      number: item.number,
      signlePrice: signlePrice,
    });
  }
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
  cancel() {
    this.setState({
      mynum: "", //要修改的东西
      showShadeFlag: false,
      dealPrice: "",
      number: "",
      signlePrice: "",
    });
  }
  changeList() {
    console.log(this.state.myindex);
    console.log(this.state.mynum);
    const myindex = this.state.myindex;
    const dealPrice = this.state.dealPrice;
    let _this = this;
    console.log(dealPrice);
    const number = this.state.number;
    const signlePrice = this.state.signlePrice;
    const scatteredJson = [...this.state.scatteredJson]; //浅拷贝一下
    const otherConsecutiveJson = [...this.state.otherConsecutiveJson]; //浅拷贝一下
    const standardConsecutiveJson = [...this.state.standardConsecutiveJson]; //浅拷贝一下
    var priceReg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
    if (this.state.mynum == 1) {
      console.log(scatteredJson);
      for (let i = 0; i < scatteredJson.length; i++) {
        if (i == myindex) {
          if (!priceReg.test(dealPrice) || Number(dealPrice) <= 0) {
            Toast.info("请输入正确修改的单价", 2);
            return;
          }
          if (!_this.setBuyingNumber(number)) {
            Toast.info("请输入正确修改号码", 2);
            return;
          }
          scatteredJson[i].dealPrice = dealPrice;
          scatteredJson[i].number = number;
        }
      }
      // scatteredJson.map((item, key) => {
      //   if (key == myindex) {
      //     item.dealPrice = dealPrice;
      //     item.number = number;
      //   }
      // });

      this.setState({
        scatteredJson: scatteredJson,
      });

      sessionStorage.setItem("SANZNANG_ARR", JSON.stringify(scatteredJson));
    } else if (this.state.mynum == 2) {
      //散连
      for (let i = 0; i < otherConsecutiveJson.length; i++) {
        if (i == myindex) {
          if (!priceReg.test(dealPrice) || Number(dealPrice) <= 0) {
            Toast.info("请输入正确修改的单价", 2);
            return;
          }
          if (!priceReg.test(signlePrice) || Number(signlePrice) <= 0) {
            Toast.info("请输入正确修改的总价", 2);
            return;
          }
          if (!_this.setBuyingNumber(number)) {
            Toast.info("请输入正确修改号码", 2);
            return;
          }

          otherConsecutiveJson[i].dealPrice = dealPrice;
          otherConsecutiveJson[i].number = number;
          otherConsecutiveJson[i].signlePrice = signlePrice;
        }
      }

      // otherConsecutiveJson.map((item, key) => {
      //   if (key == myindex) {
      //     item.dealPrice = dealPrice;
      //     item.number = number;
      //     item.signlePrice = signlePrice;
      //   }
      // });

      this.setState({
        otherConsecutiveJson: otherConsecutiveJson,
      });

      sessionStorage.setItem(
        "SANLIAN_ARR",
        JSON.stringify(otherConsecutiveJson)
      );
    } else if (this.state.mynum == 3) {
      //标连
      for (let i = 0; i < standardConsecutiveJson.length; i++) {
        if (i == myindex) {
          if (!priceReg.test(dealPrice) || Number(dealPrice) <= 0) {
            Toast.info("请输入正确修改的单价", 2);
            return;
          }
          if (!_this.setBuyingNumber(number)) {
            Toast.info("请输入正确修改号码", 2);
            return;
          }
          standardConsecutiveJson[i].dealPrice = dealPrice;
          standardConsecutiveJson[i].number = number;
        }
      }

      // standardConsecutiveJson.map((item, key) => {
      //   if (key == myindex) {
      //     item.dealPrice = dealPrice;
      //     item.number = number;
      //   }
      // });
      this.setState({
        standardConsecutiveJson: standardConsecutiveJson,
      });

      // sessionStorage.setItem(
      //   "BIAOLIAN_ARR",
      //   JSON.stringify(standardConsecutiveJson)
      // );
    }

    this.setState({
      showShadeFlag: false,
      dealPrice: "",
      number: "",
    });
  }
  setexamination = () => {
    // if (this.getUrlParam("goodsId")) {
    if (this.props.history.location.state.goodsId) {
      axios
        .post("subject/json/addNumberFormat", {
          goodsId: this.props.history.location.state.goodsId,
          scatteredJson: JSON.stringify(this.state.scatteredJson),
          standardConsecutiveJson: JSON.stringify(
            this.state.standardConsecutiveJson
          ),
          otherConsecutiveJson: JSON.stringify(this.state.otherConsecutiveJson),
        })
        .then((response) => {
          if (response.data.code == "10000") {
            //成功到库存页面
            Toast.info("发布成功", 2);
            this.props.history.push({
              pathname: "/myStock",
              search: `userId=${
                JSON.parse(sessionStorage.getItem("userInfo")).userId
              }&name=${this.props.history.location.state.name}&type=2`,
            });
          } else {
            Toast.info(response.data.message, 1);
          }
        })
        .catch((error) => {});
    } else {
      let son = this.props.history.location.state;
      console.log(this.props);
      console.log(son);

      sessionStorage.setItem("ReturnGo", "2");
      this.props.history.push({
        pathname: "/SaleDetails",
        state: {
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
          personPhone: son.personPhone,
          personName: son.personName,
          assureAddress: son.address,
          assurePersonPhone: son.personPhone,
          assurePersonName: son.personName,
          dealWay: son.dealWay,
        },
        // search: `goodsId=${this.getUrlParam("goodsId")}`,
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
                <label htmlFor="">修改号码</label>
                <input
                  type="text"
                  value={this.state.number}
                  onChange={(ev) => this.MychangeNum(ev)}
                />
              </p>
              <p>
                <label htmlFor="">修改价格</label>
                <input
                  type="text"
                  value={this.state.dealPrice}
                  onChange={(ev) => this.changePrice(ev)}
                />
              </p>
              {this.state.dealPriceShow ? (
                <p>
                  <label htmlFor="">修改总价</label>
                  <input
                    type="text"
                    value={this.state.signlePrice}
                    onChange={(ev) => this.changesignlePrice(ev)}
                  />
                </p>
              ) : (
                <div className="zhanweifu_"></div>
              )}

              <div className="div_changeList">
                <button onClick={this.changeList.bind(this)}>确认修改</button>
                <button onClick={this.cancel.bind(this)}>取消</button>
              </div>
            </div>
          </div>
        ) : null}
        <div className="footer_zhanwei"></div>
            <button className="adddelte" onClick={() => this.setexamination()}>
            {/* {this.getUrlParam("goodsId") ? "确认增加" : "下一步"} */}
            {this.props.history.location.state.goodsId ? "确认增加" : "下一步"}
          </button>
      </div>
    );
  }
}
