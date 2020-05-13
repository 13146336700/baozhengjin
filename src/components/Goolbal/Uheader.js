import React from 'react';
import {Link} from 'react-router-dom';
import "./Uheader.scss";

function Uheaders(props) {
	console.log(props)
  return (
    <div className="Uheaders">
		 <ul>
		   <li><img src={require('../assets/Goreturn.png')}/></li>
           <li>{props.utitle}</li>
           <li>{props.subtitle}</li>
		 </ul>
     
    </div>
  );
}
export default Uheaders;

// function App1123() {
//   return (
//     <div className="Uheaders">
//          我是测试页面哟~~~666
// 	   <ul className="menu">
// 	    <li>123</li>
// 		<li>我都是好孩子</li>
// 	    <Link to='/Page1'>Page1跳转</Link>
// 	  </ul>
//     </div>
//   );
// }



// class Uheaders extends Component {
//   render() {
//     return (
//       <div className="Uheaders">
//       		 <ul>
//       		   <li><img src={require('../assets/Goreturn.png')}/></li>
//                <li>12132</li>
//               <li>规则</li>
//        		 </ul>
//        </div>
//     )
//   }
// }
// export default Uheaders;