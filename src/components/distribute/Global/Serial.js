import React, { Component } from "react";
import { Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
import "./index.scss";
export default class Standard extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   tag:'startup'
    // };
    this.selectChange = this.selectChange.bind(this);
  }
  state = {
    LooseArr: [
      {
        todoList: [
          {
            code: "标十",
            title: "标十",
            num: 10,
          },
          {
            code: "标百",
            title: "标百",
            num: 100,
          },
          {
            code: "标千",
            title: "标千",
            num: 1000,
          },
          {
            code: "标五千",
            title: "标五千",
            num: 5000,
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
  selectChange = (ev, item1, key) => {
    console.log(ev.target.value);
    console.log(item1);

    // var obj = this.state.todoList.find(function (key) {
    //   return key.code === ev.target.value;
    // });
    // this.changeDOM(obj.code);
    let LooseArr = [...this.state.LooseArr];
    console.log(LooseArr[key]);

    this.changeDOM(ev.target.value, LooseArr[key]);
    this.setState({
      LooseArr: LooseArr.map((item, index) =>
        key == index
          ? {
              ...item,
              tag: ev.target.value,
              dealCnt: this.changeDOM(ev.target.value, LooseArr[key]),
            }
          : item
      ),
    });
    console.log(this.state.LooseArr);
    // this.setState({
    //   LooseArr:LooseArr
    //   tag: ev.target.value,
    //   selectCode: ev.target.value,
    // });
  };
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
  SETNUmber = (value, addNumber) => {
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
      alert("不支持的号码");
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
    return ccccccc;
  };
  hanChange = (ev, index, item1) => {
    console.log(item1);
    console.log(ev.target.value);

    const LooseArr = [...this.state.LooseArr]; //浅拷贝一下
    // this.setState({
    //   LooseArr: LooseArr.map((item, key) =>
    //     key == index
    //       ? { ...item, number: ev.target.value, endnumber: 100 }
    //       : item
    //   ),
    // });
    this.setState({
      LooseArr: LooseArr.map((item, key) =>
        key == index
          ? {
              ...item,
              number: ev.target.value,
              endnumber: this.SETNUmber(ev.target.value, item.dealCnt),
            }
          : item
      ),
    });
  };
  hanpriceChange = (ev, index) => {
    console.log(ev.target.value);
    const LooseArr = [...this.state.LooseArr]; //浅拷贝一下
    this.setState({
      LooseArr: LooseArr.map((item, key) =>
        key == index ? { ...item, dealPrice: ev.target.value } : item
      ),
    });
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

    let LooseArr = this.state.LooseArr;
    LooseArr.push({
      todoList: [
        {
          code: "标十",
          title: "标十",
          num: 10,
        },
        {
          code: "标百",
          title: "标百",
          num: 100,
        },
        {
          code: "标千",
          title: "标千",
          num: 1000,
        },
        {
          code: "标五千",
          title: "标五千",
          num: 5000,
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
                <div>求购类型</div>
                <div className="select-area">
                  <span>{item.tag}</span>
                  <img src={require("../../assets/right.png")} alt="" />
                  <select
                    onChange={(e) => this.selectChange(e, item, key)}
                    value={item.tag}
                  >
                    <option style={{ display: "none" }} disabled>
                      请选择
                    </option>
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
                <div>求购号码</div>
                <input
                  type="text"
                  value={item.number}
                  onChange={(ev) => this.hanChange(ev, key, item)}
                  placeholder="请输入要包含的号码"
                />
                <p>
                  起始号码：{item.number}----结束号码{item.endnumber}
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
