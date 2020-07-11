import React from 'react';


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
    
    return (<div>
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
    </div>);
  }
}
