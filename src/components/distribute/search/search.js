import React from 'react';
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';

export default class SearchNumber extends React.Component {
    
    componentWillMount() {
        document.title = "配号搜索";
    };

    render() {
        return (
            <div className="searchNumber">
                <div className="searchTop">
                {/* <SearchBar
                    placeholder="Search"
                    onSubmit={value => console.log(value, 'onSubmit')}
                    onClear={value => console.log(value, 'onClear')}
                    onFocus={() => console.log('onFocus')}
                    onBlur={() => console.log('onBlur')}
                    onCancel={() => console.log('onCancel')}
                    showCancelButton
                    onChange={this.onChange}
                /> */}
                    <input type="text"/>
                    <button>求购</button>
                    <button>出售</button>
                </div>
            </div>
        );
    }

}