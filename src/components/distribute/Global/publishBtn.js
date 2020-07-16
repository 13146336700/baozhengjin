import React from 'react';
import "../index/index.scss";
import axios from "../../axios/index";
var u = navigator.userAgent;
// var isAndroid = u.indexOf("Android") > -1;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

export default class PublishBtn extends React.Component {

    componentWillMount() {
        document.title = "发布按钮";
    };
    state = {

    };

    checkgoodstatus() {
        axios.post('market/json/getGoodsParam',{
            userId: JSON.parse(localStorage.getItem('userInfo')).userId,	//String	必填	用户id	产品名称
            type: '1',	//String	必填	品类交易类型	
            name: '抗疫大版'	//String	必填	品类交易类型	商品名称
        }).then(res => {
            console.log(res);
            if (res.data.resultObject.isPublish === 'Y') {
                this.props.history.push('/myStock');
            } else {
                this.props.history.push('/publish');
            }
        }).catch(err => {
            console.log(err)
        })
    }

    goRelease(type) {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo.userId === '') {
            if (isiOS) {
                window.webkit.messageHandlers.IOSNativeLogin.postMessage('');
            } else {
                window.app.login()
            }
        }else if(Number(userInfo.userType) > 1){
            if (this.state.publishType === 'sale') {
                this.props.history.push(`/SaleRelease?category=${this.props.category}&name=${this.props.name}&unitName=${this.props.unitName}&url=${this.props.url}`)
            } else {
                this.props.history.push(`/BuyingRelease?category=${this.props.category}&name=${this.props.name}&unitName=${this.props.unitName}&url=${this.props.url}`)
            }
        }else {
            if (isiOS) {
                window.webkit.messageHandlers.IOSNativeCertification.postMessage('');
            } else {
                window.app.Authentication()
            }
        
        }
        
    }

    render() {
        return (
            <div className="publishBtn" >
                <div className="pub" onClick={() =>this.goRelease('buy')}>
                    <img src={require('../../assets/pub.png')} alt=""/>
                </div>
                {/* <div className='mask'>
                    <div className="btnBox" >
                        <dl onClick={() => this.checkgoodstatus('1')}>
                            <dd>
                                <img src={require('../../assets/buyCar.png')} alt="买盘图标"/>
                            </dd>
                            <dt>求购</dt>
                        </dl>
                        <dl onClick={() => this.checkgoodstatus('2')}>
                            <dd>
                                <img src={require('../../assets/sellCar.png')} alt="卖盘图标"/>
                            </dd>
                            <dt>出售</dt>
                        </dl>
                        <div className="close" onClick={() =>{}}>
                            取消
                        </div>
                    </div>
                </div> */}
            </div>
        );
    }

}







