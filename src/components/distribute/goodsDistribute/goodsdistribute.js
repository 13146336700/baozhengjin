import React from 'react';
import { Tabs,  Badge } from 'antd-mobile';
import "../index/index.scss";
import Demo from "../pullRefresh/pullRefresh";
import Banner from "../banner/banner";
import Uheader from "../../Goolbal/Uheader";
import PublishBtn from "../Global/publishBtn";

export default class Goods extends React.Component {
    componentWillMount() {
        document.title = this.getUrlParam('name');
    };
    state = {
        goodsType: '2'        
    };

    getUrlParam = (name) => {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = this.props.location.search.substr(1).match(reg);
        if (r != null) {
          return decodeURI(r[2]);
        }
        return ""; //如果此处只写return;则返回的是undefined
    };

    

    render() {
        return (
            <div className="mydistribute" style={{background: '#ffffff'}}>
                <Uheader {...this.props} utitle={this.getUrlParam('name')} useach="true"></Uheader>
                <Banner {...this.props} rpType="flBanner"/>
                <Demo {...this.props} page="goods" type={this.state.goodsType} onRef={(ref) => { this.child = ref; }}/>
                <PublishBtn {...this.props} url='goodsDistribute' category={this.props.category} name={this.props.name} unitName={this.props.unitName}></PublishBtn>
            </div>
        );
    }

}










