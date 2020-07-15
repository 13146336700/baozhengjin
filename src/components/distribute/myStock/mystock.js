import React from 'react';
import "../index/index.scss";
import Demo from "../pullRefresh/pullRefresh";
import { Tabs,  Badge} from 'antd-mobile';
import Uheader from "../../Goolbal/Uheader";

export default class MyStock extends React.Component {

    componentWillMount() {
        document.title = "配号库存管理";
    };
    state = {
        checked: true,
        publishType: 'buy', //跳转发布页面时，判断是卖还是买 
    };

    changeType(index) {

        if (index === 0) {
            this.setState({
                publishType: 'buy'
            })
        } else {
            this.setState({
                publishType: 'sale'
            })
        }
        console.log(index);
        console.log(this.state.publishType)
    }

    goodsAdd() {
        if (this.state.publishType === 'sale') {
            this.props.history.push("/SaleRelease?goodsId=123456789&category=编年套票&name=四轮狗套票&unitName=套&url=mystock")
        } else {
            this.props.history.push("/BuyingRelease?goodsId=123456789&category=编年套票&name=四轮狗套票&unitName=套&url=mystock")
        }
    }

    render() {
        const tabs = [
            { title: <Badge >出售</Badge> },
            { title: <Badge >求购</Badge> },
        ];
        return (
            <div className="mystock" style={{background: '#FFFFFF',height:'100%'}}>
                <Uheader {...this.props} utitle="库存管理" useach="true"></Uheader>
                <div className="goodsName">抗疫邮票红方联</div>
                {/* <Tabs tabs={tabs}
                    initialPage={0}
                    tabBarActiveTextColor="#eb3318"
                    tabBarUnderlineStyle={{border:'1px solid #eb3318'}}
                    onChange={(tab,index) => this.changeType(index)}
                    >
                        <Demo {...this.props} page="stock" type="sell"/>
                        <Demo {...this.props} page="stock" type="buy"/>
                </Tabs> */}
                <Demo {...this.props} page="stock" type="buy"/>
                <div className="addStock" onClick={() => this.goodsAdd()}>
                    增加库存
                </div>
                {/* <div className="shade">
                  <div className="cont">
                    <p>
                      <label htmlFor="">号码</label>
                      <input type="text" disabled value="1234567896"/>
                    </p>
                    <p>
                      <label htmlFor="">价格</label>
                      <input type="text"/>
                    </p>
                    <button>标为售出</button>
                  </div>
                </div> */}
            </div>
        );
    }

}







