import React, { Component } from "react";
import "./member.scss";
export default class menberExplanation extends React.Component {
  state = {
    price: [
      {
        time: "1个月",
        beans: "160金豆",
        pricetime: "16元/月",
      },
      {
        time: "6个月",
        beans: "888金豆",
        pricetime: "14.8元/月",
      },
      {
        time: "1年",
        beans: "1588金豆",
        pricetime: "13.2元/月",
      },
    ],
  };
  render() {
    return (
      <div className="menberExplanationHome">
        <header><img src="http://image.ybk008.com/title@2x%20(3)1591594987387" alt=""/></header>
        <div className="ExplanationHome">
          <div className="content">
            2018年5月11日邮宝平台上线以来，我们累计为超过10万用户提供了超过1亿次的价格咨询服务、和20万余次交易服务。2019年10月，中国集邮总公司联合邮宝，基于邮宝大数据平台、为全国集藏爱好者提供市场行情查询服务。邮宝平台也深得广大邮币商、邮币集藏爱好者的喜爱。
            <br />
            与此同时，2020年5月12日抗疫邮票发售以来，一小部分投机分子纷纷涌入邮宝平台。他们无视商业诚信底线，肆意反悔、撕毁订单，给广大真正的集藏爱好者带来极大的不便和困扰，给邮宝客服团队带来极大的额外工作压力、极大地压缩了为真正集藏爱好者服务的时间。
            <br />
            为了确保邮币集藏爱好者在邮宝平台的友好用户体验，为了帮助大家更方便地查询价格、更快地卖出自己的产品、更快地收购到心仪的藏品，即日起，邮宝全面升级会员服务体系。
          </div>

          <div className="userTitle">
            一、新四级会员服务体系，增服务、降价格！
          </div>
          <div className="content">
            我们在原有三级会员服务体系上、增加皇冠会员级别，形成白银、黄金、钻石和皇冠四级会员体系。
            <br />
            为了让更多集藏爱好者享受邮宝优质会员服务，我们取消了高级别会员的额外费用、仅仅保留基本会员服务费。
          </div>
          <div className="jaige">基本会员服务价格如下：</div>
          <img src="http://image.ybk008.com/21591446047774" alt="" className="tabel_img"/>
          <div className="content">
            同时，邮宝推出一系列增值服务，帮助会员根据需求选择，便于更快地出售、更好地收购。根据会员在平台购买增值服务的积累，自动升级会员级别。
          </div>
          <img src="http://image.ybk008.com/31591446062830" alt="" className="tabel_img"/>
          <div className="content">
            购买会员时、选择的充值时长套餐为会员的有效期。
          </div>
          <br />
          <div className="content">
            有效期过期后，会员身份失效。但是，累计消费金额不会清空。再次购买获得会员身份后、即可激活此前会员等级。
          </div>
          <div className="userTitle">二、老会员，服务免费升级、免费送！</div>
          <div className="content">
            为了反馈已有老用户对邮宝平台的支持，对于2020年5月12(不含当天)以前注册会员，免费提升会员等级，具体如下：
          </div>
          <img src="http://image.ybk008.com/4@2x1591759875527" alt="" className="tabel_img"/>
          <div className="userTitle">三、 新服务体系会员特权</div>
          <img src="http://image.ybk008.com/51591446102968" alt="" className="tabel_img"/>
          <div className="content">1.充值有礼</div>
          <img src="http://image.ybk008.com/61591446117608" alt="" className="tabel_img"/>
          <div className="content">2. 功能券使用权</div>
          <div className="content">
            会员具有购买和使用功能券（包括匿名、标题变色、闪买、闪卖、置顶）权限。
          </div>
          <div className="usertable"></div>
          <div className="zhaiwei"></div>
        </div>
      </div>
    );
  }
}
