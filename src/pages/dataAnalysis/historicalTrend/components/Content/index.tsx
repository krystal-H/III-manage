import React, { Component } from "react";
import { Card } from "antd";
import ConnectTime from "../../containers/ConnectTime";
import ConnectTabs from "../../containers/ConnectTabs";
import ConnectChart from "../../containers/ConnectChart";
import ConnectKeepTable from "../../containers/ConnectKeepTable";
import ConnectKeepChart from "../../containers/ConnectKeepChart";
import ConnectTable from "../../containers/ConnectTable";

class Content extends Component {
  public render(): JSX.Element {
    return (
      <Card className="page-card-small">
        <ConnectTime />
        <ConnectTabs />
        <div className="page-dashed" />

        {/* 留存系列列表+图表 */}
        <ConnectKeepTable />
        <ConnectKeepChart />

        {/*普通图表 */}
        <ConnectChart />

        {/* 全局列表 */}
        <ConnectTable />
      </Card>
    );
  }
}

export default Content;
