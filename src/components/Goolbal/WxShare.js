import axios from '../axios';
import React, { Component } from "react";
const wxApi = {
    getshare: function (props = {}) {
      
        //默认分享title文字
        props.title = props.title || '邮你邮我邮宝！';

        //默认分享图标
        props.imgUrl = props.imgUrl || 'http://api.youbao360.com:9090/img/lunbo/youbaologo.jpg';

        //默认分享link
        props.link = props.link || window.location.href;

        //默认分享描述desc
        props.desc = props.desc || "买卖邮币卡价格邮宝查看";

        console.log(window.location.href.split("#")[0]);
        console.log(props);

        let wxUrl = {
            wxUrl: encodeURIComponent(window.location.href.split("#")[0])
        };
        let sharUrl = encodeURIComponent(window.location.href.split("#")[0]);
        // axios.post("http://116.196.69.82:4080/YBSys/ybws/data/json/getWxConfig", qs.stringify(wxUrl)).then((data) => {
        axios.post("http://116.196.69.82:4080/YBSys/ybws/data/json/getWxConfig", {
            wxUrl: sharUrl
        }).then((data) => {
            console.log(data);
            window.wx.config({
                debug:false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.data.resultObject.appid, // 必填，公众号的唯一标识
                timestamp: data.data.resultObject.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.data.resultObject.noncestr, // 必填，生成签名的随机串
                signature: data.data.resultObject.signature, // 必填，签名，见附录1
                jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'onMenuShareQZone'
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            window.wx.ready(function () {
                //分享到朋友圈
                window.wx.onMenuShareTimeline({
                    title: props.title, // 分享标题
                    link: props.link, // 分享链接
                    imgUrl: props.imgUrl, // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        //分享的代码
                        // sha();
                        //alert('已分享')
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        //lert('已取消')
                        // 用户取消分享后执行的回调函数
                    }
                });
                //  分享给朋友
                window.wx.onMenuShareAppMessage({
                    title: props.title, // 分享标题
                    desc: props.desc, // 分享描述
                    link: props.link, // 分享链接
                    imgUrl: props.imgUrl, // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        //分享的代码
                        // sha();
                        //alert('已分享')
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        //lert('已取消')
                        // 用户取消分享后执行的回调函数
                    }
                });
                //分享到QQ
                window.wx.onMenuShareQQ({
                    title: props.title, // 分享标题
                    desc: props.desc, // 分享描述
                    link: props.link, // 分享链接
                    imgUrl: props.imgUrl, // 分享图标
                    success: function () {
                        //分享的代码
                        // sha();
                        //alert('已分享')
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        //alert('已取消')
                        // 用户取消分享后执行的回调函数
                    }
                });
                //分享到微博
                window.wx.onMenuShareWeibo({
                    title: props.title, // 分享标题
                    desc: props.desc, // 分享描述
                    link: props.link, // 分享链接
                    imgUrl: props.imgUrl, // 分享图标
                    success: function () {
                        //分享的代码
                        // sha();
                        //alert('已分享')
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        //alert('已取消')
                        // 用户取消分享后执行的回调函数
                    }
                });
                //分享到空间
                window.wx.onMenuShareQZone({
                    title: props.title, // 分享标题
                    desc: props.desc, // 分享描述
                    link: props.link, // 分享链接
                    imgUrl: props.imgUrl, // 分享图标
                    success: function () {
                        //分享的代码
                        // sha();
                        //alert('已分享')
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        //alert('已取消')
                        // 用户取消分享后执行的回调函数
                    }
                });
            });

        }).catch((error) => {
            console.log(error);
        })

    }
}
export default wxApi;