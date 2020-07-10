import React from 'react';
import { Carousel  } from 'antd-mobile';
import "../index/index.scss";
import axios from "../../axios/index";

export default class Banner extends React.Component {
    state = {
      data: ['1', '2', '3'],
      imgHeight: 176,
    }
    componentDidMount() {
      // simulate img loading
      setTimeout(() => {
        this.setState({
          data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
        });
      }, 100);
      this.getBannerList();
    }

    getBannerList() {
      axios.post("fbusiness/json/getSbuyLunBo", {
        rpType: this.props.rpType
      }).then( (res)=>{
          console.log(res);
      }).catch((err) =>{
          console.log(err);
      })
    }

    render() {
      return (
          <Carousel
            infinite
            autoplay
            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
            afterChange={index => console.log('slide to', index)}
          >
            {this.state.data.map(val => (
                <img
                  src={`http://image.ybk008.com/pc-banner-weiguifenghao1589627583069`}
                  alt=""
                  key= {val}
                  style={{ width: '100%', verticalAlign: 'top', height: '70px' }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
            ))}
          </Carousel>
      );
    }
}