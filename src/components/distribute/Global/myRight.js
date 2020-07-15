import React, { Component } from "react";
import "./index.scss";
import axios from "../../axios/index";
export default class Loose extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showElem: "none",
      Soncataloglist: [],
      rightNum: 0, //点击到第几步了
    };
    this.selectChange = this.selectChange.bind(this);
  }
  state = {};
  componentWillMount() {
    console.log(this.props);
  }
  selectChange = (ev) => {};
  changeDOM = (value = "startup") => {
    //DOM改变
  };
  componentWillUnmount() {
    this.setState({
      Soncataloglist: null,
      tag: null,
      catalog: null,
    });
  };
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    let sonarray = [...nextProps.sonarray];
    let newsonarray = [];
    sonarray.map((item, key) => {
      let obj = {
        name: item,
      };
      newsonarray.push(obj);
    });
    this.setState({
      Soncataloglist: newsonarray,
      tag: nextProps.tag,
      catalog: nextProps.catalog,
    });
  }
  cancel = () => {
    this.setState({
      rightNum: 0,
    });
    this.props.setParentState();
  };
  chuandi = (item) => {
    let rightNum = ++this.state.rightNum;
    if (rightNum == 2) {
      this.cancel();
      this.props.goSelete(item);
    }
    axios
      .post("subject/json/catalogProduct", {
        tag: this.props.tag,
        catalog: this.props.catalog,
        secondCatalog: item.name,
        pageSize: 10000,
        pageIndex: 1,
      })
      .then((response) => {
        console.log(response.data.resultObject.dataList);
        let dataList = response.data.resultObject.dataList;
        if (response.data.code == "10000") {
          this.setState({
            Soncataloglist: dataList,
            rightNum: rightNum,
          });
        } else {
          // Toast.info(response.data.message, 1);
        }
      })
      .catch((error) => {});
  };
  render() {
    return (
      <div
        className={
          this.props.showElems == "none"
            ? "transformRightHomeNone transformRightHome"
            : "transformRightHomeRight transformRightHome"
        }
      >
        <div className="mask" style={{ display: this.props.showElems }}></div>
        <div
          className={
            this.props.showElems == "none"
              ? "u_right myRightHome"
              : "u_left myRightHome"
          }
        >
          <div className="myRightHome_title">
            <span>{this.props.catalog}</span>
            <button onClick={() => this.cancel()}>取消</button>
          </div>
          <ul>
            {this.state.Soncataloglist.map((item, key) => (
              <li key={key + 684} onClick={() => this.chuandi(item)}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
