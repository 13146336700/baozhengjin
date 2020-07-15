import React from 'react';
import "./index.scss";
import Demo from "../pullRefresh/pullRefresh";
import Banner from "../banner/banner";
import Uheader from "../../Goolbal/Uheader";
import PublishBtn from "../Global/publishBtn";


export default class distribute extends React.Component {
    
    componentWillMount() {
        document.title = "币票配号";
        let userInfo = {
            userId: this.getUrlParam('userId'),
            userType: this.getUrlParam('userType')
        };
        localStorage.setItem("userInfo",JSON.stringify(userInfo));
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
                <Demo {...this.props} page="index" onRef={(ref) => { this.child = ref; }}/>
                <PublishBtn {...this.props} url='distribute' category='' name='' unitName=''></PublishBtn>
            </div>
        );
    }

}