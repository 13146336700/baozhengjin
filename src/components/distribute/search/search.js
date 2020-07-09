import React from 'react';
import { WhiteSpace, Button } from 'antd-mobile';

export default class SearchNumber extends React.Component {
    
    componentWillMount() {
        document.title = "配号搜索";
    };

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
                            ✔
                            </dd>
                            <dt>尾号</dt>
                        </dl>
                        <dl>
                            <dd>
                                <img src="" alt=""/>
                            </dd>
                            <dt>起始号</dt>
                        </dl>
                        <dl>
                            <dd>
                                <img src="" alt=""/>
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
                            <li className="list">豹子号(三连号)</li>
                            <li className="list">豹子号(三连号)</li>
                            <li className="list">生日号</li>
                            <li className="list">豹子号(三连号)</li>
                            <li className="list">生日号</li>
                            <li className="list">豹子号(三连号)</li>
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