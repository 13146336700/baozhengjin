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
            this.props.history.push("/SaleRelease")
        } else {
            this.props.history.push("/BuyingRelease")
        }
    }

    render() {
        const tabs = [
            { title: <Badge >出售</Badge> },
            { title: <Badge >求购</Badge> },
        ];
        return (
            <div className="mystock" style={{background: '#F2F2F2'}}>
                <Uheader {...this.props} utitle="库存管理" useach="true"></Uheader>
                <div className="goodsName">抗疫邮票红方联</div>
                <Tabs tabs={tabs}
                    initialPage={0}
                    tabBarActiveTextColor="#eb3318"
                    tabBarUnderlineStyle={{border:'1px solid #eb3318'}}
                    onChange={(tab,index) => this.changeType(index)}
                    >
                    <div style={{ height:'600px' }}>
                        <Demo {...this.props} page="stock" type="sell"/>
                    </div>
                    <div style={{ height:'600px' }}>
                        <Demo {...this.props} page="stock" type="buy"/>
                    </div>
                </Tabs>
                
                <div className="addStock" onClick={() => this.goodsAdd()}>
                    增加库存
                </div>
            </div>
        );
    }

}







