import React from 'react';
import axios from "../../axios/index";
import iconCheck from "../../assets/iconcheck.png"
import iconCheckbox from "../../assets/iconcheckbox.png"
import { Toast } from 'antd-mobile';
import Uheader from "../../Goolbal/Uheader";

export default class SearchNumber extends React.Component {
    constructor(props) {
        super(props)
        //this.state = {}  定义数据
        this.state = {
            numberType: ["豹子号(三连号)","狮子号(四连号)","生日号","老虎号(五连号)","大象号(六连号)","爱情号","恐龙号(七连号)","麒麟号(八连号)","顺号","叠号","一拖三","三拖一"],
            searchName:'',  //搜索词
            searchData: [], //联想搜索数据
            searchHistory:[],   //搜索历史
            position: 'end',    //搜索号码位置
            positionName:'尾号',   //搜索号码位置
            sname:'',	//String	否	搜索关键字	
            name:'',	//String	必填		产品名称
            type:'1',	//String	必填	品类交易类型
            tag:'',	    //String	否	品类交易类型
            category: '', //商品分类
            unitName: '',   //商品单位
        }
    }

    componentWillMount() {
        document.title = "配号搜索";

        /**商品分类过来，直接携带商品信息 */
        if (this.getUrlParam('name')) {
            this.setState({
                searchName: this.getUrlParam('name'),
                name: this.getUrlParam('name'),
                category: this.getUrlParam('categoryName'),
                unitName: this.getUrlParam('unitName'),
                searchData:[]
            });
            let searchInfo = {
                name: this.getUrlParam('name'),
                unitName: this.getUrlParam('unitName'),
                categoryName: this.getUrlParam('categoryName')
              }
              sessionStorage.setItem('searchInfo', JSON.stringify(searchInfo));
        }
        
        /**获取历史搜索内容 */
        let arr = sessionStorage.getItem('searchistory')?JSON.parse(sessionStorage.getItem('searchistory')):[];
        this.setState({
            searchHistory: arr
        });
    };
    
    /**获取网址参数 */
    getUrlParam = (name) => {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = this.props.location.search.substr(1).match(reg);
        if (r != null) {
        return decodeURI(r[2]);
        }
        return ""; //如果此处只写return;则返回的是undefined
    };

    /**系统商品检索 */
    searchNumProduct = (en) =>{
        this.setState({
            searchName: en.target.value
        })
        if (en.target.value === '') {
            this.setState({
                searchData:[]
            });
            return false;
        } //ref={input => this.input = input}
        axios.post("subject/json/searchNumProduct",{
            sname: en.target.value,	//String	否	类型	搜索关键字
            pageSize: '20',  //	String	必填	每页数量	
            pageIndex: '1',  //	String	必填	页码
        }).then(res =>{
            this.setState({
                searchData:res.data.resultObject.dataList
            });
        }).catch(err =>{
            console.log(err);
        })
    }

    /**搜索商品号码 */
    searchSname(en) {
        this.setState({
            sname: en.target.value
        })
    }

    /*选择查询商品名称 */
    checkName(name, category, unit) {
        this.setState({
            searchName: name,
            name: name,
            category: category,
            unitName: unit,
            searchData:[]
        });
        let searchInfo = {
            name: name,
            unitName: unit,
            categoryName: category
          }
          sessionStorage.setItem('searchInfo', JSON.stringify(searchInfo));
    }

    /**搜索位置切换 */
    changePosition(posit) {
        this.setState({
            position: posit
        });
        switch (posit) {

            case 'end':
                this.setState({
                    positionName: '尾号'
                });
                break;
            case 'start':
                this.setState({
                    positionName: '起始号'
                });
                break;
            case 'any':
                this.setState({
                    positionName: '任意'
                });
                break;
            default:
                break;
        }
    }

    /**品类交易类型切换 */
    changeType(posit) {
        this.setState({
            type: posit
        })
    }

    /**品类交易类型切换 */
    changeTag(posit) {
        this.setState({
            tag: posit
        })
    }

    /**输入框获得焦点清除默认值 */
    clearName(en) {
        this.setState({
            searchName: '',
            name: '',
            category: '',
            unitName: '',
            searchData:[]
        });
    }

    /*商品搜索接口 */
    searchNum() {
        if (this.state.name === '') {
            Toast.info('搜索品种不能为空', 2);
            return false
        };
        /**搜索数据存入历史搜索 */
        let obj = {
            name: this.state.name,
            position: this.state.positionName,
            sname: this.state.sname,
            tag: this.state.tag
        }
        let arr = this.state.searchHistory;
        arr.unshift(obj);
        if (arr.length > 5) {
            arr = arr.splice(0,5)
        }
        sessionStorage.setItem('searchistory', JSON.stringify(arr));

        this.props.history.push(`/searchResult?name=${this.state.name}&type=${this.state.type}&sname=${this.state.sname}&position=${this.state.position}&tag=${this.state.tag}&category=${this.state.category}&unitName=${this.state.unitName}`);
    }

    /**跳转行情目录 */
    goMarketList() {
        let marketFrom = {
            url: this.getUrlParam('url'),
            market: 'searchNumber'
        }
        sessionStorage.setItem("marketFrom",JSON.stringify(marketFrom));
        this.props.history.push("/catalogue");
    }

    render() {
        return (
            <div className="searchNumber" style={{background:'#ffffff',minHeight:'100%',display:'flex',flexDirection:'column'}}>
                <Uheader {...this.props} utitle="配号搜索" ></Uheader>
                <div className="searchTop">
                    <button className={this.state.type === '1'?'activeBtn':''} onClick={() =>this.changeType('1')}>求购</button>
                    <button className={this.state.type === '2'?'activeBtn':''} onClick={() =>this.changeType('2')}>出售</button>
                    <div className="searchBox">
                        <label htmlFor="name">藏品名称</label><input type="text" name="name" placeholder="点击搜索商品名称" value={this.state.searchName} onChange={this.searchNumProduct.bind(this)} onFocus={(en) => this.clearName(en)}/>
                        <span className='catalog' onClick={this.goMarketList.bind(this)}>行情目录</span>
                    </div>
                </div>
                <div style={{height:'10px',background:'rgba(242,242,242,1)'}}></div>
                <div className="mainCon">
                    <div className="radiogrup">
                        <dl onClick={ () =>this.changePosition('end')}>
                            <dd>
                                <img src={this.state.position === 'end'? iconCheck:iconCheckbox} alt=""/>
                            </dd>
                            <dt>尾号</dt>
                        </dl>
                        <dl onClick={ () =>this.changePosition('any')}>
                            <dd>
                                <img src={this.state.position === 'any'? iconCheck:iconCheckbox} alt=""/>
                            </dd>
                            <dt>任意号</dt>
                        </dl>
                        <dl onClick={ () =>this.changePosition('start')}>
                            <dd>
                                <img src={this.state.position === 'start'? iconCheck:iconCheckbox} alt=""/>
                            </dd>
                            <dt>起始号</dt>
                        </dl>
                        
                    </div>
                    <div className="searchBox">
                        <input type="text" placeholder="请输入您要查找的特殊号码" value={this.state.sname} onChange={this.searchSname.bind(this)}/> <button onClick={() =>this.searchNum()}>搜索</button>
                    </div>
                    <div className="searchlist">
                        <div className="searchtitle">搜索类型</div>
                        <ul>
                            {
                                this.state.numberType.map(val => (
                                    <li className={this.state.tag === val ?'activeBtn typelist':'typelist'} onClick={() =>this.changeTag(val)}>{val}</li>
                                ))
                            }
                        </ul>
                    </div>
                    {
                        this.state.searchHistory.length>0?(
                            <div className="searchlist">
                                <div className="searchtitle">搜索历史</div>
                                {/* <div className="searchtitle">搜索历史<span>(长按可删除单个记录)</span><img className="deleteIcon" src={require("../../assets/delete.png")} alt=""/></div> */}
                                <ul>
                                    {
                                        this.state.searchHistory.map((item,index) =>(
                                        <li className="typelist" key={index}>{item.name}{item.sname?`•${item.position}`:''}{item.sname?`•${item.sname}`:''}{item.tag?`•${item.tag}`:''}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ):null
                    }
                    {
                        this.state.searchData.length > 0 ? (
                            <div className="searchNum">
                                {
                                    this.state.searchData.map((item,index) =>(
                                        <p key={index} className='list' onClick={() =>this.checkName(item.name, item.category, item.unitName)}>{item.name}</p>
                                    ))
                                }
                            </div>
                        ):null
                    }
                </div>
            </div>
        );
    }

}