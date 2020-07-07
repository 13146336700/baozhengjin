import React, { Component } from "react";
import "./help.scss";
export default class promotion extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   selectValue:'startup'
    // };
    this.selectChange = this.selectChange.bind(this);
  }
  state = {
    todoList: [
      {
        code: "startup",
        title: "开屏广告",
      },
      {
        code: "indexbanner",
        title: "首页-轮播图",
      },
      {
        code: "indexNotice",
        title: "首页-小喇叭",
      },
      {
        code: "indexNews",
        title: "首页-资讯区",
      },
      {
        code: "indexGoods",
        title: "首页-最新求购/出售",
      },
      {
        code: "searchGoods",
        title: "搜索页-买卖贴",
      },
      {
        code: "marketbanner",
        title: "行情列表页-轮播图",
      },
      {
        code: "marketNotice",
        title: "行情列表页-小喇叭",
      },
      {
        code: "marketNews",
        title: "行情列表页-资讯区",
      },
      {
        code: "marketDetail",
        title: "行情详情页-广告栏",
      },
      {
        code: "marketDsp",
        title: "行情详情页-对手盘",
      },
      {
        code: "sbuybanner",
        title: "买卖盘列表页-轮播图",
      },
      {
        code: "sbuyNotice",
        title: "买卖盘列表页-小喇叭",
      },
      {
        code: "sbuyTj",
        title: "买卖盘列表页-推荐",
      },
      {
        code: "goodsDetail",
        title: "商品详情页-广告栏",
      },
      {
        code: "goodsDsp",
        title: "商品详情页-对手盘",
      },
      {
        code: "ordersDetail",
        title: "成交详情页-广告栏",
      },
      {
        code: "orderDsp",
        title: "成交详情页-对手盘",
      },
      {
        code: "publish",
        title: "商品发布页-广告栏",
      },
    ],
    todoform: [], //动态广告形式
    // selectValue: "开屏广告",
    selectValue: "",
    selectCode: "",
  };
  componentWillMount() {
    document.title = "推广帮助说明";
    console.log(this.getUrlParam("code"));
    // console.log(this.getUrlParam("code"));
    }
  componentDidMount() {
 

    this.changeDOM(this.getUrlParam("code") || "startup");
  
  };
  getUrlParam = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = this.props.location.search.substr(1).match(reg);
    console.log(window.location);
    if (r != null) {
      return decodeURI(r[2]);
    }
    return ""; //如果此处只写return;则返回的是undefined
  };
  selectChange = (ev) => {
    var obj = this.state.todoList.find(function (key) {
      return key.code === ev.target.value;
    });
    this.changeDOM(obj.code);
    console.log(obj);

    this.setState({
      selectValue: obj.title,
      selectCode:obj.code
    });
  };
  changeDOM = (value = "startup") => {
    //DOM改变
    let [Claim, size, name] = ["需提供资料及要求", "图片大小:不超过1M", "图片"];
    let todoform = [];
    switch (value) {
      case "startup":
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
      case "indexbanner":
        todoform = [
          {
            name: name,
            img: "http://image.ybk008.com/21591687938736",
            Claim: Claim,
            sizeimg: "图片尺寸690*276像素",
            size: size,
          },
        ];
        break;
      case "indexNotice":
        todoform = [
          {
            name: "文字",
            img: "http://image.ybk008.com/11592030112198",
          },
        ];
        break;
      case "indexNews":
        todoform = [
          {
            name: "文字",
            img: "http://image.ybk008.com/21592030137158",
          },
        ];
        break;
      case "indexGoods":
        todoform = [
          {
            name: "文字",
            img: "http://image.ybk008.com/31592030159181",
          },
        ];
        break;
      case "searchGoods":
        todoform = [
          {
            name: "文字",
            img: "http://image.ybk008.com/41592030181910",
          },
        ];
        break;
      case "marketbanner":
        todoform = [
          {
            name: name,
            img: "http://image.ybk008.com/31591687951554",
            Claim: Claim,
            sizeimg: "图片尺寸180*750像素",
            size: size,
          },
        ];
        break;
      case "marketNotice":
        todoform = [
          {
            name: "文字",
            img: "http://image.ybk008.com/51592030229158",
          },
        ];
        break;
      case "marketNews":
        todoform = [
          {
            name: "文字",
            img: "http://image.ybk008.com/61592030269806",
          },
        ];
        break;
      case "marketDetail":
        todoform = [
          {
            name: name,
            img: "http://image.ybk008.com/41591687962697",
            Claim: Claim,
            sizeimg: "图片尺寸608*110像素",
            size: size,
          },
          {
            name: "文字",
            img: "http://image.ybk008.com/51591687994080",
          },
        ];
        break;
      case "marketDsp":
        todoform = [
          {
            name: "文字",
            img: "http://image.ybk008.com/71592030306150",
          },
        ];
        break;
      case "sbuybanner":
        todoform = [
          {
            name: name,
            img: "http://image.ybk008.com/61591688005344",
            Claim: Claim,
            sizeimg: "图片尺寸180*750像素",
            size: size,
          },
        ];
        break;
      case "sbuyNotice":
        todoform = [
          {
            name: "文字",
            img: "http://image.ybk008.com/81592030325502",
          },
        ];
        break;
      case "sbuyTj":
        todoform = [
          {
            name: "文字",
            img: "http://image.ybk008.com/71591688015849",
          },
        ];
        break;
        case "goodsDetail":
          todoform = [
            {
              name: name,
              img: "http://image.ybk008.com/81591688037672",
              Claim: Claim,
              sizeimg: "图片尺寸608*110像素",
              size: size,
            },
            {
              name: "文字",
              img: "http://image.ybk008.com/91591688058912",
            }
          ];
          break;
          case "goodsDsp":
          todoform = [
            {
              name: "文字",
              img: "http://image.ybk008.com/91592030360014",
            }
          ];
          break;
          case "ordersDetail":
            todoform = [
              {
                name: name,
                img: "http://image.ybk008.com/101591688070672",
                Claim: Claim,
                sizeimg: "图片尺寸608*110像素",
                size: size,
              },
              {
                name: "文字",
                img: "http://image.ybk008.com/111591688081008",
              }
            ];
            break;
            case "orderDsp":
          todoform = [
            {
              name: "文字",
              img: "http://image.ybk008.com/101592030381190",
            }
          ];
          break;
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
              }
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
      selectCode:obj.code
    });
  };
  render() {
    return (
      <div className="promotion">
        <div className="zhanwei"></div>
        <div className="help_HeaDer">
          <div className="help_HeaDer_home">
            <div>位置</div>
            <div className="select-area">
              {/* <span>APP搜索行情页</span> */}
              <span>{this.state.selectValue}</span>
              <img src={require("../assets/icon_right.png")} alt="" />
              <select
                onChange={(e) => this.selectChange(e)}
                value={this.state.selectCode}
              >
                {this.state.todoList.map((item, key) => (
                  <option value={item.code} key={key + 5}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <p className="xingshi">广告形式</p>
        {this.state.todoform.map((item, key) => (
          <div className="userType" key={key + 50}>
            <p className="miaoshu">{item.name}</p>
            <img src={item.img} alt="" className="user_img" />
            <p className="Claim">{item.Claim}</p>
            <p className="Claim_size">
              {item.sizeimg} <span>{item.size}</span>
            </p>
            <div className="zhanwei"></div>
            <div className="zhanwei"></div>
          </div>
        ))}

        <div className="zhanwei"></div>
        <div className="zhanwei"></div>
        <div className="zhanwei"></div>
      </div>
    );
  }
}
