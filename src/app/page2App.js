import "../css/special.css";
import "../css/assembly.css";

import React from "react";
import ReactDOM from "react-dom";
import Page2 from "../containers/Page2";

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Page2 />
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));
