/** 导航 **/

import React from "react";
import { NavLink } from "react-router-dom";
import "./menu.css";

export default class Menu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="menu">
        <NavLink to="/index" replace>
          首页
        </NavLink>|
        <NavLink to="/features" replace>
          构建与特性
        </NavLink>|
        <NavLink
          to={{
            pathname: "/test",
            search: "?a=123&b=abc",
            state: { c: "456", d: "ABC" }
          }}
          replace
        >
          测试页面
        </NavLink>|
        <a href="/page1/" target="_blank" rel="noopener noreferrer">
          多页应用
        </a>|
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
