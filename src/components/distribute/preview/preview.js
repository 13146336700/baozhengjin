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
  state= {
    showShadeFlag: false,    //修改弹窗显示
    changeNum:'',
    changePrice:'',
  }

  changeNum(en) {
    this.setState({
      changeNum: en.target.value
    })
  }

  changePrice(en) {
    this.setState({
      changePrice: en.target.value
    })
  }

  changeData(item) {
    this.setState({
      showShadeFlag: true,
      changePrice: item.price,
      changeNum: item.Num
    })
  }

  changeList() {
    this.setState({
      showShadeFlag: false,
      changePrice: '',
      changeNum: ''
    })
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
              <span className="deal" onClick={() =>this.changeData('1')}>操作</span>
            </li>
        ))}
      </ul>
      {
        this.state.showShadeFlag?(
          <div className="shade">
            <div className="cont">
              <p>
                <label htmlFor="">号码</label>
                <input type="text" value={this.state.changeNum} onChange={() => this.changeNum.bind(this)}/>
              </p>
              <p>
                <label htmlFor="">价格</label>
                <input type="text"  value={this.state.changePrice} onChange={() => this.changePrice.bind(this)}/>
              </p>
              <button onClick={this.changeList.bind(this)}>确认修改</button>
            </div>
          </div>
        ):null
      }
    </div>);
  }
}
