/** Footer 页面底部 **/
import React from "react";
import "./index.css";

export default class Footer extends React.PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="footer">
        © 2018{" "}
        <a
          href="https://github.com/i1240121619/react-bucket"
          target="_blank"
          rel="noopener noreferrer"
        >
          react-bucket
        </a>, Inc.
      </div>
    );
  }
}
