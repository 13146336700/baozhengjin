
import React, { Component } from "react";
import "./rule.scss";
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
export default class shipments extends React.Component {
   
    render() {
		document.title = '发货说明';
        return ( 
			<div className = { isiOS ? 'IOSBulletprivacyHome BulletprivacyHome' : 'BulletprivacyHome' } >
			    <div className = "Bulletprivacy earnestMoney futures shipments" >
					<h2 > 现货发货说明 < /h2>
					商品下单之后必须48小时内发货；< br / >< br / >
					
					<h2 > 期货发货说明 < /h2>
					1.交易方在最晚发货时间前48小时之内下单，发货最晚时间为规定最晚发货时间；< br / >
					<p>例如：发帖人设置最晚发货时间为2021-01-20号，交易人去交易下单时间在2021-01-18号之前下单的，最晚发货时间就是2021-01-20号，</p> 
					2.在最晚发货时间前48小时之外下单的，最晚发货时间为下单时间加48小时。< br / >
					<p>例如：如果交易人去交易下单时间在2021-01-18号之后下单的，那么最晚发货时间就是下单时间再加48小时。</p> 
					<div className="hint">如设置保证金，逾期未发货视为违约，违约方所缴纳的保证金将赔付给对方。 </div>
				</div>  
			</div>
        );
    }
}