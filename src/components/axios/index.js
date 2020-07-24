// /**
//  *
//  * ajax全局配置
//  *
//  */
// import axios from 'axios';

// // axios 配置
// axios.defaults.timeout = 2000; //响应时间
// axios.defaults.headers.post['Content-Type'] = 'application/json'; //配置请求头
// axios.defaults.headers.get['Content-Type'] = 'application/json'; //配置请求头
// axios.defaults.headers.delete['Content-Type'] = 'application/json'; //配置请求头
// axios.defaults.headers.put['Content-Type'] = 'application/json'; //配置请求头

// // 当实例创建时设置默认配置
// // axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.baseURL = 'https://5b5e71c98e9f160014b88cc9.mockapi.io/api/v1/';

// //http request 拦截器
// axios.interceptors.request.use((config) => {
//     // config.setHeaders([
//     //     // 在这里设置请求头与携带token信息
//     // ]);
//     return config
// }, (error) => {
//     return Promise.reject(error);
// });

// //http response 拦截器:返回状态判断（添加响应拦截器）
// axios.interceptors.response.use(
//     response => {
//         if (response.data.code === 40008) {
//             // 40008 说明 token 验证失败
//             // 可以直接跳转到登录页面，重新登录获取 token
//             window.location.reload();//刷新页面，如果该页面需要登录，则会自动跳转到登录页面
//             return {
//                 code:12000,
//                 message:"登录过时,退出请重新登录"
//             };
//         }
//         return response.data;
//     },
//     error => {
//         return Promise.reject(error.response) // 返回接口返回的错误信息
//     }
// );

// export default axios;
import axios from "axios";
import Qs from "qs";
// import md5 from "js-md5";
import md5 from "md5";
// import { Message } from "element-ui";
// import router from "../router";
// import store from "../store";

const service = axios.create({
	
	// baseURL: "http://198.166.1.168:8080/YBAppDev/ybws/", // api的base_url 线下正式
	// baseURL: "http://app.youbaoapp.com:8080/YBApp/ybws/", // api的base_url 线下正式 测试服务
	baseURL: "https://api.youbao360.com/YBApp/ybws/", // api的base_url 线上 正式地址 正式服务
	timeout: 10000 // 请求超时时间 5秒
});
var dialogTimes = 1;



// request请求拦截器
service.interceptors.request.use(
	config => {
		// eslint-disable-next-line no-unused-vars
		//console.log(config);
		// if (localStorage.getItem("token")) {
		if (getCookie("amap_ken")) {
			if (config.data == "") {
				config.data = "token=" + getCookie("amap_ken");
			} else {
				config.data += "&token=" + getCookie("amap_ken");
			}
		}
		let Oristr = decodeURIComponent(config.data)
			.split("&")
			.sort()
			.join("&");
		let ranstr = new Date().getTime();
		var firdtEncryption = md5(
		`token=4028808361926f8a0161db4c492304e2&timestamp=${ranstr}`
		 );
		 console.log(firdtEncryption);
		 var Token = md5(
		 `firdtEncryption=${firdtEncryption}&ybSecret=h000631106ffd01678e09140608`
		 );
		
		
		let defaults = Qs.parse(Oristr);
		defaults.sign = Token;
		defaults.timestamp = ranstr;
		defaults.token = "4028808361926f8a0161db4c492304e2";
		defaults.sysInfo = "web";
		config.data = Qs.stringify(defaults);
		// console.log(str, "请求家吗");
		// console.log(config.data, "请求家吗");
		return config;
	},
	error => {
		Promise.reject(error);
	}
);

// respone响应拦截器
service.interceptors.response.use(
	response => {
		// 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
		// 否则的话抛出错误
		if (response.status === 200) {
			// console.log(response)
			if (response.data.code === 21001) {
				if (dialogTimes < 2) {
					//   Message({
					//     type: "error",
					//     message: "用户名登录超时，需要重新登录"
					//   });
					alert("用户名登录超时，需要重新登录");
					dialogTimes += 2;
				}
				// sessionStorage.removeItem("userInfo");
				// sessionStorage.removeItem("getUserInfor");
				// store.dispatch("setUserInfoAct", {});
				setTimeout(() => {
					//   router.push("/Login?head=true");
				}, 1000);
			} else {
				return Promise.resolve(response);
			}
		} else {
			return Promise.reject(response);
		}
	},
	error => {
		// console.log(error, "服务器挂了，哈哈哈哈哈");
		if (error.response.status) {
			switch (error.response.status) {
				// 401: 未登录
				// 未登录则跳转登录页面，并携带当前页面的路径
				// 在登录成功后返回当前页面，这一步需要在登录页操作
				case 401:
					//   Message({
					//     type: "error",
					//     message: "请前往登录后再进行此操作"
					//   });
					alert("请前往登录后再进行此操作");
					break;
					// 403 token过期
					// 登录过期对用户进行提示
					// 清除本地token和清空vuex中token对象
					// 跳转登录页面
				case 403:
					//   Message({
					//     type: "error",
					//     message: "登录过期，请重新登录"
					//   });
					alert("登录过期，请重新登录");
					// 清除token
					//localStorage.removeItem("token");

					break;

					// 404请求不存在
				case 404:
					//   Message({
					//     type: "error",
					//     message: "网络请求不存在"
					//   });
					// alert("网络请求不存在");
					console.log("网络请求不存在");
					break;
					// 其他错误，直接抛出错误提示
				default:
					// Toast({
					//     message: error.response.data.message,
					//     duration: 1500,
					//     forbidClick: true
					// });
					console.lg("网络请求不存在");
			}
			return Promise.reject(error.response);
		}
	}
);

/**
 * 获取cookie里面的token
 */
const getCookie = function(c_name) {
	let c_start, c_end;
	if (document.cookie.length > 0) {
		//检查这个cookie是否存在，不存在就为 -1
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			//获取cookie值的开始位置
			c_start = c_start + c_name.length + 1;
			//通过";"号是否存在来判断结束位置
			c_end = document.cookie.indexOf(";", c_start);

			if (c_end == -1) {
				c_end = document.cookie.length;
			}
			//通过substring()得到了值
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
};

const api = {
	/**
	 .. post方法，对应post请求
	 .. @param {String} url [请求的url地址]
	 .. @param {Object} params [请求时携带的参数]
	 .. @returns Promise
	 **/
	post(url, params = {}, isForm = false) {
		return new Promise((resolve, reject) => {
			service({
					url,
					method: "post",
					data: Qs.stringify(params),
					isForm
				})
				.then(response => {
					resolve(response);
				})
				.catch(error => {
					reject(error);
				});
		});
	},

	/**
	 ·· get方法，对应get请求
	 ·· @param {String} url [请求的url地址]
	 ·· @param {Object} params [请求时携带的参数]
	 ·· @returns Promise
	 **/
	get(url, params = {}, isForm = false) {
		return new Promise((resolve, reject) => {
			service({
					url,
					method: "get",
					params: params,
					isForm
				})
				.then(response => {
					resolve(response);
				})
				.catch(error => {
					reject(error);
				});
		});
	}
};

export default api;
