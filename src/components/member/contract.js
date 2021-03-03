import React, { Component } from "react";
import "./member.scss";
export default class menberExplanation extends React.Component {
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
      name: '',
      number: '',
      price: '',
      units: ''
    },
    createdTime: '',
  };

  

  render() {
	  document.title = '商品买卖合同';
    return (
      <div className="contract">
		<h1>商品买卖合同</h1>
        <div className="top">
          <div className="issuer">
            <div className="name">
              <label htmlFor="">发布方: </label> <span>试试水</span>
            </div>
            <div className="card">
              <label htmlFor="">身份证号: </label> <span>122563547896587458</span>
            </div>
          </div>
          <div className="trader">
            <div className="name">
              <label htmlFor="">发布方: </label> <span>试试水</span>
            </div>
            <div className="card">
              <label htmlFor="">身份证号: </label> <span>122563547896587458</span>
            </div>
          </div>
        </div>
        <div className="main">
          <p className='detail'>甲乙双方经协商，本着自愿、平等、互利的原则，就甲方向乙方销售合同货物达成如下协议：</p>
          <h2 className='title'>第一条 名称、规格和数量</h2>
          <p className='detail'>1、名称：二轮牛大版</p>
          <p className='detail'>2、规格：版</p>
          <p className='detail'>3、单价：123.5元</p>
          <p className='detail'>4、数量：25版</p>
          <h2 className='title'>第二条 产品订购</h2>
          <p className='detail'>1、买方向卖方递交的订单形式包括：电子数据订单形式、电话订单形式均适用于本合同。</p>
          <p className='detail'>2、买方以上述形式向卖方发出订单的，卖方应在接到订单后不超过规定时间内答复买方，并与订单确认后按时准备货物，在规定时间内货物无法提供，买方有权撤销或变更订单。</p>
          <p className='detail'>3、卖方负责将订单列明的产品，按照约定准备好，产品交付给买方并验收前，一切风险及责任均由卖方承担。</p>
          <p className='detail'>4、卖方保证提供的商品要和需求的样品一样。</p>

          <h2 className='title'>第三条 交货方式</h2>
          <p className="detail">1、卖方以物流方式或者当面交货方式交付给买方。</p>
          <h2 className='title'>第四条 违约责任</h2>
          <p className="detail">任何一方违反了约定条款，将扣除保证金赔付个对方。</p>
          <h2 className='title'>第五条 其他约定</h2>
          <p className="detail">1、因履行本合同发生任何争议，双方应友好协商解决。</p>
          <p className="detail">2、本合同自双方发起交易起生效。</p>
          <p className="detail">3、本合同一式贰份，双方各执一份，具有同等法律效益。</p>
        </div>
        <div className="currentTime">2021 年 3 月 1 号</div>
      </div>
    );
  }
}
