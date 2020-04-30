import React, { Component, Fragment } from "react";
import { Card } from "antd";
import ConnectSearch from "../containers/ConnectSearch";

class Head extends Component {
  render() {
    return (
      <Fragment>
        <Card>
          <h2 className="page-title">日志数据查询</h2>
          <ConnectSearch />
        </Card>
        <div className="page-interval" />
      </Fragment>
    );
  }
}

export default Head;
