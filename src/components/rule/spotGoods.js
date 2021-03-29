
import React, { Component } from "react";
import "./rule.scss";
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
export default class spotGoods extends React.Component {
    
    render() {
		document.title = '现货发货说明';
        return ( 
			<div className = { isiOS ? 'IOSBulletprivacyHome BulletprivacyHome' : 'BulletprivacyHome' } >
			    <div className = "Bulletprivacy earnestMoney futures" >
					<h2 > 现货发货说明 < /h2>
			    商品下单之后必须48小时内发货；< br / >
				<div className="hint">如设置保证金，逾期未发货视为违约，违约方所缴纳的保证金将赔付给对方。 </div>
				</div>  
			</div>
        );
    }
}
