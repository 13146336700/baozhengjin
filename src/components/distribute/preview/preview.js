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
    
    return (<div className="mystock">
      <ul className="stocklistBox" >
        <li className="listTop">
          <span className="number">号码</span>
          <span className="unit">单位</span>
          <span className="price">价格</span>
        </li>
        {this.state.data.map(i => (
            <li className="list" key= {i}>
              <span className="number">1234 4568 45</span>
              <span className="unit">张</span>
              <span className="price"><b>46 </b>元</span>
              <span className="deal">操作</span>
            </li>
        ))}
      </ul>
      <div className="shade">
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
          {/* <button>确认修改</button> */}
        </div>
      </div>
    </div>);
  }
}
