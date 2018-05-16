/** 导航 **/

import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

export default class Menu extends React.PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="menu">
        <NavLink to="/index">首页</NavLink>|
        <NavLink to="/page1">构建与特性</NavLink>|
        <NavLink
          to={{
            pathname: "/page2",
            search: "?a=123&b=abc",
            state: { c: "456", d: "ABC" }
          }}
        >
          测试页面
        </NavLink>|
        <a
          href="https://github.com/i1240121619/react-bucket"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    );
  }
}
