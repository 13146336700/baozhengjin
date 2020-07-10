import { PullToRefresh,  } from 'antd-mobile';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from "../../axios/index";


export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,  //能否上拉的判断
      height: document.documentElement.clientHeight,
      data: [], //数据列表
      pageIndex: 1, //页数
      pageSize: "20", //页数
      url:'', //接口请求地址
      getData: {},  //接口请求数据
    };
  }
  componentWillMount() {
    let type = this.props.type;
    switch (type) {
      case 'index':
        this.setState({
          url: 'subject/json/getMatchProductList',
          getData: {
            pageSize: this.state.pageSize,
            pageIndex: this.state.pageIndex,
          }
        })
        break;
      case 'goods':
        this.setState({
          url: 'subject/json/getMatchProductList',
          getData: {

          }
        })
        break;
      case 'my':
        this.setState({
          url: 'subject/json/myNumberList',
          getData: {

          }
        })
        break;
      case 'stock':
        this.setState({
          url: 'subject/json/goodsNumber',
          getData: {
            userId:"",
            name: this.props.goodsName,
            type: this.props.type,
          }
        })
        break;
      case 'search':
        this.setState({
          url: 'subject/json/getMatchProductList',
          getData: {

          }
        })
        break;
    
      default:
        break;
    }
  };
  genData() {
    const dataArr = this.state.data;
    for (let i = 0; i < 4; i++) {
      dataArr.push(i);
    }
    return dataArr;
  }

  componentDidMount() {
    let _this = this;
    const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    setTimeout(() => this.setState({
      height: hei,
      data: _this.genData(),
    }), 0);
    this.getdataList();
  }

  getdataList() {
    console.log('page类型',this.props.page);
    axios.post("subject/json/getMatchProductList", {
        sname: this.props.type?this.props.type:null,
        pageSize: '10',
        pageIndex: this.state.pageIndex,
    }).then( (res)=>{
        console.log(res);
        this.setState({
          pageIndex: this.state.pageIndex + 1
        })
    }).catch((err) =>{
        console.log(err);
    })
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
        indicator={{ deactivate: '上拉可以刷新' }}
        direction='up'
        refreshing={this.state.refreshing}
        onRefresh={() => {
          this.setState({ refreshing: true });
          this.getdataList();
          setTimeout(() => {
            this.setState({ refreshing: false });
          }, 1000);
        }}
      >
        {
          this.props.page === 'index'?(
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
          ):this.props.page === 'my'?(
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
          ):this.props.page === 'goods'?(
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
          ):this.props.page === 'stock'?(
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
          ):this.props.page === 'search'?(
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
