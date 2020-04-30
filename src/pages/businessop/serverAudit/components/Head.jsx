import React, { Component, Fragment } from "react";
import { Card } from "antd";
import ConnectSearch from "../containers/ConnectSearch";

class Head extends Component {
  render() {
    return (
      <Fragment>
        <Card>
          <h2 className="page-title">APP控制服务审核</h2>
          <ConnectSearch />
        </Card>
        <div className="page-interval" />
      </Fragment>
    );
  }
}

export default Head;
