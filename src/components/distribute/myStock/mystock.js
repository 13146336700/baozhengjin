import React from 'react';
import "../index/index.scss";
import Demo from "../pullRefresh/pullRefresh";
import axios from "../../axios/index";
import Uheader from "../../Goolbal/Uheader";

export default class MyStock extends React.Component {

    componentWillMount() {
        document.title = "配号库存管理";
        let userIn = JSON.parse(localStorage.getItem('userInfo'));
        if (userIn&&userIn.userId) {
            return false
        }
        let userInfo = {
            userId: this.getUrlParam('userId'),
            userType: this.getUrlParam('userType')
        };
        localStorage.setItem("userInfo",JSON.stringify(userInfo));
    };

    state = {
        dealType: '',
        publishType: 'buy', //跳转发布页面时，判断是卖还是买 
        showShadeFlag: false,    //修改弹窗显示
        changeItem: {}, //要修改的数据
        changePrice:'', //修改的价格
        addShow: true,  //增加库存按钮是否显示
    };

    goodsAdd() {
        // console.log(this.demo.state.data[0].goodsId);
        if (this.demo.state.goodsType === '2') {
            this.props.history.push(`/SaleRelease?goodsId=${this.demo.state.data[0].goodsId}&name=${this.getUrlParam('name')}&url=mystock`)
        } else {
            this.props.history.push(`/BuyingRelease?goodsId=${this.demo.state.data[0].goodsId}&name=${this.getUrlParam('name')}&url=mystock`)
        }
    }

    showShade(item, type) {
        if (type === 'sign') {
            this.setState({
                showShadeFlag: true,
                dealType: 'soldOut',
                changeItem: item,
                changePrice: item.dealPrice
            });
        } else {
            this.setState({
                showShadeFlag: true,
                dealType: 'change',
                changeItem: item,
                changePrice: item.dealPrice
            });
        }
    }


    checkAddShow(item) {
        if (item.length > 0) {
            this.setState({
                addShow: true
            })
        } else {
            this.setState({
                addShow: false
            })
        }
    }

    /**价格修改 */
    changePriceFn = (en) => {
        this.setState({
            changePrice: en.target.value
        })
    }

    /**获取网址参数 */
    getUrlParam = (name) => {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = this.props.location.search.substr(1).match(reg);
        if (r != null) {
        return decodeURI(r[2]);
        }
        return ""; //如果此处只写return;则返回的是undefined
    };
        
    
    /**商品下架 */
    updateFormat(type) {
        axios.post('subject/json/updateFormat',{
            id: this.state.changeItem.id,
            status:type,
            price: this.state.changePrice
        }).then(res => {
            if (res.data.message === '成功') {
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
                <div className="goodsName">{this.getUrlParam('name')}</div>
                <Demo {...this.props} page="stock" showShade={this.showShade.bind(this)} showAdd={this.checkAddShow.bind(this)} onRef={(ref) => { this.demo = ref; }}></Demo>
                {
                    this.state.addShow?(
                        <div className="addStock" onClick={() => this.goodsAdd()}>
                            增加库存
                        </div>
                    ):null
                }
                
                {
                    this.state.showShadeFlag?(
                        <div className="shade">
                            {
                                this.state.dealType === 'soldOut'?(
                                    <div className="cont">
                                        <p>
                                            <label htmlFor="">号码</label>
                                            <input type="text" disabled value={this.state.changeItem.format}/>
                                        </p>
                                        <p>
                                            <label htmlFor="">价格</label>
                                            <input type="text" disabled value={this.state.changeItem.dealPrice}/>
                                        </p>
                                        <button onClick={() =>this.updateFormat(2)}>标为售出</button>
                                    </div>
                                ):(
                                    <div className="cont">
                                        <p>
                                            <label htmlFor="">号码</label>
                                            <input type="text" disabled value={this.state.changeItem.format}/>
                                        </p>
                                        <p>
                                            <label htmlFor="">价格</label>
                                            <input type="text" value={this.state.changePrice} onChange={this.changePriceFn.bind(this)}/>
                                        </p>
                                        <button onClick={() =>this.updateFormat(0)}>确认修改</button>
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







