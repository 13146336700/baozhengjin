import React from 'react';
import { Toast} from 'antd-mobile';
import "../index/index.scss";
// import Demo from "../pullRefresh/pullRefresh";
import Pulload from "../publish/pulload";
import Banner from "../banner/banner";
import Uheader from "../../Goolbal/Uheader";
import PublishBtn from "../Global/publishBtn";

export default class Goods extends React.Component {
    componentWillMount() {
        if (this.getUrlParam('appInfo')) {
            let appInfo = JSON.parse(this.getUrlParam('appInfo'));
            // Toast.info(appInfo.name,3)
            document.title = appInfo.name;
            let goodsInfo = {
                name: appInfo.name,
                unitName: appInfo.unitName,
                categoryName: appInfo.categoryName,
            }
            let market = {
                code: appInfo.code,
                oid: appInfo.oid,
                tag: appInfo.tag
            }
            let userInfo = {
                userId: appInfo.userId,
                userType: appInfo.userType
            };
            sessionStorage.setItem("userInfo",JSON.stringify(userInfo));
            sessionStorage.setItem('goodsInfo', JSON.stringify(goodsInfo));
            if (appInfo.oid !== '') {
                sessionStorage.setItem('market', JSON.stringify(market));
            }
        }else {
            document.title = this.getUrlParam('name');
        }
    };
    componentDidMount(){
       
    }
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
        let goodsInfo = JSON.parse(sessionStorage.getItem('goodsInfo'));
        return (
            <div className="mydistribute goodsdistribute" style={{background: '#ffffff',minHeight:'100%'}}>
                <Uheader {...this.props} utitle={goodsInfo.name} useach="true"></Uheader>
                <Banner {...this.props} rpType="flBanner"/>
                <Pulload {...this.props} page="goods" type={this.state.goodsType} onRef={(ref) => { this.child = ref; }}/>
                <PublishBtn {...this.props} url='goodsDistribute' category={this.getUrlParam('categoryName') || goodsInfo.categoryName} name={this.getUrlParam('name') || goodsInfo.name} unitName={this.getUrlParam('unitName') || goodsInfo.unitName}></PublishBtn>
            </div>
        );
    }
}










