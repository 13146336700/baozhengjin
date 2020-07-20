import React from 'react';
import { Carousel  } from 'antd-mobile';
import "../index/index.scss";
import axios from "../../axios/index";

var u = navigator.userAgent;
// var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

export default class Banner extends React.Component {
    state = {
      bannerData: [],
      imgHeight: 176,
      bannerIndex: 0, //banner索引
      homeFlag: false,  //轮播自动的判断
    }
    componentWillMount() {
      this.getBannerList();
    }
    componentDidUpdate() {
      if (this.state.homeFlag === true) {
        return
      }
      if (this.state.bannerData.length !== 0) {
        this.setState({
          homeFlag:true
        });
        console.log('可以了哈哈')
      }
    }
    

    /**
     * 获取banner图片列表
     */

    getBannerList() {
      let _this = this;
      axios.post("fbusiness/json/getSbuyLunBo", {
        rpType: this.props.rpType
      }).then( (res)=>{
          _this.setState({
            bannerData: res.data.resultObject.advtList,
          });
      }).catch((err) =>{
          console.log(err);
      })
    }

    /**
     * banner点击跳转APP
     */
    appNative(index) {
      let baner = this.state.bannerData[Number(index)];
      let banerData = {
        advtHrefUrl: baner.advtHrefUrl,
        advtName: baner.advtName,
        oid: baner.oid,
        startNum: baner.startNum  
      }
      // console.log(banerData);
      if (isiOS) {
        window.webkit.messageHandlers.IOSNativeAdvertising.postMessage(banerData);
      } else {
        let jsonData = JSON.stringify(banerData);
        window.app.androidNativeAdvertising(jsonData)
      }
    }

    render() {
      return (
        <div className="banner">

        {
          this.state.bannerData.length > 0 && this.state.homeFlag ?
          <Carousel
            infinite
            autoplay={this.state.homeFlag}
            speed={2000}

          >
            {this.state.bannerData.map((val,index) => (
                <img
                  src={val.advtPicUrl}
                  alt=""
                  key= {index}
                  style={{ width: '100%', verticalAlign: 'top', height: '100%' }}
                  onClick={() => this.appNative(index)}
                />
            ))}
          </Carousel>:null
          }
        </div>
      );
    }
}