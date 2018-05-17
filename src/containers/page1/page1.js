import React from "react";
import { Button } from "antd";

import "./page1.css";

export default class Page1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoadingState: 1 // 数据是否加载完毕
    };
  } // constructor
  onBtnClick() {
    tool.jump("/page2/");
  }

  render() {
    return (
      <div className="mainInAll">
        <div className={this.state.LoadingState ? "main mainIn" : "main"}>
          <div className="Btn">
            <Button type="primary" onClick={() => this.onBtnClick()}>
              跳转至page2页面
            </Button>
          </div>
        </div>
      </div>
    );
  } // render
}
