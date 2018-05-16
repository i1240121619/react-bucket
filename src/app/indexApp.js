import "../css/special.css";
import "../css/assembly.css";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, Switch, Redirect } from "react-router-dom";
// import P from "prop-types";
// import createHistory from 'history/createBrowserHistory';
import createHistory from "history/createHashHistory";
import Loadable from "react-loadable";
import Loading from "../components/loading/Loading";

/** 数据中心 **/
import store from "../store";

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
                <Redirect exact from="/" to="/index" />
                <Route
                  path="/index"
                  render={props => this.onEnter(Index, props)}
                />
                <Route
                  path="/page1"
                  render={props => this.onEnter(Page1, props)}
                />
                <Route
                  path="/page2"
                  render={props => this.onEnter(Page2, props)}
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
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
