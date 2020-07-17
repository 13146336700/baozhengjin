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
  hanChange = (ev, index) => {
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

    sessionStorage.setItem("SANLIAN_ARR", JSON.stringify(LooseArr));
  };
  hansheetsChange = (ev, index) => {
    console.log(ev.target.value);
    const LooseArr = [...this.state.LooseArr]; //浅拷贝一下

    LooseArr.map((item, key) => {
      if (key == index) {
        item.dealCnt = ev.target.value;
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
    // this.setState({
    //   LooseArr: LooseArr.map((item, key) =>
    //     key == index ? { ...item, signlePrice: ev.target.value } : item
    //   ),
    // });

    sessionStorage.setItem("SANLIAN_ARR", JSON.stringify(LooseArr));
  };
  add = () => {
    //添加
    let LooseObj = this.state.LooseArr[this.state.LooseArr.length - 1];
    let MyBoole = "";
    if (this.props.ustatus == "1") {
      // 求购
      let obj = {};
      obj.dealCnt = LooseObj.dealCnt;
      obj.number = LooseObj.number;
      obj.signlePrice = LooseObj.signlePrice;
      for (let key in obj) {
        if (!obj[key]) {
          Toast.info("散连请输入有效数值", 2);
          return;
        }
      }
      MyBoole = true;
    } else if (this.props.ustatus == "2") {
      //出售
      let obj = {};
      obj.dealCnt = LooseObj.dealCnt;
      obj.number = LooseObj.number;
      if (LooseObj.priceShow == false && LooseObj.AllpriceShow == false) {
        Toast.info("请选择整售或者单售", 2);
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
          Toast.info("请输入散连值", 1);
          return;
        }
      }
      MyBoole = false;
    }
    let LooseArr = this.state.LooseArr;
    LooseArr.push({
      number: "", //数量
      dealPrice: "", //单价
      priceShow: false, //单价 显示
      AllpriceShow: MyBoole, //连号总价格 显示
      signlePrice: "", //连号总价格 值
      dealCnt: "",
      selectValue: "请选择类型",
    });
    this.setState({
      LooseArr: LooseArr,
    });
  };
  render() {
    return (
      <div className="Loose">
        <div className="Loose_title">
          <p>散连{this.state.StatusName}</p>
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
                          this.setState({
                            LooseArr: LooseArr.map((item1, index) =>
                              index == key
                                ? { ...item1, AllpriceShow: !item.AllpriceShow }
                                : item1
                            ),
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
                          this.setState({
                            LooseArr: LooseArr.map((item1, index) =>
                              index == key
                                ? { ...item1, priceShow: !item.priceShow }
                                : item1
                            ),
                          });
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
                  placeholder="请输入要包含的号码"
                />
              </li>
              {item.AllpriceShow ? (
                <li>
                  <div>连号总价格</div>
                  <input
                    type="text"
                    value={item.signlePrice}
                    onChange={(ev) => this.hanAllpriceValueChange(ev, key)}
                    placeholder="请输入价格"
                  />
                </li>
              ) : null}

              {item.priceShow ? (
                <li>
                  <div>单价（元/张）</div>
                  <input
                    type="text"
                    value={item.dealPrice}
                    onChange={(ev) => this.hanpriceChange(ev, key)}
                    placeholder="请输入价格"
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
