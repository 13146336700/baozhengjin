import React from 'react';
import "../index/index.scss";
import Demo from "../pullRefresh/pullRefresh";
import { Tabs,  Badge, SearchBar, Icon} from 'antd-mobile';

export default class MyStock extends React.Component {

    componentWillMount() {
        document.title = "配号库存管理";
    };
    state = {
        checked: true
    };

    render() {
        const tabs = [
            { title: <Badge >出售</Badge> },
            { title: <Badge >求购</Badge> },
        ];
        return (
            <div className="mystock" style={{background: '#F2F2F2'}}>
                <div className="goodsName">抗疫邮票红方联</div>
                <Tabs tabs={tabs}
                    initialPage={0}
                    tabBarActiveTextColor="#eb3318"
                    tabBarUnderlineStyle={{border:'1px solid #eb3318'}}
                    onChange={(tab, index) => { console.log('onChange', index, tab); }}
                    onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    >
                    <div style={{ height:'600px' }}>
                        <Demo type="stock"/>
                    </div>
                    <div style={{ height:'600px' }}>
                        <Demo type="stock"/>
                    </div>
                </Tabs>
                
                <div className="addStock">
                    增加库存
                </div>
            </div>
        );
    }

}







