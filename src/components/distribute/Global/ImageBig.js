import React, { Component } from "react";
import { WingBlank, Carousel } from "antd-mobile";
import "./index.scss";
export default class ImageBig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ["1", "2", "3"],
    };
  }
  state = {
    ExpirationValue: "30",
    imgHeight: 176,
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: [
          "AiyWuByWklrrUDlFignR",
          "TekJlZRVCjLFexlOCuWn",
          "IJOtIlfsYdTyaDTRVrLI",
        ],
      });
    }, 100);
  }

  render() {
    return (
      <div className="ImageBig">
        <Carousel
          autoplay={false}
          infinite
          vertical={true}
          beforeChange={(from, to) =>
            console.log(`slide from ${from} to ${to}`)
          }
          afterChange={(index) => console.log("slide to", index)}
        >
          {this.props.imageArray.map((val, key) => (
              <div className="image_div" key={key + 100}>

             
            <img
              src={this.props.imageArray[this.props.imageArrayKey]}
              alt="滑动图片"
              style={{ width: "100%", verticalAlign: "auto" }}
              onLoad={() => {
                // fire window resize event to change height
                // window.dispatchEvent(new Event("resize"));
                this.setState({ imgHeight: "auto" });
              }}
            />
             </div>
          ))}
        </Carousel>
      </div>
    );
  }
}
