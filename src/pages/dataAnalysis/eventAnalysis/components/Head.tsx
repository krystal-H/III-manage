import React, { Component, Fragment } from "react";
import { Card } from "antd";
import ConnectSearch from "../containers/ConnectSearch";

class Head extends Component {
  public render(): JSX.Element {
    return (
      <Fragment>
        <Card className="page-card-small">
          <h2 className="page-title">事件分析</h2>
          <ConnectSearch />
        </Card>
        <div className="page-interval" />
      </Fragment>
    );
  }
}

export default Head;
