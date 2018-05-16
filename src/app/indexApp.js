import "../css/special.css";
import "../css/assembly.css";

import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";
// import P from "prop-types";
// import createHistory from 'history/createBrowserHistory';
import createHistory from "history/createHashHistory";
import Loadable from "react-loadable";
import Loading from "../components/loading/Loading";

const Index = Loadable({
  loader: () => import("../containers/Index"),
  loading: Loading,
  timeout: 10000
});
const Page1 = Loadable({
  loader: () => import("../containers/Page1"),
  loading: Loading
});
const Page2 = Loadable({
  loader: () => import("../containers/Page2"),
  loading: Loading
});
const NotFound = Loadable({
  loader: () => import("../containers/NotFound"),
  loading: Loading
});

const history = createHistory();

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // 可以手动在此预加载指定的模块：
    //Features.preload(); // 预加载Features页面
    //Test.preload(); // 预加载Test页面
    // 也可以直接预加载所有的异步模块
    Loadable.preloadAll();
  }

  /** 权限控制 **/
  onEnter(Component, props) {
    console.log("权限控制：", props);
    // 例子：如果没有登录，直接跳转至login页
    // if (sessionStorage.getItem('userInfo')) {
    //   return <Component {...props} />;
    // } else {
    //   return <Redirect to='/login' />;
    // }
    return <Component {...props} />;
  }

  render() {
    return (
      <Router history={history} key="history">
        <Route
          render={() => {
            return (
              <Switch>
                <Route path="/" render={props => this.onEnter(Index, props)} />
                <Route
                  path="/features"
                  render={props => this.onEnter(Features, props)}
                />
                <Route
                  path="/test"
                  render={props => this.onEnter(Test, props)}
                />
                <Route component={NotFound} />
              </Switch>
            );
          }}
        />
      </Router>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));
