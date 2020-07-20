import React, { Component } from "react";
import { Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
import "./index.scss";
const log = console.log;
export default class Loose extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   selectValue:'startup'
    // };
    this.selectChange = this.selectChange.bind(this);
  }
  state = {
    LooseArr: [
      {
        todoList: [
          {
            code: "任意",
            title: "任意",
          },

          {
            code: "尾号",
            title: "尾号",
          },
          // {
          //   code: "起始号",
          //   title: "起始号",
          // },
          // {
          //   code: "豹子号（三连号）",
          //   title: "豹子号（三连号）",
          // },
          // {
          //   code: "狮子号（四连号）",
          //   title: "狮子号（四连号）",
          // },
          // {
          //   code: "老虎号（五连号）",
          //   title: "老虎号（五连号）",
          // },
          // {
          //   code: "大象号（六连号）",
          //   title: "大象号（六连号）",
          // },
          // {
          //   code: "恐龙号（七连号）",
          //   title: "恐龙号（七连号）",
          // },
          // {
          //   code: "麒麟号（八连号）",
          //   title: "麒麟号（八连号）",
          // },
          // {
          //   code: "生日号",
          //   title: "生日号",
          // },
          // {
          //   code: "顺号",
          //   title: "顺号",
          // },
          // {
          //   code: "爱情号",
          //   title: "爱情号",
          // },
          // {
          //   code: "叠号",
          //   title: "叠号",
          // },
          // {
          //   code: " 一拖三",
          //   title: " 一拖三",
          // },
          // {
          //   code: "三拖一",
          //   title: "三拖一",
          // },
        ],
        number: "",
        dealPrice: "",
        // selectValue: "请选择类型",
        selectValue: "尾号",
        Myplaceholder: "请输入您需要的尾号",
      },
    ],
  };
  componentDidMount() {
    // funcitonName 是原生回调使用的方法名
    window["ActivityVerificationDownload"] = this.ActivityVerificationDownload;
    if (sessionStorage.getItem("SANZHANG_ARR")) {
      //有值 回显
      this.setState({
        LooseArr: JSON.parse(sessionStorage.getItem("SANZHANG_ARR")),
      });
    }
  }
  selectChange = (ev, key) => {
    let LooseArr = [...this.state.LooseArr];
    let Myplaceholder = "";
    if (ev.target.value == "尾号") {
      Myplaceholder = "请输入您需要的尾号";
    } else {
      Myplaceholder = "请输入您需要的号码";
    }
    LooseArr.map((item, index) => {
      if (key == index) {
        item.selectValue = ev.target.value;
        item.Myplaceholder = Myplaceholder;
      }
    });
    this.setState({
      LooseArr: LooseArr,
    });

    sessionStorage.setItem("SANZHANG_ARR", JSON.stringify(LooseArr));

    // this.setState({
    //   LooseArr: LooseArr.map((item, index) =>
    //     key == index
    //       ? {
    //           ...item,
    //           selectValue: ev.target.value,
    //         }
    //       : item
    //   ),
    // });
    console.log(this.state.LooseArr);
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
  add(){
    let [Loose, LooseObj, tag] = [
      this.state.LooseArr[this.state.LooseArr.length - 1],
      {},
      "",
    ];
    log(Loose);
    var priceReg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;

    LooseObj.number = Loose.number;
    LooseObj.dealPrice = Loose.dealPrice;
    if (Loose.selectValue == "请选择类型") {
      tag = "";
    } else {
      tag = Loose.selectValue;
    }
    LooseObj.tag = tag;

    log(LooseObj);
    for (var key in LooseObj) {
      if (!LooseObj[key]) {
        Toast.info("散张请输入有效数字", 2);
        return;
      }
    }

    if (!priceReg.test(LooseObj.dealPrice)) {
      Toast.info("请输入散张求购正确的单价:整数或者保留两位小数", 2);
      return;
    };
    
    if (!this.setBuyingNumber(LooseObj.number)) {
      Toast.info("请输入散张求购正确求购号码", 2);
      return;
    }

    let LooseArr = this.state.LooseArr;
    LooseArr.push({
      todoList: [
        {
          code: "任意",
          title: "任意",
        },
        {
          code: "尾号",
          title: "尾号",
        },
        // {
        //   code: "起始号",
        //   title: "起始号",
        // },
        // {
        //   code: "豹子号（三连号）",
        //   title: "豹子号（三连号）",
        // },
        // {
        //   code: "狮子号（四连号）",
        //   title: "狮子号（四连号）",
        // },
        // {
        //   code: "老虎号（五连号）",
        //   title: "老虎号（五连号）",
        // },
        // {
        //   code: "大象号（六连号）",
        //   title: "大象号（六连号）",
        // },
        // {
        //   code: "恐龙号（七连号）",
        //   title: "恐龙号（七连号）",
        // },
        // {
        //   code: "麒麟号（八连号）",
        //   title: "麒麟号（八连号）",
        // },
        // {
        //   code: "生日号",
        //   title: "生日号",
        // },
        // {
        //   code: "顺号",
        //   title: "顺号",
        // },
        // {
        //   code: "爱情号",
        //   title: "爱情号",
        // },
        // {
        //   code: "叠号",
        //   title: "叠号",
        // },
        // {
        //   code: " 一拖三",
        //   title: " 一拖三",
        // },
        // {
        //   code: "三拖一",
        //   title: "三拖一",
        // },
      ],
      number: "",
      dealPrice: "",
      // selectValue: "请选择类型",
      selectValue: "尾号",
      Myplaceholder: "请输入您需要的尾号",
    });
    this.setState({
      LooseArr: LooseArr,
    });
  };
  ActivityVerificationDownload = (val) => {
    Toast.success(`${val}`, 1);
    console.log(val);
  };
  changeDOM = (value, arr) => {
    var obj = arr.todoList.find(function (key) {
      return key.title === value;
    });
    console.log(obj);
    return obj.num;
  };
  hanChange = (ev, index) => {
    var priceReg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
    console.log(priceReg.test(ev.target.value));

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

    sessionStorage.setItem("SANZHANG_ARR", JSON.stringify(LooseArr));
  };
  hanNumChange = (ev, index) => {
    const LooseArr = [...this.state.LooseArr]; //浅拷贝一下

    LooseArr.map((item, key) => {
      if (key == index) {
        item.number = ev.target.value;
      }
    });
    this.setState({
      LooseArr: LooseArr,
    });
    sessionStorage.setItem("SANZHANG_ARR", JSON.stringify(LooseArr));

    // this.setState({
    //   LooseArr: LooseArr.map((item, key) =>
    //     key == index ? { ...item, number: ev.target.value } : item
    //   ),
    // });
  };
  delte = (item, key) => {
    console.log(key);
    // const LooseArr = [...this.state.LooseArr]; //浅拷贝一下

    // LooseArr.splice(key,1);

    // this.setState({
    //   LooseArr: LooseArr,
    // });
    var LooseArr = [...this.state.LooseArr];
    //删除元素
    LooseArr.splice(key, 1);
    this.setState({
      LooseArr: LooseArr,
    });

    sessionStorage.setItem("SANZHANG_ARR", JSON.stringify(LooseArr));
  };
  render() {
    return (
      <div className="Loose">
        <div className="Loose_title">{/* <p>{this.props.uname}</p> */}</div>
        <div className="Loose_body">
          {this.state.LooseArr.map((item, key) => (
            <ul key={key}>
              <div className="title_num_del">
                <div className="sanlain">
                  <span></span>
                  <span>散张{key + 1}</span>
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
                  <span>{item.selectValue}</span>
                  <img src={require("../../assets/right.png")} alt="" />
                  <select
                    onChange={(e) => this.selectChange(e, key)}
                    value={item.selectValue}
                  >
                    <option style={{ display: "none" }}>请选择</option>
                    {item.todoList.map((item, key) => (
                      <option value={item.code} key={key}>
                        {item.title}
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
                  onChange={(ev) => this.hanNumChange(ev, key)}
                  placeholder={item.Myplaceholder}
                />
              </li>
              <li>
                <div>单价(元)</div>
                <input
                  type="text"
                  value={item.dealPrice}
                  onChange={(ev) => this.hanChange(ev, key)}
                  placeholder="请输入单张单价"
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
