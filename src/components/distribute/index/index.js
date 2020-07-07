import React from 'react';
import "./index.scss";
import Demo from "./pullRefresh.js"
import Banner from "../banner/banner"


export default class distribute extends React.Component {
    
    componentWillMount() {
        document.title = "币票配号";
    };
    
    render() {
        return (
            <div className="distribute">
                <Banner />
                <Demo />
                <div className="pub">
                    +
                </div>
            </div>
        );
    }

}