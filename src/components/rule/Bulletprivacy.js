import React, { Component } from "react";
import "./rule.scss";
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
export default class Bulletprivacy extends React.Component {
    Bullet = ()=>{
      let obj = {
        url:"http://app.youbaoapp.com/app/web/#/privacyRule",
        title:'隐私权政策'
      };
        if (isiOS) {
            try {
              window.webkit.messageHandlers.IOSNativenPrivacyAgreement.postMessage(obj);
            } catch (e) {
              console.log(e);
            }
          } else {
            try {
              window.app.androidNativePrivacyAgreement(JSON.stringify(obj));
            } catch (e) {
              console.log(e);
            }
          }
    };
  render() {
    return (
      <div className={isiOS?'IOSBulletprivacyHome BulletprivacyHome':'BulletprivacyHome'}>
        <div className="Bulletprivacy">
          亲，感谢您对邮宝平台一直以来的信任!我们依据最新的监管要求更新了邮宝
          <span className="yinsi" onClick={()=>this.Bullet()}> 《隐私权政策》</span>，特向您说明如下 <br />
          1.为向您提供交易相关基本功能，我们会收集、使用必要的信息; <br />
          2.基于您的明示授权，我们可能会获取您的位置(为您提供商品、店铺及优惠资讯等)等信息，您有权拒绝或取消授权;{" "}
          <br />
          3.我们会采取业界先进的安全措施保护您的信息安全; <br />
          4.未经您同意，我们不会从第三方处获取、共享或向其提供您的信息; <br />
          5.您可以查询、更正、删除您的个人信息，我们也提供账户注销的渠道。{" "}
          <br />
        </div>
      </div>
    );
  }
}
