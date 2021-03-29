import React, { Component } from "react";
import "./member.scss";
import axios from "../axios";

var u = navigator.userAgent;
var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

export default class contract extends React.Component {
  state = {
    issuer: {
      name: '',
      identityCard: '',
    },
    trader: {
      name: '',
      identityCard: '',
    },
    goods: {
      goodsName: '',
      dealNum: '',
      price: '',
      condition: ''
    },
    createdTime: '',
	status: 0,
  };
  
  componentDidMount () {
	let url = new URL(window.location.href.replace('/#',''));
	let params = url.searchParams;
	  
	let nowDate = new Date();
	let dateString = nowDate.getFullYear()+'年'+ Number(nowDate.getMonth() + 1) +'月'+ nowDate.getDate()+'日';
	this.setState({
		createdTime: dateString,
		goods: {
		  goodsName: params.get("goodsName"),
		  dealNum: params.get("dealNum"),
		  price: params.get("price"),
		  condition: params.get("condition")
		},
		status: params.get("state")
	});
	
	axios.post("/subject/json/getOrdersContract",{pubUserId:params.get("pubUserId"),doUserid:params.get("doUserid")}).then(response => {
		console.log(response)
		let arr = response.data.resultObject.dataList;
		
		for(let i=0;i<arr.length;i++) {
			if(arr[i].ctype == '4'){
				this.setState({
					trader: {
						name: arr[i].realName,
						identityCard: arr[i].identityNum
					}
				});
			}else {
				this.setState({
					issuer: {
						name: arr[i].realName,
						identityCard: arr[i].identityNum
					}
				});
			}
		}
	});
	
  };
  
  agreement = () => {
	  if(isiOS){
		  window.webkit.messageHandlers.IOSNativeTransactionAgreeMent.postMessage('');
	  }else {
		  window.app.AndroidAgreeGoodsContract();
	  }
  };

  

  render() {
	  document.title = '邮宝交易三方协议';
    return (
      <div className="contract">
		<h1>邮宝交易三方协议</h1>
        <div className="top">
          <div className="issuer">
			<h2 className='title'>甲方（发布方）</h2>
            <div className="name">
              <label htmlFor="">姓名: </label> <span>{this.state.issuer.name}</span>
            </div>
            <div className="card">
              <label htmlFor="">身份证号: </label> <span>{this.state.issuer.identityCard}</span>
            </div>
          </div>
          <div className="trader">
			<h2 className='title'>乙方（交易方）</h2>
            <div className="name">
              <label htmlFor="">姓名: </label> <span>{this.state.trader.name}</span>
            </div>
            <div className="card">
              <label htmlFor="">身份证号: </label> <span>{this.state.trader.identityCard}</span>
            </div>
          </div>
		  <div>
			<h2 className='title'>丙方：北京风暴迅达科技有限公司(邮宝平台方）</h2>
		  </div>
        </div>
        <div className="main">
          <p className='detail'>甲、乙双方经本着自愿、平等、互利的原则，就双方通过丙方邮宝平台进行的交易达成以下协议。平台为买、卖双方提供交易环节中需要信息服务，并不为交易环节中甲、乙双方的行为承担任何法律责任。</p>
		  <h2 className='title'>第一条 名称、规格和数量</h2>
          <p className='detail'>1、名称：{this.state.goods.goodsName}</p>
          <p className='detail'>2、品相：{this.state.goods.condition}</p>
          <p className='detail'>3、单价：{this.state.goods.price}{this.state.goods.price?'元':''}</p>
          <p className='detail'>4、交易数量：{this.state.goods.dealNum}</p>

          <h2 className='title'>第二条 交易方式（担保交易、线下交易）</h2>
          <p className="detail">1、交易环节将严格按照<a href="#/rule">《邮宝交易规则》</a>流程执行。</p>
          <p className="detail">2、买卖双方确认订单后，卖方根据交易方式(担保交易、线下交易)约定的交货方式交割。</p>
          <p className="detail">3、卖方发货时，可以在邮宝内提交发货视频或图片，买方收货时，可以在邮宝内提交开包视频或图片。如果交易出现纠纷，视频或图片证据将用于平台仲裁。</p>
		  
          <h2 className='title'>第三条 违约责任</h2>
          <p className="detail">1、任何一方违反<span>本协议</span>、<a href="#/rule">《邮宝交易规则》</a>和<a href="#/rule">《保证金及处罚规则》</a>的约定，将根据相应规定承担对应违约责任。</p>
          <p className="detail">2、买卖双方中任一方因为市场价格变动原因、拒绝继续成交的，违约方承担违约全责。</p>
          <p className="detail">3、买方收到商品后，如果对商品有任何异议、首先应该与交易方友好协商处理，如协商无法达成一致，提交切实有效（视频或图片）证据给平台，由平台仲裁处理。</p>
          <p className="detail">4、如双方通过平台仍无法沟通解决，可以通过各自地方法院提起诉讼！平台将双方证据转交对应执法机构。</p>
          <p className="detail">本协议自交易订单生成起开始生效。</p>
        </div>
        <div className="currentTime">{this.state.createdTime}</div>
		{
			this.state.status == 0 ? (<div className="agreeMent" onClick={() => this.agreement()}>我已阅读并同意该协议</div>):null
		}
		
      </div>
    );
  }
}
