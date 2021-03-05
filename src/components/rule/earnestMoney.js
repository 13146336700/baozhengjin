import React, { Component } from "react";
import "./rule.scss";
var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
export default class earnestMoney extends React.Component {
   
    render() {
        return ( 
		<div className = { isiOS ? 'IOSBulletprivacyHome BulletprivacyHome' : 'BulletprivacyHome' } >
            <div className = "Bulletprivacy" >
				<h2 > 保证金规则 < /h2>
				1、 定义： 保证金为商品交易保证金， 发布方设置后， 参与商品交易方就需要缴纳对应的保证金； < br / >
				2、 页面给出的保证金金额为最小确认数量的单倍保金， < br / > （如： 保证金您选择5 元， 交易方去购买商品， 购买的商品个数只能为最小购买量的倍数， 对应保证金为最小购买的倍数X 单倍保金） < br / >
				3、 如一方违约， 那么违约方的保证金将要赔付给对方， 支付的订单金额原路退回； < br / >
				4、 商品交易完成后保证金原路退回. <br / >
            </div> 
		</div>
        );
    }
}