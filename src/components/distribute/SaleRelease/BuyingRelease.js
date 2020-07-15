import React, { Component } from "react";
import Uheader from "../../Goolbal/Uheader";
import Myseach from "../Global/myseach";
import LooseSale from "../Global/LooseSale";
import Serial from "../Global/Serial";
import Scattered from "../Global/Scattered";
import Address from "../Global/address";
import "./SaleRelease.scss";
import { Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
let log = console.log;
export default class BuyingRelease extends React.Component {
  constructor(props) {
    super(props);
    this.userseach_ = React.createRef(); //搜索框的
    this.userLooseSale_ = React.createRef(); //散连的
    this.userSerial_ = React.createRef(); //标连的
    this.userScattered_ = React.createRef(); //散连的
  }
  getUrlParam = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = this.props.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    }
    return ""; //如果此处只写return;则返回的是undefined
  };
  setexamination() {
    let unitName = this.getUrlParam("name");
    if (!unitName) {
      Toast.info("请输入名称", 1);
      return;
    }
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
    //是否包邮
    if (My_seach.checked) {
      isPostage = "Y";
    } else {
      isPostage = "N";
    }

    //-------------------------------------------------------
    //散连数据
    let [myLooseSale_] = [this.userLooseSale_.current.state];
    //是否为空
    let myLooseSale_obj =
      myLooseSale_.LooseArr[myLooseSale_.LooseArr.length - 1];
    for (let key in myLooseSale_obj) {
      if (!myLooseSale_obj[key]) {
        console.log(myLooseSale_obj[key]);
        Toast.info("散张请输入有效值", 1);
        return;
      }
    }

    let scatteredJson = [...myLooseSale_.LooseArr];
    scatteredJson.map((item, key) => {
      item.unitName = unitName;
      item.dealCnt = 1;
      item.tag = "散单";
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

    myScattered_obj.dealCnt = myScattered__Length.dealCnt;
    myScattered_obj.number = myScattered__Length.number;
    if (
      myScattered__Length.priceShow == false &&
      myScattered__Length.AllpriceShow == false
    ) {
      Toast.info("请选择整售或者单售", 2);
      return;
    }
    if (myScattered__Length.priceShow) {
      myScattered_obj.dealPrice = myScattered__Length.dealPrice;
    }
    if (myScattered__Length.AllpriceShow) {
      myScattered_obj.signlePrice = myScattered__Length.signlePrice;
    }

    for (let key in myScattered_obj) {
      if (!myScattered_obj[key]) {
        Toast.info("请输入散连值", 1);
        return;
      }
    }

    log(myScattered__);
    for (let i = 0; i < myScattered__.length; i++) {
      let myScattered__Item = myScattered__[i];
      let obj = {};
      let tag = "";
      if (
        myScattered__Item.priceShow == true &&
        myScattered__Item.AllpriceShow == true
      ) {
        tag = "散单整";
        obj.signlePrice = myScattered__Item.signlePrice;
      } else if (
        myScattered__Item.priceShow == true &&
        myScattered__Item.AllpriceShow == false
      ) {
        tag = "散单";
        obj.dealPrice = myScattered__Item.dealPrice;
      } else if (
        myScattered__Item.priceShow == false &&
        myScattered__Item.AllpriceShow == true
      ) {
        tag = "散整";
        obj.dealPrice = myScattered__Item.signlePrice;
        obj.signlePrice = myScattered__Item.signlePrice;
      }
      obj.tag = tag;
      obj.dealCnt = myScattered__Item.dealCnt;
      obj.number = myScattered__Item.number;

      obj.unitName = unitName;
      otherConsecutiveJson.push(obj);
    }
    log(otherConsecutiveJson);

    //检查预览
    log({
      pubUserid: "4028808361926f8a0161db4c492304e2", //用户id
      type: "2", //1 求购，2 出售
      categoryName: this.getUrlParam("category"), //商品分类
      name: this.getUrlParam("name"), //搜索框的名字
      dealPattern: dealPattern, //担保 2，线下 3
      isPostage: isPostage, //默认N 不包邮，Y 包邮。买没有包邮，固定填N
      scatteredJson: JSON.stringify(scatteredJson),
      standardConsecutiveJson: JSON.stringify(standardConsecutiveJson),
      otherConsecutiveJson: JSON.stringify(otherConsecutiveJson),
      address: "",
      dealWay: "",
      personPhone: "",
      personName: "",
    });
    this.props.history.push({
      pathname: "/SaleDetails",
      state: {
        pubUserid: "4028808361926f8a0161db4c492304e2", //用户id
        type: "2", //1 求购，2 出售
        categoryName: this.getUrlParam("category"), //商品分类
        name: this.getUrlParam("name"), //搜索框的名字
        dealPattern: dealPattern, //担保 2，线下 3
        isPostage: isPostage, //默认N 不包邮，Y 包邮。买没有包邮，固定填N
        scatteredJson: JSON.stringify(scatteredJson),
        standardConsecutiveJson: JSON.stringify(standardConsecutiveJson),
        otherConsecutiveJson: JSON.stringify(otherConsecutiveJson),
        address: "",
        dealWay: "",
        personPhone: "",
        personName: "",
      },
    });
  }
  render() {
    return (
      <div className="SaleRelease">
        <Uheader {...this.props} utitle="配号出售发布"></Uheader>
        <p className="header_border_bottom"></p>
        <div
          className="Increase_title"
          style={{ display: this.getUrlParam("goodsId") ? "block" : "none" }}
        >
          <span>{this.getUrlParam("name")}</span>{" "}
        </div>
        <div
          style={{ display: this.getUrlParam("goodsId") ? "none" : "block" }}
        >
          <Myseach
            {...this.props}
            ustate="BuyingRelease"
            ref={this.userseach_}
          ></Myseach>
        </div>

        <div className="zhanwei"></div>
        <LooseSale
          {...this.props}
          uname="散张出售"
          ref={this.userLooseSale_}
        ></LooseSale>
        <div className="zhanwei"></div>
        <Serial {...this.props} utitle="整售" ref={this.userSerial_}></Serial>
        <div className="zhanwei"></div>
        <Scattered
          ustatus="2"
          {...this.props}
          ref={this.userScattered_}
        ></Scattered>
        <div className="zhanwei"></div>
        <div className="zhanwei"></div>
        <button className="adddelte" onClick={() => this.setexamination()}>
          预览检查
        </button>
        <div className="zhanwei"></div>
      </div>
    );
  }
}
