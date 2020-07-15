import React from 'react';
import "../index/index.scss";
import Banner from "../banner/banner";
import Uheader from "../../Goolbal/Uheader";

export default class Publish extends React.Component {

    componentWillMount() {
        document.title = "配号发布";
    };
    state = {
        checked: true
    };

    goRelease(type) {
        if (type === 'sale') {
            this.props.history.push("/SaleRelease?category=编年套票&name=四轮狗套票&unitName=套")
        } else {
            this.props.history.push("/BuyingRelease?category=编年套票&name=四轮狗套票&unitName=套")
        }
    }

    render() {
        return (
            <div className="publish" style={{background: '#FFFFFF',minHeight:'100%'}}>
                <Uheader {...this.props} utitle="发布" ></Uheader>
                <div className="top">
                    {/* <img src={require("../../assets/publishTop.png")} alt=""/> */}
                </div>
                <Banner {...this.props} rpType="ybBanner"/>
                <div className="btnBox" >
                    <dl onClick={() => this.goRelease('sale')}>
                        <dd>
                            <img src={require('../../assets/buyCar.png')} alt="买盘图标"/>
                        </dd>
                        <dt>求购</dt>
                    </dl>
                    <dl onClick={() => this.goRelease('buy')}>
                        <dd>
                            <img src={require('../../assets/sellCar.png')} alt="卖盘图标"/>
                        </dd>
                        <dt>出售</dt>
                    </dl>
                    <div className="close" onClick={() =>this.props.history.go(-1)}>
                        <img src={require("../../assets/closePub.png")} alt=""/>
                    </div>
                </div>
            </div>
        );
    }

}







