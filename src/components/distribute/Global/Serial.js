import React, { Component } from "react";
import {
  Toast,
  WhiteSpace,
  WingBlank,
  Button,
  Picker,
  List,
} from "antd-mobile";

import "./index.scss";

export default class Standard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          label: "2013",
          value: "2013",
        },
        {
          label: "2014",
          value: "2014",
        },
      ],
      cols: 1,
      asyncValue: [],
      LooseArr: [
        {
          todoList: [
            {
              code: "请选择类型",
              title: "请选择类型",
              num: 0,
              Examples: "********",
            },
            {
              code: "标十",
              title: "标十",
              num: 9,
              Examples: "*******1",
            },
            {
              code: "标百",
              title: "标百",
              num: 99,
              Examples: "******01",
            },
            {
              code: "滚刀",
              title: "滚刀",
              num: 99,
              Examples: "*******x",
            },
            {
              code: "滚捆",
              title: "滚捆",
              num: 999,
              Examples: "*******x",
            },
            {
              code: "标千",
              title: "标千",
              num: 999,
              Examples: "*****001",
            },
            {
              code: "标五千",
              title: "标五千",
              num: 4999,
              Examples: "*****001",
            },
          ],
          dealCnt: "", //标号的
          number: "",
          endnumber: "", //结束号码
          dealPrice: "",
          tag: "请选择类型",
          Examples: "********",
        },
      ],
    };
    this.selectChange = this.selectChange.bind(this);
  }
  state = {};
  componentDidMount() {
    if (sessionStorage.getItem("BIAOLIAN_ARR")) {
      //有值 回显
      this.setState({
        LooseArr: JSON.parse(sessionStorage.getItem("BIAOLIAN_ARR")),
      });
    }
  }
  selectChange = (ev, item1, key) => {
    console.log(ev.target.value);
    console.log(item1);

    let LooseArr = [...this.state.LooseArr];
    let _this = this;
    console.log(LooseArr[key]);

    LooseArr.map((item, index, arr) => {
      if (key == index) {
        item.tag = ev.target.value;
        item.dealCnt = _this.changeDOM(ev.target.value, arr[key]).num;
        if (item.tag == "请选择类型") {
          item.dealCnt = "";
          item.endnumber = "";
        }
        if (item.dealCnt && item.number) {
          item.endnumber = _this.SETNUmber(
            item.number,
            item.dealCnt,
            "1",
            item
          );
          // item.endnumber =
          //   Number(item.dealCnt) +
          //   Number(this.SETNUmber(item.number, item.dealCnt, "1", item));
        }
        item.Examples = _this.changeDOM(ev.target.value, arr[key]).Examples;
      }
    });

    this.setState({
      LooseArr: LooseArr,
    });

    console.log(this.state.LooseArr);

    sessionStorage.setItem("BIAOLIAN_ARR", JSON.stringify(LooseArr));
  };
  changeDOM = (value, arr) => {
    var obj = arr.todoList.find(function (key) {
      return key.title === value;
    });
    return obj;
  };
  delte = (item, key) => {
    console.log(key);
    var LooseArr = [...this.state.LooseArr];
    //删除元素
    LooseArr.splice(key, 1);
    this.setState({
      LooseArr: LooseArr,
    });
    sessionStorage.setItem("BIAOLIAN_ARR", JSON.stringify(LooseArr));
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
          if (setstr.substring(setstr.length - 3) != "001") {
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
  hanChange = (ev, index, item1) => {
    console.log(item1);
    console.log(ev.target.value);
    let _this = this;
    const LooseArr = [...this.state.LooseArr]; //浅拷贝一下
    // this.setState({
    //   LooseArr: LooseArr.map((item, key) =>
    //     key == index
    //       ? { ...item, number: ev.target.value, endnumber: 100 }
    //       : item
    //   ),
    // });
    console.log(LooseArr);

    LooseArr.map((item, key) => {
      if (key == index) {
        item.number = ev.target.value;
        if (ev.target.value && item.dealCnt) {
          item.endnumber = _this.SETNUmber(
            ev.target.value,
            item.dealCnt,
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

    sessionStorage.setItem("BIAOLIAN_ARR", JSON.stringify(LooseArr));
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

    sessionStorage.setItem("BIAOLIAN_ARR", JSON.stringify(LooseArr));
  };
  Myoption = (item) => {
    console.log(item);
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
    let utitle = this.props.utitle;
    let LooseObj = this.state.LooseArr[this.state.LooseArr.length - 1];
    var priceReg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;

    for (let key in LooseObj) {
      if (!LooseObj[key]) {
        Toast.info(`请输入完整的标连${utitle}信息`, 2);
        return;
      }
    }

    console.log(LooseObj);
    // console.log(
    //   this.SETNUmber(LooseObj.number, LooseObj.dealCnt, "2", LooseObj)
    // );
    if (!this.SETNUmber(LooseObj.number, LooseObj.dealCnt, "2", LooseObj)) {
      Toast.info("填写的号码尾号请和示例尾号相同", 3);
      return;
    }
    if (!priceReg.test(LooseObj.dealPrice) || Number(LooseObj.dealPrice) <= 0) {
      Toast.info(`请输入标连${utitle}正确的总价格`, 2);
      return;
    }

    if (!this.setBuyingNumber(LooseObj.number)) {
      Toast.info(`请输入标连${utitle}正确出售号码`, 2);
      return;
    }

    // if (this.SETNUmber(LooseObj.number, LooseObj.dealCnt, "2", LooseObj)) {
    // }

    let LooseArr = this.state.LooseArr;
    LooseArr.push({
      todoList: [
        {
          code: "请选择类型",
          title: "请选择类型",
          num: 0,
          Examples: "********",
        },
        {
          code: "标十",
          title: "标十",
          num: 9,
          Examples: "*******1",
        },
        {
          code: "标百",
          title: "标百",
          num: 99,
          Examples: "******01",
        },
        {
          code: "滚刀",
          title: "滚刀",
          num: 99,
          Examples: "********",
        },
        {
          code: "滚捆",
          title: "滚捆",
          num: 999,
          Examples: "********",
        },
        {
          code: "标千",
          title: "标千",
          num: 999,
          Examples: "*****001",
        },
        {
          code: "标五千",
          title: "标五千",
          num: 4999,
          Examples: "*****001",
        },
      ],
      dealCnt: "", //标号的
      number: "",
      endnumber: "", //结束号码
      dealPrice: "",
      tag: "请选择类型",
      Examples: "********",
    });
    this.setState({
      LooseArr: LooseArr,
    });
  }

  render() {
    return (
      <div className="Loose">
        <div className="Loose_title">
          {/* <p>标连{this.props.utitle}</p> */}
        </div>
        <div className="Loose_body">
          {this.state.LooseArr.map((item, key) => (
            <ul key={key}>
              <div className="title_num_del">
                <div className="sanlain">
                  <span></span>
                  <span>标连{key + 1}</span>
                </div>
                {key > 0 ? (
                  <div onClick={() => this.delte(item, key)} className="deltes">
                    <img src={require("../../assets/delete.png")} alt="" />
                  </div>
                ) : null}
              </div>
              <li>
                <div>{this.props.userName}类型</div>
                <div className="select-area" data-tap-disabled="true">
                  <span>{item.tag}</span>
                  <img src={require("../../assets/right.png")} alt="" />
                  <div data-tap-disabled="true">
                    <select
                      onChange={(e) => this.selectChange(e, item, key)}
                      value={item.tag}
                    >
                      {/* <option>请选择类型</option> */}
                      {item.todoList.map((item1, key1) => (
                        <option
                          onClick={() => this.Myoption(item1)}
                          value={item1.code}
                          key={key1}
                        >
                          {item1.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </li>
              <li>
                <div>{this.props.userName}号码</div>
                <input
                  type="text"
                  value={item.number}
                  onChange={(ev) => this.hanChange(ev, key, item)}
                
                  placeholder="请输入起始的号码"
                />
                <p>示例:{item.Examples}</p>
              </li>
              <li>
                <div>起始号码:{item.number}</div>
                <div style={{ color: "#333333" }}>
                  结束号码:{item.endnumber}
                </div>
              </li>
              <li>
                <div>连号总价格</div>
                <input
                  type="text"
                  value={item.dealPrice}
                  onChange={(ev) => this.hanpriceChange(ev, key)}
                  placeholder="请输入连号总价格"
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
