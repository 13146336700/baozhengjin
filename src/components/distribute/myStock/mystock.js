import React from 'react';
import "../index/index.scss";
// import Demo from "../pullRefresh/pullRefresh";
import axios from "../../axios/index";
import Uheader from "../../Goolbal/Uheader";
import { Modal, Button, Toast} from 'antd-mobile';
var u = navigator.userAgent;
// var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var listData = [];

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

    constructor(props){
        super(props);
        this.batchDelete=this.batchDelete.bind(this);
        this.deleteCancel=this.deleteCancel.bind(this);
    }

    state = {
        dealType: '',
        publishType: 'buy', //跳转发布页面时，判断是卖还是买 
        showShadeFlag: false,    //修改弹窗显示
        changeItem: {}, //要修改的数据
        changePrice:'', //修改的价格
        addShow: '',  //增加库存按钮是否显示
        data:[],        //列表数据
        goodsType: '2',     //商品分类，2卖，1买
        category:'',
        unitName:'',
        sname:'',   //搜索字段
        status:'0',  //商品状态，失效1，正常0
        idArr:[], //批量下架选择号码列表
        checkBtnShow: false,       //批量选择按钮显示
        checkedLength: 0,   //批量下架选中数量
        isCancel: "delete", //批量编辑取消按钮状态
    };

    /**取消修改弹窗 */
    cancel() {
        this.setState({
            showShadeFlag: false,
            dealType: '',
            changeItem: '',
            changePrice: '',
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
        }else if(type === 'delete') {
            this.setState({
                showShadeFlag: true,
                dealType: 'delete',
                changeItem: '',
                changePrice: ''
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
        _this.setState({
            addShow: 'list',
            isCancel: "delete",
            checkedLength: 0
        });
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

    /**商品号码搜索 */
    searchNumber() {
        this.getdataList(this.state.goodsType, this.state.status, this.state.sname);
    }

    /**获取列表 */
    getdataList(index,status,sname) {
        // console.log(this.state.isFirst,'sssssss');
        let _this = this;
        let isfrist = 'Y';      //是否为第一次请求
        if (index === '1' && sessionStorage.getItem("buyGid")) {
            isfrist = 'N';
        }
        if (index === '2' && sessionStorage.getItem("sellGid")) {
            isfrist = 'N';
        }
        
        axios.post('subject/json/goodsNumber',{
            userId:_this.getUrlParam('userId'),
            name: _this.getUrlParam('name'),
            type: index === '3'? '':index || _this.getUrlParam('type'),
            status:status || _this.state.status,
            sname: sname || _this.state.sname || '',
            isFirst: isfrist
        }).then(res =>{
            let resData = res.data.resultObject;
            _this.setState({
                data: resData.dataList,
                category: resData.category,
                unitName: resData.unitName
            });
            listData = resData.dataList;
            if ((index === '1' || _this.getUrlParam('type') === '1') && resData.gid !== null) {
                sessionStorage.setItem('buyGid',resData.gid);
            }
            if ((index === '2' || _this.getUrlParam('type') === '2') && resData.gid !== null) {
                sessionStorage.setItem('sellGid',resData.gid);
            }
            
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
        // console.log(name);
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
    updateFormat(status,id,type) {
        if (type !== 'pl' && this.state.changePrice === '') {
            Toast.info("价格不能为空",2);
            return false
        }
        let Reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
        if (type !== 'pl' && !Reg.test(this.state.changePrice)) {
           Toast.info("请输入整数或者保留两位小数",2);
           return false 
        }
        let mydata = {};
        if (type === 'pl') {
            mydata = {
                ids: id || this.state.changeItem.id,
                status:status,
                price: this.state.changePrice
            }
        } else {
            mydata = {
                id: id || this.state.changeItem.id,
                status:status,
                price: this.state.changePrice
            }
        }
        axios.post('subject/json/updateFormat',mydata).then(res => {
            if (res.data.message === '成功') {
                this.setState({
                    showShadeFlag: false,
                    dealType: '',
                    changeItem: {},
                    changePrice:''
                });
                Toast.info(res.data.message, 2);
                this.getdataList(this.state.goodsType);
            }
            if (res.data.code === 30000) {
                Toast.info(res.data.message, 2);
            }
        }).catch(err => {
            Toast.info(err.message, 2);
        });
    }

    /**商品描述编辑 */
    goodsDescribe() {
        sessionStorage.setItem("ReturnGo","1");
        let gid = '';
        if (this.state.goodsType === '1') {
            gid = sessionStorage.getItem('buyGid');
        }
        if (this.state.goodsType === '2') {
            gid = sessionStorage.getItem('sellGid');
        }
        sessionStorage.removeItem('sellGid');
        sessionStorage.removeItem('buyGid');

        this.props.history.push({
            pathname: "/SaleDetails",
              state: {
                goodsId: gid,
                scatteredJson:JSON.stringify([]),
                standardConsecutiveJson:JSON.stringify([]),
                otherConsecutiveJson:JSON.stringify([]),
                pubUserid:this.getUrlParam('userId'),
                name:this.getUrlParam('name'),
                type:this.state.goodsType
            },
        });
    }

    /**点击批量编辑按钮操作 */
    batchDelete() {
        if (this.state.data.length < 1) {
            Toast.info('当前无数据无法编辑');
            return false;
        }
        this.setState({
            addShow: 'delete',
            isCancel: "cancel"
        });
    }

    /**头部取消批量编辑 */
    deleteCancel() {
        this.setState({
            addShow: 'list',
            isCancel: "delete",
            checkedLength: 0
        });
        listData = this.state.data;

    }

    /**批量下架确认按钮事件 */
    batchProcese() {
        let idArr = [];
        let data = this.state.data;
        for (let i = 0; i < data.length; i++) {
            if(data[i].check && data[i].check === '1'){
                idArr.push(data[i].id);
            } ;
        }
        let id = idArr.join(',');
        // console.log(id,'sssss商品ID');
        this.setState({
            addShow: 'list',
            showShadeFlag: false,
            dealType: '',
            changeItem: {},
            changePrice:'',
            isCancel: "delete",
        });
        this.updateFormat('3', id, 'pl');
    }

    /**批量编辑选中商品号码 */
    checkNumber(index) {
        let len = this.state.checkedLength;
        if (listData[index].check === '1') {
            listData[index].check = '0';
            len--;
        } else {
            listData[index].check = '1';
            len++
        }
        this.setState({
            data: listData,
            checkedLength: len
        })
    }

    /**批量编辑全部选中 */
    checkAll() {
        let len = this.state.data.length;
        if (this.state.checkedLength === len ) {
            for (let i = 0; i < listData.length; i++) {
                listData[i].check = '0';
            }
        }else{
            for (let i = 0; i < listData.length; i++) {
                listData[i].check = '1';
            }
        }
        
        this.setState({
            data: listData,
            checkedLength: this.state.checkedLength === len?0:len
        });
    }


    render() {
        const operation = Modal.operation;
        return (
            <div className="mystock" style={{background: '#FFFFFF',height:'100%'}}>
                {
                    this.state.goodsType === '3'?(
                        <Uheader {...this.props} utitle="库存管理" ></Uheader>
                    ):(
                        <Uheader {...this.props} utitle="库存管理" ref="Uheader" onRef={this.onRef} isBatch={this.state.isCancel} batchDelete={this.batchDelete}  deleteCancel={this.deleteCancel}></Uheader>
                    )
                }
                
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
                                    {
                                        this.state.addShow === 'delete'?(
                                            <img className="checkIcon" src={item.check === '1'?require("../../assets/Selected.png"):require("../../assets/Unselected.png")} alt="" onClick={()=>{this.checkNumber(index)}}/>
                                        ):null
                                    }
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
                                        this.state.addShow !== 'delete'?(
                                            <nav>
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
                                            </nav>
                                        ):null
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
                        <div className="addBtn">
                            <button className="addStock" onClick={() => this.goodsAdd()}>增加库存</button>
                            <button className="aDescribe" onClick={() => this.goodsDescribe()}>描述编辑</button>
                        </div>
                    // ) : null
                    ) : this.state.addShow === 'delete' ? (
                        <div className="deleteNumber">
                            <div className="checkAll" onClick={this.checkAll.bind(this)}>
                                <img src={this.state.checkedLength === this.state.data.length?require("../../assets/Selected.png"):require("../../assets/Unselected.png")} alt=""/> 全选
                            </div>
                            <p className="number">已选<span>{this.state.checkedLength}</span>个</p>
                            <button className="btn" onClick={() => this.showShade(null,'delete')}>一键下架</button>
                        </div>
                    ) : null
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
                                ):this.state.dealType === 'delete'?(
                                        <div className="delete cont">
                                            <div className="delTitle">温馨提示</div>
                                            <div className="delCon">确认将这<span>{this.state.checkedLength}</span>个号码规格下架</div>
                                            <div className="delChangeList">
                                                <p onClick={() =>this.cancel()}>取消</p>
                                                <p onClick={() =>this.batchProcese()}>确认下架</p>
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
                                
                            }
                        </div>
                    ):null
                }
            </div>
        );
    }
}







