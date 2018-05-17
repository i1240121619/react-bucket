import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import P from "prop-types";

import { Button, Modal, message, Form } from "antd";

import Menu from "../../components/menu/menu";

import "./test.css";

import { onTestAdd, fetchApi } from "../../action/test";

@connect(
  state => ({
    num: state.app.num
  }),
  dispatch => ({
    actions: bindActionCreators({ onTestAdd, fetchApi }, dispatch)
  })
)
@Form.create()
export default class Test extends React.Component {
  static propTypes = {
    num: P.number, // 测试： 来自store的全局变量num
    location: P.any, // 自动注入的location对象
    match: P.any, // 自动注入的match对象
    history: P.any, // 自动注入的history对象
    actions: P.any, // connect高阶函数注入的actions，见本页面最下面的actions
    form: P.any,
    names: P.any
  };

  // 此方法为props元素添加默认值
  static defaultProps = {
    names: "我在这里"
  };

  constructor(props) {
    super(props);
    this.state = {
      LoadingState: 1, // 数据是否加载完毕
      visible: false, // 模态框隐藏和显示
      mokeAjax: [] // 用于测试ajax请求
    };
  }

  // 打开模态框按钮被点击时触发
  onBtnClick() {
    this.setState({
      visible: true
    });
  }

  // 关闭模态框
  handleCancel() {
    this.setState({
      visible: false
    });
  }

  // Ajax测试按钮被点击时触发
  onAjaxClick = () => {
    this.props.actions.fetchApi().then(res => {
      if (res.code === "success") {
        this.setState({
          mokeAjax: res.data
        });
      } else {
        message.error("获取数据失败");
      }
    });
  };

  componentDidMount() {
    console.log(
      "所有页面默认拥有的3个对象：",
      this.props.location,
      this.props.match,
      this.props.history
    );
    const set = new Set([1, 2, 3]);
    const map = new Map();
    console.log("Set 和 Map 测试:", set, map);
  }

  render() {
    const { form } = this.props;
    console.log("通过修饰器注入的form对象：", form);
    return (
      <div className="mainInAll">
        <div className={this.state.LoadingState ? "main mainIn" : "main"}>
          <div className="page">
            <h1 className="title">功能测试</h1>
            <div className="box">
              <div className="list">
                <h2>Antd组件测试</h2>
                <p>
                  <Button type="primary">普通按钮</Button>&nbsp;
                  <Button type="primary" loading>
                    加载中
                  </Button>&nbsp;
                  <Button type="primary" onClick={() => this.onBtnClick()}>
                    打开模态框
                  </Button>&nbsp;
                </p>
              </div>
              <div className="list">
                <h2>location对象测试</h2>
                <p>
                  当前路由：{this.props.location.pathname}
                  <br />
                  search参数: {this.props.location.search}
                  <br />
                  state参数:{" "}
                  {this.props.location.state
                    ? Object.entries(this.props.location.state)
                        .map(v => `${v[0]}=${v[1]}`)
                        .join("，")
                    : ""}
                </p>
                <p>所有页面都自动被注入location、match、history对象</p>
              </div>
              <div className="list">
                <h2>action测试</h2>
                <p>
                  <Button
                    type="primary"
                    onClick={() => this.props.actions.onTestAdd(this.props.num)}
                  >
                    通过action改变数据num
                  </Button>&nbsp;<br />
                  store中数据num: {this.props.num}
                </p>
              </div>
              <div className="list">
                <h2>异步请求测试（Mock模拟数据）</h2>
                <div className="pbox">
                  <Button type="primary" onClick={this.onAjaxClick}>
                    ajax请求测试(使用的reqwest库)
                  </Button>
                  <br />
                  数据:
                  <ul>
                    {this.state.mokeAjax.map((item, index) => (
                      <li key={index}>{`id: ${item.id}, email: ${
                        item.email
                      }`}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <Modal
              title="模态框"
              visible={this.state.visible}
              onOk={() => this.handleCancel()}
              onCancel={() => this.handleCancel()}
            >
              <p>内容...</p>
            </Modal>
          </div>
          <Menu />
        </div>
      </div>
    );
  }
}
