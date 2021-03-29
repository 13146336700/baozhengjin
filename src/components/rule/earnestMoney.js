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
				<h2 > 保证金说明 < /h2>
				1、定义：保证金为商品交易保证金，发布方设置交易保证金后，交易方成交后需缴纳对应保证金； < br / >
				2、页面给出的保证金金额为单份保证金； < br / > 
				3、交易方下单完成后，发布方因在规定时间内去待支付保证金列表支付对应保证金金额, < br / >
				<p>规定时间如下:</p>
				<p><span>9:00-21:00</span> 下单2小时内支付</p>
				<p>其他时间下单 在<span>11:00</span>前支付;</p>
				4、未在约定时间内交割，如一方违约，违约方的保证金将赔付给另一方，商品货款原路退回；<br / >
				5、约定时间内双方无违约，交易完成后保证金原路退回；<br / >
				6、详细交易规则，请去“我的”页面-帮助中心 <a href="#/rule">《邮宝交易规则》</a>查看。 <br / >
            </div> 
		</div>
        );
    }
}


