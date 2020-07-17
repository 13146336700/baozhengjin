import React, { Component } from "react";
import { List, Switch } from "antd-mobile";
import "./index.scss";
export default class myseach extends React.Component {
  state = {
    list: [
      {
        isCheck: true,
        name: "担保交易",
        dealPattern: "2",
      },
      {
        isCheck: false,
        name: "线下交易",
        dealPattern: "3",
      },
    ],
    checked: false,
    name: "", //文本框输入值
    dealPattern: "", // 2担保 3线下
  };
  componentDidMount() {
    if (sessionStorage.getItem("newlistARR")) {

      //有值 回显
      this.setState({
        list: JSON.parse(sessionStorage.getItem("newlistARR")),
      });
    }
  };
  componentWillMount() {
    if (this.getUrlParam("name")) {
      this.setState({
        name: this.getUrlParam("name"),
      });
    }
    if (this.getUrlParam("checked")) {
      let checked;
      if (this.getUrlParam("checked") == "true") {
        checked = true;
      } else {
        checked = false;
      }
      this.setState({
        checked: checked,
      });
    }
  }
  getUrlParam = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = this.props.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    }
    return ""; //如果此处只写return;则返回的是undefined
  };
  setParent = (item, key) => {
    //点击查询按钮，将值传给父组件
    this.props.setKeyWorld(item.name);
    console.log(this.props);

    let newlist = [...this.state.list]; //浅拷贝一下
    // this.setState({
    //   list: newlist.map((item1, index) =>{
    //     console.log(item1)
    //     if(item1.isCheck == true){
    //       item1.isCheck = true;
    //     }else{
    //       item1.isCheck = false;
    //     }
    //   }),
    // });
    newlist.map((item1, index) => {
      if (item1.isCheck == true) {
        item1.isCheck = false;
      } else {
        item1.isCheck = true;
      }
    });
    //  var objes = newlist.find((item)=>{
    //    return item.isCheck = true;
    //  })

    this.setState({ list: newlist });
    sessionStorage.setItem("newlistARR", JSON.stringify(newlist));
    // this.setState({
    //   list: newlist.map((item1, index) =>
    //     index == key
    //       ? { ...item1, isCheck: !item.isCheck }
    //       : { ...item1, isCheck: false }
    //   ),
    // });
  };
  hanInput = (ev) => {
    console.log(ev);
    console.log(ev.targe.value);
  };
  Jump = () => {
    let goodsId = "";
    if (this.getUrlParam("goodsId")) {
      goodsId = this.getUrlParam("goodsId");
    } else {
      goodsId = "";
    }
    // _this.props.history.push("/good");
    // this.props.history.push(`/SaleReleaseSeach/${this.props.ustate}/${this.getUrlParam('url')}`);
    this.props.history.push({
      pathname: `/SaleReleaseSeach/${this.props.ustate}`,
      search: `url=${this.getUrlParam("url")}&goodsId=${goodsId}&checked=${
        this.state.checked
      }`,
    });
  };
  render() {
    // const { getFieldProps } = this.props.form;
    return (
      <div className="myseach">
        <div className="Useach_homes">
          <span>藏品名称:</span>
          <div className="Useach" onClick={() => this.Jump()}>
            {
              this.props.ustate == 'BuyingRelease'?(
                <img src={require("../../assets/mai.png")} alt="" />
              ):(
                <img src={require("../../assets/mai_.png")} alt="" />
              )
            }
            <input
              type="text"
              value={this.state.name}
              onChange={(ev) => this.hanInput(ev)}
              placeholder="点击查找确认要发布的配号品类"
            />
          </div>
        </div>

        <div className="transaction">
          {this.state.list.map((item, key, arr) => (
            <div
              className="way"
              key={key + 10}
              onClick={() => this.setParent(item, key)}
            >
              {item.isCheck ? (
                <img src={require("../../assets/Selected.png")} alt="" />
              ) : (
                <img src={require("../../assets/Unselected.png")} alt="" />
              )}
              <span> {item.name} </span>
            </div>
          ))}
          <div className="mySwitch">
            {
              this.props.ustate == 'BuyingRelease'?(
                <List.Item
                extra={
                  <Switch
                    color="#EB3318"
                    checked={this.state.checked}
                    onChange={() => {
                      this.setState({
                        checked: !this.state.checked,
                      });
                    }}
                  />
                }
              >
                包邮
              </List.Item>
              ):null
            }
           
          </div>
        </div>
      </div>
    );
  }
}
