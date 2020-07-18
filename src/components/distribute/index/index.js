import React from 'react';
import "./index.scss";
// import Demo from "../pullRefresh/pullRefresh";
import Pulload from "../publish/pulload";
import Banner from "../banner/banner";
import Uheader from "../../Goolbal/Uheader";
import PublishBtn from "../Global/publishBtn";


export default class distribute extends React.Component {
    
    componentWillMount() {
        // Toast.info(this.getUrlParam('userId'), 100);
        document.title = "币票配号";
         //删除缓存数据
          sessionStorage.removeItem("SANZNANG_ARR");
          sessionStorage.removeItem("BIAOLIAN_ARR");
          sessionStorage.removeItem("SANLIAN_ARR");
          sessionStorage.removeItem("SANZHANG_ARR");    
          sessionStorage.removeItem("BIAOLIAN_Ontable");
          sessionStorage.removeItem('market');
        let info = JSON.parse(sessionStorage.getItem("userInfo"));
        if (info&&info.userId) {
            return false
        }
        let userInfo = {
            userId: this.getUrlParam('userId'),
            userType: this.getUrlParam('userType')
        };
        sessionStorage.setItem("userInfo",JSON.stringify(userInfo));
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

    
    render() {
        return (
            <div className="distribute" style={{padding:'10px 0 0 0'}}>
                <Uheader {...this.props} utitle="币票配号" useach="true"></Uheader>
                <Banner {...this.props} rpType="ybBanner"/>
                <Pulload {...this.props} page="index" onRef={(ref) => { this.child = ref; }}/>
                <PublishBtn {...this.props} url='distribute' category='' name='' unitName=''></PublishBtn>
            </div>
        );
    }
}