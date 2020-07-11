import React, { Component } from "react";
import "./index.scss";
export default class Serial extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   selectValue:'startup'
    // };
    this.selectChange = this.selectChange.bind(this);
  };
  state = {
    StatusName: "求购",
    LooseArr: [
      {
        todoList: [
          {
            code: "startup",
            title: "开屏广告",
          },
          {
            code: "ordersDetail",
            title: "成交详情页-广告栏",
          },
        ],
        number: "",//数量
        price: "",//单价
        priceShow:false,//单价 显示
        AllpriceShow:false,//连号总价格 显示
        AllpriceValue:"",//连号总价格 值
        sheets: "",
        selectValue: "请选择类型",
        selectCode: "",
      },
    ],
    selectValue: "请选择类型",
    selectCode: "",
  };
  componentWillMount() {
    console.log(this.props);
    let StatusName = "求购";
    if (this.props.ustatus == "1") {
      StatusName = "求购";
    } else if (this.props.ustatus == "2") {
      StatusName = "出售";
    }
    this.setState({
      StatusName: StatusName,
    });
  }
  selectChange = (ev) => {
    var obj = this.state.todoList.find(function (key) {
      return key.code === ev.target.value;
    });
    this.changeDOM(obj.code);
    console.log(obj);

    this.setState({
      selectValue: obj.title,
      selectCode: obj.code,
    });
  };
  changeDOM = (value = "startup") => {
    //DOM改变
    let [Claim, size, name] = ["需提供资料及要求", "图片大小:不超过1M", "图片"];
    let todoform = [];
    switch (value) {
      case "publish":
        todoform = [
          {
            name: name,
            img: "http://image.ybk008.com/121591688093072",
            Claim: Claim,
            sizeimg: "图片尺寸608*110像素",
            size: size,
          },
          {
            name: "文字",
            img: "http://image.ybk008.com/131591688106537",
          },
        ];
        break;
      default:
        todoform = [
          {
            name: name,
            img: "http://image.ybk008.com/11591687917416",
            Claim: Claim,
            sizeimg: "图片尺寸750*1334像素",
            size: size,
          },
        ];
        break;
    }

    var obj = this.state.todoList.find(function (key) {
      return key.code === value;
    });

    this.setState({
      todoform: todoform,
      selectValue: obj.title,
      selectCode: obj.code,
    });
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
    this.setState({
      LooseArr: LooseArr.map((item, key) =>
        key == index ? { ...item, number: ev.target.value } : item
      ),
    });
  };
  hansheetsChange = (ev, index) => {
    console.log(ev.target.value);
    const LooseArr = [...this.state.LooseArr]; //浅拷贝一下
    this.setState({
      LooseArr: LooseArr.map((item, key) =>
        key == index ? { ...item, sheets: ev.target.value } : item
      ),
    });
  };
  hanpriceChange = (ev, index) => {
    console.log(ev.target.value);
    const LooseArr = [...this.state.LooseArr]; //浅拷贝一下
    this.setState({
      LooseArr: LooseArr.map((item, key) =>
        key == index ? { ...item, price: ev.target.value } : item
      ),
    });
  };
  hanAllpriceValueChange = (ev, index) => {
    console.log(ev.target.value);
    const LooseArr = [...this.state.LooseArr]; //浅拷贝一下
    this.setState({
      LooseArr: LooseArr.map((item, key) =>
        key == index ? { ...item, AllpriceValue: ev.target.value } : item
      ),
    });
  };
  add = () => {
    console.log(this.state.LooseArr);
    try {
      window.webkit.messageHandlers.VerificationDownload.postMessage("");
    } catch (error) {
      console.log(error);
    }

    let LooseArr = this.state.LooseArr;
    LooseArr.push({
      todoList: [
        {
          code: "startup",
          title: "开屏广告",
        },
        {
          code: "ordersDetail",
          title: "成交详情页-广告栏",
        },
      ],
      number: "",
      price: "",
      AllpriceShow:false,//连号总价格 是否显示
      AllpriceValue:"",//连号总价格 值
      sheets: "",
      selectValue: "请选择类型",
      selectCode: "",
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
          {this.state.LooseArr.map((item, key) => (
            <ul key={key}>
              <div className="title_num_del">
                <div className="sanlain">
                  <span></span>
                  <span>散连{key + 1}</span>
                  {this.props.ustatus == "2" ? (
                    <div className="chushou">
                      <div>
                        <img
                          src={require("../../assets/Unselected.png")}
                          alt=""
                        />
                        <span>整售</span>
                      </div>
                      <div>
                        <img
                          src={require("../../assets/Unselected.png")}
                          alt=""
                        />
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
                  value={item.sheets}
                  onChange={(ev) => this.hansheetsChange(ev, key)}
                  placeholder="请输入连张数"
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
              <li>
                <div>连号总价格</div>
                <input
                  type="text"
                  value={item.AllpriceValue}
                  onChange={(ev) => this.hanAllpriceValueChange(ev, key)}
                  placeholder="请输入价格"
                />
              </li>
              <li>
                <div>单价（元/张）</div>
                <input
                  type="text"
                  value={item.price}
                  onChange={(ev) => this.hanpriceChange(ev, key)}
                  placeholder="请输入价格"
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
