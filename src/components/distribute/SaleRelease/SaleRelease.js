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
    this.state = {
      keyWord: "",
      tabBar: [
        { name: "散张求购" },
        { name: "标连求购" },
        { name: "散连求购" },
      ],
      Ontable: "tab-0",
      buuttonShow: true,
    };
  }

  componentWillUnmount() {
    // window.removeEventListener("resize", this.onWindowResize);
  }
  componentDidMount() {
    // window.addEventListener("resize", this.onWindowResize);
    if (sessionStorage.getItem("BIAOLIAN_Ontable")) {
      //有值 回显
      this.setState({
        Ontable: sessionStorage.getItem("BIAOLIAN_Ontable"),
      });
    }

    let _this = this;

    var originalHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
    window.onresize = function () {
      //键盘弹起与隐藏都会引起窗口的高度发生变化
      var resizeHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      if (resizeHeight - 0 < originalHeight - 0) {
        //当软键盘弹起，在此处操作
        _this.setState({
          buuttonShow: false,
        });
      } else {
        //当软键盘收起，在此处操作
        _this.setState({
          buuttonShow: true,
        });
      }
    };
  }
  componentWillMount() {
    console.log(this.getUrlParam("name"));
  }
  // onWindowResize = () => {
  //   Toast.info(document.body.clientHeight, 2);
  // };
  getUrlParam = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = this.props.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    }
    return ""; //如果此处只写return;则返回的是undefined
  };
  isPositiveInteger = (s) => {
    //是否为正整数
    if (s.length > 18) {
      return false;
    }
    var re = /^\+?[1-9]\d*$/;
    return re.test(s);
  };
  setKeyWorld = (keyWord) => {
    log(keyWord);
    this.setState({
      keyWord: keyWord,
    });
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
  tabChange = (item, key) => {
    log(item, key);
    let Ontable = `tab-${key}`;
    this.setState({
      Ontable: Ontable,
    });
    sessionStorage.setItem("BIAOLIAN_Ontable", Ontable);
  };
  setBuyingNumber = (ischeck) => {
    if (
      ischeck.length < 1 ||
      ischeck.length > 20 ||
      /[\u4E00-\u9FA5]/i.test(ischeck)
    ) {
      return false;
    } else {
      return true;
    }
  };
  PhotoImageUpload = () => {
    let _this = this;
    let Name = this.getUrlParam("name");
    var priceReg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
    if (!Name) {
      Toast.info("请输入藏品名称", 2);
      return;
    }

    let Numbers = {
      A: "3",
      B: "3",
      C: "3",
    };

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

    // My_seach.list.map((item, key) => {
    //   if (item.isCheck == true) {
    //     dealPattern = item.dealPattern;
    //   }
    // });

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
      tag = "请选择类型";
    } else {
      tag = Loose_Last.selectValue;
    }
    LooseObj.tag = Loose_Last.selectValue;

    // for (var key in LooseObj) {
    //   if (!LooseObj[key]) {
    //     Toast.info("散张请输入有效数字", 2);
    //     return;
    //   }
    // }

    let scatteredJson = [];
    My_Loose_.map((item, key) => {
      let Mytag = item.selectValue;
      if (Mytag == "请选择类型") {
        tag = "";
      } else {
        tag = Mytag;
      }
      if (item.number && item.dealPrice) {
        Numbers.A = "1";
      } else if (item.number || item.dealPrice) {
        Numbers.A = "2";
      } else if (!item.number && !item.dealPrice) {
        Numbers.A = "3";
      }
      let obj = {
        unitName: unitName,
        dealPrice: item.dealPrice,
        number: item.number,
        cntDesc: item.cntDesc,
        dealCnt: 1,
        tag: item.selectValue,
      };
      scatteredJson.push(obj);
    });

    log(scatteredJson);

    //标连-------------------------------------------------------!!
    let [mySerial_, standardConsecutiveJson] = [
      this.userSerial_.current.state.LooseArr,
      [],
    ];
    console.log(mySerial_);
    for (let i = 0; i < mySerial_.length; i++) {
      let mySerial_Item = mySerial_[i];
      let Mytag = mySerial_Item.tag;
      if (Mytag == "请选择类型") {
        tag = "";
      } else {
        tag = Mytag;
      }
      if (mySerial_Item.number && mySerial_Item.dealPrice && tag) {
        Numbers.B = "1";
      } else if (mySerial_Item.number || mySerial_Item.dealPrice || tag) {
        Numbers.B = "2";
      } else if (!mySerial_Item.number && !mySerial_Item.dealPrice && !tag) {
        Numbers.B = "3";
      }

      let obj = {
        tag: mySerial_Item.tag,
        dealCnt: Number(mySerial_Item.dealCnt) + 1,
        number: mySerial_Item.number,
        cntDesc: mySerial_Item.cntDesc,
        dealPrice: mySerial_Item.dealPrice,
        unitName: unitName,
      };

      standardConsecutiveJson.push(obj);
      // for (let key1 in mySerial_Item) {
      //   if (!mySerial_Item[key1]) {
      //     console.log(mySerial_Item[key1]);
      //     Toast.info("标连请输入有效值", 1);
      //     return;
      //   }
      // }
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
    myScattered_obj.cntDesc = myScattered__Length.cntDesc;
    myScattered_obj.signlePrice = myScattered__Length.signlePrice;
    // for (let key in myScattered_obj) {
    //   if (!myScattered_obj[key]) {
    //     Toast.info("散连请输入有效数值", 2);
    //     return;
    //   }
    // }
    log(myScattered__);

    for (let i = 0; i < myScattered__.length; i++) {
      let myScattered__Item = myScattered__[i];
      if (
        myScattered__Item.number &&
        myScattered__Item.signlePrice &&
        myScattered__Item.dealCnt
      ) {
        Numbers.C = "1";
      } else if (
        myScattered__Item.number ||
        myScattered__Item.signlePrice ||
        myScattered__Item.dealCnt
      ) {
        Numbers.C = "2";
      } else if (
        !myScattered__Item.number &&
        !myScattered__Item.signlePrice &&
        !myScattered__Item.dealCnt
      ) {
        Numbers.C = "3";
      }

      let obj = {};
      obj.tag = "散连";
      obj.dealCnt = myScattered__Item.dealCnt;
      obj.number = myScattered__Item.number;
      obj.cntDesc = myScattered__Item.cntDesc;
      obj.dealPrice = myScattered__Item.signlePrice;
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
      Toast.info("请选择您要求购的商品类型", 2);
      return;
    }

    if (Numbers.A == "1" || Numbers.A == "2") {
      for (let i = 0; i < scatteredJson.length; i++) {
        if (
          !priceReg.test(scatteredJson[i].dealPrice) ||
          Number(scatteredJson[i].dealPrice) <= 0
        ) {
          Toast.info("请输入散张求购正确的单价", 2);
          return;
        }
        if (!_this.setBuyingNumber(scatteredJson[i].number)) {
          Toast.info("请输入散张求购正确求购号码", 2);
          return;
        }
        if (!_this.isPositiveInteger(scatteredJson[i].cntDesc)) {
          Toast.info("请输入散张求购正确求购数量", 2);
          return;
        }
      }
    }
    // log(standardConsecutiveJson);

    if (Numbers.B == "1" || Numbers.B == "2") {
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
          Toast.info("请输入标连求购正确的单价", 2);
          return;
        }
        if (
          !standardConsecutiveJson[i].tag ||
          standardConsecutiveJson[i].tag == "请选择类型"
        ) {
          Toast.info("请选择标连求购类型", 2);
          return;
        }
        if (!_this.setBuyingNumber(standardConsecutiveJson[i].number)) {
          Toast.info("请输入标连求购正确求购号码", 2);
          return;
        }
        if (!_this.isPositiveInteger(standardConsecutiveJson[i].cntDesc)) {
          Toast.info("请输入标连求购正确求购数量", 2);
          return;
        }
      }
    }

    if (Numbers.C == "1" || Numbers.C == "2") {
      for (let i = 0; i < otherConsecutiveJson.length; i++) {
        if (
          !priceReg.test(otherConsecutiveJson[i].dealPrice) ||
          Number(otherConsecutiveJson[i].dealPrice) <= 0
        ) {
          Toast.info("请输入散连求购正确的总价格", 2);
          return;
        }
        if (!_this.setBuyingNumber(otherConsecutiveJson[i].number)) {
          Toast.info("请输入散连求购正确求购号码", 2);
          return;
        }
        if (
          !_this.isPositiveInteger(otherConsecutiveJson[i].dealCnt) ||
          Number(otherConsecutiveJson[i].dealCnt) <= 0
        ) {
          Toast.info("请输入散连求购正确散连数量", 2);
          return;
        }
        if (!_this.isPositiveInteger(otherConsecutiveJson[i].cntDesc)) {
          Toast.info("请输入散连求购正确求购数量", 2);
          return;
        }
      }
    }
    if (!dealPattern) {
      Toast.info("请选择商品交易方式", 2);
      return;
    }

    // if (this.getUrlParam("goodsId")) {
    //   axios
    //     .post("subject/json/addNumberFormat", {
    //       goodsId: this.getUrlParam("goodsId"),
    //       scatteredJson:
    //         Numbers.A == "3"
    //           ? JSON.stringify([])
    //           : JSON.stringify(scatteredJson),
    //       standardConsecutiveJson:
    //         Numbers.B == "3"
    //           ? JSON.stringify([])
    //           : JSON.stringify(standardConsecutiveJson),
    //       otherConsecutiveJson:
    //         Numbers.C == "3"
    //           ? JSON.stringify([])
    //           : JSON.stringify(otherConsecutiveJson),
    //     })
    //     .then((response) => {
    //       if (response.data.code == "10000") {
    //         //成功到库存页面
    //         // this.props.history.push("/");

    //         Toast.info("发布成功", 2);
    //         this.props.history.push({
    //           pathname: "/myStock",
    //           search: `userId=${
    //             JSON.parse(sessionStorage.getItem("userInfo")).userId
    //           }&name=${this.getUrlParam("name")}&type=1`,
    //         });
    //       } else {
    //         Toast.info(response.data.message, 1);
    //       }
    //     })
    //     .catch((error) => {});
    // } else {
    sessionStorage.setItem("ReturnGo", "1");
    this.props.history.push({
      pathname: "/SaleDetails",
      state: {
        goodsId: this.getUrlParam("goodsId"),
        pubUserid: JSON.parse(sessionStorage.getItem("userInfo")).userId, //用户id
        type: "1", //1 求购，2 出售
        categoryName: this.getUrlParam("category"), //商品分类
        name: this.getUrlParam("name"), //搜索框的名字
        dealPattern: dealPattern, //担保 2，线下 3 全部5
        isPostage: "N", //默认N 不包邮，Y 包邮。买没有包邮，固定填N
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
        address: MyuserAddress_.address,
        personPhone: MyuserAddress_.phone,
        personName: MyuserAddress_.name,
        assureAddress: MyuserAddress_.address,
        assurePersonPhone: MyuserAddress_.phone,
        assurePersonName: MyuserAddress_.name,
        dealWay: MyuserAddress_.dealWayCode,
      },
    });
    // }
  };
  render() {
    return (
      <div className="SaleRelease">
        <Uheader
          {...this.props}
          utitle={this.getUrlParam("goodsId") ? "增加求购需求" : "配号求购发布"}
        ></Uheader>
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
            ustate="SaleRelease"
            setKeyWorld={this.setKeyWorld}
            ref={this.userseach_}
          ></Myseach>
          <Address
            {...this.props}
            keyWordValue={this.state.keyWord}
            type="1"
            ref={this.userAddress_}
          ></Address>
        </div>
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
          <Loose {...this.props} uname="散张求购" ref={this.userLoose_}></Loose>
        </div>

        <div
          style={{ display: this.state.Ontable == "tab-1" ? "block" : "none" }}
        >
          <Serial
            {...this.props}
            utitle="求购"
            userName="求购"
            ref={this.userSerial_}
          ></Serial>
        </div>

        <div
          style={{ display: this.state.Ontable == "tab-2" ? "block" : "none" }}
        >
          <Scattered
            ustatus="1"
            {...this.props}
            ref={this.userScattered_}
          ></Scattered>
        </div>

        <div className="zhanwei"></div>
        <div className="zhanwei"></div>
        <div className="Footer_zhanwei"></div>
        {this.state.buuttonShow ? (
          <button className="adddelte" onClick={() => this.PhotoImageUpload()}>
            增加详情
          </button>
        ) : null}

        <div className="zhanwei"></div>
      </div>
    );
  }
}
