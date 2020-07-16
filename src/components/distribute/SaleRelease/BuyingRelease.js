import React, { Component } from "react";
import Uheader from "../../Goolbal/Uheader";
import Myseach from "../Global/myseach";
import LooseSale from "../Global/LooseSale";
import Serial from "../Global/Serial";
import Scattered from "../Global/Scattered";
import Address from "../Global/address";
import axios from "../../axios/index";
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
    this.state = {
      keyWord: "",
    };
  }
  getUrlParam = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = this.props.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    }
    return ""; //如果此处只写return;则返回的是undefined
  };
  setKeyWorld = (keyWord) => {
    log(keyWord);
    this.setState({
      keyWord:keyWord
    });
  };
  setexamination() {
    let unitName = this.getUrlParam("unitName");
    let Name = this.getUrlParam("name");
    if (!Name) {
      Toast.info("请输入名称", 1);
      return;
    }
    let Numbers = {
      A: "3",
      B: "3",
      C: "3",
    };
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
    log(myLooseSale_.LooseArr);
    myLooseSale_.LooseArr.map((item, key) => {
      if (item.number && item.dealPrice) {
        Numbers.A = "1";
      } else if (item.number || item.dealPrice) {
        Numbers.A = "2";
      } else if (!item.number && !item.dealPrice) {
        Numbers.A = "3";
      }
    });

    let scatteredJson = [...myLooseSale_.LooseArr];
    scatteredJson.map((item, key) => {
      item.unitName = unitName;
      item.dealCnt = 1;
      item.tag = "散单";
    });
    log(scatteredJson);

    //标连-------------------------------------------------------!!
    let [mySerial_, standardConsecutiveJson, mySerial_Length] = [
      this.userSerial_.current.state.LooseArr,
      [],
      this.userSerial_.current.state.LooseArr[
        this.userSerial_.current.state.LooseArr.length - 1
      ],
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
    }
    log(mySerial_);
    mySerial_.map((item, key) => {
      let tag = "";
      if (item.tag == "请选择类型") {
        tag = "";
      } else {
        tag = item.tag;
      }
      for (let key in item) {
        if (tag && item.dealPrice && item.number) {
          Numbers.B = "1";
        } else if (tag || item.dealPrice || item.number) {
          Numbers.B = "2";
        } else if (!tag && !item.dealPrice && !item.number) {
          Numbers.B = "3";
        }
      }
    });

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

    if (myScattered__Length.priceShow) {
      myScattered_obj.dealPrice = myScattered__Length.dealPrice;
    }
    if (myScattered__Length.AllpriceShow) {
      myScattered_obj.signlePrice = myScattered__Length.signlePrice;
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
        if (
          myScattered__Item.signlePrice &&
          myScattered__Item.dealPrice &&
          myScattered__Item.dealCnt &&
          myScattered__Item.number
        ) {
          Numbers.C = "1";
        } else if (
          myScattered__Item.signlePrice ||
          myScattered__Item.dealPrice ||
          myScattered__Item.dealCnt ||
          myScattered__Item.number
        ) {
          Numbers.C = "2";
        } else if (
          !myScattered__Item.signlePrice &&
          !myScattered__Item.dealPrice &&
          !myScattered__Item.dealCnt &&
          !myScattered__Item.number
        ) {
          Numbers.C = "3";
        }

        obj.signlePrice = myScattered__Item.signlePrice;
      } else if (
        myScattered__Item.priceShow == true &&
        myScattered__Item.AllpriceShow == false
      ) {
        tag = "散单";
        obj.dealPrice = myScattered__Item.dealPrice;
        if (
          myScattered__Item.dealPrice &&
          myScattered__Item.dealCnt &&
          myScattered__Item.number
        ) {
          Numbers.C = "1";
        } else if (
          myScattered__Item.dealPrice ||
          myScattered__Item.dealCnt ||
          myScattered__Item.number
        ) {
          Numbers.C = "2";
        } else if (
          !myScattered__Item.dealPrice &&
          !myScattered__Item.dealCnt &&
          !myScattered__Item.number
        ) {
          Numbers.C = "3";
        }
      } else if (
        myScattered__Item.priceShow == false &&
        myScattered__Item.AllpriceShow == true
      ) {
        tag = "散整";
        obj.dealPrice = myScattered__Item.signlePrice;
        obj.signlePrice = myScattered__Item.signlePrice;

        if (
          myScattered__Item.signlePrice &&
          myScattered__Item.dealCnt &&
          myScattered__Item.number
        ) {
          Numbers.C = "1";
        } else if (
          myScattered__Item.signlePrice ||
          myScattered__Item.dealCnt ||
          myScattered__Item.number
        ) {
          Numbers.C = "2";
        } else if (
          !myScattered__Item.signlePrice &&
          !myScattered__Item.dealCnt &&
          !myScattered__Item.number
        ) {
          Numbers.C = "3";
        }
      } else if (
        myScattered__Item.priceShow == false &&
        myScattered__Item.AllpriceShow == false
      ) {
        if (myScattered__Item.dealCnt || myScattered__Item.number) {
          Numbers.C = "2";
        }
      }
      obj.tag = tag;
      obj.dealCnt = myScattered__Item.dealCnt;
      obj.number = myScattered__Item.number;
      obj.priceShow = myScattered__Item.priceShow;
      obj.AllpriceShow = myScattered__Item.AllpriceShow;

      obj.unitName = unitName;
      otherConsecutiveJson.push(obj);
    }
    log(otherConsecutiveJson);

    log(Numbers);
    let NumbersB = 0;
    let NumbersC = 0;

    for (let key in Numbers) {
      log(Numbers[key]);
      if (Numbers[key] == "3") {
        NumbersB++;
      } else if (Numbers[key] == "2") {
        NumbersC++;
      }
    }
    if (NumbersB == 3) {
      Toast.info("请输入值", 1);
      return;
    }
    if (NumbersC > 0) {
      Toast.info("请输入有效值", 1);
      return;
    }
    log("执行代码");

    //检查预览
    log({
      pubUserid: "4028808361926f8a0161db4c492304e2", //用户id
      type: "2", //1 求购，2 出售
      categoryName: this.getUrlParam("category"), //商品分类
      name: this.getUrlParam("name"), //搜索框的名字
      dealPattern: dealPattern, //担保 2，线下 3
      isPostage: isPostage, //默认N 不包邮，Y 包邮。买没有包邮，固定填N
      scatteredJson:
        Numbers.A == "3" ? JSON.stringify([]) : JSON.stringify(scatteredJson),
      standardConsecutiveJson:
        Numbers.B == "3"
          ? JSON.stringify([])
          : JSON.stringify(standardConsecutiveJson),
      otherConsecutiveJson:
        Numbers.C == "3"
          ? JSON.stringify([])
          : JSON.stringify(otherConsecutiveJson),
      address: "",
      dealWay: "",
      personPhone: "",
      personName: "",
    });

      // axios
      //   .post("subject/json/addNumberFormat", {
      //     goodsId: this.getUrlParam("goodsId"),
      //     scatteredJson:
      //       Numbers.A == "3"
      //         ? JSON.stringify([])
      //         : JSON.stringify(scatteredJson),
      //     standardConsecutiveJson:
      //       Numbers.B == "3"
      //         ? JSON.stringify([])
      //         : JSON.stringify(standardConsecutiveJson),
      //     otherConsecutiveJson:
      //       Numbers.C == "3"
      //         ? JSON.stringify([])
      //         : JSON.stringify(otherConsecutiveJson),
      //   })
      //   .then((response) => {
      //     if (response.data.code == "10000") {
      //       //成功到库存页面
      //       // this.props.history.push("/");
      //       this.props.history.push({
      //         pathname: "/myStock",
      //         search: `userId=4028808361926f8a0161db4c492304e2&name=${this.getUrlParam(
      //           "name"
      //         )}&type=2`,
      //       });
      //     } else {
      //       Toast.info(response.data.message, 1);
      //     }
      //   })
      //   .catch((error) => {});
      this.props.history.push({
        pathname: "/preview",
        state: {
          goodsId: this.getUrlParam("goodsId"), //商品id
          pubUserid: "4028808361926f8a0161db4c492304e2", //用户id
          type: "2", //1 求购，2 出售
          categoryName: this.getUrlParam("category"), //商品分类
          name: this.getUrlParam("name"), //搜索框的名字
          dealPattern: dealPattern, //担保 2，线下 3
          isPostage: isPostage, //默认N 不包邮，Y 包邮。买没有包邮，固定填N
          scatteredJson:
            Numbers.A == "3"
              ? JSON.stringify([])
              : JSON.stringify(scatteredJson),
          standardConsecutiveJson:
            Numbers.B == "3"
              ? JSON.stringify([])
              : JSON.stringify(standardConsecutiveJson),
          otherConsecutiveJson:
            Numbers.C == "3"
              ? JSON.stringify([])
              : JSON.stringify(otherConsecutiveJson),
          address: "",
          dealWay: "",
          personPhone: "",
          personName: "",
        },
        search:`goodsId=${this.getUrlParam("goodsId")}`
      });

      // this.props.history.push({
      //   pathname: "/SaleDetails",
      //   state: {
      //     goodsId: this.getUrlParam("goodsId"), //搜索框的名字
      //     pubUserid: "4028808361926f8a0161db4c492304e2", //用户id
      //     type: "2", //1 求购，2 出售
      //     categoryName: this.getUrlParam("category"), //商品分类
      //     name: this.getUrlParam("name"), //搜索框的名字
      //     dealPattern: dealPattern, //担保 2，线下 3
      //     isPostage: isPostage, //默认N 不包邮，Y 包邮。买没有包邮，固定填N
      //     scatteredJson:
      //       Numbers.A == "3"
      //         ? JSON.stringify([])
      //         : JSON.stringify(scatteredJson),
      //     standardConsecutiveJson:
      //       Numbers.B == "3"
      //         ? JSON.stringify([])
      //         : JSON.stringify(standardConsecutiveJson),
      //     otherConsecutiveJson:
      //       Numbers.C == "3"
      //         ? JSON.stringify([])
      //         : JSON.stringify(otherConsecutiveJson),
      //     address: "",
      //     dealWay: "",
      //     personPhone: "",
      //     personName: "",
      //   },
      // });
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
            setKeyWorld={this.setKeyWorld}
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
