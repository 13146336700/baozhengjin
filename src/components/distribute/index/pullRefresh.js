import { PullToRefresh } from 'antd-mobile';
import React from 'react';
import ReactDOM from 'react-dom';

function genData() {
  const dataArr = [];
  for (let i = 0; i < 10; i++) {
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
        <ul className="listBox">
            {this.state.data.map(i => (
                <li className="list" key= {i}>
                    <img src="https://modao.cc/uploads4/images/5107/51071531/v2_qcvhgu.png" alt="商品图片"/>
                    <p className="goodName">抗疫大版邮票</p>
                </li>
            ))}
        </ul>
      </PullToRefresh>
    </div>);
  }
}
