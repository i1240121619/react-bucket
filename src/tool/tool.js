import reqwest from "reqwest"; // 封装了ajax请求的库
import axios from "axios"; // 封装了fetch请求的库

export function getUserAgent() {
  let UserAgentName = "";
  let userAgent = navigator.userAgent;
  let ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) === "micromessenger") {
    UserAgentName = "Weixin";
  } else {
    if (
      userAgent.indexOf("Android") !== -1 ||
      userAgent.indexOf("SAMSUNG") !== -1
    ) {
      UserAgentName = "Android";
    } else if (
      userAgent.indexOf("iPhone") !== -1 ||
      userAgent.indexOf("iPad") !== -1 ||
      userAgent.indexOf("IOS") !== -1
    ) {
      UserAgentName = "IOS";
    } else {
      UserAgentName = "PcOrUC";
    }
  }
  return UserAgentName;
} // getUserAgent:判断客服端浏览器内核

export function newPost(url, bodyObj = {}) {
  return reqwest({
    url, // URL
    method: "post", // 请求方式
    contentType: "application/json;charset=utf-8", // 消息主体数据类型 JSON
    crossOrigin: true, // 开启CORS跨域
    withCredentials: true, // 请求头中是否带cookie，有利于后端开发保持他们需要的session
    data: JSON.stringify(bodyObj), // 参数，弄成json字符串
    type: "json" // 参数类型JSON
  });
}

export function newFetch(url, bodyObj = {}) {
  return axios({
    url,
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    withCredentials: true,
    data: JSON.stringify(bodyObj)
  });
}
