import React from "react";

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoadingState: 1 // 数据是否加载完毕
    };
  } // constructor

  render() {
    return (
      <div className="mainInAll">
        <div className={this.state.LoadingState ? "main mainIn" : "main"}>
          Index123
        </div>
      </div>
    );
  } // render
}
