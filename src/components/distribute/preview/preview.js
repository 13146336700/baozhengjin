import React from 'react';
import "../index/index.scss";


export default class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      down: true,
      height: document.documentElement.clientHeight,
      data: [1,1,1,1],
    };
  }

  render() {
    
    return (<div className="mystock" style={{background:'#ffffff'}}>
      <ul className="listBox stocklistBox" >
        {this.state.data.map((item,index) => (
            <li className="list" key= {index} >
              <div className="nameBox">
                <p className="number">J146450422</p>
                <p  className="unit">散连&nbsp;&nbsp;共<span>10</span>张</p>
              </div>
              <span className="price">￥46元</span>
              <span className="deal">操作</span>
            </li>
        ))}
      </ul>
      {/* <div className="shade">
        <div className="cont">
          <p>
            <label htmlFor="">号码</label>
            <input type="text" disabled value="1234567896"/>
          </p>
          <p>
            <label htmlFor="">价格</label>
            <input type="text"/>
          </p>
          <button>标为售出</button>
        </div>
      </div> */}
    </div>);
  }
}
