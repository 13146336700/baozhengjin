import React,{Component} from 'react';
// import ReactDOM from 'react-dom';
import ceshi from './components/ceshi';
import Page from './components/Page';
import rule from './components/rule/rule';
import help from './components/help/help';
import Violation from './components/Violation/Violation';
import Punishment from './components/Margin/Punishment/Punishment';
import Already_paid from './components/Margin/Already_paid/Already_paid';
import band_paid from './components/Margin/band_paid/band_paid';
import permanent from './components/Margin/band_paid/permanent';
import penaltiesDetails from './components/Margin/penaltiesDetails/penaltiesDetails';
import Pay_band from './components/Margin/Pay_band/Pay_band';
import advisory from './components/advisory/advisory';
import good from './components/Margin/good/good'; 
import releasecontent from './components/releasecontent/releasecontent'; 
import member from './components/member/member';
import menberExplanation from './components/member/menberExplanation';
import SaleRelease from './components/distribute/SaleRelease/SaleRelease';
import SaleReleaseSeach from './components/distribute/SaleRelease/SaleReleaseSeach';
import BuyingRelease from './components/distribute/SaleRelease/BuyingRelease';
import Increase from './components/distribute/SaleRelease/Increase';
import SaleDetails from './components/distribute/SaleRelease/SaleDetails';
// import logo from './logo.svg';
// 配号功能部分
import distribute from "./components/distribute/index/index";
import MyDistribute from "./components/distribute/myDistribute/mydistribute"
import Goods from "./components/distribute/goodsDistribute/goodsdistribute" 
import MyStock from "./components/distribute/myStock/mystock" 
import SearchNumber from "./components/distribute/search/search" 
import SearchResult from "./components/distribute/search/searchResult" 
import Preview from "./components/distribute/preview/preview" 
// import Publish from "./components/distribute/publish/publish" 

import './App.css';

import {Router,Route,Switch,Redirect} from 'react-router-dom';
import { createHashHistory } from "history";
const hashHistory = createHashHistory();

/* 
Page 总页面入口文件
 rule 规则
 Violation 列表
 penaltiesDetails 列表详情 需要跟?satus 刷新消失
 Punishment 处罚展示 /跟用户id  系统自动扣费
 permanent 永久封号 /跟用户id
 band_paid 自然解除 /跟用户id
 Pay_band 待缴纳 /跟用户id
 good 信用良好
 Already_paid 已缴纳 /跟用户id
 
 ---------------
 advisory 交易安全数据保障

 ----------------------------
 App会员信息

 member /跟用户id
 menberExplanation  会员体系升级

 --------------------------
 releasecontent 发布动态文字弹框内容
 releasecontent/1?day=5 发布弹框 day为天数
 releasecontent/2 担保弹框
 releasecontent/3?state=5 会员弹框 state会员的等级
 --------------------------

 帮助
help/member 会员帮助
help/promotion 推广帮助
--------------------------------------------
配号码

BuyingRelease     配号出售发布
SaleRelease       配号求购发布
Increase          增加库存
SaleDetails       增加详情 上传图片
distribute        币票配号，配号功能首页
myDistribute      我的配号
goodsDistribute   商品分类列表
myStock           我的库存
preview           发布预览
searchNumber      配号搜索页
searchResult      配号搜索结果页
publish           发布弹窗页，选择发布类型



 */
function App() {
  return (
      <Router history={hashHistory}>
         <Route path="/ceshi" exact component={ceshi}/>
         <Route path="/Page/:userId" exact component={Page}/>
         <Route path="/rule" exact component={rule}/>
         <Route path="/help/:type" exact component={help}/>
         <Route path="/Violation/:userId" exact component={Violation}/>
         <Route path="/Punishment/:userId" exact component={Punishment}/>
         <Route path="/Already_paid/:userId" exact component={Already_paid}/>
         <Route path="/band_paid/:userId" exact component={band_paid}/>
         <Route path="/permanent/:userId" exact component={permanent}/>
         <Route path="/penaltiesDetails" exact component={penaltiesDetails}/>
         <Route path="/advisory" exact component={advisory}/>
         <Route path="/good" exact component={good}/>
         <Route path="/Pay_band/:userId" exact component={Pay_band}/>
         <Route path="/member/:userId" exact component={member}/>
         <Route path="/menberExplanation" exact component={menberExplanation}/>
         <Route path="/releasecontent/:num" exact component={releasecontent}/>    
         <Route path="/SaleRelease" exact component={SaleRelease}/>   
         <Route path="/SaleReleaseSeach/:ustate" exact component={SaleReleaseSeach}/>   
         <Route path="/BuyingRelease" exact component={BuyingRelease}/>   
         <Route path="/Increase" exact component={Increase}/>   
         <Route path="/SaleDetails" exact component={SaleDetails}/>   
         <Route path="/distribute" exact component={distribute}/>    
         <Route path="/myDistribute/" exact component={MyDistribute}/>    
         <Route path="/goodsDistribute/" exact component={Goods}/>    
         <Route path="/myStock/" exact component={MyStock}/>    
         <Route path="/searchNumber" exact component={SearchNumber}/>    
         <Route path="/searchResult" exact component={SearchResult}/>    
         <Route path="/preview" exact component={Preview}/>    
         {/* <Route path="/publish/" exact component={Publish}/>     */}

      </Router>
  );
}

export default App;