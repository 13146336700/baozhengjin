import React, { Component } from "react";
import Uheader from "../../Goolbal/Uheader";
import "./SaleRelease.scss";
import MyRight from "../Global/myRight";
import axios from "../../axios/index";
import { Toast } from "antd-mobile";
export default class SaleReleaseSeach extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Tab: "tab-1",
      cataloglist: [], //藏品目录
      sonarray: [], //传给子组件的数组
      catalog: "", //一级目录 子组件
      productList: [], //热门
      tag: "", //钱币还是邮票
      searchNumProduct: [], //模糊搜索的数组
      showElems: "none",
      sname: "", //搜索内容
    };
  }
  state = {
    list: [
      {
        isCheck: true,
        name: "担保交易",
      },
      {
        isCheck: false,
        name: "线下交易",
      },
    ],
    checked: false,
    open: true,
  };
  componentDidMount() {
    this.tabClick();
    console.log(this.props);
  }
  tabClick = (num = 1, messa = "coin") => {
    // console.log(num);
    this.setState({
      Tab: `tab-${num}`,
    });
    axios
      .post("subject/json/getRecommend", {
        tag: messa,
      })
      .then((response) => {
        console.log(response);
        if (response.data.code == "10000") {
          this.setState({
            cataloglist: response.data.resultObject.cataloglist,
            productList: response.data.resultObject.productList,
          });
        } else {
          Toast.info(response.data.message, 1);
        }
      })
      .catch((error) => {});
  };
  snameChange = (ev) => {
    //文本
    console.log(ev.target.value);
    this.setState({
      sname: ev.target.value,
    });
    if (this.state.sname) {
      axios
        .post("subject/json/searchNumProduct", {
          sname: ev.target.value,
          pageSize: "10",
          pageIndex: "1",
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == "10000") {
            this.setState({
              searchNumProduct: response.data.resultObject.dataList,
            });
          } else {
            Toast.info(response.data.message, 1);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.inputOnBlur();
    }
  };
  onOpenChange = (...args) => {
    console.log(args);
    this.setState({ open: !this.state.open });
  };
  resouClick = (item) => {
    console.log(item);
    this.setState({
      sname: item.name,
    });
    this.inputOnBlur();
  };

  inputOnBlur = () => {
    this.setState({
      searchNumProduct: [],
    });
  };
  mytable = (item) => {
    console.log(this.state.Tab);
    let tag = "";
    if (this.state.Tab == "tab-1") {
      tag = "coin";
    } else {
      tag = "stamp";
    }

    this.setState({
      showElems: "block",
      tag: tag,
      catalog: item.name,
      sonarray: item.list || [],
    });
  };
  componentWillUnmount() {
    this.goSelete = null;
    this.setState({
      showElems: null,
      tag: null,
      sonarray: null,
      catalog: null,
    });
  }

  setSelfState = (val) => {
    console.log(val);
    this.setState({
      showElems: "none",
    });
  };
  goSelete = (val) => {
    this.props.history.push({
      pathname: `/${this.props.match.params.ustate}`,
      search: `category=${val.category}&name=${val.name}&unitName=${val.unitName}`,
    });
  };

  render() {
    return (
      <div className="SaleReleaseSeach">
        <Uheader utitle="发布藏品搜索" {...this.props}></Uheader>
        {/* 
        右拉入
        */}
        <MyRight
          {...this.props}
          showElems={this.state.showElems}
          setParentState={this.setSelfState}
          tag={this.state.tag}
          sonarray={this.state.sonarray}
          catalog={this.state.catalog}
          goSelete={this.goSelete.bind(this)}
        ></MyRight>

        <div className="Useach">
          <div className="Useachhome">
            <img src={require("../../assets/usearch.png")} alt="" />
            <div className="hot_word">
              <input
                type="text"
                value={this.state.sname}
                onChange={(ev) => this.snameChange(ev)}
                placeholder="输入要查找的名称"
              />
              <ul>
                {this.state.searchNumProduct.map((item, key) => (
                  <li key={key + 500} onClick={() => this.resouClick(item)}>
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <ul className="tab_">
          <li
            className={this.state.Tab == "tab-1" ? "active" : null}
            onClick={() => this.tabClick(1, "coin")}
          >
            钱币
          </li>
          <li
            className={this.state.Tab == "tab-2" ? "active" : null}
            onClick={() => this.tabClick(2, "stamp")}
          >
            邮票
          </li>
        </ul>
        <div className="Contents">
          <div className="Contents_title">热门藏品</div>
          <ul>
            {this.state.productList.map((item, key) => (
              <li key={key + 600} onClick={() => this.goSelete(item)}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="Contents">
          <div className="Contents_title">藏品目录</div>
          <ul>
            {this.state.cataloglist.map((item, key) => (
              <li key={key + 10} onClick={() => this.mytable(item)}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}