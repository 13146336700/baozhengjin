import React from "react";
import axios from "../../axios/index";
import Uheader from "../../Goolbal/Uheader";
import { Toast } from "antd-mobile";
import "../index/index.scss";

export default class CatalogueList extends React.Component {
  constructor(props) {
    super(props);
    //this.state = {}  定义数据
    this.state = {
      data: [], //配号目录数据
    };
  }

  componentWillMount() {
    document.title = "邮币卡行情列表";
    this.getList();
  }
  componentDidMount() {
    console.log(this.props.history, "s");
  }

  /**获取网址参数 */
  getUrlParam = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = this.props.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    }
    return ""; //如果此处只写return;则返回的是undefined
  };

  /**获取邮币卡目录数据 */
  getList() {
    axios
      .post("subject/json/catalogProduct", {
        tag: this.getUrlParam("tag"),
        catalog: this.getUrlParam("catalog"),
        secondCatalog: this.getUrlParam("name"),
        pageSize: 10000,
        pageIndex: 1,
      })
      .then((res) => {
        this.setState({
          data: res.data.resultObject.dataList,
        });
      })
      .catch((err) => {
        Toast.info(err, 2);
      });
  }

  /**tab切换 */
  tabChange(type) {
    this.setState({
      type: type,
    });
  }

  /**获取参数传值 */
  goFrom(item) {
    let market = {
      oid: item.sid,
      code: item.code,
      tag: item.tag,
    };
    sessionStorage.setItem("market", JSON.stringify(market));

    let marketFrom = JSON.parse(sessionStorage.getItem("marketFrom"));
    if (marketFrom.market === 'searchNumber') {
      this.props.history.push(
        `/${marketFrom.market}?name=${item.name}&unitName=${item.unitName}&category=${item.category}&url=${marketFrom.url}`
      );
      return false;
    }

    this.checkgoodstatus(item,marketFrom);
  }

  checkgoodstatus(item,marketFrom) {
      axios.post('market/json/getGoodsParam',{
          userId: JSON.parse(sessionStorage.getItem('userInfo')).userId,	//String	必填	用户id	产品名称
          type: marketFrom.market === 'SaleRelease'?'1':'2',	//String	必填	品类交易类型	
          name: item.name,	//String	必填	品类交易类型	商品名称
          sysInfor: 'web'
      }).then(res => {
          if (res.data.resultObject.isPublish === 'Y') {
              this.props.history.push(`/myStock?userId=${JSON.parse(sessionStorage.getItem('userInfo')).userId}&type=${marketFrom.market === 'SaleRelease'?'1':'2'}&name=${item.name}`);
          } else {
            this.props.history.push(
              `/${marketFrom.market}?name=${item.name}&unitName=${item.unitName}&category=${item.category}&url=${marketFrom.url}`
            );
          }
      }).catch(err => {
          console.log(err)
      })
  }

  render() {
    return (
      <div
        className="catalogueList"
        style={{
          background: "#ffffff",
          minHeight: "100%",
        }}
      >
        <Uheader {...this.props} utitle="邮币卡行情列表">
          
        </Uheader>
        <ul
          className="cont"
          style={{
            paddingBottom: "20px",
          }}
        >
          <li className="list listTop">
            <span className="code"> 志号 / 编号 </span>
            <span className="name"> 名称 </span>
          </li>
          {this.state.data.length > 0 ? (
            <nav>
              
              {this.state.data.map((item, index) => (
                <li className="list" onClick={() => this.goFrom(item)}>
                  <span className="code"> {item.code} </span>
                  <span className="name"> {item.name} </span>
                </li>
              ))}
            </nav>
          ) : (
            <li
              style={{
                background: "#ffffff",
                lineHeight: "300px",
                textAlign: "center",
                fontSize: "16px",
              }}
            >
              暂无数据
            </li>
          )}
        </ul>
      </div>
    );
  }
}
