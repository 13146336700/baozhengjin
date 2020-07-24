import React from 'react';
import "../index/index.scss";
// import Demo from "../pullRefresh/pullRefresh";
import axios from "../../axios/index";
import Uheader from "../../Goolbal/Uheader";
import { Modal, Button, Toast} from 'antd-mobile';
var u = navigator.userAgent;
// var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

export default class MyStock extends React.Component {

    componentWillMount() {
        document.title = "配号库存管理";
        //删除缓存数据
        sessionStorage.removeItem("SANZNANG_ARR");
        sessionStorage.removeItem("BIAOLIAN_ARR");
        sessionStorage.removeItem("SANLIAN_ARR");
        sessionStorage.removeItem("SANZHANG_ARR");
        sessionStorage.removeItem("BIAOLIAN_Ontable");
        sessionStorage.removeItem("newlistARR");
        
        this.getdataList();
        if (this.getUrlParam('type')) {
            this.setState({
                goodsType: this.getUrlParam('type')
            })
        }
        let userIn = JSON.parse(sessionStorage.getItem('userInfo'));
        if (userIn&&userIn.userId) {
            return false
        }
        let userInfo = {
            userId: this.getUrlParam('userId'),
            userType: this.getUrlParam('userType')
        };
        sessionStorage.setItem("userInfo",JSON.stringify(userInfo));
    };

    state = {
        dealType: '',
        publishType: 'buy', //跳转发布页面时，判断是卖还是买 
        showShadeFlag: false,    //修改弹窗显示
        changeItem: {}, //要修改的数据
        changePrice:'', //修改的价格
        addShow: 'delete',  //增加库存按钮是否显示
        data:[],        //列表数据
        goodsType: '2',     //商品分类，2卖，1买
        category:'',
        unitName:'',
        sname:'',   //搜索字段
        status:'0',  //商品状态，失效1，正常0
        idArr:[], //批量下架选择号码列表
        checkBtnShow: false,       //批量选择按钮显示
    };

    /**取消修改弹窗 */
    cancel() {
        this.setState({
            showShadeFlag: false,
            dealType: '',
            changeItem: '',
            changePrice: ''
        })
    }

    /**点击增加库存按钮操作 */
    goodsAdd() {
        // console.log(this.demo.state.data[0].goodsId);
        if (this.state.goodsType === '1') {
            this.props.history.push(`/SaleRelease?goodsId=${this.state.data[0].goodsId}&name=${this.getUrlParam('name')}&url=myStock&category=${this.state.category}&unitName=${this.state.unitName}`)
        } else {
            this.props.history.push(`/BuyingRelease?goodsId=${this.state.data[0].goodsId}&name=${this.getUrlParam('name')}&url=myStock&category=${this.state.category}&unitName=${this.state.unitName}`)
        }
    }

    /**操作弹窗显示 */
    showShade(item, type) {
        if (type === 'sign') {
            this.setState({
                showShadeFlag: true,
                dealType: 'soldOut',
                changeItem: item,
                changePrice: item.dealPrice
            });
        } else if(type === 'change') {
            this.setState({
                showShadeFlag: true,
                dealType: 'change',
                changeItem: item,
                changePrice: item.dealPrice
            });
        }else {
            this.setState({
                showShadeFlag: true,
                dealType: 'updata',
                changeItem: item,
                changePrice: item.dealPrice
            });
        }
    }

    /**tab切换 */
    tabChange(index,status) {
        let _this = this;
        switch (index) {
        case '3':
            _this.setState({
                goodsType: '3',
                pageIndex: 1,
                status:status,
                sname:''
            });
            break;
        case '2':
            _this.setState({
                goodsType: '2',
                pageIndex: 1,
                status:status,
                sname:''
            });
            break;
        case '1':
            _this.setState({
                goodsType: '1',
                pageIndex: 1,
                status:status,
                sname:''
            });
            break;
        default:
            _this.setState({
                goodsType: '2',
                pageIndex: 1,
                status:status,
                sname:''
            });
            break;
        };
        setTimeout(() =>{
            _this.getdataList(index,status);
        },10)
    }

    /**搜索输入内容改变事件 */
    snameChange(e) {
        this.setState({
            sname: e.target.value
        })
    }

    /**点击批量编辑按钮操作 */
    // batchDelete() {
    //     this.setState({
    //         addShow: 'delete'
    //     });
    // }

    /**批量下架选中号码操作 */
    // checkNumber() {

    // }

    /**批量下架 */
    // batchProcese() {
    //     this.updateFormat('3');
    // }

    /**商品号码搜索 */
    searchNumber() {
        this.getdataList(this.state.goodsType, this.state.status, this.state.sname);
    }

    /**获取列表 */
    getdataList(index,status,sname) {
        // console.log(this,'sssssss');
        let _this = this;
        axios.post('subject/json/goodsNumber',{
            userId:_this.getUrlParam('userId'),
            name: _this.getUrlParam('name'),
            type: index === '3'? '':index || _this.getUrlParam('type'),
            status:status || _this.state.status,
            sname: sname || _this.state.sname || ''
        }).then(res =>{
            let resData = res.data.resultObject;
            _this.setState({
                data: resData.dataList,
                category: resData.category,
                unitName: resData.unitName
            });
            
            _this.checkAddShow(res.data.resultObject.dataList);
        }).catch(err => {
            Toast.info(err.message, 2);
        })
    }



    /**增加库存按钮是否显示 */
    checkAddShow(item) {
        if (this.state.status === '1') {
            this.setState({
                addShow: 'none'
            });
            return false
        }
        if (item.length > 0) {
            this.setState({
                addShow: 'list'
            })
        } else {
            this.setState({
                addShow: 'none'
            })
        }
    }

    /**价格修改操作 */
    changePriceFn = (en) => {
        // if (en.target.value === '') {
        //     Toast.info("价格不能为空",2);
        //     this.setState({
        //         changePrice: en.target.value
        //     })
        //    return false 
        // }
        // let Reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
        // if (!Reg.test(en.target.value)) {
        //    Toast.info("请输入整数或者保留两位小数",2);
        //    return false 
        // }
        this.setState({
            changePrice: en.target.value
        })
    }

    /**获取网址参数 */
    getUrlParam = (name) => {
        console.log(name);
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = this.props.location.search.substr(1).match(reg);
        if (r != null) {
        return decodeURI(r[2]);
        }
        return ""; //如果此处只写return;则返回的是undefined
    };

    /**跳转商品详情 */
    goodsDetail(id) {
        if (isiOS) {
          window.webkit.messageHandlers.IOSNativeCollectionDetails.postMessage({
            'oid': id
          });
        } else {
          window.app.purchaseGoods(id)
        }
    }
    
    /**商品下架,修改价格 */
    updateFormat(type,id) {
        if (this.state.changePrice === '') {
            Toast.info("价格不能为空",2);
            return false
        }
        let Reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
        if (!Reg.test(this.state.changePrice)) {
           Toast.info("请输入整数或者保留两位小数",2);
           return false 
        }
        axios.post('subject/json/updateFormat',{
            id: id || this.state.changeItem.id,
            status:type,
            price: this.state.changePrice
        }).then(res => {
            if (res.data.message === '成功') {
                this.setState({
                    showShadeFlag: false,
                    dealType: '',
                    changeItem: {},
                    changePrice:''
                });
                this.getdataList(this.state.goodsType);
            }
            if (res.data.code === 30000) {
                Toast.info(res.data.message, 2);
            }
        }).catch(err => {
            Toast.info(err.message, 2);
        });
    }

    render() {
        const operation = Modal.operation;
        return (
            <div className="mystock" style={{background: '#FFFFFF',height:'100%'}}>
                <Uheader {...this.props} utitle="库存管理" onRef={(ref) => { this.demo = ref; }}></Uheader>
                <div className="goodsName">{this.getUrlParam('name')}</div>
                <div className="serchBox">
                    <input type="search" name="" value={this.state.sname} id="" placeholder="请输入要搜索的号码" onChange={this.snameChange.bind(this)}/><span onClick={this.searchNumber.bind(this)}>搜索</span>
                </div>
                {/* <Demo {...this.props} page="stock" showShade={this.showShade.bind(this)} showAdd={this.checkAddShow.bind(this)} onRef={(ref) => { this.demo = ref; }}></Demo> */}
                <div className="tabBar">
                    <span className={this.state.goodsType==='2'?'active tab':'tab'} onClick={() => this.tabChange('2','0')}>出售</span>
                    <span className={this.state.goodsType==='1'?'active tab':'tab'} onClick={() => this.tabChange('1','0')}>求购</span>
                    <span className={this.state.goodsType==='3'?'active tab':'tab'} onClick={() => this.tabChange('3','1')}>失效</span>
                </div>
                {
                    this.state.data.length > 0 ? (
                        <ul className="listBox stocklistBox" style={{paddingBottom:'70px'}}>
                            {this.state.data.map((item,index) => (
                                <li className={item.status !== '0'?'list stockList':'list'} key= {index} >
                                    <div className="nameBox" onClick={() => this.goodsDetail(item.goodsId)}>
                                        <p className="number">
                                            {
                                                item.status === '3' || item.status === '2'?(
                                                    <img src={item.type === '2'?require("../../assets/mai.png"):require("../../assets/mai_.png")} alt=""/>
                                                ):null
                                            }{item.format}</p>
                                        <p  className="unit">{item.tag}&nbsp;&nbsp;共<span>{item.dealCnt}</span>{item.unitName}</p>
                                    </div>
                                    <span className="price" onClick={() => this.goodsDetail(item.goodsId)}>￥{item.dealPrice}元</span>
                                    {
                                        item.status === '0'?(
                                            <Button className="deal" onClick={() => operation([
                                                { text: '商品下架', onPress: () => this.showShade(item,'sign') },
                                                { text: '修改价格', onPress: () => this.showShade(item,'change') },
                                            ])}
                                            >操作</Button>
                                        ):item.status === '3'?(
                                            <Button className="deal updata" onClick={() => operation([
                                                { text: '商品上架', onPress: () => this.showShade(item,'updata') },
                                            ])}
                                            >操作</Button>
                                        ):(<div className="deal">
                                            <img src={item.status === '2'?require("../../assets/ic_sell out.png"):require("../../assets/ic_invalid.png")} alt=""/>
                                        </div>)
                                    }
                                </li>
                            ))}
                        </ul>
                    ):(
                        <div className="empty" style={{lineHeight:'200px',textAlign:'center',fontSize:'16px'}}>
                            暂无相关数据
                        </div>
                    )
                }
                
                {
                    this.state.addShow === 'list' ? (
                        <div className="addStock" onClick={() => this.goodsAdd()}>
                            增加库存
                        </div>
                    ) : null
                    // ) : this.state.addShow === 'delete' ? (
                    //     <div className="deleteNumber" onClick={() => this.goodsAdd()}>
                    //         <p className="number">已选<span>{this.state.idArr.length}</span>个</p>
                    //         <button className="btn" onClick={() => this.showShade(null,'delete')}>一键下架</button>
                    //     </div>
                    // ) : null
                }
                
                {
                    this.state.showShadeFlag?(
                        <div className="shade">
                            {
                                this.state.dealType === 'soldOut'?(
                                    <div className="cont">
                                        <p>
                                            <label htmlFor="">号码</label>
                                            <input type="text" disabled value={this.state.changeItem.format}/>
                                        </p>
                                        <p>
                                            <label htmlFor="">价格</label>
                                            <input type="text" disabled value={this.state.changeItem.dealPrice}/>
                                        </p>
                                        <div className="div_changeList">
                                            <button onClick={() =>this.updateFormat('3')}>确认下架</button>
                                            <button onClick={() =>this.cancel()}>取消</button>
                                        </div>
                                    </div>
                                ):(
                                    <div className="cont">
                                        <p>
                                            <label htmlFor="">号码</label>
                                            <input type="text" disabled value={this.state.changeItem.format}/>
                                        </p>
                                        <p>
                                            <label htmlFor="">价格</label>
                                            <input type="text" value={this.state.changePrice} onChange={this.changePriceFn.bind(this)}/>
                                        </p>
                                        <div className="div_changeList">
                                            <button onClick={() =>this.updateFormat('0')}>{this.state.goodsType === '3'?'确认上架':'确认修改'}</button>
                                            <button onClick={() =>this.cancel()}>取消</button>
                                        </div>
                                        
                                    </div>
                                )
                                // :this.state.dealType === 'delete'?(
                                //     <div className="delete cont">
                                //         <div className="delTitle">温馨提示</div>
                                //         <div className="delCon">确认将这<span>12</span>个号码规格下架</div>
                                //         <div className="delChangeList">
                                //             <p onClick={() =>this.cancel()}>取消</p>
                                //             <p onClick={() =>this.batchProcese()}>确认下架</p>
                                //         </div>
                                //     </div>
                                // )
                            }
                        </div>
                    ):null
                }
            </div>
        );
    }
}







