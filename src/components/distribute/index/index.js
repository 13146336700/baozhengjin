import React from 'react';
import "./index.scss";
import Demo from "../pullRefresh/pullRefresh";
import Banner from "../banner/banner";
import Uheader from "../../Goolbal/Uheader";
import PublishBtn from "../Global/publishBtn";


export default class distribute extends React.Component {
    
    componentWillMount() {
        document.title = "币票配号";
    };

    
    render() {
        return (
            <div className="distribute" style={{padding:'10px 0 0 0'}}>
                <Uheader {...this.props} utitle="币票配号" useach="true"></Uheader>
                <Banner {...this.props} rpType="ybBanner"/>
                <Demo {...this.props} page="index" />
                {/* <div className="pub">
                    <img src={require('../../assets/pub.png')} alt=""/>
                </div> */}
                <PublishBtn {...this.props}></PublishBtn>
            </div>
        );
    }

}