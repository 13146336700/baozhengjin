import React from 'react';
import "../index/index.scss";
// import Demo from "../pullRefresh/pullRefresh";
import Pulload from "../publish/pulload";
import Uheader from "../../Goolbal/Uheader";

export default class MyDistribute extends React.Component {

    componentWillMount() {
        document.title = "我的配号";
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
            <div className="mydistribute" style={{backgroundColor:'#ffffff',minHeight:'100%'}}>
                <Uheader {...this.props} utitle="我的配号"></Uheader>
                <Pulload {...this.props} page="my" onRef={(ref) => { this.child = ref; }}/>
            </div>
        );
    }

}







