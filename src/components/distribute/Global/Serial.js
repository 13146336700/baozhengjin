import React, { Component } from "react";
import { Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
import "./index.scss";
export default class Standard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LooseArr: [
        {
          todoList: [
            {
              code: "标十",
              title: "标十",
              num: 9,
            },
            {
              code: "标百",
              title: "标百",
              num: 99,
            },
            {
              code: "滚刀",
              title: "滚刀",
              num: 99,
            },
            {
              code: "滚捆",
              title: "滚捆",
              num: 999,
            },
            {
              code: "标千",
              title: "标千",
              num: 999,
            },
            {
              code: "标五千",
              title: "标五千",
              num: 4999,
            },
          ],
          dealCnt: "", //标号的
          number: "",
          endnumber: "",
          dealPrice: "",
          tag: "请选择类型",
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

    // this.changeDOM(ev.target.value, LooseArr[key]);

    LooseArr.map((item, index, arr) => {
      if (key == index) {
        item.tag = ev.target.value;
        item.dealCnt = _this.changeDOM(ev.target.value, arr[key]);
        item.endnumber = Number(item.dealCnt) + Number(item.number);
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
      `${Number(setstr) + addNumber}`,
      `${Number(setstr) + addNumber}`.length,
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
    console.log(setstr, newstr);
    console.log("最后一位" + newstr.substr(newstr.length - 1, 1));
      console.log(obj);
    ccccccc = value.replace(setstr, newstr);
    if (num == 1) {
      return ccccccc;
    } else {
      console.log("最后一位" + newstr.substr(newstr.length - 1, 1));
      console.log(obj);
      // console.log("最后一位" + newstr.substr(newstr.length - 1, 1));
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

    LooseArr.map((item, key) => {
      if (key == index) {
        item.number = ev.target.value;
        item.endnumber = _this.SETNUmber(
          ev.target.value,
          item.dealCnt,
          "1",
          item
        );
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
  add = () => {
    let LooseObj = this.state.LooseArr[this.state.LooseArr.length - 1];
    for (let key in LooseObj) {
      if (!LooseObj[key]) {
        Toast.info("请输入标连值", 2);
        return;
      }
    }
    console.log(LooseObj);
    if (this.SETNUmber(LooseObj.number, LooseObj.dealCnt, "2", LooseObj)) {
    }

    let LooseArr = this.state.LooseArr;
    LooseArr.push({
      todoList: [
        {
          code: "标十",
          title: "标十",
          num: 9,
        },
        {
          code: "标百",
          title: "标百",
          num: 99,
        },
        {
          code: "滚刀",
          title: "滚刀",
          num: 99,
        },
        {
          code: "标千",
          title: "标千",
          num: 999,
        },

        {
          code: "滚捆",
          title: "滚捆",
          num: 999,
        },
        {
          code: "标五千",
          title: "标五千",
          num: 4999,
        },
      ],
      dealCnt: "", //标号的
      number: "",
      endnumber: "", //结束号码
      dealPrice: "",
      tag: "请选择类型",
    });
    this.setState({
      LooseArr: LooseArr,
    });
  };
  render() {
    return (
      <div className="Loose">
        <div className="Loose_title">
          <p>标连{this.props.utitle}</p>
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
                  <select
                    onChange={(e) => this.selectChange(e, item, key)}
                    value={item.tag}
                  >
                    <option style={{ display: "none" }}>请选择</option>
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
              </li>
              <li>
                <div>{this.props.userName}号码</div>
                <input
                  type="text"
                  value={item.number}
                  onChange={(ev) => this.hanChange(ev, key, item)}
                  placeholder="请输入要包含的号码"
                />
                <p>
                  起: <span>{item.number}</span>终:<span>{item.endnumber}</span>
                </p>
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
