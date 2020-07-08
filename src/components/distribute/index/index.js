import React from 'react';
import "./index.scss";
import Demo from "../pullRefresh/pullRefresh";
import Banner from "../banner/banner";


export default class distribute extends React.Component {
    
    componentWillMount() {
        document.title = "币票配号";
    };
    
    render() {
        return (
            <div className="distribute" style={{padding:'10px 0 0 0'}}>
                <Banner />
                <Demo type="index" />
                <div className="pub">
                    <img src={require('../../assets/pub.png')} alt=""/>
                </div>
            </div>
        );
    }

}