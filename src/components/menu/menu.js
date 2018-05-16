/** 导航 **/

import React from "react";
import { Link } from "react-router-dom";
import "./menu.css";

export default class Menu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="menu">
        <Link to="/index" replace>
          首页
        </Link>|
        <Link to="/page1" replace>
          构建与特性
        </Link>|
        <Link
          to={{
            pathname: "/page2",
            search: "?a=123&b=abc",
            state: { c: "456", d: "ABC" }
          }}
          replace
        >
          测试页面
        </Link>|
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
