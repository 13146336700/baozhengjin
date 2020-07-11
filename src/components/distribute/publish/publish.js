import React from 'react';
import "../index/index.scss";
import Banner from "../banner/banner";

export default class Publish extends React.Component {

    componentWillMount() {
        document.title = "配号发布";
    };
    state = {
        checked: true
    };

    render() {
        return (
            <div className="publish" style={{background: '#F2F2F2'}}>
                <div className="top">
                    <img src={require("../../assets/publishTop.png")} alt=""/>
                </div>
                {/* <Banner rpType="flBanner"/> */}
                <div style={{ height:'400px' }}>
                    
                </div>
                <div className="close">
                    <img src={require("../../assets/closePub.png")} alt=""/>
                </div>
            </div>
        );
    }

}







