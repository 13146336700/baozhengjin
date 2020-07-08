import React from 'react';
import "../index/index.scss";
import Demo from "../pullRefresh/pullRefresh";

export default class MyStock extends React.Component {

    componentWillMount() {
        document.title = "配号库存管理";
    };
    state = {
        checked: true
    };

    render() {
        return (
            <div className="mystock" style={{padding:'10px 0 0 0', background: '#F2F2F2'}}>
                <Demo type="stock"/>
                <div className="addStock">
                    增加库存
                </div>
            </div>
        );
    }

}







