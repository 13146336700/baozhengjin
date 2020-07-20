import React from 'react';
import { Tabs,  Badge, SearchBar, Icon} from 'antd-mobile';
import "../index/index.scss";
// import Demo from "../pullRefresh/pullRefresh";
import Pulload from "../publish/pulload";
// import axios from "../../axios/index";
import PublishBtn from "../Global/publishBtn";

export default class SearchResult extends React.Component {

    componentWillMount() {
        document.title = "配号分类";
        sessionStorage.setItem(`${this.props.match.path}Url`, this.props.location.search);
    };
    state = {
        checked: true
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

    /**返回搜索页面 */
    goSearch() {
        this.props.history.push(`/searchNumber?name=${this.getUrlParam('name')}&unitName=${this.getUrlParam('unitName')}&categoryName=${this.getUrlParam('category')}`);
    }

    render() {
        let searchInfo = JSON.parse(sessionStorage.getItem('searchInfo'));
        return (
            <div className="mydistribute" style={{background: '#ffffff', minHeight:'100%'}}>
                <div className="Resultheader">
                    <p className="back" onClick={()=>{
                        this.props.history.go(-1)
                    }}> <Icon type="left" size="sm" /></p>
                    <p className="title">
                        <SearchBar
                            value={`${this.getUrlParam('name')}${this.getUrlParam('sname')?'•'+this.getUrlParam('sname'):''}${this.getUrlParam('position')==='any'?'•任意':this.getUrlParam('position')==='start'?'•起始号':'•尾号'}${this.getUrlParam('tag')?'•'+this.getUrlParam('tag'):''}`}
                            placeholder=""
                            cancelText=" "
                            onSubmit={value => console.log(value, 'onSubmit')}
                            onClear={value => console.log(value, 'onClear')}
                            onFocus={() => this.goSearch()}
                            onBlur={() => console.log('onBlur')}
                            onChange={this.onChange}
                        />
                    </p>
                </div>

                <Pulload page="searchResult" {...this.props} onRef={(ref) => { this.search = ref; }}/> 

                {/* <div className="pub">
                    <img src={require('../../assets/pub.png')} alt=""/>
                </div> */}
                <PublishBtn {...this.props} url='searchResult' category={this.getUrlParam('category') || searchInfo.categoryName} name={this.getUrlParam('name') || searchInfo.name} unitName={this.getUrlParam('unitName') || searchInfo.unitName}></PublishBtn>
            </div>
        );
    } 
}


