import React from 'react';
import "../index/index.scss";
import Demo from "../pullRefresh/pullRefresh";
import Banner from "../banner/banner";

export default class MyDistribute extends React.Component {

    componentWillMount() {
        document.title = "我的配号";
    };
    state = {
        checked: true
    };

    render() {
        return (
            <div className="mydistribute" style={{padding:'10px 0 0 0'}}>
                <Demo type="my"/>
            </div>
        );
    }

}







