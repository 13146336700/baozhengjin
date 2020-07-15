import React from 'react';
import "../index/index.scss";
import Demo from "../pullRefresh/pullRefresh";
import Uheader from "../../Goolbal/Uheader";

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
                <Uheader {...this.props} utitle="我的配号"></Uheader>
                <Demo {...this.props} page="my"/>
            </div>
        );
    }

}







