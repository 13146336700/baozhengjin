import { PullToRefresh, Toast } from 'antd-mobile';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from "../../axios/index";
var u = navigator.userAgent;
// var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

var url:'',  getData: {};  //接口请求地址 //接口请求数据

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,  //能否上拉的判断
      height: document.documentElement.clientHeight,
      data: [], //数据列表
      pageIndex: 1, //页数
      pageSize: "20", //页数
      goodsType: '2', 
      
    };
  }
  componentWillMount() {
    
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

  getdataList(goodsType) {
    let page = this.props.page;
    // let type = this.props.type;
    switch (page) {
      case 'index':
        url= 'subject/json/getMatchProductList';  //币票配号列表
        getData = {
          pageSize: this.state.pageSize,
          pageIndex: this.state.pageIndex,
        }
        break;
      case 'goods':
        if (goodsType === "transaction") {
          url= 'subject/json/dealNumberList';  //某某商品配号列表
          getData= {
            name: this.getUrlParam('name'), //	String	是	类型	商品名称
            pageSize: this.state.pageSize,  //	String	必填	每页数量	
            pageIndex: this.state.pageIndex, //	String	必填	页码
          }
        }else {
          url= 'subject/json/goodsNumberList';  //某某商品配号列表
          getData= {
            name: this.getUrlParam('name'), //	String	是	类型	商品名称
            type: goodsType, //	String	否	类型	购买类型
            pageSize: this.state.pageSize, //	String	必填	每页数量	
            pageIndex: this.state.pageIndex, //	String	必填	页码
          }
        }
        break;
      case 'my':
        url= 'subject/json/myNumberList'; //我的配号
        getData= {
          userId: "",
          pageSize: this.state.pageSize,
          pageIndex: this.state.pageIndex,
        }
        break;
      case 'stock':
        url= 'subject/json/goodsNumber';    //我的商品号码列表
        getData= {
          userId:"",
          name: this.props.goodsName,
          type: this.props.type,
        }
        break;
      case 'searchResult':
        url= 'subject/json/searchNum'; //搜索号码
        getData= {
          sname: this.props.sname,  //	String	否	搜索关键字	
          name: this.props.name,  //	String	必填		产品名称
          type: this.props.type,  //	String	必填	品类交易类型
          tag: this.props.tag,  //	String	否	品类交易类型
          position: this.props.position,  //	String	必填	位置
          pageSize: this.state.pageSize,  //	String	必填	每页数量	
          pageIndex: this.state.pageIndex,  //	String	必填	页码
        }
        break;
    
      default:
        break;
    }
    axios.post(url, getData).then( (res)=>{
        if (res.data.resultObject.pageCount > this.state.pageIndex) {
          this.setState({
            pageIndex:Number(this.state.pageIndex) + 1,
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

  /**tab切换 */
  tabChange(index) {
    switch (index) {
      case '2':
          this.setState({
              goodsType: '2',
              pageIndex: 1
          });
          break;
      case '1':
          this.setState({
              goodsType: '1',
              pageIndex: 1
          });
          break;
      case '':
          this.setState({
              goodsType: '',
              pageIndex: 1
          });
          break;
      case 'transaction':
          this.setState({
              goodsType: 'transaction',
              pageIndex: 1
          });
          break;
  
      default:
          this.setState({
              goodsType: '2'
          });
          break;
    };
    this.getdataList(index);
}

  goodsDistribute(item) {
    if (item.sellCnt === '0' && item.buyCnt === '0') {
      Toast.info('该产品暂无需求,您可点击下面的发布按钮发布该商品', 2);
    } else {
      this.props.history.push(`/goodsDistribute?name=${item.name}&unitName=${item.unitName}&categoryName=${item.categoryName}`)
    }
    
  }

  render() {
    
    return (<div>
      {/* { 
        // this.state.data.length>0?*/}
        <PullToRefresh
          damping={80}
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
                      <li className="list" key= {index} onClick={() => this.goodsDistribute(item)}>
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
              <nav>
                <div className="tabBar">
                    <span className={this.state.goodsType==='2'?'active tab':'tab'} onClick={() => this.tabChange('2')}>出售</span>
                    <span className={this.state.goodsType==='1'?'active tab':'tab'} onClick={() => this.tabChange('1')}>求购</span>
                    <span className={this.state.goodsType===''?'active tab':'tab'} onClick={() => this.tabChange('')}>全部</span>
                    <span className={this.state.goodsType==='transaction'?'active tab':'tab'} onClick={() => this.tabChange('transaction')}>成交</span>
                </div>
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
              </nav>
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
