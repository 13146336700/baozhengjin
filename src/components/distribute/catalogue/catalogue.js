import React from 'react';
import axios from "../../axios/index";
import Uheader from "../../Goolbal/Uheader";
import { Toast } from 'antd-mobile';
import "../index/index.scss";

export default class Catalogue extends React.Component {
    constructor(props) {
        super(props)
        //this.state = {}  定义数据
        this.state = {
           data: [], //配号目录数据
           mapData:[],  //分类渲染的数据
           type: 0
        }
    }

    componentWillMount() {
        document.title = "邮币卡目录";
        this.getList();
    };
    componentDidMount() {
        
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

    /**获取邮币卡目录数据 */
    getList() {
        axios.post('subject/json/getPhCatalog',{}).then(res => {
            this.setState({
                data:res.data.resultList,
                mapData: res.data.resultList[0].dataList
            });
            console.log(this.state.data,'sssssssss')
        }).catch(err => {
            Toast.info(err,2)
        })
    }

    /**tab切换 */
    tabChange(type) {
        this.setState({
            type: type,
            mapData: this.state.data[type].dataList
        })
    }

    /**跳转列表 */
    goList(tag,catalog,name) {
        this.props.history.push(`/catalogueList?tag=${tag}&catalog=${catalog}&name=${name}`)
    }


    render() {
        return (
            <div className="catalogue" style={{background:'#ffffff',minHeight:'100%'}}>
                <Uheader {...this.props} utitle="邮币卡目录"></Uheader>
                <div className="tabBar">
                    <div className={this.state.type===0?'active tab':'tab'} onClick={() => this.tabChange(0)}> <img className='icon' src={this.state.type===0?require('../../assets/stampAct.png'):require('../../assets/stamp.png')} alt=""/> <span>邮票</span></div>
                    <div className={this.state.type===1?'active tab':'tab'} onClick={() => this.tabChange(1)}> <img className='icon' src={this.state.type===1?require('../../assets/coinAct.png'):require('../../assets/coin.png')} alt=""/> 钱币</div>
                </div>
                <div className="cont">
                    {
                        this.state.mapData.map((item,index) => (
                            <div className="series" >
                                <div className="seriesIcon">
                                    <img src={item.images} alt="系列图片"/>
                                    <span>{item.name}</span>
                                </div>
                                <div className="seriesList">
                                    <ul>
                                        {
                                            item.list.map((it, key) =>(
                                                <li className='list' key={key} onClick={() =>this.goList(item.tag,item.name,it)}>{it}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        ))
                    } 
                </div>
            </div>
        );
    }
}