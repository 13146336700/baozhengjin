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
      tabBar: [
        { name: "散张出售" },
        { name: "标连整售" },
        { name: "散连出售" },
      ],
      Ontable: "tab-0",
    };
  }
  componentDidMount() {
    if (sessionStorage.getItem("BIAOLIAN_Ontable")) {
      //有值 回显
      this.setState({
        Ontable: sessionStorage.getItem("BIAOLIAN_Ontable"),
      });
    }
  }
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
          if (setstr.substring(setstr.length - 3) != "005") {
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
      keyWord: keyWord,
    });
  };
  tabChange(item, key) {
    log(item, key);
    let Ontable = `tab-${key}`;
    this.setState({
      Ontable: Ontable,
    });
    sessionStorage.setItem("BIAOLIAN_Ontable", Ontable);
  }
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
  isPositiveInteger = (s) => {
    //是否为正整数
    if (s.length > 18) {
      return false;
    }
    var re = /^\+?[1-9]\d*$/;
    return re.test(s);
  };
  setexamination() {
    let unitName = this.getUrlParam("unitName");
    let Name = this.getUrlParam("name");
    var priceReg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
    let _this = this;

    if (!Name) {
      Toast.info("请输入藏品名称", 1);
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
    if (My_seach.list[0].isCheck == true && My_seach.list[1].isCheck == true) {
      dealPattern = "5";
    } else if (
      My_seach.list[0].isCheck == true &&
      My_seach.list[1].isCheck == false
    ) {
      dealPattern = My_seach.list[0].dealPattern;
    } else if (
      My_seach.list[0].isCheck == false &&
      My_seach.list[1].isCheck == true
    ) {
      dealPattern = My_seach.list[1].dealPattern;
    }
    // log(dealPattern);
    if (!dealPattern) {
      Toast.info("请选择商品交易方式", 2);
      return;
    }

    // My_seach.list.map((item, key) => {
    //   if (item.isCheck == true) {
    //     dealPattern = item.dealPattern;
    //   }
    // });
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
        dealCnt: Number(mySerial_Item.dealCnt) + 1,
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
        obj.dealPrice = myScattered__Item.dealPrice;
      } else if (
        myScattered__Item.priceShow == true &&
        myScattered__Item.AllpriceShow == false
      ) {
        tag = "散单";
        obj.dealPrice = myScattered__Item.dealPrice;
        // obj.signlePrice = myScattered__Item.dealPrice;
        obj.signlePrice = "";
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
        // obj.signlePrice = myScattered__Item.signlePrice;

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
      Toast.info("请选择您要出售的商品类型", 2);
      return;
    }
    // if (NumbersC > 0) {
    //   Toast.info("请输入有效值", 2);
    //   return;
    // }

    log("执行代码");
    //  if(Numbers.A == "1" && Numbers.B == "1" && Numbers.C == "1"){

    //  }

    if (Numbers.A == "2") {
      for (var i = 0; i < scatteredJson.length; i++) {
        if (
          !priceReg.test(scatteredJson[i].dealPrice) ||
          Number(scatteredJson[i].dealPrice) <= 0
        ) {
          Toast.info("请输入散张出售正确的单价", 2);
          return;
        }
        if (!_this.setBuyingNumber(scatteredJson[i].number)) {
          Toast.info("请输入散张出售正确出售号码", 2);
          return;
        }
      }
    }
    console.log(standardConsecutiveJson);

    if (Numbers.B == "2") {
      for (var i = 0; i < standardConsecutiveJson.length; i++) {
        if (
          !_this.SETNUmber(
            standardConsecutiveJson[i].number,
            standardConsecutiveJson[i].dealCnt,
            "2",
            standardConsecutiveJson[i]
          )
        ) {
          Toast.info("填写的号码尾号请和示例尾号相同", 2);
          return;
        }

        if (
          !priceReg.test(standardConsecutiveJson[i].dealPrice) ||
          Number(standardConsecutiveJson[i].dealPrice) <= 0
        ) {
          Toast.info("请输入标连整售正确的总价格", 2);
          return;
        }

        if (
          !standardConsecutiveJson[i].tag ||
          standardConsecutiveJson[i].tag == "请选择类型"
        ) {
          Toast.info("请选择标连整售的出售类型", 2);
          return;
        }
        if (!_this.setBuyingNumber(standardConsecutiveJson[i].number)) {
          Toast.info("请输入标连整售正确出售号码", 2);
          return;
        }
      }
    }
    if (Numbers.C == "2") {
      for (var i = 0; i < otherConsecutiveJson.length; i++) {
        //整售 单售
        if (
          otherConsecutiveJson[i].priceShow == true &&
          otherConsecutiveJson[i].AllpriceShow == true
        ) {
          if (Number(otherConsecutiveJson[i].dealCnt) > 18) {
            Toast.info("散连出售选择单售时,出售数量不能大于18", 3);
            return;
          }
          if (
            !priceReg.test(otherConsecutiveJson[i].dealPrice) ||
            Number(otherConsecutiveJson[i].dealPrice) <= 0
          ) {
            Toast.info("请输入散连出售正确的单价", 2);
            return;
          }
          if (
            !priceReg.test(otherConsecutiveJson[i].signlePrice) ||
            Number(otherConsecutiveJson[i].signlePrice) <= 0
          ) {
            Toast.info("请输入散连出售正确的总价格", 2);
            return;
          }
          // if (
          //   !priceReg.test(otherConsecutiveJson[i].dealPrice) ||
          //   !priceReg.test(otherConsecutiveJson[i].signlePrice)
          // ) {
          //   Toast.info("请输入散连出售正确的价格:整数或者保留两位小数", 2);
          //   return;
          // }
        }
        //单售
        if (
          otherConsecutiveJson[i].priceShow ||
          otherConsecutiveJson[i].AllpriceShow == false
        ) {
          if (Number(otherConsecutiveJson[i].dealCnt) > 18) {
            Toast.info("散连出售选择单售时,出售数量不能大于18", 3);
            return;
          }
          if (!this.isPositiveInteger(otherConsecutiveJson[i].dealCnt)) {
            Toast.info("散连出售出售数量为大于0的整数", 2);
            return;
          }
          if (
            !priceReg.test(otherConsecutiveJson[i].dealPrice) ||
            Number(otherConsecutiveJson[i].dealPrice) <= 0
          ) {
            Toast.info("请输入散连出售正确的单价", 2);
            return;
          }
          // if (!priceReg.test(otherConsecutiveJson[i].dealPrice)) {
          //   Toast.info("请输入散连出售正确的单价:整数或者保留两位小数", 2);
          //   return;
          // }
        }

        //整售
        if (
          otherConsecutiveJson[i].AllpriceShow ||
          otherConsecutiveJson[i].priceShow == false
        ) {
          if (Number(otherConsecutiveJson[i].dealCnt) > 100000) {
            Toast.info("散连出售选择整售时,出售数量不能大于5位数", 3);
            return;
          }
          if (!this.isPositiveInteger(otherConsecutiveJson[i].dealCnt)) {
            Toast.info("散连出售出售数量为大于0的整数", 2);
            return;
          }

          if (
            !priceReg.test(otherConsecutiveJson[i].dealPrice) ||
            Number(otherConsecutiveJson[i].dealPrice) <= 0
          ) {
            Toast.info("请输入散连出售正确的总价格", 2);
            return;
          }
          // if (!priceReg.test(otherConsecutiveJson[i].dealCnt)) {
          //   Toast.info("请输入散连出售正确的连号总价:整数或者保留两位小数", 2);
          //   return;
          // }
        }

        if (!_this.setBuyingNumber(otherConsecutiveJson[i].number)) {
          Toast.info("请输入散连出售正确出售号码", 2);
          return;
        }
      }
    }

    //-----------------------------------
    if (Numbers.A == "1") {
      for (var i = 0; i < scatteredJson.length; i++) {
        if (
          !priceReg.test(scatteredJson[i].dealPrice) ||
          Number(scatteredJson[i].dealPrice) <= 0
        ) {
          Toast.info("请输入散张出售正确的单价", 2);
          return;
        }
        if (!_this.setBuyingNumber(scatteredJson[i].number)) {
          Toast.info("请输入散张出售正确出售号码", 2);
          return;
        }
      }
    }

    if (Numbers.B == "1") {
      for (var i = 0; i < standardConsecutiveJson.length; i++) {
        if (
          !_this.SETNUmber(
            standardConsecutiveJson[i].number,
            standardConsecutiveJson[i].dealCnt,
            "2",
            standardConsecutiveJson[i]
          )
        ) {
          Toast.info("填写的号码尾号请和示例尾号相同", 2);
          return;
        }
        if (
          !priceReg.test(standardConsecutiveJson[i].dealPrice) ||
          Number(standardConsecutiveJson[i].dealPrice) <= 0
        ) {
          Toast.info("请输入标连整售正确的总价格", 2);
          return;
        }
        if (
          !standardConsecutiveJson[i].tag ||
          standardConsecutiveJson[i].tag == "请选择类型"
        ) {
          Toast.info("请选择标连整售的出售类型", 2);
          return;
        }
        if (!_this.setBuyingNumber(standardConsecutiveJson[i].number)) {
          Toast.info("请输入标连整售正确出售号码", 2);
          return;
        }
      }
    }
log(otherConsecutiveJson);

    if (Numbers.C == "1") {
      for (var i = 0; i < otherConsecutiveJson.length; i++) {
        //整售 单售
        if (
          otherConsecutiveJson[i].priceShow == true &&
          otherConsecutiveJson[i].AllpriceShow == true
        ) {
          if (Number(otherConsecutiveJson[i].dealCnt) > 18) {
            Toast.info("散连出售选择单售时,出售数量不能大于18", 3);
            return;
          }
          if (
            !priceReg.test(otherConsecutiveJson[i].dealPrice) ||
            Number(otherConsecutiveJson[i].dealPrice) <= 0
          ) {
            Toast.info("请输入散连出售正确的单价", 2);
            return;
          }
          if (
            !priceReg.test(otherConsecutiveJson[i].signlePrice) ||
            Number(otherConsecutiveJson[i].signlePrice) <= 0
          ) {
            Toast.info("请输入散连出售正确的总价格", 2);
            return;
          }
          // if (
          //   !priceReg.test(otherConsecutiveJson[i].dealPrice) ||
          //   !priceReg.test(otherConsecutiveJson[i].signlePrice)
          // ) {
          //   Toast.info("请输入散连出售正确的价格:整数或者保留两位小数", 2);
          //   return;
          // }
        }
        //单售
        if (
          otherConsecutiveJson[i].priceShow ||
          otherConsecutiveJson[i].AllpriceShow == false
        ) {
          if (Number(otherConsecutiveJson[i].dealCnt) > 18) {
            Toast.info("散连出售选择单售时,出售数量不能大于18", 3);
            return;
          }
          if (!this.isPositiveInteger(otherConsecutiveJson[i].dealCnt)) {
            Toast.info("散连出售出售数量为大于0的整数", 2);
            return;
          }
          if (
            !priceReg.test(otherConsecutiveJson[i].dealPrice) ||
            Number(otherConsecutiveJson[i].dealPrice) <= 0
          ) {
            Toast.info("请输入散连出售正确的单价", 2);
            return;
          }
          // if (!priceReg.test(otherConsecutiveJson[i].dealPrice)) {
          //   Toast.info("请输入散连出售正确的单价:整数或者保留两位小数", 2);
          //   return;
          // }
        }

        //整售
        if (
          otherConsecutiveJson[i].AllpriceShow ||
          otherConsecutiveJson[i].priceShow == false
        ) {
          if (Number(otherConsecutiveJson[i].dealCnt) > 100000) {
            Toast.info("散连出售选择整售时,出售数量不能大于5位数", 3);
            return;
          }
          if (!this.isPositiveInteger(otherConsecutiveJson[i].dealCnt)) {
            Toast.info("散连出售出售数量为大于0的整数", 2);
            return;
          }

          if (
            !priceReg.test(otherConsecutiveJson[i].dealPrice) ||
            Number(otherConsecutiveJson[i].dealPrice) <= 0
          ) {
            Toast.info("请输入散连出售正确的总价格", 2);
            return;
          }
          // if (!priceReg.test(otherConsecutiveJson[i].dealCnt)) {
          //   Toast.info("请输入散连出售正确的连号总价:整数或者保留两位小数", 2);
          //   return;
          // }
        }

        if (!_this.setBuyingNumber(otherConsecutiveJson[i].number)) {
          Toast.info("请输入散连出售正确出售号码", 2);
          return;
        }
      }
    }

    //检查预览
    log({
      pubUserid: "4028808361926f8a0161db4c492304e2", //用户id
      type: "2", //1 求购，2 出售
      categoryName: this.getUrlParam("category"), //商品分类
      name: this.getUrlParam("name"), //搜索框的名字
      dealPattern: dealPattern, //担保 2，线下 3
      isPostage: isPostage, //默认N 不包邮，Y 包邮。买没有包邮，固定填N
      scatteredJson:
        Numbers.A == "3" ? JSON.stringify([]) : JSON.stringify(scatteredJson), //散装规格Json
      standardConsecutiveJson:
        Numbers.B == "3"
          ? JSON.stringify([])
          : JSON.stringify(standardConsecutiveJson), //连号整售
      otherConsecutiveJson:
        Numbers.C == "3"
          ? JSON.stringify([])
          : JSON.stringify(otherConsecutiveJson), //其他连号整售
      address: "",
      dealWay: "",
      personPhone: "",
      personName: "",
    });

    this.props.history.push({
      pathname: "/preview",
      state: {
        goodsId: this.getUrlParam("goodsId"), //商品id
        // pubUserid: "4028808361926f8a0161db4c492304e2", //用户id
        pubUserid: JSON.parse(sessionStorage.getItem("userInfo")).userId, //用户id
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
        assureAddress: "",
        assurePersonPhone: "",
        assurePersonName: "",
      },
      // search:`goodsId=${this.getUrlParam("goodsId")}&name=${this.getUrlParam("name")}`
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
        <Uheader
          {...this.props}
          utitle={this.getUrlParam("goodsId") ? "增加出售需求" : "配号出售发布"}
        ></Uheader>
        <p className="header_border_bottom"></p>
        <div
          className="Increase_title"
          style={{ display: this.getUrlParam("goodsId") ? "block" : "none" }}
        >
          <span>{this.getUrlParam("name")}</span>
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

        {/* <div className="zhanwei"></div> */}
        <div className="tabBar">
          <ul>
            {this.state.tabBar.map((item, key) => (
              <li
                key={key}
                onClick={() => this.tabChange(item, key)}
                className={this.state.Ontable == `tab-${key}` ? "onActive" : ""}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <div
          style={{ display: this.state.Ontable == "tab-0" ? "block" : "none" }}
        >
          {/* <div className="zhanwei"></div> */}
          <LooseSale
            {...this.props}
            uname="散张出售"
            ref={this.userLooseSale_}
          ></LooseSale>
        </div>
        <div
          style={{ display: this.state.Ontable == "tab-1" ? "block" : "none" }}
        >
          {/* <div className="zhanwei"></div> */}
          <Serial
            {...this.props}
            utitle="整售"
            userName="出售"
            ref={this.userSerial_}
          ></Serial>
        </div>
        <div
          style={{ display: this.state.Ontable == "tab-2" ? "block" : "none" }}
        >
          {/* <div className="zhanwei"></div> */}
          <Scattered
            ustatus="2"
            {...this.props}
            ref={this.userScattered_}
          ></Scattered>
        </div>
        <div className="zhanwei"></div>
        <div className="zhanwei"></div>
        <div className="Footer_zhanwei"></div>
        <button className="adddelte" onClick={() => this.setexamination()}>
          预览检查
        </button>
        <div className="zhanwei"></div>
      </div>
    );
  }
}
