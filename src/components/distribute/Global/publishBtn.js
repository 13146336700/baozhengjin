import React from 'react';
import "../index/index.scss";
import axios from "../../axios/index";


export default class PublishBtn extends React.Component {

    componentWillMount() {
        document.title = "发布按钮";
    };
    state = {
        checked: true
    };

    checkgoodstatus() {
        axios.post('market/json/getGoodsParam',{
            userId: '000000006b55f4b0016bcf8aacf41411',	//String	必填	用户id	产品名称
            type: '1',	//String	必填	品类交易类型	
            name: '抗疫大版'	//String	必填	品类交易类型	商品名称
        }).then(res => {
            console.log(res);
            if (res.data.resultObject.isPublish === 'Y') {
                this.props.history.push('/myStock');
            } else {
                this.props.history.push('/publish');
            }
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="publishBtn" >
                <div className="pub" onClick={() =>this.checkgoodstatus()}>
                    <img src={require('../../assets/pub.png')} alt=""/>
                </div>
            </div>
        );
    }

}







