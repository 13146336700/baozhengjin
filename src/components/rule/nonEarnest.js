import React, { Component } from "react";
import "./rule.scss";
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
export default class earnestMoney extends React.Component {
   
    render() {
        return ( 
			<div className = { isiOS ? 'IOSBulletprivacyHome BulletprivacyHome' : 'BulletprivacyHome' } >
				<div className = "Bulletprivacy earnestMoney" >
					<h2 > 温馨提示 < /h2>
					您没有选择保证金模式，如果一方违约，商品订单就按照交易失败处理
				</div>  
			</div>
        );
    }
}