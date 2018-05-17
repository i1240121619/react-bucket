import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import P from "prop-types";

import Menu from "../../components/menu/menu";

import "./features.css";

@connect(
  state => ({}),
  dispatch => ({
    actions: bindActionCreators({}, dispatch)
  })
)
export default class Features extends React.Component {
  static propTypes = {
    location: P.any,
    history: P.any,
    actions: P.any
  };

  constructor(props) {
    super(props);
    this.state = {
      LoadingState: 1 // 数据是否加载完毕
    };
  } // constructor

  render() {
    return (
      <div className="mainInAll">
        <div className={this.state.LoadingState ? "main mainIn" : "main"}>
          <div className="page">
            <h1 className="title">构建与特性</h1>
            <div className="box">
              <div className="list">
                <h2>安装依赖文件</h2>
                <p>npm install</p>
              </div>
              <div className="list">
                <h2>正式打包</h2>
                <p>npm run build</p>
                <div>会将最终代码打包至/build文件夹中</div>
                <div>/build文件夹中的index.html 仅这两样东西是最终需要的</div>
              </div>
              <div className="list">
                <h2>启动服务</h2>
                <p>npm run dev</p>
                <div>代码打包编译，默认监听8080端口</div>
                <div>访问http://localhost:8080 即可查看</div>
              </div>
              <div className="list">
                <h2>HMR局部更新</h2>
                <div>使用webpack-dev-server热更新，自动刷新调试</div>
              </div>
              <div className="list">
                <h2>代码分割</h2>
                <div>react-loadable实现的代码分割</div>
                <div>src/app/indexApp.js中能查看例子</div>
              </div>
              <div className="list">
                <h2>webpack4.0</h2>
                <div>使用了最新版本的webpack，编译速度更快</div>
              </div>
            </div>
          </div>
          <Menu />
        </div>
      </div>
    );
  }
}
