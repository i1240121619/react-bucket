import "../css/public.css";

import React from "react";
import ReactDOM from "react-dom";
import Page1 from "../containers/page1/page1";

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <Page1 />;
  }
}
ReactDOM.render(<App />, document.getElementById("app"));
