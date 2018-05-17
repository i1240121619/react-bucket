/**
  一些公共的action可以写在这里，比如用户登录、退出登录、权限查询等
  其他的action可以按模块不同，创建不同的js文件
**/
import { message } from "antd";
import "../../mock/mock-data";

/** 测试页：num数据测试 **/
export const onTestAdd = num => async dispatch => {
  dispatch({
    type: "TEST::add",
    payload: ++num
  });
};

/** 异步请求测试 ajax post **/
export const fetchApi = () => async dispatch => {
  try {
    const res = await tool.Ajax(host + "/test/", "post");
    dispatch({
      // 调用dispatch触发对应的reducer，如果不需要把数据存入store，则可以不调用dispatch
      type: "TEST::ajax",
      payload: res
    });
    return res; // 同时也把数据直接返回调用的地方
  } catch (err) {
    message.error("网络错误，请重试");
  }
};
