import React from 'react';
import { Tabs,  Badge } from 'antd-mobile';
import "../index/index.scss";
import Demo from "../pullRefresh/pullRefresh";
import Banner from "../banner/banner";
import Uheader from "../../Goolbal/Uheader";
import PublishBtn from "../Global/publishBtn";

export default class Goods extends React.Component {

    componentWillMount() {
        document.title = "配号分类";
    };
    state = {
        checked: true
    };

    render() {
        const tabs = [
            { title: <Badge >出售</Badge> },
            { title: <Badge >求购</Badge> },
            { title: <Badge >全部</Badge> },
            { title: <Badge >成交</Badge> },
          ];
        return (
            <div className="mydistribute" style={{background: '#ffffff'}}>
                <Uheader {...this.props} utitle="配号分类" useach="true"></Uheader>
                <Banner {...this.props} rpType="flBanner"/>
                <Tabs tabs={tabs}
                    initialPage={0}
                    tabBarActiveTextColor="#eb3318"
                    tabBarUnderlineStyle={{border:'1px solid #eb3318'}}
                    onChange={(tab, index) => { console.log('onChange', index, tab); }}
                    onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    >
                    <div style={{ height:'600px' }}>
                        <Demo {...this.props} page="goods" type="sell"/>
                    </div>
                    <div style={{ height:'600px' }}>
                        <Demo {...this.props} page="goods" type="buy"/>
                    </div>
                    <div style={{ height:'600px' }}>
                        <Demo {...this.props} page="goods" type="all"/>
                    </div>
                    <div style={{ height:'600px' }}>
                        <Demo {...this.props} page="goods" type="transaction"/>
                    </div>
                </Tabs>
                <PublishBtn {...this.props}></PublishBtn>
            </div>
        );
    }

}










