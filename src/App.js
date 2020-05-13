import React,{component} from 'react';
import ReactDOM from 'react-dom';
import ceshi from './components/ceshi';

import rule from './components/rule/rule';
import Violation from './components/Violation/Violation';
import Punishment from './components/Margin/Punishment/Punishment';
import logo from './logo.svg';

import './App.css';

import {Router,Route,Switch,Redirect} from 'react-router-dom';
import { createHashHistory } from "history";
const hashHistory = createHashHistory();

function App() {
  return (
      <Router history={hashHistory}>
         <Route path="/ceshi" exact component={ceshi}/>
        
         <Route path="/rule" exact component={rule}/>
         <Route path="/Violation" exact component={Violation}/>
         <Route path="/Punishment" exact component={Punishment}/>
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