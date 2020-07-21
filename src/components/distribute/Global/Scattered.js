import React, { Component } from "react";
import "./index.scss";
import { Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
const log = console.log;
export default class Serial extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   selectValue:'startup'
    // };
    // this.selectChange = this.selectChange.bind(this);
  }
  state = {
    StatusName: "求购",
    LooseArr: [
      {
        number: "", //数量
        dealPrice: "", //单价
        priceShow: false, //单价 显示
        AllpriceShow: false, //连号总价格 显示
        signlePrice: "", //连号总价格 值
        dealCnt: "",
        selectValue: "请选择类型",
        endnumber: "", //结束号码
      },
    ],
  };
  componentDidMount() {
    if (sessionStorage.getItem("SANLIAN_ARR")) {
      //有值 回显
      this.setState({
        LooseArr: JSON.parse(sessionStorage.getItem("SANLIAN_ARR")),
      });
    }
  }
  componentWillMount() {
    console.log(this.props);

    let StatusName = "求购";
    let newLooseArr = [...this.state.LooseArr];
    if (this.props.ustatus == "1") {
      StatusName = "求购";
      newLooseArr.map((item, key) => {
        item.priceShow = false; //单价 显示
        item.AllpriceShow = true; //连号总价格 显示
      });
    } else if (this.props.ustatus == "2") {
      StatusName = "出售";
      newLooseArr.map((item, key) => {
        item.priceShow = false; //单价 显示
        item.AllpriceShow = false; //连号总价格 显示
      });
    }
    this.setState({
      StatusName: StatusName,
      LooseArr: newLooseArr,
    });
  }
  changeDOM = (value, arr) => {
    var obj = arr.todoList.find(function (key) {
      return key.title === value;
    });
    console.log(obj);
    return obj.num;
  };
  delte = (item, key) => {
    console.log(key);
    var LooseArr = [...this.state.LooseArr];
    //删除元素
    LooseArr.splice(key, 1);
    this.setState({
      LooseArr: LooseArr,
    });
  };
  SETNUmber = (value, addNumber, num, obj) => {
    let newstr,
      ccccccc,
      bu0 = "";
    let [setstr, setstrLength] = [
      value.replace(/[^0-9]/gi, ""),
      value.replace(/[^0-9]/gi, "").length,
    ];
    let [AddSetstr, AddSetstrLength] = [
      `${Number(setstr) + Number(addNumber)}`,
      `${Number(setstr) + Number(addNumber)}`.length,
    ];
    if (value.indexOf(setstr) == -1) {
      Toast.info("不支持的号码", 2);
      return;
    }
    // log(value.indexOf(setstr))

    if (AddSetstrLength != setstrLength) {
      //如果需要补0
      let bu0Cha = Number(setstrLength) - Number(AddSetstrLength);
      for (var i = 0; i < bu0Cha; i++) {
        bu0 += "0";
      }
      newstr = `${bu0}${AddSetstr}`;
    } else {
      newstr = `${AddSetstr}`;
    }
    ccccccc = value.replace(setstr, newstr);

    if (num == 1) {
      return ccccccc;
    } else {
      switch (obj.tag) {
        case "标十":
          if (setstr.substring(setstr.length - 1) != "1") {
            return false;
          } else {
            return true;
          }
          break;
        case "标百":
          if (setstr.substring(setstr.length - 2) != "01") {
            return false;
          } else {
            return true;
          }
          break;
        case "标千":
          if (setstr.substring(setstr.length - 3) != "001") {
            return false;
          } else {
            return true;
          }
          break;
        case "标五千":
          if (setstr.substring(setstr.length - 3) != "005") {
            return false;
          } else {
            return true;
          }
          break;
        default:
          return true;
          break;
      }
    }
  };
  isPositiveInteger = (s) => {
    //是否为正整数
    console.log(s.length);
    // if (s.length > 18) {
    //   return false;
    // }
    var re = /^\+?[1-9]\d*$/;
    return re.test(s);
  };
  getUrlParam = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = this.props.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    }
    return ""; //如果此处只写return;则返回的是undefined
  };
  hanChange = (ev, index) => {
    console.log(ev.target.value);
    const LooseArr = [...this.state.LooseArr]; //浅拷贝一下
    let _this = this;

    LooseArr.map((item, key) => {
      if (key == index) {
        item.number = ev.target.value;
        if (
          item.number &&
          item.dealCnt &&
          _this.isPositiveInteger(item.dealCnt)
        ) {
          item.endnumber = _this.SETNUmber(
            ev.target.value,
            Number(item.dealCnt) - 1,
            "1",
            item
          );
        } else {
          item.endnumber = "";
        }
      }
    });
    this.setState({
      LooseArr: LooseArr,
    });
    sessionStorage.setItem("SANLIAN_ARR", JSON.stringify(LooseArr));
  };
  hansheetsChange = (ev, index) => {
    console.log(ev.target.value);
    const LooseArr = [...this.state.LooseArr]; //浅拷贝一下
    let _this = this;

    LooseArr.map((item, key) => {
      if (key == index) {
        item.dealCnt = ev.target.value;
        if (
          item.number &&
          item.dealCnt &&
          _this.isPositiveInteger(item.dealCnt)
        ) {
          item.endnumber = _this.SETNUmber(
            item.number,
            Number(ev.target.value) - 1,
            "1",
            item
          );
        } else {
          item.endnumber = "";
        }
      }
    });

    this.setState({
      LooseArr: LooseArr,
    });

    sessionStorage.setItem("SANLIAN_ARR", JSON.stringify(LooseArr));
    // this.setState({
    //   LooseArr: LooseArr.map((item, key) =>
    //     key == index ? { ...item, dealCnt: ev.target.value } : item
    //   ),
    // });
  };
  hanpriceChange = (ev, index) => {
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
    sessionStorage.setItem("SANLIAN_ARR", JSON.stringify(LooseArr));
    // this.setState({
    //   LooseArr: LooseArr.map((item, key) =>
    //     key == index ? { ...item, dealPrice: ev.target.value } : item
    //   ),
    // });
  };
  hanAllpriceValueChange = (ev, index) => {
    console.log(ev.target.value);
    const LooseArr = [...this.state.LooseArr]; //浅拷贝一下

    LooseArr.map((item, key) => {
      if (key == index) {
        item.signlePrice = ev.target.value;
      }
    });

    this.setState({
      LooseArr: LooseArr,
    });

    sessionStorage.setItem("SANLIAN_ARR", JSON.stringify(LooseArr));
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
    //添加
    let LooseObj = this.state.LooseArr[this.state.LooseArr.length - 1];
    var priceReg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
    let MyBoole = "";
    console.log(LooseObj);
    // dealCnt
    if (this.props.ustatus == "1") {
      // 求购
      let obj = {};
      obj.dealCnt = LooseObj.dealCnt;
      obj.number = LooseObj.number;
      obj.signlePrice = LooseObj.signlePrice;
      for (let key in obj) {
        if (!obj[key]) {
          Toast.info("请输入完整的散连求购信息", 2);
          return;
        }
      }
      if (!priceReg.test(obj.signlePrice)||
      Number(LooseObj.signlePrice) <= 0) {
        Toast.info("请输入散连求购正确的总价格", 2);
        return;
      }
      if (!this.setBuyingNumber(obj.number)) {
        Toast.info("请输入散连求购正确求购号码", 1);
        return;
      }
      if (!this.isPositiveInteger(obj.dealCnt)) {
        Toast.info("请输入散连求购正确求购数量", 1);
        return;
      }
      MyBoole = true;
    } else if (this.props.ustatus == "2") {
      //出售
      let obj = {};
      obj.dealCnt = LooseObj.dealCnt;
      obj.number = LooseObj.number;
      if (LooseObj.priceShow == false && LooseObj.AllpriceShow == false) {
        Toast.info("请在散连出售中选择整售或者单售", 3);
        return;
      }
      if (LooseObj.priceShow) {
        obj.dealPrice = LooseObj.dealPrice;
      }
      if (LooseObj.AllpriceShow) {
        obj.signlePrice = LooseObj.signlePrice;
      }

      for (let key in obj) {
        if (!obj[key]) {
          Toast.info("请输入完整的散连出售信息", 2);
          return;
        }
      }
      MyBoole = false;
      if (LooseObj.priceShow == true && LooseObj.AllpriceShow == false) {
        if (Number(LooseObj.dealCnt) > 18) {
          Toast.info("散连出售选择单售时,出售数量不能大于18", 3);
          return;
        }

        if (!this.isPositiveInteger(LooseObj.dealCnt)) {
          Toast.info("散连出售出售数量为大于0的整数", 2);
          return;
        }
        if (
          !priceReg.test(LooseObj.dealPrice) ||
          Number(LooseObj.dealPrice) <= 0
        ) {
          Toast.info("请输入散连出售正确的单价", 2);
          return;
        }
      } else if (LooseObj.AllpriceShow == true && LooseObj.priceShow == false) {
        if (Number(LooseObj.dealCnt) > 100000) {
          Toast.info("散连出售选择整售时,出售数量不能大于5位数", 3);
          return;
        }
        if (!this.isPositiveInteger(LooseObj.dealCnt)) {
          Toast.info("散连出售出售数量为大于0的整数", 2);
          return;
        }
        if (
          !priceReg.test(LooseObj.dealPrice) ||
          Number(LooseObj.dealPrice) <= 0
        ) {
          Toast.info("请输入散连出售正确的总价格", 2);
          return;
        }
      } else if (LooseObj.AllpriceShow && LooseObj.AllpriceShow) {
        if (Number(LooseObj.dealCnt) > 18) {
          Toast.info("散连出售选择单售时,出售数量不能大于18", 3);
          return;
        }

        if (
          !priceReg.test(LooseObj.dealPrice) ||
          Number(LooseObj.dealPrice) <= 0
        ) {
          Toast.info("请输入散连出售正确的单价", 2);
          return;
        }
        if (
          !priceReg.test(LooseObj.signlePrice) ||
          Number(LooseObj.signlePrice) <= 0
        ) {
          Toast.info("请输入散连出售正确的总价格", 2);
          return;
        }
      }
      if (!this.setBuyingNumber(LooseObj.number)) {
        Toast.info("请输入散连出售正确出售号码", 2);
        return;
      }

      // if (!this.isPositiveInteger(LooseObj.dealCnt)) {
      //   Toast.info("请输入散连出售正确求购数量", 1);
      //   return;
      // }
    }
    let LooseArr = this.state.LooseArr;
    LooseArr.push({
      number: "", //数量
      dealPrice: "", //单价
      priceShow: false, //单价 显示
      AllpriceShow: MyBoole, //连号总价格 显示
      signlePrice: "", //连号总价格 值
      dealCnt: "",
      endnumber: "", //结束号码
      selectValue: "请选择类型",
    });
    this.setState({
      LooseArr: LooseArr,
    });
  }
  render() {
    return (
      <div className="Loose">
        <div className="Loose_title">
          {/* <p>散连{this.state.StatusName}</p> */}
        </div>
        <div className="Loose_body">
          {this.state.LooseArr.map((item, key, array) => (
            <ul key={key}>
              <div className="title_num_del">
                <div className="sanlain">
                  <span></span>
                  <span>散连{key + 1}</span>
                  {this.props.ustatus == "2" ? (
                    <div className="chushou">
                      <div
                        onClick={() => {
                          const LooseArr = [...array]; //浅拷贝一下

                          LooseArr.map((item1, index) => {
                            if (index == key) {
                              item.AllpriceShow = !item.AllpriceShow;
                              if (item.AllpriceShow == false) {
                                item.signlePrice = "";
                              }
                            }
                          });

                          sessionStorage.setItem(
                            "SANLIAN_ARR",
                            JSON.stringify(LooseArr)
                          );
                          this.setState({
                            LooseArr: LooseArr,
                          });
                        }}
                      >
                        {item.AllpriceShow ? (
                          <img
                            src={require("../../assets/Selected.png")}
                            alt="勾选中图片"
                          />
                        ) : (
                          <img
                            src={require("../../assets/Unselected.png")}
                            alt="未勾选图片"
                          />
                        )}

                        <span>整售</span>
                      </div>
                      <div
                        onClick={() => {
                          const LooseArr = [...array]; //浅拷贝一下

                          LooseArr.map((item1, index) => {
                            if (index == key) {
                              item.priceShow = !item.priceShow;
                              if (item.priceShow == false) {
                                item.dealPrice = "";
                              }
                            }
                          });
                          this.setState({
                            LooseArr: LooseArr,
                          });
                          sessionStorage.setItem(
                            "SANLIAN_ARR",
                            JSON.stringify(LooseArr)
                          );
                        }}
                      >
                        {item.priceShow ? (
                          <img
                            src={require("../../assets/Selected.png")}
                            alt="勾选中图片"
                          />
                        ) : (
                          <img
                            src={require("../../assets/Unselected.png")}
                            alt="未勾选图片"
                          />
                        )}

                        <span>单售</span>
                      </div>
                      <div>·可多选</div>
                    </div>
                  ) : null}
                </div>
                {key > 0 ? (
                  <div onClick={() => this.delte(item, key)} className="deltes">
                    <img src={require("../../assets/delete.png")} alt="" />
                  </div>
                ) : null}
              </div>
              <li>
                <div>{this.state.StatusName}数量</div>
                <input
                  type="text"
                  value={item.dealCnt}
                  onChange={(ev) => this.hansheetsChange(ev, key)}
                  placeholder="请输入散连张数"
                />
              </li>

              <li>
                <div>{this.state.StatusName}号码</div>
                <input
                  type="text"
                  value={item.number}
                  onChange={(ev) => this.hanChange(ev, key)}
                  placeholder="请输入起始的号码"
                />
              </li>
              <li>
                <div>起始号码:{item.number}</div>
                <div style={{ color: "#333333" }}>
                  结束号码:{item.endnumber}
                </div>
              </li>
              {item.AllpriceShow ? (
                <li>
                  <div>连号总价格</div>
                  <input
                    type="text"
                    value={item.signlePrice}
                    onChange={(ev) => this.hanAllpriceValueChange(ev, key)}
                    placeholder="请输入连号总价格"
                  />
                </li>
              ) : null}

              {item.priceShow ? (
                <li>
                  <div>
                    单价（元/{" "}
                    {this.getUrlParam("unitName")
                      ? this.getUrlParam("unitName")
                      : "张"}
                    ）
                  </div>
                  <input
                    type="text"
                    value={item.dealPrice}
                    onChange={(ev) => this.hanpriceChange(ev, key)}
                    placeholder="请输入单张价格"
                  />
                </li>
              ) : null}
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
