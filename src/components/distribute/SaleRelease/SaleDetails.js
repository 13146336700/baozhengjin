import React, { Component } from "react";
import Uheader from "../../Goolbal/Uheader";
import axios from "../../axios/index";
// import ImageBig from "../Global/ImageBig";
import {
  Toast,
  WhiteSpace,
  Button,
  ImagePicker,
  WingBlank,
  SegmentedControl,
} from "antd-mobile";
import "./SaleRelease.scss";
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

export default class SaleDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buuttonShow:true,
      ExpirationValue: "90",
      desc: "", //文本框
      imageArray: [],
      releaseDisabled: false,
      heightChange: true,
      docmHeight: document.documentElement.clientHeight, //默认屏幕高度
      showHeight: document.body.clientHeight, //实时屏幕高度
    };
    this.MyLoose_body = React.createRef();
  }
  state = {};

  componentDidMount() {
    // funcitonName 是原生回调使用的方法名
    window["IOSPhotoImageUpload"] = this.IOSPhotoImageUpload.bind(this);
    window.addEventListener("resize", this.onWindowResize);
    let myArray = this.props.history.location.state;
    console.log(myArray);
    if (myArray.goodsId) {
      axios
        .post("subject/json/getGoodsInfor", {
          goodsId: myArray.goodsId,
          userId: myArray.pubUserid,
        })
        .then((response) => {
          if (response.data.code == "10000") {
            this.setState({
              desc: response.data.resultObject.desc,
              imageArray: response.data.resultObject.picUrls
                ? response.data.resultObject.picUrls.split(",")
                : [],
              ExpirationValue: response.data.resultObject.validDay,
            });
          } else {
            Toast.info(response.data.message, 1);
          }
        })
        .catch((error) => {});
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
          buuttonShow:false
        })
        
      } else {
        //当软键盘收起，在此处操作
         _this.setState({
          buuttonShow:true
        })
      }
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }
  componentDidUpdate(newProps, newState) {
    console.log(newProps, newState);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowResize);
  }
  onWindowResize = () => {
    // Toast.info(document.body.clientHeight, 2);
    // Toast.info(`默认高度${this.state.docmHeight}`, 2);
    // Toast.info(`试试高度${this.state.showHeight}`, 2);
    // if (this.state.docmHeight > this.state.showHeight) {
    //   this.state.heightChange = false;
    // } else {
    //   this.state.heightChange = true;
    // }
  };
  IOSPhotoImageUpload = (val) => {
    const imageArray1 = [...this.state.imageArray]; //浅拷贝一下
    // imageArray1.push
    if (isiOS) {
      JSON.parse(val).map((item, key) => {
        imageArray1.push(item);
      });
    } else {
      val.split(",").map((item, key) => {
        imageArray1.push(item);
      });
    }
    this.setState({
      imageArray: imageArray1,
    });
  };

  haninpiychange = (ev) => {
    this.setState({
      ExpirationValue: ev.target.value,
    });
  };
  APPUpload = () => {
    // if (this.state.imageArray.length > 9) {
    //   Toast.info("最多10张", 1);
    // } else {
    let num = 10 - Number(this.state.imageArray.length);
    if (isiOS) {
      try {
        window.webkit.messageHandlers.IOSNativePhotoImage.postMessage(
          Number(num)
        );
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        window.app.androidNativePhotoImage(num);
      } catch (e) {
        console.log(e);
      }
    }
    // }
  };
  isRealNum = (val) => {
    if (val === "" || val == null) {
      return false;
    }
    if (!isNaN(val)) {
      return true;
    } else {
      return false;
    }
  };
  hanTextTare = (ev) => {
    if (ev.target.value.length > 100) {
      Toast.info("藏品描述最多为100个字", 2);
      return;
    }
    this.setState({
      desc: ev.target.value,
    });
  };
  release() {
    if (this.state.desc.length > 100) {
      Toast.info("藏品描述最多为100个字", 2);
      return;
    }

    this.setState({
      releaseDisabled: true,
    });

    //发布
    // let str = "";
    // this.state.imageArray.map((item,key)=>{
    //   str +=item;
    // })
    // console.log(str);
    // this.state.imageArray.join(',')
    let myArray = this.props.history.location.state;
    if (!this.isRealNum(this.state.ExpirationValue)) {
      Toast.info("请输入有效天数", 2);
      this.setState({
        releaseDisabled: false,
      });
      return;
    }
    if (this.state.ExpirationValue < 1) {
      Toast.info("有效天数最小为1", 2);
      this.setState({
        releaseDisabled: false,
      });
      return;
    }
    if (Number(this.state.ExpirationValue) >= 365) {
      Toast.info("有效天数最大为365天", 2);
      this.setState({
        releaseDisabled: false,
      });
      return;
    }
    let market = JSON.parse(sessionStorage.getItem("market"));

    if (myArray.goodsId) {
      axios
        .post("subject/json/addNumberFormat", {
          goodsId: myArray.goodsId,
          scatteredJson: myArray.scatteredJson,
          standardConsecutiveJson: myArray.standardConsecutiveJson,
          otherConsecutiveJson: myArray.otherConsecutiveJson,
          desc: this.state.desc,
          picUrls: this.state.imageArray.join(","),
          validDay: this.state.ExpirationValue,
          // scatteredJson: JSON.stringify(this.state.scatteredJson),
          // standardConsecutiveJson: JSON.stringify(
          //   this.state.standardConsecutiveJson
          // ),
          // otherConsecutiveJson: JSON.stringify(this.state.otherConsecutiveJson),
        })
        .then((response) => {
          if (response.data.code == "10000") {
            //成功到库存页面
            Toast.info("发布成功", 2);
            this.props.history.push({
              pathname: "/myStock",
              search: `userId=${
                JSON.parse(sessionStorage.getItem("userInfo")).userId
              }&name=${myArray.name}&type=${myArray.type}`,
            });
          } else {
            Toast.info(response.data.message, 1);
          }
        })
        .catch((error) => {});
    } else {
      axios
        .post("subject/json/saveGoods", {
          pubUserid: myArray.pubUserid,
          type: myArray.type,
          categoryName: myArray.categoryName,
          dealPattern: myArray.dealPattern,
          name: myArray.name,
          isPostage: myArray.isPostage,
          scatteredJson: myArray.scatteredJson,
          standardConsecutiveJson: myArray.standardConsecutiveJson,
          otherConsecutiveJson: myArray.otherConsecutiveJson,
          desc: this.state.desc,
          picUrls: this.state.imageArray.join(","),
          validDay: this.state.ExpirationValue,
          address: myArray.address,
          personPhone: myArray.personPhone,
          personName: myArray.personName,
          assureAddress: myArray.address,
          assurePersonPhone: myArray.personPhone,
          assurePersonName: myArray.personName,
          dealWay: myArray.dealWay,
          sid: market.oid,
          tag: market.tag
        })
        .then((response) => {
          if (response.data.code == "10000") {
            //成功到库存页面
            // http://198.166.1.196:3000/#/myStock?userId=xx&name=**&type=**   配号编辑   参数必传
            Toast.info("发布成功", 1);

            this.props.history.push({
              pathname: "/myStock",
              search: `userId=${myArray.pubUserid}&name=${myArray.name}&type=${myArray.type}`,
            });
            this.setState({
              releaseDisabled: false,
            });
          } else {
            Toast.info(response.data.message, 1);
          }
        })
        .catch((error) => {});
    }
  }
  inputOnFocus = () => {
    setTimeout(() => {
      window.scrollTo(0, 3000);
    }, 300);
  };
  imageDelte = (item, key) => {
    const imageArray = [...this.state.imageArray]; //浅拷贝一下
    imageArray.splice(key, 1);
    this.setState({
      imageArray: imageArray,
    });
  };
  render() {
    return (
      <div className="SaleDetails">
        <Uheader
          {...this.props}
          utitle={
            this.props.history.location.state.type == "1"
              ? "增加配号求购详情"
              : "增加配号出售详情"
          }
        ></Uheader>
        <div className="zhanwei zhanwei_yanse"> </div>
        {/* <ImageBig imageArray={this.state.imageArray} {...this.props} imageArrayKey='1'></ImageBig> */}
        <div className="SaleDetails_title">
          {this.props.history.location.state.name}
        </div>
        <div className="zhanwei"> </div>
        <div className="Collection">
          <p className="Collection_miaoshu"> 藏品描述 </p>
          <textarea
            name="DIVCSS5"
            value={this.state.desc}
            onChange={(ev) => this.hanTextTare(ev)}
            placeholder="请输入藏品详细描述（100字以内）…"
          ></textarea>
          <div className="upimage">
            <div className="upimage_arr">
              {this.state.imageArray.map((item, key) => (
                <div key={key}>
                  <img src={item} alt="图片" />
                  <img
                    src={require("../../assets/icon-delete.png")}
                    alt="删除"
                    onClick={() => this.imageDelte(item, key)}
                  />
                </div>
              ))}
              {this.state.imageArray.length < 10 ? (
                <img
                  src={require("../../assets/imagepicker.png")}
                  alt="添加"
                  className="add_upimage"
                  onClick={() => this.APPUpload()}
                />
              ) : null}
            </div>
          </div>
        </div>
        <div className="zhanwei zhanwei_yanse"> </div>
        <div className="Expiration">
          <div>
            <span className="zhonyao"> * </span> 有效期（最多365天）：
          </div>
          <div>
            <input
              type="tel"
              value={this.state.ExpirationValue}
              onFocus={() => this.inputOnFocus()}
              onChange={(ev) => this.haninpiychange(ev)}
              pattern="[0-9]*"
            />
            天
          </div>
        </div>
        <div className="zhanwei"> </div> <div className="zhanwei"> </div>
        <div className="annou"></div>
        {this.state.buuttonShow ? (
          <button
            className="adddelte"
            onClick={() => this.release()}
            disabled={this.state.releaseDisabled}
          >
            点击发布
          </button>
        ) : null}
        <div className="zhanwei"> </div>
      </div>
    );
  }
}
