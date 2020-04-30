import React, { Component } from "react";
import { Card } from "antd";
import ConnectListForAPP from "../containers/ConnectListForAPP";
import ConnectListForEvent from "../containers/ConnectListForEvent";

class Content extends Component {
  render() {
    const { menuName } = this.props;
    return (
      <Card>
        {menuName === "application" ? (
          <ConnectListForAPP />
        ) : (
          <ConnectListForEvent />
        )}
      </Card>
    );
  }
}

export default Content;
