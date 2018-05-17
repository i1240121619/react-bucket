/** MOCK 模拟数据拦截ajax请求 **/

const Mock = require("mockjs");

Mock.mock("/test/", function() {
  return Mock.mock({
    "code|1": "success",
    "data|1-10": [
      {
        "id|+1": 1,
        email: "@EMAIL"
      }
    ]
  });
});
