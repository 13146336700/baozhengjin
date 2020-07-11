import React from 'react';
import iconCheck from "../../assets/iconcheck.png"
import iconCheckbox from "../../assets/iconcheckbox.png"

export default class SearchNumber extends React.Component {
    
    componentWillMount() {
        document.title = "配号搜索";
    };
    state = {
        position: 'end',  //号码搜索位置参数,
        numberType: ["豹子号(三连号)","狮子号(四连号)","生日号","老虎号(五连号)","大象号(六连号)","爱情号","恐龙号(七连号)","麒麟号(八连号)","顺号","叠号","一拖三","三拖一"],
    }

    render() {
        return (
            <div className="searchNumber" style={{background:'#ffffff',minHeight:'100%'}}>
                <div className="header">
                    <p> {'<'}</p>
                    <p className="title">配号搜索</p>
                    <p><img src="" alt=""/> <span>重置</span></p>
                </div>
                <div className="searchTop">
                    <input type="text"/>
                    <button className="activeBtn">求购</button>
                    <button>出售</button>
                </div>
                <div style={{height:'10px',background:'rgba(242,242,242,1)'}}></div>
                <div className="mainCon">
                    <div className="radiogrup">
                        <dl>
                            <dd>
                                <img src={this.state.position === 'end'? iconCheck:iconCheckbox} alt=""/>
                            </dd>
                            <dt>尾号</dt>
                        </dl>
                        <dl>
                            <dd>
                                <img src={this.state.position === 'start'? iconCheck:iconCheckbox} alt=""/>
                            </dd>
                            <dt>起始号</dt>
                        </dl>
                        <dl>
                            <dd>
                                <img src={this.state.position === 'any'? iconCheck:iconCheckbox} alt=""/>
                            </dd>
                            <dt>任意</dt>
                        </dl>
                    </div>
                    <div className="searchBox">
                        <input type="text" placeholder="请输入您要查找的特殊号码"/> <button>搜索</button>
                    </div>
                    <div className="searchlist">
                        <div className="searchtitle">搜索类型</div>
                        <ul>
                            {
                                this.state.numberType.map(val => (
                                    <li className="list">{val}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="searchlist">
                        <div className="searchtitle">搜索历史<span>(长按可删除单个记录)</span><img className="deleteIcon" src={require("../../assets/delete.png")} alt=""/></div>
                        <ul>
                            <li className="list">豹子号(三连号)</li>
                            <li className="list">豹子号(三连号)</li>
                            <li className="list">生日号</li>
                            <li className="list">豹子号(三连号)</li>
                            <li className="list">生日号</li>
                            <li className="list">豹子号(三连号)</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

}