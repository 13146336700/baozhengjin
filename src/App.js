import React,{Component} from 'react';
// import ReactDOM from 'react-dom';
import ceshi from './components/ceshi';
import Page from './components/Page';
import rule from './components/rule/rule';
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
// import logo from './logo.svg';

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
 --------------------------
 releasecontent 发布动态文字弹框内容

 
 */
function App() {
  return (
      <Router history={hashHistory}>
         <Route path="/ceshi" exact component={ceshi}/>
         <Route path="/Page/:userId" exact component={Page}/>
         <Route path="/rule" exact component={rule}/>
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
         <Route path="/releasecontent/:num" exact component={releasecontent}/>     
      </Router>
  );
}

// import App from './components/ceshi';
// import RouterConfig from './Router/index.js';
// ReactDOM.render( < App / > , document.getElementById('root'));

export default App;


// import React, { Component } from 'react';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//               <header className="App-header">
//           <p>
//             hello world
//           </p>
//         </header>
//       </div>
//     );
//   }
// }

// export default App;