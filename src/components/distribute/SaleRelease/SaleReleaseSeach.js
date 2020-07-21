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
            productList: response.data.resultObject.productList,
          });
        } else {
          Toast.info(response.data.message, 1);
        }
      })
      .catch((error) => {});
  };
  snameChange = (value) => {
    //文本
    console.log(value);
    this.setState({
      sname: value,
    });
    if (this.state.sname) {
      axios
        .post("subject/json/searchNumProduct", {
          sname: value,
          pageSize: "15",
          pageIndex: "1",
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == "10000") {
            if (
              Array.isArray(response.data.resultObject.dataList) &&
              response.data.resultObject.dataList.length
            ) {
              this.setState({
                searchNumProduct: response.data.resultObject.dataList,
              });
            } else {
              Toast.info("暂无此藏品名称", 2);
            }
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
  resouClick(item) {
    console.log(item);
    this.setState({
      sname: item.name,
    });

    this.goSelete(item);
    this.inputOnBlur();
  }

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
  MysearcClick() {
    //搜索
    if (!this.state.sname) {
      Toast.info("请选择要搜索的藏品名称", 2);
      return false;
    }
    this.snameChange(this.state.sname);
  }

  setSelfState = (val) => {
    console.log(val);
    this.setState({
      showElems: "none",
    });
  };
  getUrlParam = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = this.props.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    }
    return ""; //如果此处只写return;则返回的是undefined
  };
  goSelete(val) {
    let goodsId = "";
    if (this.getUrlParam("goodsId")) {
      goodsId = this.getUrlParam("goodsId");
    } else {
      goodsId = "";
    }
    console.log(val);
    let market = {
      oid: val.sid,
      tag: val.tag,
      code: val.code,
    };

    sessionStorage.setItem("market", JSON.stringify(market));
    // console.log()
    // SaleRelease
    let ustate = this.props.match.params.ustate;
    axios
      .post("market/json/getGoodsParam", {
        userId: JSON.parse(sessionStorage.getItem("userInfo")).userId, //String	必填	用户id	产品名称
        type: ustate === "SaleRelease" ? "1" : "2", //String	必填	品类交易类型
        name: val.name, //String	必填	品类交易类型	商品名称
        sysInfor: "web",
      })
      .then((res) => {
        console.log(res);
        if (res.data.resultObject.isPublish === "Y") {
          this.props.history.push(
            `/myStock?userId=${
              JSON.parse(sessionStorage.getItem("userInfo")).userId
            }&type=${ustate === "SaleRelease" ? "1" : "2"}&name=${val.name}`
          );
        } else {
          this.props.history.push(
            `/${ustate}?name=${val.name}&unitName=${val.unitName}&category=${
              val.category
            }&url=${ustate}&checked=${this.getUrlParam("checked")}`
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // this.props.history.push({
    //   pathname: `/${this.props.match.params.ustate}`,
    //   search: `category=${val.category}&name=${val.name}&unitName=${
    //     val.unitName
    //   }&url=${this.getUrlParam(
    //     "url"
    //   )}&goodsId=${goodsId}&checked=${this.getUrlParam("checked")}`,
    // });
  }

  render() {
    return (
      <div className="SaleReleaseSeach">
        {/* <Uheader utitle="发布藏品搜索" {...this.props}></Uheader> */}
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
          <img
            src={require("../../assets/Goreturn.png")}
            alt=""
            className="Goreturn"
            onClick={() => {
              this.props.history.go(-1);
            }}
          />

          <div className="Useachhome">
            <img src={require("../../assets/usearch.png")} alt="" />
            <div className="hot_word">
              <input
                type="text"
                value={this.state.sname}
                onChange={(ev) => this.snameChange(ev.target.value)}
                placeholder="输入要查找的名称"
              />
            </div>
          </div>
          <div className="searchFo" onClick={() => this.MysearcClick()}>
            搜索
          </div>
        </div>
        <div className="Useach_boder_"></div>

        {/* <ul className="tab_">
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
        </ul> */}
        {!this.state.searchNumProduct.length ? (
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
        ) : null}

        <ul className="Ul_seach">
          {this.state.searchNumProduct.map((item, key) => (
            <li key={key + 500} onClick={() => this.resouClick(item)}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
