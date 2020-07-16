import React from 'react';
import "../index/index.scss";
import Demo from "../pullRefresh/pullRefresh";
import axios from "../../axios/index";
import Uheader from "../../Goolbal/Uheader";

export default class MyStock extends React.Component {

    componentWillMount() {
        document.title = "配号库存管理";
    };

    state = {
        dealType: '',
        publishType: 'buy', //跳转发布页面时，判断是卖还是买 
        showShadeFlag: false,    //修改弹窗显示
        changeItem: {}, //要修改的数据
        changePrice:'', //修改的价格
    };

    goodsAdd() {
        if (this.state.publishType === 'sale') {
            this.props.history.push("/SaleRelease?goodsId=123456789&category=编年套票&name=四轮狗套票&unitName=套&url=mystock")
        } else {
            this.props.history.push("/BuyingRelease?goodsId=123456789&category=编年套票&name=四轮狗套票&unitName=套&url=mystock")
        }
    }

    showShade(item, type) {
        if (type === 'sign') {
            this.setState({
                showShadeFlag: true,
                dealType: 'soldOut',
                changeItem: item,
                changePrice: item.price
            });
        } else {
            this.setState({
                showShadeFlag: true,
                dealType: 'change',
                changeItem: item,
                changePrice: item.price
            });
        }
    }

    /**价格修改 */
    changePrice(en) {
        this.setState({
            changePrice: en.target.value
        })
    }
    
    
    /**商品下架 */
    updateFormat(type) {
        axios.post('subject/json/updateFormat',{
            id: this.state.changeItem.id,
            status:type,
            price: this.state.changePrice
        }).then(res => {
            if (res.data.resultObject) {
                this.setState({
                    showShadeFlag: false,
                    dealType: '',
                    changeItem: {},
                    changePrice:''
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }


    render() {
        
        return (
            <div className="mystock" style={{background: '#FFFFFF',height:'100%'}}>
                <Uheader {...this.props} utitle="库存管理" useach="true"></Uheader>
                <div className="goodsName">{this.props.name}</div>
                <Demo {...this.props} page="stock" showShade={this.showShade.bind(this)} onRef={(ref) => { this.child = ref; }}></Demo>
                <div className="addStock" onClick={() => this.goodsAdd()}>
                    增加库存
                </div>
                {
                    this.state.showShadeFlag?(
                        <div className="shade">
                            {
                                this.state.dealType === 'soldOut'?(
                                    <div className="cont">
                                        <p>
                                            <label htmlFor="">号码</label>
                                            <input type="text" disabled value={this.state.changeItem.value}/>
                                        </p>
                                        <p>
                                            <label htmlFor="">价格</label>
                                            <input type="text" disabled value={this.state.changeItem.price}/>
                                        </p>
                                        <button onClick={this.updateFormat(2)}>标为售出</button>
                                    </div>
                                ):(
                                    <div className="cont">
                                        <p>
                                            <label htmlFor="">号码</label>
                                            <input type="text" disabled value={this.state.changeItem.value}/>
                                        </p>
                                        <p>
                                            <label htmlFor="">价格</label>
                                            <input type="text" value={this.state.changePrice} onChange={this.changePrice.bind(this)}/>
                                        </p>
                                        <button onClick={this.updateFormat(0)}>确认修改</button>
                                    </div>
                                )
                            }
                        </div>
                    ):null
                }
            </div>
        );
    }
}







