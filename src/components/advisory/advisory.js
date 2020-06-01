import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./advisory.scss";
import WxShare from "../Goolbal/WxShare";
import Uheader from "../Goolbal/Uheader";
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1;

// try {

//
// } catch (err) {}

var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
// function Customer(props) {
//   return (
//     <div className="Customer" onClick={this.Customer_service}>联系客服</div>
//   );
// }
// export default Customer;

class advisory extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.myRefVideo2 = React.createRef();
    // this.state = {isToggleOn: true};

    // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
    // this.Jump = this.Jump.bind(this);
  }
  componentDidMount() {
    // var arr = ["12", "14", 6, 1].map((item)=>{
    //   return  Number(item)
    // })
    // console.log(arr);

    WxShare.getshare({
      title: "交易安全保障上传说明",
      desc: "买卖邮币卡，价格邮宝查！专业的邮币卡目录、行情、实时交易软件",
    });

    try {
      setTimeout(() => {
        // console.log(document.getElementById("video1"));
        document.getElementById("video1").addEventListener("play", function () {
          document.getElementById("video2").pause();
        });
        document.getElementById("video2").addEventListener("play", function () {
          document.getElementById("video1").pause();
        });
      }, 500);
    } catch (error) {}
  }
  Jump = () => {
    console.log(123);
  };
  videoChange = (num) => {
    if (num == 1) {
      document.getElementsByClassName("ImageHide1")[0].style.display = "none";
      this.myRef.current.style.display = "block";
      this.myRef.current.play();
      this.myRefVideo2.current.pause();
    } else if (num == 2) {
      document.getElementsByClassName("ImageHide2")[0].style.display = "none";
      this.myRefVideo2.current.style.display = "block";
      this.myRefVideo2.current.play();
      this.myRef.current.pause();
      console.log(this.myRefVideo2);
    }
    //
  };
  render() {
    return (
      <div className="advisory">
        {/* <Uheader utitle="咨询详情"></Uheader> */}
        <div className="zhanwei"></div>
        <div className="advisoryHome">
          <div className="rule">
            <ul>
              <li>
                <span></span>
                可录制发货视频、拍摄照片、填写文字备注上传作为交易安全保障
              </li>
              <li>
                <span></span>
                当交易出现纠纷时，上传内容可作为凭证，为解决纠纷提供相关证明
              </li>
            </ul>
          </div>
          <h1>卖家发货视频示例：</h1>
          <div className="video">
            <img
              src="http://image.ybk008.com/aqjy_sl_cover.png"
              alt=""
              className="ImageHide1"
              onClick={() => this.videoChange(1)}
            />
            <video
              id="video1"
              ref={this.myRef}
              controls
              className="videoItme"
              webkit-playsinline="true"
              playsinline="true"
              preload="meta"
              poster="http://image.ybk008.com/aqjy_sl_cover.png"
            >
              <source
                src="http://video.ybk008.com/seller_fh.mp4"
                type="video/mp4"
              ></source>
            </video>
          </div>
          <p className="wenzitishi">
            如上方视频无法查看，请更新到邮宝2.6.0及以上版本或复制下方链接到浏览器打开视频 <br/>
            <span>http://video.ybk008.com/seller_fh.mp4</span>
          </p>
          <h1>卖家拍摄发货视频步骤需满足以下要求：</h1>
          <footer>
            <ul>
              <li>
                1. 藏品品相拍摄  <br />
                钱币类：证书号码特写，纸币流水号码特写，藏品正、
                反面以及证书的完整影像，四个边角的逐个拍摄
                ，原盒四周拍摄，霉点、发黄等瑕疵请特写并说明情况。
                <br />
                邮票/邮资封片：藏品正反面完整影像，四个边角的逐
                个拍摄，大版是否对号，志号或箱号的特写，如藏品有
                撕口、霉点、发黄等瑕疵请特写并说明情况。  <br />
                磁卡：藏品正反面完整影像，四个边角的逐个拍摄，
                藏品号码特写，霉点、发黄等瑕疵请特写并说明情况。
              </li>
              <li>
                2. 将藏品用泡沫纸包裹并用胶带打包，或者用其他方
                法固定保护好（封装完需要本人在包装好的物品上签 名）。
              </li>
              <li>
                3.写下收货方姓名、藏品名称及数量、单价的纸条一
                起（纸条对视频展示清楚）放入纸箱封箱。
              </li>
              <li>4.以上过程拍摄要保证连续不可中断。</li>
            </ul>
          </footer>

          <h1>买家发货视频示例：</h1>
          <div className="video">
            <img
              src="http://image.ybk008.com/aqjy_sl_cover.png"
              alt=""
              className="ImageHide2"
              onClick={() => this.videoChange(2)}
            />
            <video
              id="video2"
              ref={this.myRefVideo2}
              controls
              className="videoItme"
              webkit-playsinline="true"
              playsinline="true"
              oncontextmenu="return false;"
              preload="meta"
              poster="http://image.ybk008.com/aqjy_sl_cover.png"
            >
              <source
                src="http://video.ybk008.com/buyer_sh.mp4"
                type="video/mp4"
              ></source>
            </video>
          </div>
          <p className="wenzitishi">
            如上方视频无法查看，请更新到邮宝2.6.0及以上版本或复制下方链接到浏览器打开视频 <br/>
             <span>http://video.ybk008.com/buyer_sh.mp4</span>
          </p>
          <h1>买家拍摄收货视频步骤需满足以下要求：</h1>
          <footer>
            <ul className="ul_last">
              <li>
                1.
                拿到快递在拆封前开始录制，并对未拆封的快递四周拍摄检查完整性（如快递未拆封时发现已破损，请及时联系卖家和快递员协商退货事项）。
              </li>
              <li>
                2.取出纸条将清单内容对视频展示清楚，打开快递并将藏品从纸箱取出动作，展示藏品包装上货主的签名。
              </li>
              <li>
                3.拆开保护包装后藏品的正反面完整影像，并根据所购藏品的属性对比验货（如：数量，是否发黄发霉，撕口或拆封等），并全程语音说明与约定不符的或瑕疵的地方并特写指出。
              </li>
              <li>4.以上过程拍摄要保证连续不可中断。</li>
            </ul>
          </footer>
        </div>
        <div className="kongbai"></div>
      </div>
    );
  }
}
export default advisory;
