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
        shadeShow:false
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

    checkgoodstatus(type) {
        if (this.getUrlParam('name')) {
            axios.post('market/json/getGoodsParam',{
                userId: JSON.parse(localStorage.getItem('userInfo')).userId,	//String	必填	用户id	产品名称
                type: type,	//String	必填	品类交易类型	
                name: this.getUrlParam('name')	//String	必填	品类交易类型	商品名称
            }).then(res => {
                if (res.data.resultObject.isPublish === 'Y') {
                    this.props.history.push(`/myStock?userId=${JSON.parse(localStorage.getItem('userInfo')).userId}&type=${type}&name=${this.getUrlParam('name')}`);
                } else {
                    if (type === '1') {
                        this.props.history.push(`/SaleRelease?category=${this.props.category}&name=${this.props.name}&unitName=${this.props.unitName}&url=${this.props.url}`)
                    } else {
                        this.props.history.push(`/BuyingRelease?category=${this.props.category}&name=${this.props.name}&unitName=${this.props.unitName}&url=${this.props.url}`)
                    }
                }
            }).catch(err => {
                console.log(err)
            })
        } else {
            if (type === '1') {
                this.props.history.push(`/SaleRelease?category=${this.props.category}&name=${this.props.name}&unitName=${this.props.unitName}&url=${this.props.url}`)
            } else {
                this.props.history.push(`/BuyingRelease?category=${this.props.category}&name=${this.props.name}&unitName=${this.props.unitName}&url=${this.props.url}`)
            }
        }
    }

    changeShade() {
        this.setState({
            shadeShow: true
        });
    }

    goRelease(type) {
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        if (userInfo.userId === '') {
            if (isiOS) {
                window.webkit.messageHandlers.IOSNativeLogin.postMessage('');
            } else {
                window.app.login()
            }
        }else if(Number(userInfo.userType) > 1){
            this.checkgoodstatus(type);
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
            <nav>
                {
                    this.state.shadeShow?(
                        <div className="shadeBox">
                            <div className='mask'>
                                <div className="btnBox" >
                                    <dl onClick={() => this.goRelease('1')}>
                                        <dd>
                                            <img src={require('../../assets/buyCar.png')} alt="买盘图标"/>
                                        </dd>
                                        <dt>求购</dt>
                                    </dl>
                                    <dl onClick={() => this.goRelease('2')}>
                                        <dd>
                                            <img src={require('../../assets/sellCar.png')} alt="卖盘图标"/>
                                        </dd>
                                        <dt>出售</dt>
                                    </dl>
                                    <div className="close" onClick={() =>{this.setState({shadeShow:false})}}>
                                        取消
                                    </div>
                                </div>
                            </div>
                        </div>
                    ):(
                        <div className="publishBtn" >
                            <div className="pub" onClick={() =>this.changeShade('buy')}>
                                <img src={require('../../assets/pub.png')} alt=""/>
                                <p>发布</p>
                            </div>
                        </div>
                    )
                }
            </nav>
        );
    }

}







