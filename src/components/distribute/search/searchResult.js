import React from 'react';
import { Tabs,  Badge, SearchBar, Icon} from 'antd-mobile';
import "../index/index.scss";
import Demo from "../pullRefresh/pullRefresh";

export default class SearchResult extends React.Component {

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
          ];
        return (
            <div className="mydistribute" style={{background: '#ffffff', minHeight:'100%'}}>
                <div className="Resultheader">
                    <p className="back"> <Icon type="left" size="sm" /></p>
                    <p className="title">
                        <SearchBar
                            value="抗疫大版"
                            placeholder=""
                            cancelText=" "
                            onSubmit={value => console.log(value, 'onSubmit')}
                            onClear={value => console.log(value, 'onClear')}
                            onFocus={() => console.log('onFocus')}
                            onBlur={() => console.log('onBlur')}
                            onChange={this.onChange}
                        />
                    </p>
                </div>

                <Tabs tabs={tabs}
                    initialPage={0}
                    tabBarActiveTextColor="#eb3318"
                    tabBarUnderlineStyle={{border:'1px solid #eb3318'}}
                    onChange={(tab, index) => { console.log('onChange', index, tab); }}
                    onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    >
                    <div style={{ height:'600px' }}>
                        <div style={{height:'10px', background: '#F2F2F2'}}></div>
                        <Demo page="search" type="sell"/>
                    </div>
                    <div style={{ height:'600px' }}>
                        <div style={{height:'10px', background: '#F2F2F2'}}></div>
                        <Demo page="search" type="buy"/>
                    </div>
                    </Tabs>
                <div className="pub">
                    <img src={require('../../assets/pub.png')} alt=""/>
                </div>
            </div>
        );
    }

}


