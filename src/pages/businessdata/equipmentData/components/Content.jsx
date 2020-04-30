import React, { Component } from "react";
import { Card } from "antd";
import ConnectTable from "../containers/ConnectTable";

class Content extends Component {
  render() {
    return (
      <Card>
        <ConnectTable />
      </Card>
    );
  }
}

export default Content;
