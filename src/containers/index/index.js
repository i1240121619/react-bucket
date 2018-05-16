import React from "react";
import Menu from "../../components/menu/menu";

import "./index.css";

export default class Index extends React.Component {
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
          <div className="home">
            <div className="box">
              <img src="/images/react-logo.jpg" />
              <div className="title">React-Bucket</div>
              <div className="info">
                react16、redux、webpack4、eslint、babel6、antd
              </div>
            </div>
          </div>
          <Menu />
        </div>
      </div>
    );
  } // render
}
