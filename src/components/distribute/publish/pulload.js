import React from 'react';
import "../index/index.scss";
import axios from "../../axios/index";
import ReactPullLoad,{STATS} from 'react-pullload'
import "../../../../node_modules/react-pullload/dist/ReactPullLoad.css";
import { Toast } from 'antd-mobile';
var u = navigator.userAgent;
// var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var url:'',  getData: {};  //接口请求地址 //接口请求数据


const loadMoreLimitNum = 2;


export default class Pulload extends React.Component {
    constructor(){
      super();
      this.state ={
        hasMore: true,
        data: [],
        action: STATS.init,
        index: loadMoreLimitNum, //loading more test time limit
        refreshing: false,  //能否上拉的判断
        height: document.documentElement.clientHeight,
        data: [], //数据列表
        pageIndex: 1, //页数
        pageSize: "20", //页数
        goodsType: '2', 
        page: 'index'
      }
    }

    componentWillMount() {
      this.props.onRef(this);
      if (this.getUrlParam('type')) {
        this.setState({
            goodsType: this.getUrlParam('type')
        })
      }else if(this.props.page === 'goods') {
        this.setState({
          goodsType: ''
        })
      }
    };
  
    componentDidMount() {
      
      this.getdataList();
    }


    getList() {
      axios.post('subject/json/getMatchProductList',{
        pageSize: this.state.pageSize,
        pageIndex: this.state.pageIndex,
      }).then(res => {
          this.setState({
              data: res.data.resultObject.dataList
          });
      })
    }

    getListss() {
      axios.post('subject/json/getMatchProductList',{
        pageSize: this.state.pageSize,
        pageIndex: this.state.pageIndex,
      }).then(res => {
          this.setState({
            daad: res.data.resultObject.dataList
          });
      })
    }

    

    getdataList(goodsType) {
      let page = this.props.page;
      let arr = this.state.data;
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
              type: goodsType || this.getUrlParam('type'), //	String	否	类型	购买类型
              pageSize: this.state.pageSize, //	String	必填	每页数量	
              pageIndex: this.state.pageIndex, //	String	必填	页码
            }
          }
          break;
        case 'my':
          url= 'subject/json/myNumberList'; //我的配号
          getData= {
            userId: this.getUrlParam('userId'),
            pageSize: this.state.pageSize,
            pageIndex: this.state.pageIndex,
          }
          break;
        case 'searchResult': //searchResult?name=JP246金丝猴&type=1&sname=365&position=any&tag=顺号
          url= 'subject/json/searchNum'; //搜索号码
          getData= {
            sname: this.getUrlParam('sname'),  //	String	否	搜索关键字	
            name: this.getUrlParam('name'),  //	String	必填		产品名称
            type: goodsType || this.getUrlParam('type'),  //	String	必填	品类交易类型
            tag: this.getUrlParam('tag'),  //	String	否	品类交易类型
            position: this.getUrlParam('position'),  //	String	必填	位置
            pageSize: this.state.pageSize,  //	String	必填	每页数量	
            pageIndex: this.state.pageIndex,  //	String	必填	页码
          }
          break;
      
        default:
          url= 'subject/json/getMatchProductList';  //币票配号列表
          getData = {
            pageSize: this.state.pageSize,
            pageIndex: this.state.pageIndex,
          }
          break;
      }
      axios.post(url, getData).then( (res)=>{
        arr = arr.concat(res.data.resultObject.dataList);
        if (res.data.resultObject.pageCount > this.state.pageIndex) {
          this.setState({
            pageIndex:Number(this.state.pageIndex) + 1,
            data: arr,
            action: STATS.reset,
          });
        }else {
          this.setState({
            data: arr,
            action: STATS.reset,
            index: 0
          });
        }
         
      }).catch((err) =>{
        Toast.info(err.data.message, 2);
      })
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
                pageIndex: 1,
                data: []
            });
            break;
        case '1':
            this.setState({
                goodsType: '1',
                pageIndex: 1,
                data: []
            });
            break;
        case '':
            this.setState({
                goodsType: '',
                pageIndex: 1,
                data: []
            });
            break;
        case 'transaction':
            this.setState({
                goodsType: 'transaction',
                pageIndex: 1,
                data: []
            });
            break;
        default:
            this.setState({
                goodsType: '2',
                pageIndex: 1,
                data: []
            });
            break;
      };
      // arr = [];
      setTimeout(() =>{
        this.getdataList(index);
      },10)
    }

    /**商品详情 */
    goodsDetail(id) {
      if (isiOS) {
        window.webkit.messageHandlers.IOSNativeCollectionDetails.postMessage({'oid': id});
      } else {
        window.app.purchaseGoods(id)
      }
    }

    /**市场行情 */
    market(oid, code, tag) {
      if (isiOS) {
        window.webkit.messageHandlers.IOSNativeMarket.postMessage({'oid': oid,'code':code,'tag':tag});
      } else {
        window.app.androidNativeMarket(JSON.stringify({'oid': oid,'code':code,'tag':tag}))
      }
    }

    /**成交详情 */
    tradeDetail(oid, orderId) {
      if (isiOS) {
        window.webkit.messageHandlers.IOSNativeTradeDetails.postMessage({'oid': oid,'orderId':orderId});
      } else {
        window.app.androidNativeTradeDetails(JSON.stringify({'oid': oid,'orderId':orderId,'aa':'aaaaa'}))
      }
    }
  
    goodsDistribute(item) {
      if (item.sellCnt === '0' && item.buyCnt === '0') {
        Toast.info('该产品暂无需求,您可点击下面的发布按钮发布该商品', 2);
      } else {
        this.props.history.push(`/goodsDistribute?name=${item.name}&unitName=${item.unitName}&categoryName=${item.categoryName}`);
        let goodsInfo = {
          name: item.name,
          unitName: item.unitName,
          categoryName: item.categoryName
        }
        sessionStorage.setItem('goodsInfo', JSON.stringify(goodsInfo));
      }
    }
  
    handleAction = (action) => {
      
      // console.info(action, this.state.action,action === this.state.action);
      //new action must do not equel to old action
      if(action === this.state.action ||
        action === STATS.refreshing && this.state.action === STATS.loading ){
        // console.info("It's same action or on loading or on refreshing ",action, this.state.action,action === this.state.action);
        return false
      }
  
      if(action === STATS.refreshing){//刷新
        (function smoothscroll(){
          var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
               window.requestAnimationFrame(smoothscroll);
               window.scrollTo (0,currentScroll - (currentScroll/5));
          }
        })();
        
      } else if(action === STATS.loading){//加载更多
        this.setState({
          hasMore: true
        });
        setTimeout(()=>{
          if(this.state.index === 0){
            this.setState({
              action: STATS.reset,
              hasMore: false
            });
          } else{
            
            this.getdataList();
          }
        }, 3000)
      }
  
      //DO NOT modify below code
      this.setState({
        action: action
      })
    }
  
  
    render(){
      const {hasMore} = this.state;
  
      return (
        <div style={{background:'white',margin:0,padding:0,overflow:'scroll'}}>
          
            <ReactPullLoad
              downEnough={500}
              ref="reactpullload"
              className="block"
              isBlockContainer={false}
              action={this.state.action}
              handleAction={this.handleAction}
              hasMore={hasMore}
              style={{paddingTop: 0}}
              distanceBottom={1000}>
                {
                  this.props.page === 'index'?(
                    <nav>
                      {
                        this.state.data.length > 0 ?(
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
                                    <div onClick={() => this.market(item.sid, item.code, item.tag)}>最新市场行情</div>
                                </li>
                            ))}
                        </ul>
                        ):(
                          <div style={{background: '#f5f5f9',lineHeight: '300px',textAlign: 'center',fontSize: '16px'}}>暂无相关数据</div>
                        )
                      }
                    </nav>
                  ):this.props.page === 'my'?(
                    <nav>
                      {
                        this.state.data.length > 0 ?(
                          <ul className="listBox mylist" >
                            {this.state.data.map((item,index) => (
                                <li className="list" key= {index} onClick={() => this.props.history.push(`/myStock?userId=${this.getUrlParam('userId')}&type=2&name=${item.name}`)}>
                                    <img src={item.showImg} alt="商品图片"/>
                                    <div className="goodsType">
                                      <div className="name">{item.name}<p>
                                          <img src={require("../../assets/guanli.png")} alt="icon" className="icon"/>
                                          <span>库存管理</span>
                                        </p>
                                      </div>
                                      <div className="number">
                                        <p>
                                          出售：<span>{item.sellCnt?item.sellCnt:0}</span>个需求
                                        </p>
                                        <p>
                                          收购：<span>{item.buyCnt?item.buyCnt:0}</span>个需求
                                        </p>
                                      </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        ):(
                          <div style={{background: '#ffffff',lineHeight: '300px',textAlign: 'center',fontSize: '16px'}}>暂无相关数据</div>
                        )
                      }
                    </nav>
                  ):this.props.page === 'goods'?(
                    <nav>
                      <div className="tabBar">
                        <span className={this.state.goodsType===''?'active tab':'tab'} onClick={() => this.tabChange('')}>全部</span>
                        <span className={this.state.goodsType==='2'?'active tab':'tab'} onClick={() => this.tabChange('2')}>出售</span>
                        <span className={this.state.goodsType==='1'?'active tab':'tab'} onClick={() => this.tabChange('1')}>求购</span>
                        <span className={this.state.goodsType==='transaction'?'active tab':'tab'} onClick={() => this.tabChange('transaction')}>成交</span>
                      </div>
                      {
                        this.state.data.length > 0 ?(
                          <ul className="listBox goodslistBox" >
                            {this.state.data.map((item,index) => (
                                <li className="list" key= {index} onClick={() => item.ordersId?this.tradeDetail(item.goodsId, item.ordersId):this.goodsDetail(item.goodsId)}>
                                    {/* <img src={require("../../assets/goods.png")} alt="商品图片"/> */}
                                    <div className="goodsType">
                                      <div className="name">
                                        <img className='icon' src={item.type === '2'? require("../../assets/mai.png"):require('../../assets/mai_.png')} alt=""/><p>{item.numStr}</p><span>￥ {item.dealPrice}元</span>
                                      </div>
                                      <div className="number">
                                        <p>
                                          共：<span>{item.dealCnt}</span> 张
                                        </p>
                                      </div>
                                    </div>
                                </li>
                            ))}
                          </ul>
                        ):(
                          <div style={{background: '#f5f5f9',lineHeight: '300px',textAlign: 'center',fontSize: '16px'}}>暂无相关数据</div>
                        )
                      }
                    </nav>
                  ):this.props.page === 'searchResult'?(
                    <nav>
                      <div className="tabBar">
                          <span className={this.state.goodsType==='2'?'active tab':'tab'} onClick={() => this.tabChange('2')}>出售</span>
                          <span className={this.state.goodsType==='1'?'active tab':'tab'} onClick={() => this.tabChange('1')}>求购</span>
                      </div>
                      {
                        this.state.data.length > 0 ?(
                          <ul className="listBox stocklistBox" >
                            {this.state.data.map((item,index) => (
                                <li className="list " key= {index} onClick={() => this.goodsDetail(item.goodsId)}>
                                  {/* <img src={require("../../assets/goods.png")} alt="商品图片"/> */}
                                  <div className="nameBox" >
                                  <div className="number"><img className='icon' src={item.type === '2'? require("../../assets/mai.png"):require('../../assets/mai_.png')} alt=""/>{item.format}</div>
                                  <p  className="unit">{item.tag}&nbsp;&nbsp;共<span>{item.dealCnt}</span>{item.unitName}</p>
                                  </div>
                                  <span className="price" >￥{item.dealPrice}元</span>
                                </li>
                              ))
                            }
                          </ul>
                        ):(
                          <div style={{background: '#ffffff',lineHeight: '300px',textAlign: 'center',fontSize: '16px'}}>暂无相关数据</div>
                        )
                      }
                    </nav>
                  ):null
                }
            </ReactPullLoad>
           
        </div>
      )
    }
  }

