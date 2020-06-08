import React, { Component } from "react";
import "./releasecontent.scss";
export default class interests extends React.Component {
    componentWillMount(){
        document.title = "会员权益说明";
    };
  render() {
    return (
      <div className="interests">
        <div className="zhanwei"></div>
        <header>
          会员是邮宝为了更好服务用户，推出的一项增值会员服务，包含众多会员专属权益，全面提升核心用户购物体验，成为会员后您将获得以下会员特权：
        </header>
        <nav>
          <h2>专享免费功能券</h2>
          <ul>
            <li>
              <span className="heidian"></span>
              会员充值时可免费获得平台
              <span className="redconcat">赠送功能券</span>
            </li>
           
          </ul>
        </nav>
        <nav>
          <h2>会员享购买功能券</h2>
          <ul>
          <li>
              <span className="heidian"></span>
              会员期内可
              <span className="redconcat">使用金豆购买平台功能券</span>，包括：匿名、标题变色、闪买、闪卖、置顶
            </li>
            
          </ul>
        </nav>
        <nav>
          <h2>会员享折扣购买金豆</h2>
          <ul>
            <li>
              <span className="heidian"></span>
              会员期内会员可根据会员等级享受不同
              <span className="redconcat">折扣购买金豆</span>
            </li>
            
          </ul>
        </nav>
        <nav>
          <h2>常见问题</h2>
         
        </nav>
        <nav>
          <h2>会员如何退订？</h2>
          <ul>
            <li>
              <span className="heidian"></span>
              会员到期后，如用户不再续费则自动退订，会员有效期内无法退订会员，已缴纳的会员费用不能返还。
            </li>
          </ul>
        </nav>
        <nav>
          <h2>会员过期后功能券有无使用限制？</h2>
          <ul>
            <li>
              <span className="heidian"></span>
              功能券仅限会员期内有效，会员过期后剩余功能券将不能使用；
            </li>
            <li>
              <span className="heidian"></span>
              会员过期后剩余功能券将继续保留，用户续费会员即可继续使用上个会员期内剩余的功能券；
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
