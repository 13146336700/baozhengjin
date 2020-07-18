import React from 'react';
import axios from "../../axios/index";
import Uheader from "../../Goolbal/Uheader";
import { Toast } from 'antd-mobile';
import "../index/index.scss";

export default class CatalogueList extends React.Component {
    constructor(props) {
        super(props)
        //this.state = {}  定义数据
        this.state = {
           data: [], //配号目录数据
           type: 0
        }
    }

    componentWillMount() {
        document.title = "邮币卡行情列表";
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
                data:res.data.resultList
            })
        }).catch(err => {
            Toast.info(err,2)
        })
    }

    /**tab切换 */
    tabChange(type) {
        this.setState({
            type: type
        })
    }


    render() {
        // let listData = this.state.data[this.state.type].dataList;
        return (
            <div className="catalogueList" style={{background:'#ffffff',minHeight:'100%'}}>
                <Uheader {...this.props} utitle="邮币卡行情列表"></Uheader>
                <ul className='cont'>
                    <li className="list listTop">
                        <span className="code">志号/编号</span>
                        <span className="name">名称</span>
                    </li>
                    <li className="list">
                        <span className="code">J141</span>
                        <span className="name">中国奥运会会徽个性化大版</span>
                    </li>
                    <li className="list">
                        <span className="code">J141</span>
                        <span className="name">中国奥运会会徽个性化大版</span>
                    </li>
                    <li className="list">
                        <span className="code">J141</span>
                        <span className="name">中国奥运会会徽个性化大版</span>
                    </li>
                    <li className="list">
                        <span className="code">J141</span>
                        <span className="name">中国奥运会会徽个性化大版</span>
                    </li>
                    <li className="list">
                        <span className="code">J141</span>
                        <span className="name">中国奥运会会徽个性化大版</span>
                    </li>
                </ul>
            </div>
        );
    }
}