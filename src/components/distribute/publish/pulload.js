import React from 'react';
import "../index/index.scss";
import axios from "../../axios/index";
import ReactPullLoad,{STATS} from 'react-pullload'
import "../../../../node_modules/react-pullload/dist/ReactPullLoad.css";

const loadMoreLimitNum = 2;

const cData = [
  "http://img1.gtimg.com/15/1580/158031/15803178_1200x1000_0.jpg",
  "http://img1.gtimg.com/15/1580/158031/15803179_1200x1000_0.jpg",
  "http://img1.gtimg.com/15/1580/158031/15803181_1200x1000_0.jpg",
  "http://img1.gtimg.com/15/1580/158031/15803182_1200x1000_0.jpg",
  "http://img1.gtimg.com/15/1580/158031/15803183_1200x1000_0.jpg",
]

export default class Pulload extends React.Component {
    constructor(){
      super();
      this.state ={
        hasMore: true,
        data: cData,
        action: STATS.init,
        index: loadMoreLimitNum, //loading more test time limit
        pageIndex: 1, //页数
        pageSize: "20", //页数
        daad:[]
      }
    }


    componentDidMount() {
      this.getList();
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
  
    handleAction = (action) => {
      let arr = this.state.data;
      console.info(action, this.state.action,action === this.state.action);
      //new action must do not equel to old action
      if(action === this.state.action ||
        action === STATS.refreshing && this.state.action === STATS.loading ){
        // console.info("It's same action or on loading or on refreshing ",action, this.state.action,action === this.state.action);
        return false
      }
  
      if(action === STATS.refreshing){//刷新
        setTimeout(()=>{
          //refreshing complete
          this.setState({
            data: cData,
            hasMore: true,
            action: STATS.refreshed,
            index: loadMoreLimitNum
          });
        }, 3000)
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
            axios.post('subject/json/getMatchProductList',{
              pageSize: this.state.pageSize,
              pageIndex: Number(this.state.pageIndex) + 1,
            }).then(res => {
              // res.data.resultObject.dataList.map((key) =>{
              //   arr.push(key);
              // })
               arr = arr.concat(res.data.resultObject.dataList);
              console.log(arr);
              this.setState({
                // data: [...this.state.data, res.data.resultObject.dataList],
                data: arr,
                action: STATS.reset,
              });

            })
            
          }
        }, 3000)
      }
  
      //DO NOT modify below code
      this.setState({
        action: action
      })
    }
  
    getScrollTop = ()=>{
      if(this.refs.reactpullload){
        console.info(this.refs.reactpullload.getScrollTop());
      }
    }
    setScrollTop = ()=>{
      if(this.refs.reactpullload){
        console.info(this.refs.reactpullload.setScrollTop(200));
      }
    }
  
    render(){
      const {
        data,
        hasMore
      } = this.state
  
      return (
        <div style={{background:'white',margin:0,padding:0,overflow:'scroll'}}>
          <ReactPullLoad
            // downEnough={150}
            ref="reactpullload"
            className="block"
            isBlockContainer={true}
            action={this.state.action}
            handleAction={this.handleAction}
            hasMore={hasMore}
            style={{paddingTop: 0}}
            distanceBottom={1000}>
            <ul className="listBox">
              {
                data.map( (item, index )=>{
                  // return <li key={index}><img src={str} alt="" style={{width:'100%',display:'block'}}/></li>
                  return (
                    <li className="list" key= {index} >
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
                  )
                })
              }
            </ul>
          </ReactPullLoad>
        </div>
      )
    }
  }

