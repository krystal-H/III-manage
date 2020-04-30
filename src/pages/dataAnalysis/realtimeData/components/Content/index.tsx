import React, { Component } from "react";
import { Card } from "antd";
import ConnectTime from "../../containers/ConnectTime";
import ConnectTabs from "../../containers/ConnectTabs";
import ConnectChart from "../../containers/ConnectChart";
import ConnectTable from "../../containers/ConnectTable";

class Content extends Component {
  public render(): JSX.Element {
    return (
      <>
        <Card className="page-card-small">
          <ConnectTime />
          <ConnectTabs />
          <div className="page-dashed" />
          <ConnectChart />
          <ConnectTable />
        </Card>
        <div className="page-interval" />
      </>
    );
  }
}

export default Content;
