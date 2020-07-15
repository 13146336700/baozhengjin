import { PullToRefresh,  } from 'antd-mobile';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from "../../axios/index";
var u = navigator.userAgent;
// var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端


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
    let page = this.props.page;
    let type = this.props.type;
    switch (page) {
      case 'index':
        this.setState({
          url: 'subject/json/getMatchProductList',  //币票配号列表
          getData: {
            pageSize: this.state.pageSize,
            pageIndex: this.state.pageIndex,
          }
        });
        break;
      case 'goods':
        if (type === "transaction") {
          this.setState({
            url: 'subject/json/dealNumberList',  //某某商品配号列表
            getData: {
              name: this.getUrlParam('name'), //	String	是	类型	商品名称
              pageSize: this.state.pageSize,  //	String	必填	每页数量	
              pageIndex: this.state.pageIndex, //	String	必填	页码
            }
          })
        }else {
          this.setState({
            url: 'subject/json/goodsNumberList',  //某某商品配号列表
            getData: {
              name: "", //	String	是	类型	商品名称
              type: "", //	String	否	类型	购买类型
              pageSize: this.state.pageSize, //	String	必填	每页数量	
              pageIndex: this.state.pageIndex, //	String	必填	页码
            }
          })
        }
        break;
      case 'my':
        this.setState({
          url: 'subject/json/myNumberList', //我的配号
          getData: {
            userId: "",
            pageSize: this.state.pageSize,
            pageIndex: this.state.pageIndex,
          }
        });
        break;
      case 'stock':
        this.setState({
          url: 'subject/json/goodsNumber',    //我的商品号码列表
          getData: {
            userId:"",
            name: this.props.goodsName,
            type: this.props.type,
          }
        });
        break;
      case 'searchResult':
        this.setState({
          url: 'subject/json/searchNum', //搜索号码
          getData: {
            sname: this.props.sname,  //	String	否	搜索关键字	
            name: this.props.name,  //	String	必填		产品名称
            type: this.props.type,  //	String	必填	品类交易类型
            tag: this.props.tag,  //	String	否	品类交易类型
            position: this.props.position,  //	String	必填	位置
            pageSize: this.state.pageSize,  //	String	必填	每页数量	
            pageIndex: this.state.pageIndex,  //	String	必填	页码
          }
        });
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
    // const hei = '20';
    setTimeout(() => this.setState({
      height: hei,
      data: _this.genData(),
    }), 0);
    this.getdataList();
  }

  getdataList() {
    axios.post(this.state.url, this.state.getData).then( (res)=>{
        if (res.data.resultObject.pageCount > this.state.pageIndex) {
          this.setState({
            getData:{pageIndex: this.state.pageIndex + 1},
            data: res.data.resultObject.dataList,
            refreshing: false
          });
        }else {
          this.setState({
            refreshing: false,
            data: res.data.resultObject.dataList
          });
        }
    }).catch((err) =>{
        console.log(err);
    })
  }

  goodsDetail(id) {
    if (isiOS) {
      window.webkit.messageHandlers.IOSNativeCollectionDetails.postMessage({
        'oid': id
      });
    } else {
      window.app.purchaseGoods(id)
    }
  }

  /**获取网址参数 */
  getUrlParam = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = this.props.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    }
    return ""; //如果此处只写return;则返回的是undefined
  };

  goodsDistribute(name) {
    this.props.history.push(`/goodsDistribute?name=${name}`)
  }

  render() {
    
    return (<div>
      {/* { 
        // this.state.data.length>0?*/}
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
            
          }}
        >
          {
            this.props.page === 'index'?(
              <ul className="listBox" >
                  {this.state.data.map((item,index) => (
                      <li className="list" key= {index} onClick={() => this.goodsDistribute(item.name)}>
                          <img src={item.showImg} alt="商品图片"/>
                          <div className="goodsType">
                            <div className="name">{item.name}</div>
                            <div className="number">
                              <p>
                                出售：<span>{item.sellCnt}</span>个需求
                              </p>
                              <p>
                                收购：<span>{item.buyCnt}</span>个需求
                              </p>
                            </div>
                          </div>
                      </li>
                  ))}
              </ul>
            ):this.props.page === 'my'?(
              <ul className="listBox mylist" >
                  {this.state.data.map((item,index) => (
                      <li className="list" key= {index} onClick={() => this.props.history.push(`/myStock`)}>
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
                  {this.state.data.map((item,index) => (
                      <li className="list" key= {index} onClick={() => this.goodsDetail(index)}>
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
            ):this.props.page === 'searchResult'?(
              <ul className="listBox goodslistBox" >
                {this.state.data.map((item,index) => (
                    <li className="list" key= {index}>
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
        {/* : <p>暂无数据</p> */}
      {/* } */}

    </div>);
  }
}
