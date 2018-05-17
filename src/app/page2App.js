import "../css/public.css";

import React from "react";
import ReactDOM from "react-dom";
import Page2 from "../containers/page2/page2";

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <Page2 />;
  }
}
ReactDOM.render(<App />, document.getElementById("app"));
