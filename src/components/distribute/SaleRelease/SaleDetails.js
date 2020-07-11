import React, { Component } from "react";
import Uheader from "../../Goolbal/Uheader";
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
      imageArray: [
        "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1529929594,4168177509&fm=26&gp=0.jpg",
        "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1510174840,773107927&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=572610946,3578590089&fm=26&gp=0.jpg",
      ], //图片
    };
    this.IOSPhotoImageUpload = this.IOSPhotoImageUpload.bind(this);
  }
  state = {
   
  };
  componentDidMount() {
    // funcitonName 是原生回调使用的方法名
    window["IOSPhotoImageUpload"] = this.IOSPhotoImageUpload.bind(this);
   
  }

  IOSPhotoImageUpload = (val) => {
    Toast.success(`${val}`, 3);
    const imageArray1 = [...this.state.imageArray]; //浅拷贝一下
    // imageArray1.push
    JSON.parse(val).map((item, key) => {
      imageArray1.push(item);
    });
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
          window.app.androidNativePhotoImage("");
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
  release = () => {
    //发布
    console.log(this.state.ExpirationValue);
    console.log(this.isRealNum(this.state.ExpirationValue));
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
        <div className="zhanwei zhanwei_yanse"></div>
        {/* <ImageBig imageArray={this.state.imageArray} {...this.props} imageArrayKey='1'></ImageBig> */}
        <div className="SaleDetails_title">抗疫邮票大版</div>
        <div className="zhanwei"></div>
     
      
        <div className="Collection">
          <p className="Collection_miaoshu">藏品描述</p>
          <textarea
            name="DIVCSS5"
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
            </div>
            <img
              src={require("../../assets/imagepicker.png")}
              alt="添加"
              className="add_upimage"
              onClick={() => this.APPUpload()}
            />
          </div>
        </div>
        <div className="zhanwei zhanwei_yanse"></div>
        <div className="Expiration">
          <div>
            <span className="zhonyao">*</span> 有效期（最多30天）：
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
        <div className="zhanwei"></div>
        <div className="zhanwei"></div>
        <button className="adddelte dinbu" onClick={() => this.release()}>
          点击发布
        </button>
        <div className="zhanwei"></div>
      </div>
    );
  }
}
