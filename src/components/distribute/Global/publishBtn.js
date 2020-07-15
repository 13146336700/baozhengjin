import React from 'react';
import "../index/index.scss";
import axios from "../../axios/index";


export default class PublishBtn extends React.Component {

    componentWillMount() {
        document.title = "发布按钮";
    };
    state = {
        checked: true,

    };

    checkPerson() {
        let userId = localStorage.getItem('userInfo');
    }

    checkgoodstatus() {
        axios.post('market/json/getGoodsParam',{
            userId: '000000006b55f4b0016bcf8aacf41411',	//String	必填	用户id	产品名称
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
        if (this.state.publishType === 'sale') {
            this.props.history.push("/SaleRelease?category=编年套票&name=四轮狗套票&unitName=套&url=goodsDistribute")
        } else {
            this.props.history.push("/BuyingRelease?category=编年套票&name=四轮狗套票&unitName=套&url=goodsDistribute")
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
                            取消
                        </div>
                    </div>
                </div> */}
            </div>
        );
    }

}







