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
      ExpirationValue: "30",
      desc:'',//文本框
      imageArray: [//图片
        "http://image.ybk008.com/bie1594724614369",
        "http://image.ybk008.com/bie1594724614369"
      ], 
    };
  }
  state = {};
  componentDidMount() {
    // funcitonName 是原生回调使用的方法名
    window["IOSPhotoImageUpload"] = this.IOSPhotoImageUpload.bind(this);
  }
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
    if (this.state.imageArray.length > 10) {
      Toast.info("最多10张", 1);
    } else {
      if (isiOS) {
        try {
          window.webkit.messageHandlers.IOSNativePhotoImage.postMessage("");
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          window.app.androidNativePhotoImage();
        } catch (e) {
          console.log(e);
        }
      }
    }
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
  hanTextTare = (ev)=>{
    this.setState({
      desc:ev.target.value
    })
  };
  release = () => {
    //发布
    // let str = "";
    // this.state.imageArray.map((item,key)=>{
    //   str +=item;
    // })
// console.log(str);
// this.state.imageArray.join(',')
console.log(this.state.imageArray.join(','));

    let myArray = this.props.history.location.state;
    if (this.isRealNum(this.state.ExpirationValue)) {
      if (this.state.ExpirationValue < 1) {
        Toast.info("最小是1", 1);
        return;
      } else if (this.state.ExpirationValue > 30) {
        Toast.info("最大是30", 1);
        return;
      }
    } else {
      Toast.info("请输入有效的数字", 1);
    }
    axios
      .post("subject/json/saveGoods",{
        pubUserid:myArray.pubUserid,
        type:myArray.type,
        categoryName:myArray.categoryName,
        name:myArray.name,
        isPostage:myArray.isPostage,
        scatteredJson:myArray.scatteredJson,
        standardConsecutiveJson:myArray.standardConsecutiveJson,
        otherConsecutiveJson:myArray.otherConsecutiveJson,
        desc:this.state.desc,
        picUrls:this.state.imageArray.join(','),
        validDay:this.state.ExpirationValue,
        address:myArray.address,
        dealWay:myArray.dealWay,
        personPhone:myArray.phone,
        personName:myArray.personName,

      })
      .then((response) => {})
      .catch((error) => {});
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
        <Uheader {...this.props} utitle="增加配号出售详情"></Uheader>
        <div className="zhanwei zhanwei_yanse"> </div>
        {/* <ImageBig imageArray={this.state.imageArray} {...this.props} imageArrayKey='1'></ImageBig> */}
        <div className="SaleDetails_title"> 抗疫邮票大版 </div>
        <div className="zhanwei"> </div>
        <div className="Collection">
          <p className="Collection_miaoshu"> 藏品描述 </p>
          <textarea
            name="DIVCSS5"
            value={this.state.desc}
            onChange={(ev)=>this.hanTextTare(ev)}
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
              <img
                src={require("../../assets/imagepicker.png")}
                alt="添加"
                className="add_upimage"
                onClick={() => this.APPUpload()}
              />
            </div>
          </div>
        </div>
        <div className="zhanwei zhanwei_yanse"> </div>
        <div className="Expiration">
          <div>
            <span className="zhonyao"> * </span> 有效期（最多30天）：
          </div>
          <div>
            <input
              type="text"
              value={this.state.ExpirationValue}
              onChange={(ev) => this.haninpiychange(ev)}
              pattern="[0-9]*"
            />
            天
          </div>
        </div>
        <div className="zhanwei"> </div> <div className="zhanwei"> </div>
        <button className="adddelte dinbu" onClick={() => this.release()}>
          点击发布
        </button>
        <div className="zhanwei"> </div>
      </div>
    );
  }
}
