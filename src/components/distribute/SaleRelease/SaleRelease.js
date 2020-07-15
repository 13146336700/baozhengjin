import React, { Component } from "react";
import Uheader from "../../Goolbal/Uheader";
import Myseach from "../Global/myseach";
import Loose from "../Global/Loose";
import Serial from "../Global/Serial";
import Scattered from "../Global/Scattered";
import Address from "../Global/address";
import axios from "../../axios/index";
import { Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
import "./SaleRelease.scss";

var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
const log = console.log;

export default class SaleRelease extends React.Component {
  constructor(props) {
    super(props);
    this.userseach_ = React.createRef(); //搜索框的
    this.userLoose_ = React.createRef(); //搜索框的
    this.userSerial_ = React.createRef(); //标连的
    this.userScattered_ = React.createRef(); //散连的
    this.userAddress_ = React.createRef(); //地址的
  }
  componentWillMount() {
    console.log(this.getUrlParam("name"));
  }
  getUrlParam = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = this.props.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    }
    return ""; //如果此处只写return;则返回的是undefined
  };
  PhotoImageUpload = () => {
    // this.props.history.push("/SaleDetails");
    //地址 ---------------------------------------
    let MyuserAddress_ = this.userAddress_.current.state;

    log(MyuserAddress_);

    let unitName = this.getUrlParam("unitName");
    //搜索框的数据
    let [My_seach, dealPattern, isPostage] = [
      this.userseach_.current.state,
      "",
      "N",
    ];
    My_seach.list.map((item, key) => {
      if (item.isCheck == true) {
        dealPattern = item.dealPattern;
      }
    });

    //散张求购---------------------------------------
    let [My_Loose_, Loose_Last, LooseObj, tag] = [
      this.userLoose_.current.state.LooseArr,
      this.userLoose_.current.state.LooseArr[
        this.userLoose_.current.state.LooseArr.length - 1
      ],
      {},
      "",
    ];
log(My_Loose_);
    LooseObj.number = Loose_Last.number;
    LooseObj.dealPrice = Loose_Last.dealPrice;
    if (Loose_Last.selectValue == "请选择类型") {
      tag = "";
    } else {
      tag = Loose_Last.selectValue;
    }
    LooseObj.tag = tag;

    for (var key in LooseObj) {
      if (!LooseObj[key]) {
        Toast.info("散张请输入有效数字", 2);
        return;
      }
    }

    let scatteredJson = [];
    My_Loose_.map((item, key) => {
      let obj = {
        unitName:unitName,
        dealPrice:item.dealPrice,
        number:item.number,
        dealCnt:1,
        tag:"散张",
      };
      scatteredJson.push(obj);
    });
    log(scatteredJson);

    //标连-------------------------------------------------------!!
    let [mySerial_, standardConsecutiveJson] = [
      this.userSerial_.current.state.LooseArr,
      [],
    ];

    for (let i = 0; i < mySerial_.length; i++) {
      let mySerial_Item = mySerial_[i];
      let obj = {
        tag: mySerial_Item.tag,
        dealCnt: mySerial_Item.dealCnt,
        number: mySerial_Item.number,
        dealPrice: mySerial_Item.dealPrice,
        unitName: unitName,
      };

      standardConsecutiveJson.push(obj);
      for (let key1 in mySerial_Item) {
        if (!mySerial_Item[key1]) {
          console.log(mySerial_Item[key1]);
          Toast.info("标连请输入有效值", 1);
          return;
        }
      }
    }

    log(standardConsecutiveJson);

    //散连 ---------------------------------------
    let [
      myScattered__,
      otherConsecutiveJson,
      myScattered__Length,
      myScattered_obj,
    ] = [
      this.userScattered_.current.state.LooseArr,
      [],
      this.userScattered_.current.state.LooseArr[
        this.userScattered_.current.state.LooseArr.length - 1
      ],
      {},
    ];
    log(myScattered__Length);
    myScattered_obj.dealCnt = myScattered__Length.dealCnt;
    myScattered_obj.number = myScattered__Length.number;
    myScattered_obj.signlePrice = myScattered__Length.signlePrice;
    for (let key in myScattered_obj) {
      if (!myScattered_obj[key]) {
        Toast.info("散连请输入有效数值", 2);
        return;
      }
    }

    for (let i = 0; i < myScattered__.length; i++) {
      let myScattered__Item = myScattered__[i];
      let obj = {};
      obj.tag = "散连";
      obj.dealCnt = myScattered__Item.dealCnt;
      obj.number = myScattered__Item.number;
      obj.signlePrice = myScattered__Item.signlePrice;
      obj.unitName = unitName;
      otherConsecutiveJson.push(obj);
    }
    log(otherConsecutiveJson);

    //检查预览
    log({
      pubUserid: "4028808361926f8a0161db4c492304e2", //用户id
      type: "1", //1 求购，2 出售
      categoryName: this.getUrlParam("category"), //商品分类
      name: this.getUrlParam("name"), //搜索框的名字
      dealPattern: dealPattern, //担保 2，线下 3
      isPostage: "N", //默认N 不包邮，Y 包邮。买没有包邮，固定填N
      scatteredJson: JSON.stringify(scatteredJson),
      standardConsecutiveJson: JSON.stringify(standardConsecutiveJson),
      otherConsecutiveJson: JSON.stringify(otherConsecutiveJson),
      address: MyuserAddress_.address,
      dealWay: MyuserAddress_.dealWay,
      personPhone: MyuserAddress_.phone,
      personName: MyuserAddress_.personName,
    });
    this.props.history.push({
      pathname:"/SaleDetails",
      state:{
      pubUserid: "4028808361926f8a0161db4c492304e2", //用户id
      type: "1", //1 求购，2 出售
      categoryName: this.getUrlParam("category"), //商品分类
      name: this.getUrlParam("name"), //搜索框的名字
      dealPattern: dealPattern, //担保 2，线下 3
      isPostage: "N", //默认N 不包邮，Y 包邮。买没有包邮，固定填N
      scatteredJson: JSON.stringify(scatteredJson),
      standardConsecutiveJson: JSON.stringify(standardConsecutiveJson),
      otherConsecutiveJson: JSON.stringify(otherConsecutiveJson),
    address:MyuserAddress_.address,
    dealWay:MyuserAddress_.dealWay,
    personPhone:MyuserAddress_.phone,
    personName:MyuserAddress_.personName,
      }
    });
  };
  render() {
    return (
      <div className="SaleRelease">
        <Uheader {...this.props} utitle="配号求购发布"></Uheader>
        <p className="header_border_bottom"></p>
        <Myseach
          {...this.props}
          ustate="SaleRelease"
          ref={this.userseach_}
        ></Myseach>
        <Address {...this.props} type="1" ref={this.userAddress_}></Address>
        <div className="zhanwei"></div>
        <Loose {...this.props} uname="散张求购" ref={this.userLoose_}></Loose>
        <div className="zhanwei"></div>
        <Serial {...this.props} utitle="求购" ref={this.userSerial_}></Serial>
        <div className="zhanwei"></div>
        <Scattered
          ustatus="1"
          {...this.props}
          ref={this.userScattered_}
        ></Scattered>
        <div className="zhanwei"></div>
        <div className="zhanwei"></div>
        <button className="adddelte" onClick={() => this.PhotoImageUpload()}>
          增加详情
        </button>
        <div className="zhanwei"></div>
      </div>
    );
  }
}
