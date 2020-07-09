import { PullToRefresh,  } from 'antd-mobile';
import React from 'react';
import ReactDOM from 'react-dom';

function genData() {
  const dataArr = [];
  for (let i = 0; i < 4; i++) {
    dataArr.push(i);
  }
  return dataArr;
}

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      down: true,
      height: document.documentElement.clientHeight,
      data: [],
    };
  }

  componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    setTimeout(() => this.setState({
      height: hei,
      data: genData(),
    }), 0);
  }

  render() {
    
    return (<div>
      <PullToRefresh
        damping={60}
        ref={el => this.ptr = el}
        style={{
          height: this.state.height,
          overflow: 'auto',
        }}
        indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
        direction='up'
        refreshing={this.state.refreshing}
        onRefresh={() => {
          this.setState({ refreshing: true });
          setTimeout(() => {
            this.setState({ refreshing: false });
          }, 1000);
        }}
      >
        {
          this.props.type === 'index'?(
            <ul className="listBox" >
                {this.state.data.map(i => (
                    <li className="list" key= {i}>
                        <img src={require("../../assets/goods.png")} alt="商品图片"/>
                        <div className="goodsType">
                          <div className="name">
                            抗疫邮票大版
                          </div>
                          <div className="number">
                            <p>
                              出售：<span>100</span>个需求
                            </p>
                            <p>
                              收购：<span>100</span>个需求
                            </p>
                          </div>
                        </div>
                    </li>
                ))}
            </ul>
          ):this.props.type === 'my'?(
            <ul className="listBox mylist" >
                {this.state.data.map(i => (
                    <li className="list" key= {i}>
                        <img src={require("../../assets/goods.png")} alt="商品图片"/>
                        <div className="goodsType">
                          <div className="name">
                            抗疫邮票大版
                            <p>
                              <img src={require("../../assets/guanli.png")} alt="icon" className="icon"/>
                              <span>库存管理</span>
                            </p>
                          </div>
                          <div className="number">
                            <p>
                              出售：<span>100</span>个需求
                            </p>
                            <p>
                              收购：<span>100</span>个需求
                            </p>
                          </div>
                        </div>
                    </li>
                ))}
            </ul>
          ):this.props.type === 'goods'?(
              <ul className="listBox goodslistBox" >
                {this.state.data.map(i => (
                    <li className="list" key= {i}>
                        <img src={require("../../assets/goods.png")} alt="商品图片"/>
                        <div className="goodsType">
                          <div className="name">
                            <p>1283924、豹子号1246备份</p><span>￥ 146192元</span>
                          </div>
                          <div className="number">
                            <p>
                              共：<span>100</span> 张
                            </p>
                          </div>
                        </div>
                    </li>
                ))}
              </ul>
          ):this.props.type === 'stock'?(
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
          ):this.props.type === 'search'?(
            <ul className="listBox goodslistBox" >
              {this.state.data.map(i => (
                  <li className="list" key= {i}>
                      <img src={require("../../assets/goods.png")} alt="商品图片"/>
                      <div className="goodsType">
                        <div className="name">
                          <p>1283924、豹子号1246备份</p><span>￥ 146192元</span>
                        </div>
                        <div className="number">
                          <p>
                            共：<span>100</span> 张
                          </p>
                        </div>
                      </div>
                  </li>
              ))}
            </ul>
          ):null
        }

      </PullToRefresh>
    </div>);
  }
}
