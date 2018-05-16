import "../css/special.css";
import "../css/assembly.css";

import React from "react";
import ReactDOM from "react-dom";
import Page1 from "../containers/Page1";

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Page1 />
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));
